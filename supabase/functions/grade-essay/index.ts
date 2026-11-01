const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};

const rubricByCourse = {
  "AP English Language": "Use the current College Board AP Language 0-6 analytical rubric: Thesis 0-1, Evidence and Commentary 0-4, Sophistication 0-1. For synthesis, require a defensible thesis, at least three source references, evidence explanations, and qualification. For rhetorical analysis, score textual analysis and line of reasoning. For argument, score evidence from knowledge, reading, or experience.",
  "AP English Literature": "Use the current College Board AP Literature 0-6 analytical rubric: Thesis 0-1, Evidence and Commentary 0-4, Sophistication 0-1. Score a defensible thesis, specific evidence from the prompt or chosen literary work, cogent commentary, and nuance.",
  "AP United States History": "Use the official AP U.S. History historical thinking rubric. DBQ: Contextualization 0-1, Thesis/Claim 0-1, Evidence from Documents 0-3, Evidence Beyond Documents 0-2, Analysis and Reasoning 0-2: total 0-7. Long Essay: Thesis/Claim 0-1, Contextualization 0-1, Evidence 0-2, Analysis and Reasoning 0-2: total 0-6."
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}

Deno.serve(async request => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) return json({ error: "AI grading is not configured. Add OPENAI_API_KEY to the Supabase Edge Function secrets." }, 503);

  let payload: {
    course?: string;
    essayType?: string;
    title?: string;
    directions?: string;
    materials?: Array<[string, string]>;
    response?: string;
  };
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid JSON request." }, 400);
  }

  if (!payload.course || !rubricByCourse[payload.course as keyof typeof rubricByCourse]) {
    return json({ error: "Unsupported course." }, 400);
  }
  const response = payload.response?.trim();
  if (!response || response.length < 40 || response.length > 30000) {
    return json({ error: "Essay text must be between 40 and 30,000 characters." }, 400);
  }

  const rubric = rubricByCourse[payload.course as keyof typeof rubricByCourse];
  const system = `You are an experienced AP essay reader. Apply only the supplied rubric. Be evidence-based, fair, concise, and do not invent details. Return valid JSON only, with this shape:
{"total":number,"maxTotal":number,"criteria":{"criterion":{"score":number,"max":number,"reason":string}},"strengths":["..."],"improvements":["..."],"summary":"..."}
Scores must be integers and total must equal the criterion scores. AP Language/Literature criteria: Thesis, Evidence_and_Commentary, Sophistication. APUSH DBQ criteria: Contextualization, Thesis_or_Claim, Evidence_from_Documents, Evidence_Beyond_Documents, Analysis_and_Reasoning. APUSH Long Essay criteria: Thesis_or_Claim, Contextualization, Evidence, Analysis_and_Reasoning.`;

  const prompt = `${rubric}

COURSE: ${payload.course}
ESSAY TYPE: ${payload.essayType}
PROMPT: ${payload.title}
DIRECTIONS: ${payload.directions}

MATERIALS:
${(payload.materials || []).map(([label, text]) => `${label}:\n${text}`).join("\n\n")}

STUDENT ESSAY:
${response}`;

  const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      response_format: { type: "json_object" },
      temperature: 0.2,
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt }
      ]
    })
  });

  const aiBody = await aiResponse.json();
  if (!aiResponse.ok) return json({ error: aiBody.error?.message || "The AI grading provider returned an error." }, 502);

  try {
    const grading = JSON.parse(aiBody.choices?.[0]?.message?.content || "{}");
    if (!grading?.criteria || typeof grading !== "object" || !Array.isArray(grading.strengths) || !Array.isArray(grading.improvements)) {
      throw new Error("Invalid grading shape.");
    }
    const maxTotal = payload.course === "AP United States History"
      && /DBQ|document-based/i.test(payload.essayType || "") ? 7 : 6;
    const criteria: Record<string, { score: number; max: number; reason: string }> = {};
    let total = 0;

    for (const [criterion, raw] of Object.entries(grading.criteria)) {
      const value = raw as { score?: number; max?: number; reason?: string };
      const max = Number.isInteger(value.max) ? Math.max(0, value.max as number) : 0;
      const score = Number.isInteger(value.score) ? Math.min(Math.max(0, value.score as number), max) : 0;
      criteria[criterion] = {
        score,
        max,
        reason: typeof value.reason === "string" ? value.reason : "No explanation was provided."
      };
      total += score;
    }

    return json({
      total: Math.min(total, maxTotal),
      maxTotal,
      criteria,
      strengths: grading.strengths.map(String).slice(0, 6),
      improvements: grading.improvements.map(String).slice(0, 6),
      summary: typeof grading.summary === "string" ? grading.summary : ""
    });
  } catch {
    return json({ error: "The AI grading provider returned an invalid response." }, 502);
  }
});
