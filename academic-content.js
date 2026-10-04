function _makeQuestions(course, unit, prefix, rows) {
  return rows.map((row, i) => ({
    id: `${prefix}-${String(i + 1).padStart(2, "0")}`,
    course, unit, text: row[0], answers: row[1], correct: row[2], explain: row[3]
  }));
}

function _makeFrqs(prefix, rows) {
  return rows.map((row, i) => ({
    id: `${prefix}-${String(i + 1).padStart(2, "0")}`,
    title: row[0], scenario: row[1],
    parts: row[2].map((part, j) => ({
      label: String.fromCharCode(97 + j), prompt: part[0], rubric: part[1], solution: part[2]
    }))
  }));
}

const unitQuestionBank = {
  "AP Physics 1": {
    "Unit 1 Kinematics": _makeQuestions("AP Physics 1", "Unit 1 Kinematics", "PHY-KIN", [
      ["A cart moves from x=2 m to x=14 m in 4 s. Its average velocity is", ["3 m/s","4 m/s","12 m/s","16 m/s"], 0, "Average velocity is displacement divided by elapsed time: (14−2)/4=3 m/s."],
      ["A runner completes one lap of a 400 m track in 80 s. Which is true for the lap?", ["Average speed and velocity are both zero","Average speed is 5 m/s; average velocity is zero","Average speed is zero; average velocity is 5 m/s","Both averages are 5 m/s"], 1, "Distance is 400 m, but net displacement is zero."],
      ["A position-time graph is a straight line with slope −2 m/s. The object", ["Moves in the negative direction at constant velocity","Has acceleration −2 m/s²","Is at rest","Moves in the positive direction while slowing"], 0, "The graph's constant negative slope is the velocity."],
      ["A ball's velocity changes from 3 m/s east to 9 m/s east in 2 s. Its acceleration is", ["3 m/s² east","6 m/s² east","3 m/s east","12 m/s² east"], 0, "a=Δv/Δt=(9−3)/2=3 m/s² east."],
      ["A dropped object starts from rest. Ignoring air resistance, its speed after 3 s is closest to", ["3 m/s","9.8 m/s","29 m/s","44 m/s"], 2, "v=gt≈9.8(3)=29.4 m/s."],
      ["A car moving east brakes with acceleration west. During braking its", ["Velocity and acceleration point east","Speed increases","Velocity points east while speed decreases","Displacement must point west"], 2, "Opposite velocity and acceleration reduce the speed."],
      ["A ball is tossed vertically upward. At the instant it reaches its highest point, its", ["Velocity and acceleration are both zero","Velocity is zero and acceleration is downward","Velocity is upward and acceleration is zero","Velocity is downward and acceleration is downward"], 1, "Only the instantaneous vertical velocity is zero; gravity remains."],
      ["A cyclist travels 30 m east, then 40 m west. The magnitude of displacement is", ["10 m","35 m","40 m","70 m"], 0, "Taking east as positive gives net displacement 30−40=−10 m."],
      ["For constant acceleration, a velocity-time graph has slope 2.5 m/s² and initial velocity 4 m/s. At t=4 s velocity is", ["6.5 m/s","10 m/s","14 m/s","16 m/s"], 2, "v=v₀+at=4+2.5(4)=14 m/s."],
      ["An object moves with v=2t−6 (SI units). It changes direction at", ["t=0 s","t=2 s","t=3 s","t=6 s"], 2, "Direction changes when velocity crosses zero: 2t−6=0."],
      ["A displacement-time graph curves upward with increasingly steep positive slope. The object has", ["Negative velocity and positive acceleration","Positive velocity and positive acceleration","Constant velocity","Zero acceleration"], 1, "The positive slope is increasing, indicating positive velocity and acceleration."],
      ["A stone is launched horizontally from a cliff. Neglecting air resistance, its horizontal acceleration is", ["Zero","g downward","g horizontally","Dependent on launch speed"], 0, "Gravity acts vertically, so horizontal velocity stays constant."],
      ["Two objects are dropped together from the same height in a vacuum. Which reaches the ground first?", ["The heavier one","The lighter one","They arrive together","Cannot be determined without their masses"], 2, "Both have the same gravitational acceleration."],
      ["A car covers 100 m in 5 s and then 100 m in 10 s along the same straight road. Its average speed is", ["10 m/s","13.3 m/s","15 m/s","20 m/s"], 1, "Total distance/time=200/15≈13.3 m/s."],
      ["A velocity-time graph encloses signed area −12 m between 0 and 4 s. The displacement is", ["−12 m","−3 m","3 m","12 m"], 0, "Signed area under a velocity-time graph equals displacement."]
    ]),
    "Unit 2 Dynamics": _makeQuestions("AP Physics 1", "Unit 2 Dynamics", "PHY-DYN", [
      ["A 3 kg sled has net force 12 N east. Its acceleration is", ["4 m/s² east","9 m/s² east","15 m/s² east","36 m/s² east"], 0, "Newton's second law gives a=Fnet/m=12/3=4 m/s²."],
      ["A book rests on a table. The book's weight and the table's normal force", ["Are a third-law pair","Act on different objects","Balance on the book but are not a third-law pair","Must differ in magnitude"], 2, "Both act on the book; third-law forces act on separate objects."],
      ["A 5 kg crate is pulled right by 30 N while friction is 10 N left. Its acceleration is", ["2 m/s² right","4 m/s² right","6 m/s² right","8 m/s² left"], 1, "Fnet=20 N, so a=20/5=4 m/s² right."],
      ["A block remains at rest while a horizontal 8 N push is applied. Static friction is", ["0 N","8 N opposite the push","Greater than 8 N","8 N in the push direction"], 1, "Static friction adjusts to balance the push up to its maximum."],
      ["A passenger leans forward when a bus stops suddenly because the passenger's body tends to", ["Increase its mass","Continue moving forward","Move backward relative to the road","Experience a forward gravitational force"], 1, "Inertia resists the change in the passenger's motion."],
      ["A 2 kg object and a 6 kg object experience the same net force. Compared with the 6 kg object's acceleration, the 2 kg object's is", ["One-third as large","Equal","Three times as large","Nine times as large"], 2, "Acceleration is inversely proportional to mass for fixed force."],
      ["A person pushes a wall with 50 N. The wall exerts on the person", ["No force if the wall stays still","50 N in the opposite direction","50 N in the same direction","A force determined by the person's mass"], 1, "Newton's third law gives equal-magnitude opposite forces on different objects."],
      ["A box slides at constant velocity across a level floor while pulled horizontally. The pull's magnitude is", ["Less than kinetic friction","Equal to kinetic friction","Greater than its weight","Zero"], 1, "Zero acceleration requires zero net horizontal force."],
      ["A 10 kg elevator accelerates upward at 2 m/s². Its floor's normal force is (g=10 m/s²)", ["80 N","100 N","120 N","200 N"], 2, "N−mg=ma, so N=10(10+2)=120 N."],
      ["A hanging lamp is at rest on two identical vertical cords. Each cord's tension is", ["mg","mg/2","2mg","Zero"], 1, "The two upward tensions together balance the lamp's weight."],
      ["A horizontal force is increased on a crate but it remains at rest. The static friction force", ["Remains zero","Increases to match the force","Is always at its maximum","Reverses direction"], 1, "Static friction balances the applied force while equilibrium persists."],
      ["A 4 kg object experiences forces 18 N east and 6 N west. Its acceleration is", ["3 m/s² east","4.5 m/s² east","6 m/s² west","24 m/s² east"], 0, "Net force is 12 N east; a=12/4=3 m/s²."],
      ["On an ideal frictionless incline, the component of a block's weight parallel to the surface is", ["mg cosθ down the slope","mg sinθ down the slope","mg upward","Zero for any incline"], 1, "Resolving weight along the incline gives mg sinθ."],
      ["A 1 kg object is in free fall near Earth. The magnitude of its gravitational force is about", ["0.10 N","1.0 N","9.8 N","98 N"], 2, "Weight=mg≈1(9.8)=9.8 N."],
      ["A box rests on a horizontal floor. If its weight is 40 N and no other vertical force acts, the normal force is", ["0 N","20 N","40 N","80 N"], 2, "Vertical equilibrium requires the normal force to equal the weight."]
    ]),
    "Unit 3 Circular Motion & Gravitation": _makeQuestions("AP Physics 1", "Unit 3 Circular Motion & Gravitation", "PHY-CIR", [
      ["A car rounds a curve at constant speed. Its acceleration points", ["Along its velocity","Toward the curve's center","Away from the center","Opposite its velocity"], 1, "Centripetal acceleration changes direction and points inward."],
      ["A 2 kg mass moves at 6 m/s in a circle of radius 3 m. Its centripetal force is", ["4 N","12 N","24 N","72 N"], 2, "F=mv²/r=2(36)/3=24 N."],
      ["If a satellite's orbital radius doubles while its speed is unchanged, its centripetal acceleration becomes", ["Twice as large","Half as large","Four times as large","Unchanged"], 1, "a_c=v²/r, so doubling r halves the acceleration."],
      ["An object completes 5 revolutions in 10 s. Its period is", ["0.5 s","2 s","5 s","50 s"], 1, "One revolution takes 10/5=2 s."],
      ["For uniform circular motion, the net force does no work because it is", ["Zero","Perpendicular to instantaneous displacement","Parallel to velocity","Equal to the weight"], 1, "The radial force is perpendicular to the tangential motion."],
      ["Two masses attract gravitationally. If their separation triples, the force becomes", ["One-third","One-sixth","One-ninth","Nine times"], 2, "Newton's law gives F∝1/r²."],
      ["A planet is in a circular orbit around a star. The force providing centripetal acceleration is", ["The planet's thrust","The star's gravitational force","The planet's normal force","A force outward from the orbit"], 1, "Gravity supplies the inward net force."],
      ["A 0.5 kg ball on a 2 m string moves at 4 m/s. String tension providing centripetal force is", ["1 N","4 N","8 N","16 N"], 1, "mv²/r=0.5(16)/2=4 N."],
      ["At the same orbital radius around Earth, a satellite with greater mass has", ["Greater orbital speed","Smaller orbital speed","The same orbital speed","Zero gravitational acceleration"], 2, "For a circular orbit, v=√(GM/r), independent of satellite mass."],
      ["A vehicle travels around a flat curve. Which change most increases required centripetal force?", ["Halving speed","Doubling speed","Doubling curve radius","Halving vehicle mass"], 1, "F_c=mv²/r; doubling speed quadruples the required force."],
      ["A planet's gravitational field strength at distance 2R from its center is", ["g/2","g/4","2g","4g"], 1, "Gravitational field strength decreases with inverse square of distance."],
      ["A rotating platform's edge has radius 2 m and period 4 s. Its speed is", ["π/2 m/s","π m/s","2π m/s","4π m/s"], 1, "v=2πr/T=4π/4=π m/s."],
      ["A ball is swung in a vertical circle. At the top, the inward direction is", ["Upward","Downward","Horizontal","Along the ball's velocity"], 1, "The circle's center is below the ball at the top."],
      ["For a circular orbit, the relationship between orbital speed v, radius r, and period T is", ["v=2πr/T","v=T/2πr","v=2πT/r","v=rT"], 0, "One circumference is traveled in one period."],
      ["If the net inward force on a rotating object suddenly vanishes, it moves", ["Radially outward","In a straight line tangent to the circle","In a smaller circle","At rest"], 1, "It continues with its instantaneous tangential velocity."]
    ]),
    "Unit 4 Energy": _makeQuestions("AP Physics 1", "Unit 4 Energy", "PHY-ENE", [
      ["A 10 N force moves a box 3 m in the force's direction. Work done is", ["3.3 J","13 J","30 J","300 J"], 2, "W=Fd=10(3)=30 J."],
      ["A 2 kg cart moving at 5 m/s has kinetic energy", ["10 J","25 J","50 J","100 J"], 1, "K=½mv²=½(2)(25)=25 J."],
      ["A 3 kg object is lifted 4 m. Its gravitational potential energy gain (g=10 m/s²) is", ["12 J","30 J","120 J","300 J"], 2, "ΔUg=mgh=3(10)(4)=120 J."],
      ["A constant force perpendicular to an object's displacement does", ["Positive work","Negative work","Zero work","Work equal to its magnitude"], 2, "W=Fd cos90°=0."],
      ["A spring with k=200 N/m is compressed 0.10 m. Stored elastic energy is", ["0.1 J","1 J","2 J","20 J"], 1, "Us=½kx²=½(200)(0.01)=1 J."],
      ["A 1 kg ball falls from rest through 5 m with negligible air resistance. Its speed just before impact (g=10) is", ["5 m/s","10 m/s","25 m/s","50 m/s"], 1, "mgh=½mv² gives v=√(2gh)=10 m/s."],
      ["A motor transfers 600 J of energy in 3 s. Its average power is", ["200 W","300 W","600 W","1800 W"], 0, "Power=energy/time=600/3=200 W."],
      ["A block slides down a frictionless ramp from height h. At the bottom its kinetic energy is", ["mgh","½mgh","2mgh","Zero"], 0, "Gravitational potential energy converts to kinetic energy."],
      ["A 4 kg cart's speed increases from 2 to 4 m/s. Net work on it is", ["12 J","24 J","32 J","48 J"], 1, "Net work=ΔK=½(4)(16−4)=24 J."],
      ["A friction force acts on a sliding object. The object's mechanical energy", ["Must be conserved","Decreases as thermal energy is produced","Increases by the friction work","Cannot change"], 1, "Kinetic friction transforms mechanical energy into thermal energy."],
      ["A force-versus-position graph is a horizontal line at 5 N from x=0 to 4 m. The work is", ["1.25 J","9 J","20 J","40 J"], 2, "Work equals the area under the graph: 5×4=20 J."],
      ["Two identical balls are raised to heights h and 3h. Their gravitational potential energies compare as", ["1:3","1:9","3:1","Equal"], 0, "Ug=mgh, so the ratio follows the height ratio."],
      ["A 2 kg object moving at 3 m/s is brought to rest. The work done by the net force is", ["−9 J","−6 J","6 J","9 J"], 0, "W=ΔK=0−½(2)(9)=−9 J."],
      ["A 100 W device operates for 20 s. It transfers", ["5 J","120 J","2000 J","20 000 J"], 2, "Energy=Pt=100(20)=2000 J."],
      ["A box is pushed at constant speed across a floor. The applied force's work is", ["Positive and balances friction's negative work","Zero because speed is constant","Negative","Equal to the change in kinetic energy"], 0, "The net work is zero, though individual forces do nonzero work."]
    ]),
    "Unit 5 Momentum": _makeQuestions("AP Physics 1", "Unit 5 Momentum", "PHY-MOM", [
      ["A 2 kg cart moves at 3 m/s east. Its momentum is", ["1.5 kg·m/s east","5 kg·m/s east","6 kg·m/s east","9 kg·m/s east"], 2, "p=mv=2(3)=6 kg·m/s east."],
      ["A 4 N force acts for 3 s. The impulse magnitude is", ["1.3 N·s","7 N·s","12 N·s","24 N·s"], 2, "J=FΔt=4(3)=12 N·s."],
      ["An isolated system contains two colliding carts. Which quantity is conserved?", ["Each cart's momentum separately","Total momentum","Each cart's kinetic energy","The velocity of each cart"], 1, "Internal forces cannot change the system's total momentum."],
      ["A 1 kg cart at 4 m/s sticks to a stationary 3 kg cart. Their final speed is", ["0.5 m/s","1 m/s","3 m/s","4 m/s"], 1, "Momentum conservation gives v=4/(1+3)=1 m/s."],
      ["A force-time graph forms a triangle of height 10 N and base 0.4 s. Impulse is", ["0.4 N·s","2 N·s","4 N·s","10 N·s"], 1, "Impulse is the triangular area ½(0.4)(10)=2 N·s."],
      ["A ball rebounds from a wall with the same speed in the opposite direction. Its momentum change magnitude is", ["Zero","mv","2mv","4mv"], 2, "The velocity reverses, so Δp=−mv−mv has magnitude 2mv."],
      ["For a fixed momentum change, increasing collision time causes average force to", ["Increase","Decrease","Stay necessarily zero","Reverse direction"], 1, "Favg=Δp/Δt."],
      ["A 2 kg cart at 5 m/s catches a 3 kg cart at 1 m/s moving the same way. If they couple, final speed is", ["1.8 m/s","2.6 m/s","3.0 m/s","4.0 m/s"], 1, "Total momentum is 13 kg·m/s; divide by 5 kg."],
      ["In a perfectly elastic collision, which are conserved for the system?", ["Momentum only","Kinetic energy only","Momentum and kinetic energy","Neither"], 2, "Elastic collisions conserve both total momentum and kinetic energy."],
      ["A 0.2 kg ball's velocity changes from 10 m/s east to 5 m/s west. Its momentum change is", ["1 kg·m/s west","1 kg·m/s east","3 kg·m/s west","3 kg·m/s east"], 2, "Δp=0.2(−5−10)=−3 kg·m/s, west."],
      ["A stationary object explodes into two pieces in an isolated system. The pieces' momenta are", ["Equal and opposite","Both zero","Equal and same direction","Unrelated"], 0, "Initial momentum is zero, so the vector sum after separation is zero."],
      ["A 50 kg skater pushes a 75 kg skater. If the first skater moves left, the second", ["Moves left faster","Moves right","Remains stationary","Moves right with equal speed"], 1, "The interaction forces are opposite; both recoil in opposite directions."],
      ["A 0.5 kg ball experiences a 6 N average force for 0.25 s from rest. Final speed is", ["1.5 m/s","3 m/s","6 m/s","12 m/s"], 1, "Impulse=1.5 kg·m/s equals final momentum; v=3 m/s."],
      ["A moving cart collides with an identical stationary cart and they stick. The pair's final speed is", ["The initial cart's speed","Half the initial speed","Twice the initial speed","Zero"], 1, "Momentum divides by twice the original mass."],
      ["A 2 kg object has momentum 12 kg·m/s. Its kinetic energy is", ["12 J","24 J","36 J","72 J"], 2, "K=p²/(2m)=144/4=36 J."]
    ]),
    "Unit 6 Simple Harmonic Motion": _makeQuestions("AP Physics 1", "Unit 6 Simple Harmonic Motion", "PHY-SHM", [
      ["For ideal simple harmonic motion, acceleration is", ["Constant and outward","Proportional to displacement and opposite it","Proportional to velocity","Zero at equilibrium only"], 1, "a=−ω²x."],
      ["A mass-spring oscillator has k=100 N/m and m=1 kg. Its angular frequency is", ["5 rad/s","10 rad/s","50 rad/s","100 rad/s"], 1, "ω=√(k/m)=10 rad/s."],
      ["At the equilibrium position of a frictionless oscillator, its", ["Speed is maximum and acceleration is zero","Speed and acceleration are both maximum","Speed is zero","Potential energy is maximum"], 0, "The restoring force vanishes at x=0 while kinetic energy peaks."],
      ["At maximum displacement in SHM, the oscillator's velocity is", ["Maximum","Zero","Equal to its acceleration","Directed toward the center with maximum magnitude"], 1, "The mass momentarily turns around at each endpoint."],
      ["A spring oscillator's period is doubled by changing its mass while k is fixed. The mass must be multiplied by", ["2","4","√2","1/2"], 1, "T∝√m, so doubling T requires four times the mass."],
      ["For a small-angle pendulum, which change increases its period?", ["Increase bob mass","Increase string length","Increase amplitude slightly","Use a denser bob"], 1, "T=2π√(L/g); greater length increases period."],
      ["An oscillator's total mechanical energy is 8 J. At a point where potential energy is 3 J, kinetic energy is", ["3 J","5 J","8 J","11 J"], 1, "K+U=8 J."],
      ["A spring's maximum displacement is doubled with the same mass and spring. Its period", ["Doubles","Halves","Remains unchanged","Quadruples"], 2, "Ideal spring period depends on mass and stiffness, not amplitude."],
      ["A pendulum is taken from Earth to a location with smaller g. Its period", ["Decreases","Increases","Stays the same","Becomes zero"], 1, "T∝1/√g."],
      ["The restoring force for a spring displaced +x is", ["+kx","−kx","−k/x","Zero"], 1, "Hooke's law directs the force toward equilibrium."],
      ["A spring-mass system has period 2 s. Its frequency is", ["0.25 Hz","0.5 Hz","2 Hz","4 Hz"], 1, "f=1/T=0.5 Hz."],
      ["At the endpoints of ideal SHM, acceleration magnitude is", ["Zero","Maximum","Equal to velocity magnitude","Constant over the cycle"], 1, "a=−ω²x, so its magnitude is greatest at maximum |x|."],
      ["A 0.25 kg mass on a spring with k=4 N/m has a period closest to", ["0.79 s","1.57 s","3.14 s","6.28 s"], 1, "T=2π√(0.25/4)=π/2≈1.57 s."],
      ["If the spring constant is increased by a factor of 4, a spring oscillator's period becomes", ["4T","2T","T/2","T/4"], 2, "T∝1/√k."],
      ["A displacement-time graph of SHM is sinusoidal. The acceleration at a positive displacement is", ["Positive","Negative","Zero","Not related to displacement"], 1, "Acceleration points opposite displacement."]
    ])
  },
  "AP Biology": {
    "Unit 1 Chemistry of Life": _makeQuestions("AP Biology", "Unit 1 Chemistry of Life", "BIO-CHE", [
      ["A mutation replaces a nonpolar amino acid in a protein's interior with a charged residue. Which effect is most likely?", ["Altered folding from disrupted hydrophobic interactions","No effect because amino acids are identical","DNA becomes double stranded","The protein gains a lipid bilayer"], 0, "A charged side chain is unfavorable in a hydrophobic core and may alter folding."],
      ["Water molecules cohere because of", ["Ionic bonds between oxygen atoms","Hydrogen bonds between partial charges","Peptide bonds","Covalent bonds between separate molecules"], 1, "Partial charges allow intermolecular hydrogen bonding."],
      ["A solution at pH 3 has how many times the hydrogen ion concentration of pH 5 solution?", ["2","10","100","1000"], 2, "Each pH unit is a tenfold change; two units give 100-fold."],
      ["Hydrolysis of a disaccharide generally", ["Joins monomers while releasing water","Uses water to break a covalent bond","Produces amino acids only","Removes all oxygen atoms"], 1, "Water is added across the bond during cleavage."],
      ["The primary structure of a protein is its", ["Overall 3-D shape","Amino acid sequence","Arrangement of subunits","Pattern of alpha helices"], 1, "Primary structure is the linear amino acid sequence."],
      ["A phospholipid is amphipathic because it has", ["Two hydrophobic heads","A polar head and nonpolar tails","Only charged tails","A sugar and peptide chain"], 1, "The phosphate-containing head is hydrophilic; fatty acid tails are hydrophobic."],
      ["An enzyme's active site binds a substrate mainly through", ["Permanent covalent attachment in every reaction","Complementary chemical interactions and shape","DNA base pairing","Ionic bonds only"], 1, "A substrate fits through multiple weak, specific interactions."],
      ["Compared with a solution at pH 7, a solution at pH 6 has", ["One-tenth as much H+","Ten times as much H+","One hundred times less H+","The same H+"], 1, "One pH-unit decrease corresponds to a tenfold H+ increase."],
      ["A carbon atom can form four covalent bonds because it has", ["Four valence electrons available for sharing","Four electron shells","Four protons beyond oxygen","No valence electrons"], 0, "Carbon's four valence electrons permit four shared pairs."],
      ["A protein loses its functional shape after extreme heat. This most directly reflects disruption of", ["Its amino acid sequence","Interactions stabilizing higher-order structure","Peptide bonds in every case","The genetic code"], 1, "Heat often disrupts noncovalent interactions while leaving primary sequence intact."],
      ["Which molecule is a nucleotide polymer?", ["Glycogen","DNA","Triglyceride","Collagen"], 1, "DNA is a polymer made of nucleotide monomers."],
      ["A triglyceride contains", ["Glycerol and three fatty acids","Three amino acids and glycerol","Glucose and phosphate","A nucleotide and two sugars"], 0, "Triglycerides consist of glycerol esterified to three fatty acids."],
      ["The high specific heat of water helps organisms by", ["Making water change temperature slowly","Preventing hydrogen bonds","Making ice denser than liquid","Increasing all reaction rates"], 0, "Energy is needed to disrupt water interactions, buffering temperature changes."],
      ["A buffer limits pH change by", ["Destroying all H+ ions","Reversibly accepting or donating H+","Making water nonpolar","Removing every weak acid"], 1, "A conjugate acid-base pair responds to added acid or base."],
      ["The sequence of amino acids is encoded by the sequence of", ["Fatty acids","Nucleotides in DNA","Monosaccharides","Phospholipids"], 1, "DNA nucleotide order determines the encoded protein sequence."]
    ]),
    "Unit 2 Cell Structure & Function": _makeQuestions("AP Biology", "Unit 2 Cell Structure & Function", "BIO-CEL", [
      ["A cell specialized to secrete large amounts of protein would be especially rich in", ["Rough ER and Golgi apparatus","Lysosomes only","Chloroplasts","Centrioles only"], 0, "Rough ER synthesizes secreted proteins; Golgi modifies and packages them."],
      ["A membrane's hydrophobic core most directly impedes passage of", ["Small nonpolar molecules","O₂","Charged ions","Steroid hormones"], 2, "Charged particles need channels or transporters to cross the nonpolar core."],
      ["A cell placed in a hypertonic solution will usually", ["Gain water and swell","Lose water and shrink","Maintain volume because solutes diffuse out","Burst immediately"], 1, "Water moves toward the higher solute concentration."],
      ["Which transport process requires ATP directly?", ["O₂ diffusion through bilayer","Facilitated diffusion down gradient","Na+/K+ pump moving ions uphill","Water osmosis"], 2, "The pump uses ATP to move ions against electrochemical gradients."],
      ["The nucleolus is the site of", ["Ribosomal RNA production and ribosome assembly","Lipid digestion","ATP synthesis","Chromosome segregation"], 0, "Ribosomal subunits are assembled in the nucleolus."],
      ["A cell with abundant mitochondria likely has high demand for", ["ATP production by aerobic respiration","Lipid storage only","DNA export","Cell wall synthesis"], 0, "Mitochondria generate ATP through oxidative metabolism."],
      ["The surface-area-to-volume ratio decreases as a spherical cell's radius", ["Decreases","Increases","Stays fixed","Becomes negative"], 1, "Area scales as r² while volume scales as r³."],
      ["A membrane protein that binds a hormone and initiates intracellular signaling is a", ["Receptor","Phospholipid","Ribosome","Cellulose fiber"], 0, "Receptors recognize signals and trigger responses."],
      ["Prokaryotic cells differ from eukaryotic cells because prokaryotes", ["Lack a membrane-bound nucleus","Lack ribosomes","Always lack DNA","Have mitochondria"], 0, "Prokaryotic DNA is not enclosed by a nuclear membrane."],
      ["A plant cell's central vacuole contributes directly to", ["Turgor pressure and storage","Ribosome translation","Chromosome replication","Oxidative phosphorylation"], 0, "Water-filled vacuoles press against the cell wall."],
      ["A secretory vesicle fuses with the plasma membrane. This is", ["Endocytosis","Exocytosis","Osmosis","Simple diffusion"], 1, "Exocytosis exports vesicle contents outside the cell."],
      ["A drug blocks microtubule polymerization. Which process is most directly impaired?", ["Mitotic spindle formation","Glycolysis","DNA base pairing","Lipid bilayer assembly"], 0, "Spindle microtubules separate chromosomes."],
      ["A solute moves through a channel protein from high to low concentration. The process is", ["Active transport","Facilitated diffusion","Endocytosis","Exocytosis"], 1, "Channel-mediated movement down a gradient requires no direct ATP."],
      ["Which feature supports the endosymbiotic origin of mitochondria?", ["They contain circular DNA and bacterial-like ribosomes","They have no membranes","They form by protein translation","They are found only in plants"], 0, "Mitochondrial genetic and ribosomal features resemble bacteria."],
      ["A cell wall primarily provides", ["Structural support and protection","Selective passage of all molecules","ATP storage","Hormone synthesis"], 0, "Walls resist expansion and help maintain cell shape."]
    ]),
    "Unit 3 Cellular Energetics": _makeQuestions("AP Biology", "Unit 3 Cellular Energetics", "BIO-ENE", [
      ["An enzyme lowers activation energy by", ["Changing ΔG of the reaction","Stabilizing the transition state","Being consumed as a reactant","Increasing product free energy"], 1, "Catalysis provides a lower-energy pathway without changing ΔG."],
      ["In aerobic respiration, most ATP is produced by", ["Glycolysis","Oxidative phosphorylation","The Calvin cycle","Fermentation"], 1, "The electron transport chain and chemiosmosis make most ATP."],
      ["During glycolysis, one glucose molecule yields a net", ["1 ATP and 2 NADH","2 ATP and 2 NADH","4 ATP and no NADH","36 ATP"], 1, "Glycolysis invests and produces ATP for a net two, plus two NADH."],
      ["Oxygen's role in aerobic cellular respiration is to", ["Donate carbon to glucose","Accept electrons at the end of the electron transport chain","Make ATP directly in glycolysis","Split pyruvate"], 1, "O₂ is the terminal electron acceptor and forms water."],
      ["A plant's light reactions occur in the", ["Thylakoid membrane","Mitochondrial matrix","Cytosol","Nuclear envelope"], 0, "Photosystems and electron transport components are embedded in thylakoids."],
      ["The Calvin cycle uses ATP and NADPH to", ["Fix CO₂ into carbohydrate precursors","Split water to release oxygen","Oxidize glucose","Pump protons into mitochondria"], 0, "It reduces fixed carbon using light-reaction products."],
      ["A competitive inhibitor often reduces enzyme activity because it", ["Binds the active site and competes with substrate","Destroys substrate molecules","Raises temperature","Permanently changes DNA"], 0, "Substrate and inhibitor compete for active-site occupancy."],
      ["Fermentation allows glycolysis to continue by regenerating", ["NAD+","O₂","FADH₂","Glucose"], 0, "It oxidizes NADH to restore NAD+."],
      ["An uncoupler makes the inner mitochondrial membrane permeable to protons. ATP production falls because", ["The proton gradient dissipates","Glycolysis stops directly","Oxygen is no longer needed","The matrix becomes more acidic than the intermembrane space"], 0, "Chemiosmosis needs a proton-motive force."],
      ["A reaction with negative ΔG is", ["Exergonic and thermodynamically favorable","Endergonic","At equilibrium necessarily","Impossible to catalyze"], 0, "Negative free-energy change indicates energy release and spontaneity."],
      ["In photosynthesis, the O₂ released comes from", ["CO₂","Glucose","H₂O","Chlorophyll"], 2, "Water splitting supplies electrons and releases molecular oxygen."],
      ["At high temperature, an enzyme's rate may decline because", ["Its active-site structure can denature","Substrates stop moving","The reaction's ΔG must become positive","Enzyme concentration becomes zero"], 0, "Heat can disrupt the interactions maintaining native structure."],
      ["The electron transport chain creates an H+ gradient by", ["Pumping protons across a membrane","Hydrolyzing glucose in the cytosol","Breaking ATP outside mitochondria","Reducing CO₂"], 0, "Electron energy drives proton pumping across the inner membrane."],
      ["If CO₂ concentration limits photosynthesis, adding more light alone may", ["Have little effect on rate","Always double carbon fixation","Stop respiration","Increase CO₂ supply"], 0, "A different limiting resource constrains the response."],
      ["ATP hydrolysis can drive an unfavorable reaction through", ["Energy coupling","Denaturation","Osmosis","Competitive inhibition"], 0, "Coupling makes the combined free-energy change favorable."]
    ]),
    "Unit 4 Cell Communication & Cell Cycle": _makeQuestions("AP Biology", "Unit 4 Cell Communication & Cell Cycle", "BIO-COM", [
      ["A steroid hormone can often cross the plasma membrane and bind", ["An intracellular receptor","A ribosome on the outer membrane","DNA polymerase in blood","A cell-wall receptor"], 0, "Lipophilic steroids diffuse through membranes to intracellular receptors."],
      ["A signal transduction cascade amplifies a signal when", ["One activated molecule activates many downstream molecules","A receptor is removed before binding","The signal stays outside","Every step consumes the signal irreversibly"], 0, "One component can activate multiple copies of the next component."],
      ["A cell lacking a receptor for a hormone will most likely", ["Fail to respond despite hormone presence","Respond more strongly","Produce the hormone automatically","Divide in every case"], 0, "Specific receptor recognition is required for the signaling response."],
      ["Cyclins regulate the cell cycle by", ["Activating cyclin-dependent kinases at specific times","Destroying chromosomes","Replicating DNA themselves","Forming the cell membrane"], 0, "Cyclin abundance controls CDK activity and cell-cycle transitions."],
      ["DNA replication occurs during", ["G₁","S phase","G₂","M phase"], 1, "The S phase is when DNA is synthesized."],
      ["A checkpoint detects unreplicated DNA before mitosis. The likely response is", ["Delay progression until replication is complete","Immediate cytokinesis","Chromosome degradation","Permanent activation of all CDKs"], 0, "Checkpoints prevent division before essential processes finish."],
      ["In apoptosis, a damaged cell", ["Activates a regulated cell-death program","Always becomes cancerous","Undergoes meiosis","Stops all gene expression first"], 0, "Apoptosis removes cells in a controlled manner."],
      ["A ligand binds a receptor tyrosine kinase and causes receptor dimerization. This can initiate", ["Phosphorylation signaling","DNA translation","Osmosis","Chromosome crossing over"], 0, "Dimerization activates kinase domains and downstream pathways."],
      ["A gap-junction connection between animal cells permits", ["Direct passage of small signaling molecules between cells","Transfer of chromosomes","Secretion of all proteins","Fusion of nuclei"], 0, "Gap junctions form channels between neighboring cytoplasms."],
      ["A mutation causes a growth-promoting signaling protein to remain active without ligand. This may", ["Drive excess cell division","Block all DNA synthesis","Increase apoptosis necessarily","Prevent receptor formation"], 0, "Constitutive growth signaling can bypass normal controls."],
      ["During mitosis, sister chromatids separate in", ["Prophase","Metaphase","Anaphase","Telophase"], 2, "Anaphase pulls sister chromatids toward opposite poles."],
      ["A diploid cell with 2n=8 completes meiosis. Each gamete normally has", ["2 chromosomes","4 chromosomes","8 chromosomes","16 chromosomes"], 1, "Meiosis halves chromosome number."],
      ["A paracrine signal typically acts", ["On nearby cells","Only on the same cell","Across the whole organism through blood","Only inside the nucleus"], 0, "Paracrine signaling affects neighboring cells locally."],
      ["A cell in G₀ is", ["Not actively progressing through the cell cycle","Replicating DNA","In metaphase","Completing cytokinesis"], 0, "G₀ is a quiescent state outside active cycle progression."],
      ["A phosphorylation cascade is reversed mainly by", ["Protein phosphatases","DNA ligases","Ribosomes","Cellulose synthases"], 0, "Phosphatases remove phosphate groups from target proteins."]
    ]),
    "Unit 5 Heredity": _makeQuestions("AP Biology", "Unit 5 Heredity", "BIO-HER", [
      ["In a cross Aa×Aa with complete dominance, the expected fraction of offspring showing the recessive phenotype is", ["1/4","1/2","3/4","1"], 0, "Only aa offspring show the recessive phenotype."],
      ["A testcross of an unknown dominant-phenotype individual uses a", ["Homozygous recessive individual","Homozygous dominant individual","Heterozygous individual only","Different species"], 0, "Recessive offspring reveal whether the unknown carries a recessive allele."],
      ["Two genes show 10% recombinant offspring. They are likely", ["On different chromosomes necessarily","Linked relatively close together","The same allele","Both dominant"], 1, "Low recombination frequency indicates close linkage."],
      ["Independent assortment results from random orientation of homologous pairs during", ["Metaphase I","Prophase II","Anaphase II","Cytokinesis"], 0, "Pair orientations at metaphase I generate allele combinations."],
      ["Nondisjunction during meiosis can produce gametes with", ["Abnormal chromosome numbers","Only normal haploid sets","No alleles","Identical DNA sequences"], 0, "Failure to separate chromosomes changes chromosome counts."],
      ["A heterozygous AB/ab individual testcrossed to ab/ab produces many parental types and few recombinants. The genes are", ["Linked","Unlinked","Alleles of one locus","Always sex-linked"], 0, "Excess parental combinations indicate linkage."],
      ["A carrier mother for an X-linked recessive trait and an unaffected father have a son. Probability he is affected is", ["0","1/4","1/2","1"], 2, "A son receives his X chromosome from his mother."],
      ["A trait with a continuous range of values is often influenced by", ["One gene only","Many genes and environment","Mitochondria only","No inherited factors"], 1, "Polygenic and environmental effects create continuous variation."],
      ["A plant with genotype RrYy produces which gametes if genes assort independently?", ["Rr and Yy","RY, Ry, rY, ry equally","RR and yy only","RY only"], 1, "Each allele pair segregates independently into four combinations."],
      ["A red-flowered plant crossed with a white plant produces all pink offspring. This pattern suggests", ["Incomplete dominance","Complete dominance","Codominance","Sex linkage"], 0, "The heterozygote has an intermediate phenotype."],
      ["In codominance, a heterozygote", ["Shows both allele products distinctly","Has an intermediate phenotype only","Expresses neither allele","Is always lethal"], 0, "Both alleles are expressed in the phenotype."],
      ["Crossing over occurs between nonsister chromatids during", ["Prophase I","Metaphase II","Anaphase I","Telophase II"], 0, "Homologous chromosomes pair and exchange segments in prophase I."],
      ["A person with genotype IᴬIᴮ has blood type", ["A","B","AB","O"], 2, "The A and B alleles are codominantly expressed."],
      ["If a dominant allele is rare, a dominant phenotype individual may be", ["Homozygous dominant or heterozygous","Only homozygous dominant","Only heterozygous","Homozygous recessive"], 0, "Phenotype alone does not distinguish the two dominant genotypes."],
      ["A genetic map distance of 12 cM corresponds approximately to", ["12% recombinant offspring","12% affected individuals","88% crossing over in every meiosis","12 genes"], 0, "Map distance estimates recombinant frequency for linked loci."]
    ]),
    "Unit 6 Gene Expression & Regulation": _makeQuestions("AP Biology", "Unit 6 Gene Expression & Regulation", "BIO-GEN", [
      ["During transcription, RNA polymerase reads the DNA template strand", ["3′ to 5′ and synthesizes RNA 5′ to 3′","5′ to 3′ and synthesizes RNA 3′ to 5′","In either direction randomly","Only after translation"], 0, "Polymerases extend RNA in the 5′ to 3′ direction."],
      ["A DNA coding strand has sequence 5′-ATG CCA-3′. The mRNA sequence is", ["5′-AUG CCA-3′","5′-UAC GGU-3′","3′-TAC GGT-5′","5′-ATG CCA-3′"], 0, "Coding-strand sequence matches mRNA except T is replaced by U."],
      ["A tRNA anticodon pairs directly with", ["A codon on mRNA","A promoter on DNA","An amino acid's side chain","A ribosomal protein"], 0, "Anticodon-codon pairing positions the carried amino acid."],
      ["A point mutation changes a codon but not the encoded amino acid. It is", ["Silent","Nonsense","Frameshift","Missense"], 0, "Genetic-code redundancy can make a substitution synonymous."],
      ["Insertion of one nucleotide within a coding sequence usually causes", ["A frameshift downstream of the insertion","Only one amino acid substitution","No possible effect","A larger chromosome"], 0, "A one-base insertion changes the reading frame."],
      ["A eukaryotic pre-mRNA is processed by", ["Capping, polyadenylation, and intron splicing","Removing all exons","Replacing uracil with thymine","Translating before transcription"], 0, "These modifications produce mature mRNA."],
      ["In an inducible operon, the repressor is inactivated when", ["An inducer binds it","A corepressor binds it","RNA polymerase is destroyed","The operator is translated"], 0, "Inducer binding changes repressor shape and permits transcription."],
      ["A mutation in a promoter may reduce gene expression by", ["Reducing RNA polymerase binding","Changing every protein amino acid","Preventing DNA replication globally","Destroying ribosomes"], 0, "Promoters recruit transcription machinery."],
      ["A nonsense mutation is likely to", ["Create a premature stop codon","Replace one amino acid with another only","Leave codon meaning unchanged","Delete a promoter"], 0, "A stop codon can terminate translation early."],
      ["A transcription factor binds an enhancer. The likely effect is", ["Altered transcription rate of a target gene","Direct synthesis of protein","mRNA translation into DNA","Removal of a chromosome"], 0, "Enhancers regulate transcription through DNA-binding proteins."],
      ["Translation terminates when a ribosome encounters", ["A stop codon","A promoter","An intron","A start codon only"], 0, "Release factors recognize stop codons."],
      ["DNA methylation near a eukaryotic promoter often", ["Reduces transcription","Increases translation directly","Changes the DNA base sequence","Creates a new exon"], 0, "Promoter methylation is generally associated with transcriptional repression."],
      ["A cell expresses different genes than a neighboring cell mainly because the cells", ["Use different subsets of regulatory controls","Contain different genetic codes","Have no shared genes","Translate DNA differently"], 0, "Differential regulation produces cell-type-specific expression."],
      ["A gene's coding region is unchanged, but its enhancer is deleted. The most direct expected effect is", ["Altered level or pattern of transcription","A universal frameshift","A new amino acid code","Failure of DNA replication"], 0, "Enhancer loss can reduce or change expression in responsive cells."],
      ["In a DNA molecule, adenine pairs with", ["Cytosine","Guanine","Thymine","Uracil"], 2, "Complementary base pairing pairs A with T in DNA."]
    ])
  },
  "AP Calculus AB": {
    "Unit 1 Limits & Continuity": _makeQuestions("AP Calculus AB", "Unit 1 Limits & Continuity", "CAL-LIM", [
      ["lim(x→2)(x²−4)/(x−2) equals", ["0","2","4","Does not exist"], 2, "Factor to x+2 for x≠2; the limit is 4."],
      ["For f(x)=(x²−1)/(x−1), x≠1, and f(1)=5, f is", ["Continuous at 1","Removable-discontinuous at 1","Infinite-discontinuous at 1","Continuous only if f(1)=2"], 1, "The limiting value is 2, different from the assigned value 5."],
      ["lim(x→0) sin(3x)/x equals", ["0","1","3","Does not exist"], 2, "Rewrite as 3·sin(3x)/(3x)."],
      ["If left and right limits at x=a are 4 and −1, respectively, the two-sided limit", ["Is 4","Is −1","Is 3/2","Does not exist"], 3, "Unequal one-sided limits preclude a two-sided limit."],
      ["lim(x→∞)(5x²−x)/(2x²+7) equals", ["0","5/2","2/5","∞"], 1, "For equal polynomial degrees, take the ratio of leading coefficients."],
      ["A function is continuous at x=3 if", ["f(3) exists only","lim f(x) exists and equals f(3)","f'(3) exists","The graph is increasing"], 1, "Continuity requires a finite matching limit and function value."],
      ["For f(x)=|x|, the derivative at x=0", ["Is 0","Is 1","Is −1","Does not exist"], 3, "The left and right difference-quotient slopes differ."],
      ["lim(x→0)(1−cos x)/x² equals", ["0","1/2","1","Does not exist"], 1, "Using the standard cosine limit, the value is 1/2."],
      ["If lim(x→a)f(x)=7, then lim(x→a)[2f(x)−3] is", ["4","7","11","17"], 2, "Apply limit laws: 2(7)−3=11."],
      ["The function (x²−9)/(x−3) has a hole at x=3. The y-coordinate of the hole is", ["0","3","6","9"], 2, "For x≠3 it simplifies to x+3, approaching 6."],
      ["For g(x)=1/(x−4), as x approaches 4 from the right, g(x)", ["Approaches −∞","Approaches +∞","Approaches 0","Has finite limit 1/4"], 1, "The denominator is small and positive."],
      ["If f is continuous on [−2,5] with f(−2)=−1 and f(5)=4, the Intermediate Value Theorem guarantees", ["A zero only at x=0","Some c with f(c)=2","f is differentiable","Exactly five roots"], 1, "2 lies between the endpoint values."],
      ["lim(x→0)(eˣ−1)/x equals", ["−1","0","1","e"], 2, "This is the derivative of eˣ at zero."],
      ["If f(x)=3 for x<1 and f(x)=x+2 for x≥1, f at x=1 is", ["Continuous, with value 3","Continuous, with value 4","Discontinuous; left limit 3 but f(1)=4","The two-sided limit does not exist"], 0, "The left limit, right limit, and function value are all 3."],
      ["For x>0, lim(x→0+) ln(x) equals", ["−∞","0","+∞","Does not exist finitely but oscillates"], 0, "The logarithm decreases without bound approaching zero from the right."]
    ]),
    "Unit 2 Differentiation": _makeQuestions("AP Calculus AB", "Unit 2 Differentiation", "CAL-DIF", [
      ["Using the limit definition, the derivative of x² at x=3 is", ["3","6","9","12"], 1, "The derivative is 2x, giving 6 at x=3."],
      ["d/dx(4x³−2x) equals", ["12x²−2","4x²−2","12x−2","4x³−2"], 0, "Apply the power rule term by term."],
      ["If f(x)=sin x, f'(π/3) is", ["1/2","√3/2","−1/2","−√3/2"], 0, "f'=cos x, and cos(π/3)=1/2."],
      ["d/dx(eˣ+ln x), for x>0, is", ["eˣ+x","eˣ+1/x","xeˣ","eˣ−1/x"], 1, "Differentiate each term."],
      ["A particle has position s(t)=t³−6t²+2. Its velocity is", ["3t²−12t","t²−12t","3t−12","t³−6t"], 0, "Velocity is ds/dt."],
      ["If f'(x)=0 at every x in an interval, f is", ["Constant on that interval","Strictly increasing","Strictly decreasing","Undefined"], 0, "A differentiable function with zero slope throughout is constant."],
      ["The derivative of 7 is", ["0","1","7","7x"], 0, "The derivative of a constant is zero."],
      ["If y=√x, dy/dx at x=4 is", ["1/2","1/4","2","4"], 1, "y'=1/(2√x), which equals 1/4."],
      ["A function has a horizontal tangent at x=−1 when", ["f(−1)=0","f'(−1)=0","f''(−1)=0","f is undefined at −1"], 1, "A horizontal tangent has slope zero."],
      ["The derivative of cos(2x) is", ["−sin(2x)","−2sin(2x)","2cos(2x)","sin(2x)/2"], 1, "Chain rule multiplies by the inner derivative 2."],
      ["If p(t)=5t−t², the instantaneous rate of change at t=2 is", ["1","3","5","9"], 0, "p'=5−2t, so p'(2)=1."],
      ["A tangent line to y=f(x) at x=a has slope", ["f(a)","f'(a)","a/f(a)","lim f(x)"], 1, "The derivative gives the tangent-line slope."],
      ["For h(x)=x⁴, h''(x) equals", ["4x³","12x²","12x","x²"], 1, "Differentiate twice: h'=4x³, h''=12x²."],
      ["If a differentiable function is decreasing near x=2, its derivative there is generally", ["Positive","Negative","Zero necessarily","Undefined"], 1, "A decreasing function has negative local slopes."],
      ["The derivative of (x+1)(x−2) is", ["2x−1","2x−2","x²−2","x−1"], 0, "Expand to x²−x−2, then differentiate."]
    ]),
    "Unit 3 Composite, Implicit & Inverse Functions": _makeQuestions("AP Calculus AB", "Unit 3 Composite, Implicit & Inverse Functions", "CAL-CMP", [
      ["For y=(3x²+1)⁵, dy/dx is", ["5(3x²+1)⁴","30x(3x²+1)⁴","15x(3x²+1)⁵","30x(3x²+1)⁵"], 1, "Chain rule gives 5(inside)⁴·6x."],
      ["If f(x)=x²+1 and g(x)=sin x, (f∘g)'(x) is", ["2sin x cos x","2x cos x","cos(x²+1)","2sin x"], 0, "f(g(x))=sin²x+1; differentiate by chain rule."],
      ["For x²+y²=25, dy/dx at (3,4) is", ["−3/4","−4/3","3/4","4/3"], 0, "Implicit differentiation gives y'=−x/y."],
      ["If f is invertible, f(a)=b, and f'(a)=5, then (f⁻¹)'(b) is", ["5","1/5","−5","−1/5"], 1, "Inverse derivative is the reciprocal of f'(a)."],
      ["For y=e^(2x), dy/dx is", ["e^(2x)","2e^(2x)","2xe^(2x)","eˣ"], 1, "The chain rule multiplies by 2."],
      ["If y=ln(x²+4), y' equals", ["1/(x²+4)","2x/(x²+4)","2x ln(x²+4)","x/(x²+4)"], 1, "Differentiate ln of the inner expression."],
      ["For x³+y³=9, dy/dx is", ["−x²/y²","−y²/x²","x²/y²","−3x²"], 0, "3x²+3y²y'=0."],
      ["If f(x)=√(1−x), f'(x) is", ["1/[2√(1−x)]","−1/[2√(1−x)]","−√(1−x)/2","−1/√(1−x)"], 1, "Apply the chain rule to the square root."],
      ["Let f(x)=x³+2 and g(x)=4x−1. (f∘g)'(0) equals", ["12","48","−4","−12"], 0, "f'(g(0))g'(0)=3(−1)²(4)=12."],
      ["For y=arctan(3x), dy/dx is", ["1/(1+9x²)","3/(1+9x²)","3/(1+3x²)","−3/(1+9x²)"], 1, "Derivative of arctan(u) is u'/(1+u²)."],
      ["If f(x)=x² on x≥0, the derivative of f⁻¹ at 9 is", ["6","1/6","1/3","1/9"], 1, "f⁻¹(x)=√x, whose derivative at 9 is 1/6."],
      ["For x²+xy+y²=7, dy/dx is", ["−(2x+y)/(x+2y)","−(x+2y)/(2x+y)","(2x+y)/(x+2y)","−2x−y"], 0, "Differentiate: 2x+y+xy'+2yy'=0."],
      ["If y=(sin x)³, y' is", ["3sin²x cos x","3cos²x sin x","cos(3x)","3sin x"], 0, "Outer power and inner sine require the chain rule."],
      ["For y=ln(√x), x>0, y' equals", ["1/x","1/(2x)","1/(2√x)","2/x"], 1, "ln(√x)=½ln x."],
      ["If f'(2)=−4, the slope of the inverse function at x=f(2) is", ["−4","−1/4","4","1/4"], 1, "The inverse derivative is 1/f'(2)."]
    ]),
    "Unit 4 Contextual Applications of Differentiation": _makeQuestions("AP Calculus AB", "Unit 4 Contextual Applications of Differentiation", "CAL-CTX", [
      ["A particle's position is s(t)=t²−4t. Its velocity at t=3 is", ["2","3","6","−2"], 0, "v=2t−4, so v(3)=2."],
      ["Water enters a spherical balloon. If radius increases at 2 cm/s, then dV/dt at r=3 cm is", ["18π","36π","72π","108π"], 2, "V=4πr³/3, so dV/dt=4πr²r'=72π."],
      ["A 10 ft ladder rests against a wall. Its foot moves away at 1 ft/s. When the foot is 6 ft from the wall, the top's downward speed is", ["1/2 ft/s","3/4 ft/s","1 ft/s","4/3 ft/s"], 1, "x²+y²=100 gives y'=-xx'/y=-6/8=-3/4."],
      ["A car's position is s(t)=t³−3t². Its acceleration at t=2 is", ["0","3","6","12"], 2, "a=s''=6t−6, so a(2)=6."],
      ["A 20 cm² rectangle has width x and length 20/x. The area constraint's differential rate is not relevant; if x=4 and dx/dt=1, dL/dt is", ["−5 cm/s","−1.25 cm/s","1.25 cm/s","5 cm/s"], 1, "L=20/x, so L'=−20x'/x²=−1.25."],
      ["A circular oil spill's radius grows at 0.5 m/min. At r=10 m, area grows at", ["5π m²/min","10π m²/min","20π m²/min","100π m²/min"], 1, "A'=2πrr'=10π."],
      ["A particle moves with v(t)=t²−5t+6. On 0<t<2 it is", ["Moving in the positive direction","Moving in the negative direction","At rest throughout","Accelerating negatively throughout"], 0, "v=(t−2)(t−3)>0 in the interval."],
      ["A 12 m rope is pulled through a pulley so one endpoint rises at 0.8 m/s. The other endpoint's speed magnitude is", ["0.4 m/s","0.8 m/s","1.6 m/s","12 m/s"], 1, "The fixed rope length makes endpoint rates equal in magnitude."],
      ["A 5 m tall sensor tracks a cyclist moving directly away at 3 m/s. At ground distance 12 m, the line-of-sight distance changes at", ["5/13 m/s","12/13 m/s","36/13 m/s","3 m/s"], 2, "s²=x²+25, so s'=xx'/s=(12)(3)/13=36/13."],
      ["The linearization of f(x)=√x at x=4 is", ["2+(x−4)/4","2+4(x−4)","4+(x−2)/2","2−(x−4)/4"], 0, "f(4)=2 and f'(4)=1/4."],
      ["A particle has position s(t)=cos t. Its velocity at t=π/2 is", ["−1","0","1","π/2"], 0, "v=−sin t."],
      ["A 3 m by 8 m rectangle has dimensions changing at 0.2 m/s and −0.1 m/s respectively. Its area rate is", ["−1.0 m²/s","−0.4 m²/s","0.1 m²/s","1.3 m²/s"], 3, "A'=x'y+xy'=0.2(8)+3(−0.1)=1.3 m²/s."],
      ["An object has velocity v(t)=4−2t. It changes direction at", ["t=1","t=2","t=4","Never"], 1, "Set velocity equal to zero."],
      ["A cost function is C(q)=q²+100. Marginal cost at q=5 is", ["10","25","100","125"], 0, "C'(q)=2q."],
      ["A particle's acceleration is a(t)=6t. If v(0)=2, then v(2) is", ["8","12","14","16"], 2, "Integrate acceleration: v=2+3t², hence 14."]
    ]),
    "Unit 5 Analytical Applications of Differentiation": _makeQuestions("AP Calculus AB", "Unit 5 Analytical Applications of Differentiation", "CAL-ANA", [
      ["For f(x)=x³−3x, critical numbers are", ["−1 and 1","0 only","−3 and 3","No critical numbers"], 0, "f'=3x²−3=0 at x=±1."],
      ["If f'(x)>0 throughout an interval, f is", ["Decreasing","Increasing","Concave down","Constant"], 1, "Positive derivative means increasing."],
      ["For f(x)=x³, the graph is concave up when", ["x<0","x>0","x=0 only","All x"], 1, "f''=6x is positive for x>0."],
      ["A function changes from increasing to decreasing at x=c. If f'(c)=0, c is a", ["Local maximum","Local minimum","Inflection point necessarily","Vertical asymptote"], 0, "The derivative sign change + to − indicates a local maximum."],
      ["For f(x)=x²−4x on [0,5], the absolute minimum occurs at", ["x=0","x=2","x=4","x=5"], 1, "The vertex x=2 gives f=−4, less than endpoint values."],
      ["If f'' changes from negative to positive at x=a, then f has", ["A local maximum necessarily","An inflection point at a","A vertical tangent","No critical point"], 1, "A concavity change defines an inflection point."],
      ["For f(x)=x⁴−4x², f'(x)=0 at", ["x=0 only","x=±√2 only","x=0 and x=±√2","x=±2"], 2, "f'=4x(x²−2)."],
      ["A differentiable function has a local minimum at c if f' changes", ["Positive to negative","Negative to positive","Positive to positive","Negative to negative"], 1, "The function decreases then increases."],
      ["For f(x)=ln x on x>0, the graph is", ["Increasing and concave down","Decreasing and concave up","Increasing and concave up","Decreasing and concave down"], 0, "f'=1/x>0 and f''=−1/x²<0."],
      ["If f'(x)=(x−2)(x+1), f decreases on", ["(−∞,−1)","(−1,2)","(2,∞)","All real x"], 1, "The derivative is negative between its roots."],
      ["The Mean Value Theorem guarantees a c in (a,b) with", ["f'(c)=f(b)−f(a)","f'(c)=[f(b)−f(a)]/(b−a)","f(c)=0","f''(c)=0"], 1, "The instantaneous slope equals the secant slope."],
      ["For f(x)=x³−3x², an inflection point occurs at", ["x=0","x=1","x=2","x=3"], 1, "f''=6x−6 changes sign at x=1."],
      ["If f'(c)=0 and f''(c)>0, the second derivative test indicates", ["Local maximum","Local minimum","Inflection point","No conclusion under any circumstances"], 1, "Positive second derivative gives a local minimum."],
      ["A rectangle with perimeter 20 has maximum area when its sides are", ["2 and 8","4 and 6","5 and 5","1 and 9"], 2, "For fixed perimeter, the square maximizes area."],
      ["For f(x)=1/x on (0,∞), the function is", ["Increasing, concave up","Decreasing, concave up","Decreasing, concave down","Increasing, concave down"], 1, "f'=-1/x²<0 and f''=2/x³>0."]
    ]),
    "Unit 6 Integration & Accumulation": _makeQuestions("AP Calculus AB", "Unit 6 Integration & Accumulation", "CAL-INT", [
      ["An antiderivative of 3x² is", ["x³+C","6x+C","3x³+C","x²+C"], 0, "Differentiate x³ to obtain 3x²."],
      ["∫₀² (2x+1) dx equals", ["2","4","6","8"], 2, "An antiderivative is x²+x; the difference is 6."],
      ["If f is continuous, d/dx ∫₁ˣ f(t)dt equals", ["f(1)","f(x)","∫₁ˣ f(t)dt","f'(x)"], 1, "The Fundamental Theorem of Calculus gives f(x)."],
      ["∫₀³ 4 dt represents", ["The slope of y=4","A signed area of 12","A rate of 4 at t=3","The derivative of 4"], 1, "The constant function forms a rectangle of area 4·3."],
      ["∫₁⁴ 1/x dx equals", ["ln 4","ln 3","3","4"], 0, "The antiderivative ln x gives ln4−ln1=ln4."],
      ["If velocity is v(t)=2t and s(0)=5, position at t=3 is", ["8","11","14","18"], 2, "Displacement is ∫₀³2t dt=9, so s=14."],
      ["The average value of f(x)=x on [0,4] is", ["1","2","3","4"], 1, "Average value=(1/4)∫₀⁴x dx=2."],
      ["A Riemann sum with right endpoints approximates ∫₀²x²dx using n=2 equal subintervals as", ["1.25","2.5","5","6.25"], 2, "Widths 1 and right heights 1 and 4 give a sum of 5."],
      ["∫(cos x−2)dx equals", ["−sin x−2x+C","sin x−2x+C","sin x+2x+C","−cos x−2+C"], 1, "Integrate each term."],
      ["If F'=f, then ∫ₐᵇ f(x)dx equals", ["F(a)+F(b)","F(b)−F(a)","f(b)−f(a)","F'(b)"], 1, "The net accumulation is the change in an antiderivative."],
      ["If f(x) is below the x-axis on [1,3], ∫₁³ f(x)dx is", ["Positive","Negative","Zero","Equal to geometric area"], 1, "A definite integral records signed area."],
      ["A particle's velocity is 3 m/s for 5 s. Its displacement is", ["0.6 m","8 m","15 m","30 m"], 2, "Constant velocity gives Δs=vt=15 m."],
      ["∫₀¹ 6x⁵ dx equals", ["1","5","6","1/6"], 0, "Antiderivative x⁶ evaluated from 0 to 1 gives 1."],
      ["For A(x)=∫₂ˣ (t²+1)dt, A'(3) is", ["3","9","10","28/3"], 2, "By FTC, A'(3)=3²+1=10."],
      ["If a region has geometric area 7 above the axis and 2 below it, its signed integral is", ["9","5","−5","−9"], 1, "Signed area is 7−2=5."]
    ])
  },
  "AP Chemistry": {
    "Unit 1 Atomic Structure & Properties": _makeQuestions("AP Chemistry", "Unit 1 Atomic Structure & Properties", "CHE-ATO", [
      ["An ion has 17 protons and 18 electrons. Its charge is", ["1+","1−","17−","35+"], 1, "One more electron than proton gives a 1− charge."],
      ["Isotopes of one element differ in their numbers of", ["Protons","Neutrons","Valence shells","Atomic numbers"], 1, "Isotopes have the same proton count and different neutron counts."],
      ["Element X has isotopes of masses 10.0 (20%) and 11.0 (80%). Its average atomic mass is", ["10.2 u","10.5 u","10.8 u","11.0 u"], 2, "Weighted mean=0.20(10.0)+0.80(11.0)=10.8 u."],
      ["Which transition emits a photon?", ["n=2 to n=5","n=4 to n=2","n=1 to n=3","n=2 to n=3"], 1, "A transition to a lower energy level releases energy."],
      ["Across a period from left to right, atomic radius generally", ["Increases as shielding rises","Decreases as effective nuclear charge rises","Remains constant","Increases because new shells are added"], 1, "Electrons are added to the same shell while nuclear charge increases."],
      ["Which atom has the greatest first ionization energy?", ["Na","Mg","Al","Si"], 3, "Across this portion of period 3, Si has the greatest first ionization energy."],
      ["The ground-state electron configuration of Mg (Z=12) ends in", ["3s²","3p²","2p⁶","4s²"], 0, "After 1s²2s²2p⁶, the next two electrons occupy 3s."],
      ["A photon has frequency 6.0×10¹⁴ Hz. Its energy is closest to (h=6.63×10⁻³⁴ J·s)", ["1.1×10⁻⁴⁸ J","4.0×10⁻¹⁹ J","1.1×10⁻¹⁹ J","4.0×10⁻⁹ J"], 1, "E=hν=3.98×10⁻¹⁹ J."],
      ["Which species is isoelectronic with Ne?", ["Na","Na+","F","Mg"], 1, "Na+ has 10 electrons, like Ne."],
      ["An electron's principal quantum number n primarily indicates its", ["Orbital orientation","Energy level and radial extent","Spin direction","Nuclear charge"], 1, "n labels the principal energy level."],
      ["Which subshell can hold at most six electrons?", ["s","p","d","f"], 1, "A p subshell has three orbitals, each holding two electrons."],
      ["A neutral atom has atomic number 20. It contains", ["20 protons","20 neutrons necessarily","40 protons","10 electrons"], 0, "Atomic number equals proton number; neutrality gives 20 electrons."],
      ["Compared with a neutral atom, a positive ion of the same element is generally", ["Larger due to more electrons","Smaller due to electron loss","Same size","Larger due to added protons"], 1, "Losing electrons often reduces electron-electron repulsion and radius."],
      ["Which orbital type has a spherical probability distribution?", ["s","p","d","f"], 0, "s orbitals are spherically symmetric."],
      ["An element's successive ionization energies show a large jump after removal of the third electron. This indicates", ["Three valence electrons","One valence electron","A full d subshell","It is a noble gas"], 0, "The fourth electron would be removed from a stable inner shell."]
    ]),
    "Unit 2 Molecular & Ionic Compound Structure": _makeQuestions("AP Chemistry", "Unit 2 Molecular & Ionic Compound Structure", "CHE-STR", [
      ["The best Lewis structure for CO₂ has", ["Two C–O single bonds","One C=O double bond and one single bond","Two C=O double bonds","A triple bond and a single bond"], 2, "Two double bonds give each atom an octet and zero formal charge."],
      ["The molecular geometry of NH₃ is", ["Trigonal planar","Trigonal pyramidal","Tetrahedral","Linear"], 1, "Three bonding pairs and one lone pair produce trigonal pyramidal geometry."],
      ["Which molecule is nonpolar despite polar bonds?", ["H₂O","NH₃","CO₂","SO₂"], 2, "Linear CO₂ has equal opposing bond dipoles."],
      ["The approximate bond angle in a tetrahedral molecule such as CH₄ is", ["90°","109.5°","120°","180°"], 1, "Four electron domains arrange tetrahedrally."],
      ["Which bond has the greatest polarity?", ["C–C","C–H","C–O","O–F"], 2, "C–O has the largest electronegativity difference among these choices."],
      ["For Na₂O, the cation-to-anion ratio is", ["1:1","1:2","2:1","2:3"], 2, "Two Na+ ions balance one O2− ion."],
      ["A central atom has three bonding domains and no lone pairs. Its molecular geometry is", ["Trigonal planar","Trigonal pyramidal","T-shaped","Bent"], 0, "Three electron domains spread in a trigonal plane."],
      ["Which solid is held together by a lattice of oppositely charged ions?", ["CO₂(s)","NaCl(s)","Cu(s)","SiO₂(s)"], 1, "NaCl is an ionic crystal."],
      ["The formal charge on N in an NH₄+ Lewis structure is", ["−1","0","+1","+4"], 2, "N has four bonds and no lone pairs: 5−4=+1."],
      ["Which species has resonance-equivalent N–O bonds?", ["NO₃−","NH₃","CH₄","H₂O"], 0, "Nitrate's three equivalent structures delocalize the π bonding."],
      ["The shape of BeCl₂(g) is", ["Bent","Linear","Trigonal planar","Tetrahedral"], 1, "Two electron domains around Be point 180° apart."],
      ["Which description best explains the high melting point of MgO?", ["Weak induced dipoles","Strong electrostatic attractions between 2+ and 2− ions","Covalent network bonds","Metallic bonding"], 1, "Doubly charged ions attract strongly in the lattice."],
      ["A molecule with tetrahedral electron geometry and two lone pairs has molecular geometry", ["Linear","Bent","Trigonal pyramidal","Square planar"], 1, "Two bonding domains remain bent after accounting for two lone pairs."],
      ["Which bond is shortest in the same pair of atoms?", ["C–C","C=C","C≡C","All equal"], 2, "Greater bond order generally corresponds to shorter, stronger bonds."],
      ["In a Lewis structure, a double bond represents", ["Two shared electron pairs","Two transferred electrons","One shared pair and one lone pair","Four atoms sharing electrons"], 0, "A double covalent bond consists of two shared pairs."]
    ]),
    "Unit 3 Intermolecular Forces & Properties": _makeQuestions("AP Chemistry", "Unit 3 Intermolecular Forces & Properties", "CHE-IMF", [
      ["Which pure substance has hydrogen bonding between its molecules?", ["CH₄","H₂S","CH₃OH","CO₂"], 2, "Methanol has O–H bonds and oxygen lone pairs."],
      ["At similar molar masses, which substance likely has the highest boiling point?", ["Ne","Ar","Kr","Xe"], 3, "Larger electron clouds create stronger dispersion forces."],
      ["A liquid with strong intermolecular attractions generally has", ["High vapor pressure at a fixed temperature","Low boiling point","Low vapor pressure at a fixed temperature","No surface tension"], 2, "More energy is needed for molecules to escape into vapor."],
      ["Which is the strongest intermolecular attraction present in liquid HCl?", ["Ion-dipole","Hydrogen bonding","Dipole-dipole","Ion-ion"], 2, "HCl is polar but does not meet the usual N/O/F hydrogen-bond criterion."],
      ["A gas sample at fixed temperature and pressure is compressed to half its volume. Its pressure becomes", ["Half","Unchanged","Twice","Four times"], 2, "Boyle's law gives inverse pressure-volume dependence."],
      ["At constant pressure, heating a gas from 300 K to 600 K changes its volume by a factor of", ["1/2","1","2","4"], 2, "Charles's law: V∝T in kelvin."],
      ["A 2.0 mol ideal gas occupies 10 L at 300 K. Its pressure is about (R=0.082 L·atm·mol⁻¹·K⁻¹)", ["0.49 atm","2.46 atm","4.92 atm","49.2 atm"], 2, "P=nRT/V≈(2)(0.082)(300)/10=4.92 atm."],
      ["Which solution has the greatest concentration?", ["0.20 mol in 1.0 L","0.30 mol in 2.0 L","0.10 mol in 0.25 L","0.40 mol in 4.0 L"], 2, "Molarities are 0.20, 0.15, 0.40, and 0.10 M."],
      ["Dissolving a polar molecular solute in water is favored mainly when", ["Solute-solvent attractions compensate for disrupted interactions","The solute is nonpolar","Water molecules stop moving","All bonds in solute break"], 0, "Favorable solute-solvent interactions help offset separation costs."],
      ["For a liquid to climb a narrow glass capillary, adhesion to glass must", ["Be weaker than cohesion","Exceed cohesion sufficiently","Be zero","Equal gravity"], 1, "Adhesion can pull the liquid up the surface."],
      ["Which sample has the greatest average molecular speed at the same temperature?", ["H₂","O₂","CO₂","All have the same average speed"], 0, "At equal temperature, lighter gas molecules move faster on average."],
      ["A nonvolatile solute is added to a solvent. The solvent's vapor pressure", ["Increases","Decreases","Becomes zero","Is unchanged in all cases"], 1, "Solute particles lower the solvent's mole fraction at the surface."],
      ["A 0.50 mol solute sample is dissolved to make 2.0 L of solution. Molarity is", ["0.25 M","1.0 M","2.5 M","4.0 M"], 0, "M=n/V=0.50/2.0=0.25 M."],
      ["Which gas deviates most from ideal behavior near condensation?", ["He","Ne","NH₃","H₂"], 2, "NH₃ has strong attractions and appreciable molecular volume."],
      ["When temperature increases, the vapor pressure of a liquid rises because", ["More molecules have enough energy to escape","Intermolecular forces vanish","Molar mass decreases","The liquid density must double"], 0, "A larger fraction of molecules can enter the vapor phase."]
    ]),
    "Unit 4 Chemical Reactions": _makeQuestions("AP Chemistry", "Unit 4 Chemical Reactions", "CHE-REA", [
      ["For 2Al+3Cl₂→2AlCl₃, how many moles of Cl₂ react with 4 mol Al?", ["3 mol","4 mol","6 mol","8 mol"], 2, "The stoichiometric ratio is 3 mol Cl₂ per 2 mol Al."],
      ["A 0.50 mol sample of CaCO₃ contains how many moles of oxygen atoms?", ["0.50","1.0","1.5","3.0"], 2, "Each formula unit contains three O atoms."],
      ["In a net ionic equation, spectator ions are", ["Oxidized","Unchanged on both sides","The only precipitate","Always H+ ions"], 1, "They appear identically in complete ionic reactants and products."],
      ["Mixing AgNO₃(aq) and NaCl(aq) produces a precipitate of", ["NaNO₃","AgCl","AgNa","Cl₂"], 1, "AgCl is insoluble under ordinary conditions."],
      ["In Zn+Cu²⁺→Zn²⁺+Cu, the reducing agent is", ["Zn","Cu²⁺","Zn²⁺","Cu"], 0, "Zn loses electrons and reduces Cu²⁺."],
      ["How many moles are in 18.0 g of H₂O? (molar mass 18.0 g/mol)", ["0.50","1.00","2.00","18.0"], 1, "n=m/M=1.00 mol."],
      ["A reaction yields 8 g product when its theoretical yield is 10 g. Percent yield is", ["20%","80%","100%","125%"], 1, "Percent yield=(8/10)×100=80%."],
      ["For N₂+3H₂→2NH₃, with 2 mol N₂ and 3 mol H₂, the limiting reactant is", ["N₂","H₂","NH₃","Neither"], 1, "Two mol N₂ require 6 mol H₂; only 3 mol are present."],
      ["Which reaction is an acid-base neutralization?", ["HCl+NaOH→NaCl+H₂O","2H₂+O₂→2H₂O","AgNO₃+NaCl→AgCl+NaNO₃","CaCO₃→CaO+CO₂"], 0, "Acid and base react to form water and a salt."],
      ["A 25.0 mL portion of 0.20 M solution contains", ["0.0050 mol solute","0.050 mol solute","0.20 mol solute","5.0 mol solute"], 0, "n=MV=0.20(0.0250)=0.0050 mol."],
      ["The balanced combustion of propane is C₃H₈+___O₂→3CO₂+4H₂O. The coefficient is", ["3","4","5","6"], 2, "The products contain 10 O atoms, requiring 5 O₂."],
      ["If 2.0 mol H₂ reacts completely with excess O₂, the amount of H₂O formed is", ["1.0 mol","2.0 mol","4.0 mol","0.50 mol"], 1, "2H₂ produces 2H₂O, a 1:1 ratio."],
      ["Which observation is strongest evidence that a chemical reaction occurred?", ["A solid dissolves without color change","A precipitate forms after mixing solutions","Water evaporates","A sample is crushed"], 1, "Formation of an insoluble solid signals new product formation."],
      ["At constant temperature, adding more reactant to a reaction mixture may increase product formation because", ["There are more reactant particles available to react","The equilibrium constant changes","Atoms are created","The balanced equation changes"], 0, "More reactant can be converted; K is fixed by temperature."],
      ["In 2KClO₃→2KCl+3O₂, the coefficient ratio KCl:O₂ is", ["2:3","3:2","1:1","2:5"], 0, "The balanced coefficients give 2 mol KCl per 3 mol O₂."]
    ]),
    "Unit 5 Kinetics": _makeQuestions("AP Chemistry", "Unit 5 Kinetics", "CHE-KIN", [
      ["For rate=k[A]², doubling [A] changes the rate by a factor of", ["2","4","1/2","1/4"], 1, "A second-order dependence gives 2²=4."],
      ["A catalyst increases reaction rate by", ["Increasing ΔH","Lowering activation energy","Changing the equilibrium constant","Increasing reactant concentration"], 1, "An alternate pathway has lower activation energy."],
      ["For A→products, [A] falls from 0.80 M to 0.50 M in 10 s. Average disappearance rate is", ["0.030 M/s","0.050 M/s","0.30 M/s","1.3 M/s"], 0, "−Δ[A]/Δt=(0.80−0.50)/10=0.030 M/s."],
      ["A reaction's rate constant increases when temperature rises because", ["More collisions exceed activation energy","The activation energy increases","Molecules stop colliding","The reaction becomes exothermic"], 0, "A greater fraction of collisions has sufficient energy."],
      ["If a reaction is first order in A and zero order in B, its rate law is", ["k[A][B]","k[A]","k[B]","k/[A]"], 1, "Zero-order B does not appear in the rate law."],
      ["A mechanism's slow elementary step is often called the", ["Equilibrium step","Rate-determining step","Overall reaction","Catalyst step"], 1, "The slow step limits the overall rate."],
      ["For a first-order reaction, the half-life is", ["Proportional to initial concentration","Independent of initial concentration","Always 1 s","Inversely proportional to k²"], 1, "t½=ln2/k."],
      ["A proposed elementary step 2NO→N₂O₂ has molecularity", ["Unimolecular","Bimolecular","Termolecular","Zero-order"], 1, "Two reactant molecules participate in the elementary event."],
      ["If rate=k[A][B]², tripling [B] while holding [A] fixed changes rate by", ["3","6","9","27"], 2, "Second order in B gives a factor of 3²."],
      ["A reaction coordinate diagram shows products lower in energy than reactants. The reaction is", ["Endothermic","Exothermic","At equilibrium necessarily","Without activation energy"], 1, "Products at lower energy correspond to negative ΔH."],
      ["When concentration of a reactant is plotted against time, the tangent slope gives", ["Instantaneous rate of reactant disappearance with a negative sign","Equilibrium constant","Activation energy","Reaction enthalpy"], 0, "The concentration slope is negative during consumption; rate is its negative."],
      ["Adding a catalyst to a system at equilibrium", ["Shifts equilibrium toward products","Shifts equilibrium toward reactants","Speeds both directions without changing equilibrium composition","Raises K"], 2, "It accelerates forward and reverse reactions equally."],
      ["At fixed temperature, a rate law's rate constant depends on", ["Reactant concentrations","Temperature and reaction pathway","Product concentration alone","Container volume only"], 1, "k is characteristic of the reaction pathway and temperature."],
      ["An experiment doubles [A] and triples rate; doubling [B] has no effect. For rate=k[A]^m[B]^n, m and n are", ["m=1, n=0","m=0, n=1","m=2, n=0","m=1, n=1"], 0, "The observed factors show first order in A and zero order in B."],
      ["A powdered solid reacts faster than an equal mass of large chunks because powder has greater", ["Activation energy","Surface area exposed","Molar mass","Equilibrium constant"], 1, "More exposed surface allows more effective collisions."]
    ]),
    "Unit 6 Thermodynamics": _makeQuestions("AP Chemistry", "Unit 6 Thermodynamics", "CHE-THER", [
      ["A system absorbs 250 J of heat and does 80 J of work on surroundings. ΔE is", ["−330 J","−170 J","+170 J","+330 J"], 2, "ΔE=q+w=250−80=+170 J using work on system as positive."],
      ["A process releases heat at constant pressure. Its ΔH is", ["Positive","Negative","Zero","Always equal to ΔS"], 1, "Heat released means q_p and ΔH are negative."],
      ["For an exothermic reaction, heat appears on the", ["Reactant side","Product side","Both sides","Neither side"], 1, "The reaction transfers heat to its surroundings."],
      ["A 100 g water sample warms 5.0°C. With c=4.18 J g⁻¹°C⁻¹, heat absorbed is", ["209 J","418 J","2090 J","4180 J"], 2, "q=mcΔT=100(4.18)(5.0)=2090 J."],
      ["If ΔH°reaction is calculated from formation enthalpies, use", ["ΣνΔHf(products)−ΣνΔHf(reactants)","ΣνΔHf(reactants)−ΣνΔHf(products)","Products' coefficients only","The activation energy"], 0, "Reaction enthalpy is the product sum minus reactant sum."],
      ["A spontaneous process at constant T and P has", ["ΔG<0","ΔG>0","ΔG=ΔH always","ΔSsystem<0 always"], 0, "Negative Gibbs free-energy change indicates spontaneity."],
      ["For a process with ΔH<0 and ΔS>0, spontaneity is", ["At all temperatures","At no temperature","Only high temperatures","Only low temperatures"], 0, "Both terms favor negative ΔG=ΔH−TΔS."],
      ["A reaction has ΔH=+20 kJ/mol and ΔS=+100 J/(mol·K). The crossover T is", ["20 K","200 K","500 K","2000 K"], 1, "Set ΔG=0: T=20,000 J/100 J K⁻¹=200 K."],
      ["During melting of a pure substance at its melting point, temperature", ["Rises steadily","Falls steadily","Remains constant as heat is absorbed","Becomes zero"], 2, "Energy breaks the lattice rather than raising temperature."],
      ["For an ideal gas expanding freely into vacuum, the work done by the gas is", ["Positive","Negative","Zero","Equal to q"], 2, "External pressure is zero, so w=−PextΔV=0."],
      ["A positive entropy change is most likely for", ["Gas condensing to liquid","A solid crystallizing","Two gas particles forming one gas molecule","A solid dissolving into dispersed ions"], 3, "Dissolution into dispersed particles generally increases dispersal."],
      ["When a system loses 40 J of heat, qsystem is", ["−40 J","0 J","+40 J","−80 J"], 0, "Heat leaving the system is negative by convention."],
      ["If ΔH=−50 kJ/mol and ΔS=−100 J/(mol·K), the reaction becomes favorable at", ["Low T","High T","All temperatures","No temperature"], 0, "ΔG=−50,000+100T is negative below 500 K."],
      ["Standard enthalpy of formation of O₂(g) in its standard state is", ["−1 kJ/mol","0 kJ/mol","+1 kJ/mol","Undefined"], 1, "An element in its standard state has ΔHf°=0."],
      ["A calorimeter absorbs 500 J from a reaction. Assuming no other heat exchange, the reaction's q is", ["+500 J","−500 J","0 J","+1000 J"], 1, "Energy conservation gives equal and opposite heat transfer."]
    ])
  }
};

delete unitQuestionBank["AP Physics 1"]["Unit 2 Dynamics"];
Object.assign(unitQuestionBank["AP Physics 1"], {
  "Unit 2 Force and Translational Dynamics": _makeQuestions("AP Physics 1", "Unit 2 Force and Translational Dynamics", "PHY-FORCE", [
    ["A 6 kg cart has a 30 N east force and 12 N west force. What is its acceleration?", ["3 m/s² east","5 m/s² east","7 m/s² west","42 m/s² east"], 0, "The net force is 18 N east, so a=18/6=3 m/s²."],
    ["A block is pulled at constant velocity across a floor by 14 N. What is the kinetic friction magnitude?", ["0 N","7 N","14 N","Greater than 14 N"], 2, "Constant velocity means zero net horizontal force."],
    ["A 2 kg mass hangs at rest from a single light cord. Its tension is (g=9.8 m/s²)", ["4.9 N","9.8 N","19.6 N","0 N"], 2, "Equilibrium requires T=mg=19.6 N."],
    ["A 10 kg box on a level surface has μs=0.40. The maximum static friction is (g=10 m/s²)", ["4 N","40 N","100 N","400 N"], 1, "f_s,max=μsN=0.40(100)=40 N."],
    ["A 4 kg block slides down a frictionless 30° incline. Its acceleration is (g=10 m/s²)", ["2.5 m/s² down slope","5 m/s² down slope","8.7 m/s² down slope","10 m/s² down slope"], 1, "The along-slope component is g sin30°=5 m/s²."],
    ["A falling coffee filter reaches terminal speed. Which statement is correct?", ["Drag is zero","Drag equals its weight upward","Net force remains downward","Its acceleration is g"], 1, "At terminal speed, upward drag balances weight."],
    ["A spring with k=200 N/m is stretched 0.15 m. Its restoring-force magnitude is", ["13 N","30 N","200 N","1333 N"], 1, "Hooke's law gives F=kx=30 N."],
    ["A 1200 kg car rounds a level curve of radius 40 m at 10 m/s. Required inward net force is", ["300 N","3000 N","12,000 N","30,000 N"], 1, "F_c=mv²/r=1200(100)/40=3000 N."],
    ["A passenger in an accelerating car feels pressed toward the seatback because", ["A real outward force acts on them","Their inertia resists forward acceleration of the car","Gravity increases","The seat exerts no force"], 1, "The seat accelerates the passenger forward while inertia resists the change."],
    ["A 5 kg crate is lifted upward with acceleration 2 m/s² (g=10 m/s²). The lifting force is", ["40 N","50 N","60 N","100 N"], 2, "F−mg=ma, hence F=5(10+2)=60 N."],
    ["Two skaters push apart. The force on skater A by B compared with B by A is", ["Larger","Smaller","Equal in magnitude and opposite","Zero if masses differ"], 2, "Newton's third-law forces form an equal-and-opposite pair."],
    ["A 3 kg block on a table is pulled with 10 N while kinetic friction is 4 N. Its acceleration is", ["2 m/s²","3.3 m/s²","4.7 m/s²","14 m/s²"], 0, "Net force is 6 N, giving a=6/3=2 m/s²."],
    ["A satellite near Earth is in circular orbit. The force providing its centripetal acceleration is", ["An outward centrifugal force","Gravity","Its velocity","A contact normal force"], 1, "Earth's gravitational force acts inward and supplies centripetal acceleration."],
    ["Air resistance on a dropped object is upward. As its downward speed increases, its acceleration generally", ["Increases above g","Decreases below g","Remains exactly g","Reverses immediately"], 1, "Increasing drag reduces the net downward force."],
    ["An elevator descends while slowing. The normal force on a passenger compared with weight is", ["Less","Equal","Greater","Zero"], 2, "The acceleration is upward, so N−mg=ma>0."]
  ]),
  "Unit 5 Torque and Rotational Dynamics": _makeQuestions("AP Physics 1", "Unit 5 Torque and Rotational Dynamics", "PHY-TORQUE", [
    ["A 12 N force acts perpendicular 0.30 m from a pivot. Torque magnitude is", ["0.036 N·m","3.6 N·m","12.3 N·m","40 N·m"], 1, "τ=rF sin90°=3.6 N·m."],
    ["A force is directed along a wrench whose line of action passes through the pivot. Its torque is", ["Zero","F times wrench length","Maximum","Negative"], 0, "The perpendicular lever arm is zero."],
    ["A uniform disk's moment of inertia about its central axis is", ["MR²","½MR²","⅔MR²","2MR²"], 1, "A uniform solid disk has I=½MR²."],
    ["A net torque of 6 N·m acts on a rotor with I=2 kg·m². Angular acceleration is", ["0.33 rad/s²","3 rad/s²","8 rad/s²","12 rad/s²"], 1, "τ=Iα gives α=6/2=3 rad/s²."],
    ["A wheel's angular speed rises from 4 to 10 rad/s in 3 s. Its angular acceleration is", ["2 rad/s²","3 rad/s²","14 rad/s²","18 rad/s²"], 0, "α=Δω/Δt=6/3=2 rad/s²."],
    ["At the same angular speed, a point twice as far from an axis has tangential speed", ["Half as large","Unchanged","Twice as large","Four times as large"], 2, "v=ωr, so doubling r doubles v."],
    ["A rigid wheel rotates through 5 rad at constant 3 rad/s. The elapsed time is", ["0.6 s","1.7 s","8 s","15 s"], 1, "t=Δθ/ω=5/3≈1.7 s."],
    ["A 2 kg point mass is 0.5 m from an axis. Its rotational inertia is", ["0.25 kg·m²","0.50 kg·m²","1.0 kg·m²","4.0 kg·m²"], 1, "For a point mass I=mr²=0.50 kg·m²."],
    ["Two equal opposite forces applied at different points on a wheel produce", ["Zero net force and possibly nonzero torque","Nonzero net force only","Zero torque always","Angular momentum destruction"], 0, "A force couple has zero net force but a nonzero torque."],
    ["A wheel starts from rest with α=2 rad/s² for 4 s. Its final angular speed is", ["2 rad/s","4 rad/s","8 rad/s","16 rad/s"], 2, "ω=ω₀+αt=8 rad/s."],
    ["For a fixed net torque, increasing rotational inertia makes angular acceleration", ["Larger","Smaller","Unchanged","Opposite in sign"], 1, "α=τ/I decreases as I increases."],
    ["A force F acts at radius r making angle θ with the radius. The torque magnitude is", ["Fr cosθ","Fr sinθ","F/r","r/F"], 1, "Only the tangential force component contributes."],
    ["A spinning wheel's angular velocity vector points", ["Along its axis by the right-hand rule","Along the rim","Toward its center","Opposite its acceleration always"], 0, "The right-hand rule sets the direction along the rotation axis."],
    ["A door opens most easily when a given force is applied", ["At the hinge toward the door","Far from hinge perpendicular to door","Far from hinge parallel to door","At the hinge perpendicular to door"], 1, "Maximum torque uses a large lever arm and perpendicular force."],
    ["A rotating object has constant angular speed. Its angular acceleration is", ["Positive","Negative","Zero","Equal to angular speed"], 2, "Constant angular velocity means α=0."]
  ]),
  "Unit 6 Energy and Momentum of Rotating Systems": _makeQuestions("AP Physics 1", "Unit 6 Energy and Momentum of Rotating Systems", "PHY-ROTE", [
    ["A wheel with I=0.40 kg·m² rotates at 5 rad/s. Its rotational kinetic energy is", ["2 J","5 J","10 J","50 J"], 1, "Krot=½Iω²=½(0.40)(25)=5 J."],
    ["A 2 kg disk rolls without slipping at 3 m/s; its radius is 0.5 m. Its angular speed is", ["1.5 rad/s","3 rad/s","6 rad/s","12 rad/s"], 2, "Rolling without slipping gives ω=v/R=6 rad/s."],
    ["A solid cylinder rolls without slipping down a ramp. Its gravitational energy becomes", ["Translational kinetic only","Rotational kinetic only","Both translational and rotational kinetic","Thermal energy only"], 2, "The center translates as the cylinder rotates."],
    ["A torque of 4 N·m turns a rotor through 2 rad. Work done is", ["2 J","6 J","8 J","16 J"], 2, "For constant torque W=τΔθ=8 J."],
    ["A system's angular momentum is conserved when", ["Net external torque is zero","Its rotational speed is zero","Its moment of inertia is fixed","Its kinetic energy is constant"], 0, "Conservation follows from zero net external torque."],
    ["A skater pulls arms inward with negligible external torque. Her angular speed", ["Decreases","Increases","Stays fixed","Becomes zero"], 1, "Reducing I while conserving L increases ω."],
    ["A point mass m rotating at radius r with tangential speed v has angular momentum magnitude", ["mvr","mv/r","mr/v","½mvr"], 0, "For perpendicular radius and momentum, L=rmv."],
    ["A rolling hoop and a rolling solid disk have equal mass and radius and start from rest at the same height. Which reaches lower first?", ["Hoop","Disk","They tie","Cannot tell without surface area"], 1, "The disk has smaller rotational inertia relative to MR²."],
    ["A 0.5 kg ball moving at 4 m/s strikes and sticks to the end of a light 1 m rod pivoted at the other end. Initial angular momentum about pivot is", ["0.5 kg·m²/s","1 kg·m²/s","2 kg·m²/s","8 kg·m²/s"], 2, "L=rmv=1(0.5)(4)=2 kg·m²/s."],
    ["A rotor's angular momentum changes by 12 kg·m²/s over 3 s. Average net torque is", ["4 N·m","9 N·m","15 N·m","36 N·m"], 0, "τavg=ΔL/Δt=4 N·m."],
    ["A rolling object's total kinetic energy is", ["½Mv² only","½Iω² only","½Mv²+½Iω²","Mv²+Iω²"], 2, "Both center-of-mass translation and rotation contribute."],
    ["A rotor's angular speed doubles while I stays constant. Its rotational kinetic energy", ["Doubles","Triples","Quadruples","Is unchanged"], 2, "Krot∝ω²."],
    ["A constant torque does positive work on a wheel. The wheel's rotational kinetic energy", ["Decreases","Increases","Must remain fixed","Changes sign"], 1, "Work-energy theorem gives positive change in rotational kinetic energy."],
    ["An object rolls without slipping on a stationary surface. The point touching the surface is instantaneously", ["Moving at 2v","Moving at v","At rest","Moving backward at v"], 2, "Translation and rotational velocities cancel at the contact point."],
    ["A system has angular momentum 10 kg·m²/s. If I changes from 2 to 5 kg·m², its angular speed changes from", ["5 to 2 rad/s","2 to 5 rad/s","10 to 25 rad/s","Unchanged"], 0, "With L=Iω conserved, ω falls from 5 to 2 rad/s."]
  ]),
  "Unit 8 Fluids": _makeQuestions("AP Physics 1", "Unit 8 Fluids", "PHY-FLUID", [
    ["A 0.020 m³ object is fully submerged in water of density 1000 kg/m³. Its buoyant force is (g=10 m/s²)", ["20 N","200 N","500 N","2000 N"], 1, "FB=ρVg=1000(0.020)(10)=200 N."],
    ["Pressure increase 3 m below a freshwater surface is approximately (ρ=1000 kg/m³, g=10 m/s²)", ["3 kPa","30 kPa","300 kPa","3 MPa"], 1, "ΔP=ρgh=30,000 Pa=30 kPa."],
    ["A hydraulic press has piston areas 0.01 m² and 0.20 m². A 50 N input ideally produces", ["2.5 N","50 N","1000 N","10,000 N"], 2, "Equal pressure gives output force 50(0.20/0.01)=1000 N."],
    ["An incompressible fluid flows through a pipe narrowing to half its area. Its speed", ["Halves","Stays fixed","Doubles","Quadruples"], 2, "Continuity A₁v₁=A₂v₂."],
    ["An object floats with 60% of its volume submerged. Its average density is", ["0.40ρfluid","0.60ρfluid","ρfluid","1.60ρfluid"], 1, "Floating equilibrium gives ρobject/ρfluid=Vsub/V=0.60."],
    ["At equal depths in a stationary connected liquid, pressure is", ["Greater in the wider arm","Greater in the narrow arm","Equal","Zero"], 2, "Hydrostatic pressure depends on depth and fluid density, not container shape."],
    ["A 4 cm² piston supports 200 N. The gauge pressure is", ["5 kPa","50 kPa","500 kPa","800 kPa"], 2, "P=F/A=200/(4×10⁻⁴)=500,000 Pa."],
    ["Water exits a hole 5 m below its surface. Ideal exit speed is (g=10 m/s²)", ["5 m/s","10 m/s","25 m/s","50 m/s"], 1, "Torricelli's law gives v=√(2gh)=10 m/s."],
    ["A block sinks in a liquid when its density is", ["Less than liquid density","Equal to liquid density","Greater than liquid density","Independent of liquid density"], 2, "Its weight exceeds the buoyant force when fully immersed."],
    ["For a fluid at rest, absolute pressure at depth h is", ["ρgh","Patm−ρgh","Patm+ρgh","Patm/ρgh"], 2, "Atmospheric pressure adds to hydrostatic gauge pressure."],
    ["In a horizontal ideal pipe, fluid speed rises in a constriction. Static pressure there", ["Rises","Falls","Stays equal","Becomes atmospheric necessarily"], 1, "Bernoulli's relation trades pressure for kinetic energy."],
    ["A 2 L volume of water has mass approximately", ["0.2 kg","2 kg","20 kg","200 kg"], 1, "Water's density is about 1 kg/L."],
    ["Two fully submerged objects have the same volume in the same liquid. Their buoyant forces are", ["Equal","Proportional to their masses","Greater for the deeper one","Zero"], 0, "Each displaces the same fluid volume."],
    ["If pipe radius is reduced to one-third for steady incompressible flow, speed becomes", ["One-third","Three times","Nine times","Twenty-seven times"], 2, "Area falls to 1/9, so continuity requires speed to rise ninefold."],
    ["A 0.5 m³ raft displaces water of density 1000 kg/m³ while floating. Supported total weight is", ["500 N","1000 N","5000 N","50,000 N"], 2, "Floating equilibrium supports ρVg=5000 N."]
  ]),
});

Object.assign(unitQuestionBank["AP Chemistry"], {
  "Unit 7 Equilibrium": _makeQuestions("AP Chemistry", "Unit 7 Equilibrium", "CHE-EQ7", [
    ["For N₂O₄(g)⇌2NO₂(g), Kc equals", ["[NO₂]²/[N₂O₄]","[N₂O₄]/[NO₂]²","[NO₂]/[N₂O₄]","[NO₂]²[N₂O₄]"], 0, "Concentrations are raised to their balanced coefficients."],
    ["For A⇌B, Q=0.5 and K=2.0. The net shift is", ["Left","Right","Neither","Toward equal concentrations"], 1, "Since Q<K, products form."],
    ["At dynamic equilibrium, forward and reverse rates are", ["Zero","Equal","Unequal","Equal only if concentrations match"], 1, "Equal rates produce no net macroscopic change."],
    ["For an exothermic forward reaction, heating shifts equilibrium", ["Right","Left","Nowhere","Only if a catalyst is present"], 1, "Heat acts as a product, so adding it favors the reverse reaction."],
    ["Decreasing volume for N₂(g)+3H₂(g)⇌2NH₃(g) shifts toward", ["Reactants","Products","Neither side","The higher-temperature side"], 1, "The product side contains fewer gas particles."],
    ["Pure solids are omitted from K expressions because their", ["Concentrations are zero","Activities are constant","Moles are always equal","Pressures are infinite"], 1, "A pure solid's activity is constant."],
    ["For H₂+I₂⇌2HI, doubling all equilibrium gas concentrations changes Q by", ["A factor of 2","A factor of 4","No change","A factor of 8"], 2, "Both numerator and denominator scale by four."],
    ["If Q>K, the reaction proceeds net", ["Forward","Reverse","Neither","Until K doubles"], 1, "There are excess products relative to equilibrium."],
    ["Reversing a reaction changes K to", ["−K","1/K","K²","K"], 1, "The product/reactant ratio is inverted."],
    ["Multiplying a reaction by 3 changes K to", ["3K","K/3","K³","K¹ᐟ³"], 2, "A reaction scaled by n has equilibrium constant Kⁿ."],
    ["At fixed temperature, adding a catalyst changes", ["K","Equilibrium composition","Time to reach equilibrium","ΔG°"], 2, "Catalysts increase forward and reverse rates."],
    ["For an equilibrium with equal gaseous mole counts on each side, compression", ["Shifts right","Shifts left","Causes no shift","Changes K"], 2, "Pressure change gives no preference when gas mole counts match."],
    ["Adding a reactant to an equilibrium mixture initially makes Q", ["Greater than K","Less than K","Exactly zero always","Unchanged in every reaction"], 1, "Increasing a denominator reactant lowers Q for the forward reaction."],
    ["A very large K indicates equilibrium favors", ["Reactants","Products","Neither","Only solids"], 1, "The equilibrium product-to-reactant ratio is large."],
    ["If Q=K, the net reaction rate is", ["Forward","Reverse","Zero, while both directions continue","Infinite"], 2, "Equilibrium is dynamic with equal opposing rates."]
  ]),
  "Unit 8 Acids and Bases": _makeQuestions("AP Chemistry", "Unit 8 Acids and Bases", "CHE-ACID8", [
    ["A solution has [H₃O⁺]=1×10⁻⁴ M. Its pH is", ["4","10","−4","7"], 0, "pH=−log[H₃O⁺]=4."],
    ["For a weak acid HA, its conjugate base A⁻ is", ["A stronger base than a strong-acid conjugate base","Always neutral","A stronger acid","Unable to react with water"], 0, "The conjugate base of a weak acid has appreciable basicity."],
    ["At 25°C, a solution with pOH=3 has pH", ["3","7","11","14"], 2, "pH+pOH=14."],
    ["Which is a conjugate acid-base pair?", ["H₂CO₃ and HCO₃⁻","HCl and NaCl","NaOH and Na⁺","NH₃ and Cl⁻"], 0, "The pair differs by one proton."],
    ["A buffer with equal concentrations of weak acid and conjugate base has", ["pH=pKa","pH=7 always","pH=2pKa","pOH=pKa"], 0, "The Henderson–Hasselbalch logarithmic term is zero."],
    ["Diluting a strong acid tenfold generally causes pH to", ["Rise by about 1","Fall by about 1","Remain fixed","Rise by 10"], 0, "Hydronium concentration decreases tenfold."],
    ["A Brønsted–Lowry acid", ["Accepts H⁺","Donates H⁺","Donates electrons","Accepts neutrons"], 1, "Acids are proton donors."],
    ["For a weak acid, a smaller Ka indicates", ["Greater ionization","Weaker acid","Higher hydronium at equal concentration","Stronger conjugate acid"], 1, "A smaller Ka means less dissociation."],
    ["A weak base B reacts with water to form", ["BH⁺ and OH⁻","B⁻ and H₃O⁺","BH₂²⁺ only","H₂ and O₂"], 0, "B accepts a proton from water, producing OH⁻."],
    ["At half-equivalence in weak-acid/strong-base titration", ["pH=pKa","pH=7","pH=pKb","[A⁻]=0"], 0, "Concentrations of HA and A⁻ are equal."],
    ["A strong acid–strong base titration at equivalence has pH near", ["3","5","7","11"], 2, "Neither conjugate ion appreciably hydrolyzes."],
    ["Which ion is amphiprotic?", ["HCO₃⁻","Cl⁻","Na⁺","K⁺"], 0, "Bicarbonate can accept or donate H⁺."],
    ["A buffer resists added base mainly because its", ["Weak acid neutralizes OH⁻","Conjugate base creates H⁺ directly","Salt precipitates","Water stops ionizing"], 0, "HA reacts with hydroxide to form A⁻ and water."],
    ["If Ka=1×10⁻⁶ for an acid, its pKa is", ["−6","0.5","6","14"], 2, "pKa=−log Ka=6."],
    ["The equivalence solution in a weak-base/strong-acid titration is typically", ["Acidic","Neutral","Basic","pH 14"], 0, "The weak base's conjugate acid makes the solution acidic."]
  ]),
  "Unit 9 Applications of Thermodynamics": _makeQuestions("AP Chemistry", "Unit 9 Applications of Thermodynamics", "CHE-APP9", [
    ["A process at constant T and P is spontaneous in the forward direction when", ["ΔG<0","ΔG>0","ΔG=ΔH","ΔS=0"], 0, "Negative Gibbs energy indicates a favorable forward process."],
    ["If ΔG°=−RT ln K, a reaction with K>1 has ΔG°", ["Negative","Positive","Zero always","Undefined"], 0, "ln K is positive when K>1."],
    ["A positive E°cell for a galvanic reaction means ΔG° is", ["Positive","Negative","Zero","Equal to RT"], 1, "ΔG°=−nFE°."],
    ["A catalyst changes a reaction's equilibrium constant by", ["Increasing it","Decreasing it","Not changing it","Setting it to 1"], 2, "Catalysts affect rates, not equilibrium thermodynamics."],
    ["At chemical equilibrium, ΔG for the reaction mixture is", ["Negative","Positive","Zero","Equal to ΔH°"], 2, "There is no net driving force at equilibrium."],
    ["The nonstandard free energy is given by", ["ΔG=ΔG°+RT ln Q","ΔG=ΔG°−RT ln Q","ΔG=RT ln K","ΔG°/Q"], 0, "The reaction quotient term accounts for composition."],
    ["For Q<K, ΔG for the forward reaction is", ["Negative","Positive","Zero","Always ΔH"], 0, "ΔG=RT ln(Q/K)<0."],
    ["A reaction has ΔH<0 and ΔS>0. It is thermodynamically favorable", ["At all temperatures","Only at low temperature","Only at high temperature","Never"], 0, "Both enthalpy and entropy terms make ΔG negative."],
    ["If K=1, then ΔG° equals", ["RT","−RT","Zero","1 kJ/mol"], 2, "ln(1)=0."],
    ["For an endothermic process with positive ΔS, increasing T makes ΔG", ["More negative","More positive","Unchanged","Equal to ΔH"], 0, "The −TΔS term becomes more negative."],
    ["In a galvanic cell, electrons travel in the wire from", ["Anode to cathode","Cathode to anode","Salt bridge to anode","Cathode to salt bridge"], 0, "Oxidation at the anode supplies electrons."],
    ["A spontaneous cell reaction has Ecell", ["Positive","Negative","Zero","Equal to K"], 0, "A positive cell potential corresponds to negative ΔG."],
    ["Increasing product concentration at fixed T and P generally makes ΔG", ["More positive for forward reaction","More negative","Unchanged","Zero"], 0, "Increasing Q raises RT ln Q."],
    ["A reaction with ΔH=+30 kJ/mol and ΔS=+100 J/(mol·K) becomes spontaneous above", ["30 K","100 K","300 K","3000 K"], 2, "ΔG=30−0.100T; it is negative when T>300 K."],
    ["A cell transferring 1 mol electrons at E°=0.50 V has ΔG°", ["Positive","Negative","Zero","Not inferable"], 1, "ΔG°=−nFE° is negative."]
  ])
});

Object.assign(unitQuestionBank["AP Calculus AB"], {
  "Unit 7 Differential Equations": _makeQuestions("AP Calculus AB", "Unit 7 Differential Equations", "CAL-DEQ7", [
    ["Solve dy/dx=2y with y(0)=3.", ["3e²ˣ","2e³ˣ","3+2x","6x"], 0, "The solution y=Ce²ˣ has C=3."],
    ["For y'=x², y(1)=2, find y(2).", ["7/3","11/3","13/3","5"], 2, "y=x³/3+C; C=5/3 and y(2)=13/3."],
    ["For y'=x+y, the slope at (2,1) is", ["1","2","3","4"], 2, "Substitute x=2,y=1 to obtain slope 3."],
    ["Euler's method with h=0.1 at (0,1) for y'=y estimates y(0.1) as", ["0.9","1.0","1.1","1.11"], 2, "Update y₁=1+0.1(1)=1.1."],
    ["The equilibrium solution of y'=y(4−y) with y positive is", ["0","2","4","8"], 2, "Set the derivative equal to zero."],
    ["If y'=−3y and y(0)=2, y(t) approaches", ["−∞","0","2","3"], 1, "The solution 2e⁻³ᵗ tends to zero."],
    ["An antiderivative family for y'=sin x is", ["−cos x+C","cos x+C","sin x+C","−sin x+C"], 0, "The derivative of −cos x is sin x."],
    ["For dy/dx=4x and y(0)=−1, y(2) is", ["3","5","7","9"], 2, "y=2x²−1, so y(2)=7."],
    ["A slope field has horizontal segments along y=0. Which equation may produce this?", ["y'=x+y","y'=y²","y'=1+y","y'=x"], 1, "For y'=y², slopes are zero whenever y=0."],
    ["For dP/dt=0.08P, a population at P=500 changes at rate", ["4","40","80","500"], 1, "Rate is 0.08(500)=40."],
    ["If y'=2x−1, then y(3)−y(1) equals", ["2","4","6","8"], 2, "Integrate 2x−1 from 1 to 3: [x²−x]₁³=6."],
    ["The solution to y'=0 through (−2,5) is", ["y=5","y=−2","y=x+7","y=5x"], 0, "Zero derivative describes a constant function."],
    ["For y'=−y, y(0)=4, the initial slope is", ["−4","−1","0","4"], 0, "Substitution at y=4 yields y'=-4."],
    ["A separable equation y'=xy can be written as", ["dy/y=x dx","y dy=x dx","dy=xy","dx/y=x dy"], 0, "Divide both sides by y and multiply by dx."],
    ["A solution curve passes through (1,2) where the slope field gives slope −3. Its tangent line is", ["y−2=−3(x−1)","y−1=−3(x−2)","y=−3x+2","y=2x−3"], 0, "Use point-slope form with point (1,2) and slope −3."]
  ]),
  "Unit 8 Applications of Integration": _makeQuestions("AP Calculus AB", "Unit 8 Applications of Integration", "CAL-APP8", [
    ["A particle has v(t)=3t² on [0,2]. Its displacement is", ["4","6","8","12"], 2, "∫₀²3t²dt=8."],
    ["The area under y=2x+1 from x=0 to x=3 is", ["9","12","15","18"], 1, "Integrate: [x²+x]₀³=12."],
    ["A rate r(t)=4−t on [0,2] accumulates", ["2","4","6","8"], 2, "∫₀²(4−t)dt=6."],
    ["The average value of f(x)=3x² on [0,2] is", ["2","4","6","8"], 1, "(1/2)∫₀²3x²dx=4."],
    ["Area between y=2x and y=x² on [0,2] is", ["2/3","4/3","2","8/3"], 1, "∫₀²(2x−x²)dx=4/3."],
    ["If velocity changes sign once, total distance is found by integrating", ["v(t)","|v(t)|","a(t)","x(t)"], 1, "Absolute velocity prevents opposing displacements from canceling."],
    ["A tank drains at 7 L/min for 4 min. Its volume change is", ["−28 L","−11 L","+28 L","+11 L"], 0, "A draining rate is negative: ΔV=−7(4)=−28 L."],
    ["If F'(x)=f(x), then ∫ₐᵇf(x)dx equals", ["F(b)−F(a)","F(a)−F(b)","f(b)−f(a)","F'(b)"], 0, "This is the Fundamental Theorem of Calculus."],
    ["A cross section has area A(x)=πx² for 0≤x≤1. Volume is", ["π/3","π/2","π","3π"], 0, "V=∫₀¹πx²dx=π/3."],
    ["If v(t)=t−1 on [0,3], the particle's displacement is", ["1/2","3/2","2","3"], 1, "∫₀³(t−1)dt=3/2."],
    ["A 50 m³ reservoir receives water at 8 m³/hr and loses 3 m³/hr for 6 hr. Final volume is", ["68 m³","80 m³","98 m³","110 m³"], 1, "Net gain is 5(6)=30 m³; final volume is 80 m³."],
    ["For f increasing on [a,b], ∫ₐᵇf'(x)dx represents", ["f(b)−f(a)","f(a)−f(b)","Average f","f'(b)"], 0, "Integrating derivative gives the net change in f."],
    ["A particle has a(t)=4, v(0)=−1. Its velocity after 3 s is", ["−13","−1","7","11"], 3, "v(3)=−1+∫₀³4dt=11."],
    ["Area enclosed between y=1 and y=x on [0,1] is", ["0","1/4","1/2","1"], 2, "∫₀¹(1−x)dx=1/2."],
    ["If r(t) is a rate of change of quantity Q, then Q(b)−Q(a) equals", ["r(b)−r(a)","∫ₐᵇr(t)dt","r(a)(b−a) always","Q'(b)"], 1, "Accumulating the rate gives net change."]
  ])
});

Object.assign(unitQuestionBank["AP Biology"], {
  "Unit 7 Natural Selection": _makeQuestions("AP Biology", "Unit 7 Natural Selection", "BIO-NS7", [
    ["Antibiotic resistance rises in a bacterial population after treatment because", ["Bacteria choose to adapt","Resistant heritable variants reproduce more","The antibiotic makes all cells identical","Mutation stops"], 1, "Selection changes variant frequencies through differential reproductive success."],
    ["Natural selection requires", ["Heritable variation affecting reproductive success","No genetic variation","Identical reproductive success","Traits acquired in adult life"], 0, "Selection needs inherited differences in fitness."],
    ["A middle body-size phenotype survives best while extremes fare poorly. Selection is", ["Directional","Stabilizing","Disruptive","Artificial"], 1, "Stabilizing selection favors intermediate phenotypes."],
    ["A rare allele becomes common after a few individuals found a new island population. The likely process is", ["Founder effect","Gene flow","Directional mutation","Assortative mating"], 0, "Chance allele sampling in founders can shift frequencies."],
    ["If p=0.6 and q=0.4, expected heterozygote frequency is", ["0.16","0.24","0.48","0.64"], 2, "2pq=2(0.6)(0.4)=0.48."],
    ["Migration between populations generally", ["Increases genetic differentiation","Reduces genetic differentiation","Eliminates mutation","Causes only drift"], 1, "Gene flow mixes alleles across populations."],
    ["A pesticide-resistant variant present before pesticide application demonstrates", ["Selection on standing variation","Directed mutation","Acquired inheritance","No evolution"], 0, "Pesticide selects preexisting resistant individuals."],
    ["A trait with low heritability will show what response to selection?", ["Large inherited response","Limited inherited response","No environmental effect","Mutation alone"], 1, "Low heritability means phenotype differences are weakly transmitted."],
    ["A fossil series showing altered limb anatomy over time supports", ["Evolution through time","No common ancestry","Acclimation only","Equilibrium"], 0, "Ordered fossils reveal morphological change through geologic time."],
    ["Different species independently evolving similar adaptations in similar settings is", ["Convergent evolution","Divergent evolution","Drift","Artificial selection"], 0, "Similar selection can produce analogous traits."],
    ["A geographic barrier most directly reduces", ["Gene flow","Mutation","Natural selection","Recombination"], 0, "Separation restricts migration and allele exchange."],
    ["A population has p=0.8 and q=0.2. The expected recessive homozygote frequency is", ["0.04","0.16","0.32","0.64"], 0, "q²=(0.2)²=0.04."],
    ["Which can change allele frequencies between generations?", ["Natural selection","Mitosis alone","Homeostasis","Individual learning"], 0, "Selection changes reproductive contribution of alleles."],
    ["Two species have homologous forelimb bones with different functions. This supports", ["Common ancestry","Identical niches","Convergent structures only","No evolutionary relationship"], 0, "Homology is evidence of shared ancestry."],
    ["Human-directed breeding of crops for drought tolerance is", ["Artificial selection","Genetic drift","Gene flow","Stabilizing natural selection"], 0, "Humans control which individuals reproduce."]
  ]),
  "Unit 8 Ecology": _makeQuestions("AP Biology", "Unit 8 Ecology", "BIO-ECO8", [
    ["A logistic population's growth rate falls as population size approaches", ["Zero","Carrying capacity","Mutation rate","Its birth rate"], 1, "Density-dependent limits slow growth near K."],
    ["A population of 300 grows by 30 individuals in one year. Its numerical growth is", ["10 individuals/year","30 individuals/year","300 individuals/year","330 individuals/year"], 1, "The increase over that year is 30."],
    ["Energy transfer between trophic levels is inefficient largely because", ["Organisms release heat during metabolism","Energy is recycled completely","Producers do not respire","Consumers create energy"], 0, "Metabolism dissipates much energy as heat."],
    ["Removing an abundant producer from a food web is likely to affect", ["Only decomposers","Many consumer populations","Only abiotic factors","No trophic levels"], 1, "Producers supply energy to downstream trophic levels."],
    ["Excess nitrogen runoff can cause algal blooms followed by", ["Increased dissolved oxygen permanently","Oxygen depletion during decomposition","Immediate desertification","Reduced nutrient availability initially"], 1, "Decomposer respiration can consume dissolved oxygen."],
    ["A community consists of", ["All interacting populations in an area","One species and abiotic conditions","One population's genes","The entire biosphere"], 0, "Communities include populations of different species."],
    ["The realized niche may be narrower than the fundamental niche because of", ["Competition","Photosynthesis","Mutation","Season length only"], 0, "Biotic interactions restrict realized conditions and resources."],
    ["A density-independent event is", ["A hurricane","Competition for nesting sites","Disease transmission","Territoriality"], 0, "A storm may affect individuals regardless of population density."],
    ["A species benefits while its host is harmed in", ["Commensalism","Mutualism","Parasitism","Neutralism"], 2, "Parasites gain resources at host cost."],
    ["Early colonizers on newly exposed rock are often", ["Lichens and microbes","Large mammals","Mature canopy trees","Top predators"], 0, "Pioneer species tolerate bare substrate and facilitate succession."],
    ["A keystone species has", ["A disproportionately large community effect","The highest biomass always","No competitors","A role only as a producer"], 0, "Its removal can reorganize community structure."],
    ["Matter in ecosystems differs from energy because matter", ["Cycles among organisms and environment","Is lost as heat at each trophic step","Is created by producers","Cannot enter consumers"], 0, "Elements are reused through biogeochemical cycles."],
    ["A mutualism is an interaction in which", ["Both species benefit","One benefits and one is harmed","One benefits, other unaffected","Both are harmed"], 0, "Mutualistic partners each gain fitness benefits."],
    ["A large prereproductive cohort in a population age structure often predicts", ["Potential future growth","Immediate extinction","No births","A smaller carrying capacity necessarily"], 0, "Many young individuals may soon enter reproductive ages."],
    ["After a predator is removed, prey density rises and vegetation declines. This is evidence of", ["A trophic cascade","Primary succession","Mutualism","Abiotic limitation only"], 0, "Predator effects propagate through multiple trophic levels."]
  ])
});


const frqBank = {
  "AP Calculus AB": {
    "Unit 1 Limits & Continuity": _makeFrqs("FRQ-CAL-LIM", [
      ["Piecewise continuity", "Let f(x)=(x²−4)/(x−2) for x≠2 and f(2)=k.", [
        ["Simplify f(x) for x≠2.","Factor and cancel valid nonzero factor.","f(x)=x+2."],
        ["Find lim(x→2)f(x).","Use simplified expression.","4."],
        ["Find k for continuity at x=2.","Set assigned value equal to limit.","k=4."],
        ["Classify the discontinuity if k=7.","Compare function value and limit.","Removable discontinuity; limit 4 but f(2)=7."],
        ["Explain why cancellation does not by itself define f(2).","Distinguish equivalent expressions on domain.","The original denominator is zero at x=2, so the simplified rule only gives the limit there."]
      ]],
      ["Limit from a table", "Values of g(x) near x=1 approach 3 from both sides, while g(1)=−2.", [
        ["State lim(x→1)g(x).","Read two-sided approach.","3."],
        ["Determine whether g is continuous at 1.","Compare limit and value.","No; g(1)=−2 differs from 3."],
        ["Give a value assignment that would make g continuous.","Match limit.","Define g(1)=3."],
        ["Explain why the limit can exist despite the unequal value.","Use nearby behavior.","A limit depends on values near 1, not the value at 1."],
        ["If left-hand values instead approach 2, determine the two-sided limit.","Compare one-sided limits.","It does not exist because the one-sided limits differ."]
      ]],
      ["Asymptotes and end behavior", "Consider h(x)=(2x²+3x)/(x²−4).", [
        ["Find lim(x→∞)h(x).","Compare leading coefficients.","2."],
        ["Identify vertical asymptotes.","Find denominator zeros without cancellation.","x=−2 and x=2."],
        ["Evaluate the one-sided behavior near x=2.","Analyze signs of factors.","As x→2−, h→−∞; as x→2+, h→+∞."],
        ["Find lim(x→−∞)h(x).","Use leading terms.","2."],
        ["Explain why y=2 is a horizontal asymptote.","State end-behavior criterion.","The function approaches 2 as x tends to either infinity."]
      ]]
    ]),
    "Unit 2 Differentiation": _makeFrqs("FRQ-CAL-DIF", [
      ["Tangent line", "Let f(x)=x³−2x+1.", [
        ["Find f'(x).","Apply power rule.","3x²−2."],
        ["Find the slope at x=2.","Evaluate derivative.","10."],
        ["Find the point on the curve at x=2.","Evaluate f.","(2,5)."],
        ["Write the tangent-line equation there.","Use point-slope form.","y−5=10(x−2), or y=10x−15."],
        ["Use the tangent line to estimate f(2.1).","Linear approximation.","f(2.1)≈6."]
      ]],
      ["Motion derivatives", "A particle's position for t≥0 is s(t)=t³−6t²+9t meters.", [
        ["Find velocity.","Differentiate s.","v(t)=3t²−12t+9."],
        ["Find acceleration.","Differentiate velocity.","a(t)=6t−12."],
        ["Find times when the particle is momentarily at rest.","Solve v=0.","t=1 and t=3 s."],
        ["Find acceleration at t=1.","Evaluate a.","−6 m/s²."],
        ["Explain what the sign of v(2) indicates.","Evaluate and interpret.","v(2)=−3 m/s, so position is decreasing."]
      ]],
      ["Differentiability evidence", "A continuous function has a sharp corner at x=0, with left slope −2 and right slope 3.", [
        ["Determine whether f'(0) exists.","Compare one-sided slopes.","No; the one-sided derivatives differ."],
        ["Determine whether f is continuous at zero.","Use stated evidence.","Yes."],
        ["Explain why continuity does not guarantee differentiability.","Relate slopes at corner.","Continuity requires matching values, while differentiability also requires a unique tangent slope."],
        ["State the derivative from the left.","Read slope.","−2."],
        ["State the derivative from the right.","Read slope.","3."]
      ]]
    ]),
    "Unit 3 Composite, Implicit & Inverse Functions": _makeFrqs("FRQ-CAL-CMP", [
      ["Composite rate", "Let y=(2x³−1)⁴.", [
        ["Identify the inner and outer functions.","Decompose the composition.","u=2x³−1; y=u⁴."],
        ["Find dy/dx using the chain rule.","Differentiate outer and inner.","24x²(2x³−1)³."],
        ["Evaluate the derivative at x=1.","Substitute carefully.","24."],
        ["Explain why multiplying derivatives is required.","State chain rule role.","The outer output changes with the inner input, whose own rate depends on x."],
        ["Find the tangent slope at x=0.","Evaluate derivative.","0."]
      ]],
      ["Implicit curve", "The curve x²+xy+y²=7 passes through (1,2).", [
        ["Differentiate implicitly with respect to x.","Use product rule on xy.","2x+y+xy'+2yy'=0."],
        ["Solve for dy/dx.","Collect y' terms.","y'=−(2x+y)/(x+2y)."],
        ["Find the slope at (1,2).","Substitute point.","−4/5."],
        ["Write the tangent line at (1,2).","Use point-slope form.","y−2=−(4/5)(x−1)."],
        ["Explain why y is not first isolated as a single function globally.","Note curve branches.","The implicit curve may define multiple local branches, and implicit differentiation handles them directly."]
      ]],
      ["Inverse response", "A differentiable one-to-one function has f(2)=5 and f'(2)=−4.", [
        ["State f⁻¹(5).","Use inverse relationship.","2."],
        ["Find (f⁻¹)'(5).","Use reciprocal derivative rule.","−1/4."],
        ["If f'(2) changes to zero, what happens to the inverse-derivative formula?","Consider division by derivative.","It is undefined; a differentiable inverse with finite slope is not assured there."],
        ["Explain the reciprocal relationship geometrically.","Swap coordinates.","Inverse reflections switch horizontal and vertical changes, reciprocating a nonzero slope."],
        ["Find the tangent slope of y=f(x) at x=2.","Use given derivative.","−4."]
      ]]
    ]),
    "Unit 4 Contextual Applications of Differentiation": _makeFrqs("FRQ-CAL-CTX", [
      ["Conical tank", "Water fills an inverted cone of height 12 m and radius 4 m; water depth h and surface radius r satisfy r=h/3. Volume enters at 2 m³/min.", [
        ["Express water volume in terms of h.","Use cone volume and similarity.","V=πh³/27."],
        ["Differentiate with respect to time.","Apply chain rule.","dV/dt=(πh²/9)dh/dt."],
        ["Find dh/dt at h=3 m.","Substitute inflow rate.","2=(π)dh/dt, so dh/dt=2/π m/min."],
        ["Explain why the surface radius changes with depth.","Use geometric similarity.","r=h/3, so dr/dt=(1/3)dh/dt."],
        ["Find dr/dt at h=3 m.","Use related rates.","2/(3π) m/min."]
      ]],
      ["Moving shadow", "A 2 m student walks away from a 6 m lamp at 1.5 m/s along a straight path.", [
        ["Let x be student-lamp distance and s shadow length; form a similar-triangle equation.","Use height ratios.","6/(x+s)=2/s, so s=x/2."],
        ["Find shadow-tip speed.","Differentiate tip position x+s.","(3/2)(1.5)=2.25 m/s."],
        ["Find shadow lengthening rate.","Differentiate s=x/2.","0.75 m/s."],
        ["Explain why the shadow tip moves faster than the student.","Compare rates.","Tip position is x+s and both x and s increase."],
        ["State an assumption in this model.","Name idealization.","Lamp is a point source and ground is level."]
      ]],
      ["Marginal revenue", "A firm's revenue is R(q)=100q−2q² dollars for 0≤q≤40.", [
        ["Find marginal revenue.","Differentiate R.","R'(q)=100−4q."],
        ["Find marginal revenue at q=15.","Evaluate derivative.","$40 per unit."],
        ["Find the production level maximizing revenue.","Set derivative zero and check concavity.","q=25; R''=−4<0."],
        ["Calculate maximum revenue.","Evaluate R(25).","$1250."],
        ["Interpret R'(15) in context.","State units and local meaning.","Near 15 units, one additional unit raises revenue by about $40."]
      ]]
    ]),
    "Unit 5 Analytical Applications of Differentiation": _makeFrqs("FRQ-CAL-ANA", [
      ["Derivative sign analysis", "A differentiable function has derivative f'(x)=(x+2)(x−1)²(x−4).", [
        ["Find critical numbers.","Solve f'=0.","−2, 1, and 4."],
        ["Identify intervals where f increases.","Make a sign chart.","Increasing on (−∞,−2) and (4,∞)."],
        ["Classify x=−2 and x=4.","Analyze sign changes.","Local maximum at −2; local minimum at 4."],
        ["Determine whether x=1 is an extremum.","Check sign around even-multiplicity zero.","No; f' stays negative on both sides."],
        ["Explain what a zero derivative alone establishes.","Distinguish necessary and sufficient conditions.","It identifies a critical number but does not guarantee an extremum."]
      ]],
      ["Optimization", "A farmer has 40 m of fencing for a rectangular pen beside a straight wall, so fencing is needed on only three sides.", [
        ["Let x be each perpendicular side and write area A in one variable.","Use 2x+y=40.","A=x(40−2x)."],
        ["Find the critical value maximizing area.","Differentiate and set zero.","A'=40−4x=0 gives x=10 m."],
        ["Find the corresponding length and area.","Use constraint and evaluate.","y=20 m; A=200 m²."],
        ["Justify that this is a maximum.","Use second derivative or endpoints.","A''=−4<0; endpoints yield zero area."],
        ["Explain why using the wall changes the optimal dimensions from a fenced rectangle.","Compare constraints.","Only three sides consume fencing, so optimal width and length need not be equal."]
      ]],
      ["Concavity from data", "For a twice-differentiable function, f'(x) is positive on (0,3), zero at 3, and negative on (3,6); f'' is negative on (0,4) and positive on (4,6).", [
        ["Describe monotonicity on (0,3).","Interpret f' sign.","f is increasing."],
        ["Classify x=3.","Use derivative sign change.","Local maximum."],
        ["State concavity on (0,4) and (4,6).","Use the sign of f''.","Concave down on (0,4) and concave up on (4,6)."],
        ["Identify the inflection point's x-coordinate.","Use concavity change.","x=4, if f is continuous there."],
        ["Explain why x=3 need not be an inflection point.","Compare definitions.","A local maximum is identified by f' changing sign; an inflection requires concavity to change."]
      ]]
    ]),
    "Unit 6 Integration & Accumulation": _makeFrqs("FRQ-CAL-INT", [
      ["Accumulating flow", "Water enters a reservoir at rate r(t)=6−t liters/min for 0≤t≤6; initially it contains 10 L.", [
        ["Write an integral for added water by t=4.","Integrate rate over time.","∫₀⁴(6−t)dt."],
        ["Calculate the amount added by t=4.","Evaluate the integral.","24−8=16 L."],
        ["Find the reservoir amount at t=4.","Add initial amount.","26 L."],
        ["Find when inflow stops.","Solve rate zero.","t=6 min."],
        ["Explain why the integral represents accumulation.","Connect rate and change.","The time integral of liters per minute gives net liters added."]
      ]],
      ["Riemann estimate", "A table gives f(0)=1, f(1)=3, f(2)=2, f(3)=4.", [
        ["Find the left Riemann sum for ∫₀³f(x)dx with width 1.","Use left endpoint heights.","1+3+2=6."],
        ["Find the right Riemann sum.","Use right endpoint heights.","3+2+4=9."],
        ["Find the trapezoidal estimate.","Average endpoint sums.","(6+9)/2=7.5."],
        ["State whether each rectangle estimate is an overestimate or underestimate without more shape information.","Assess interval monotonicity.","Cannot determine globally from the four values alone."],
        ["Explain how narrower subintervals generally affect approximation.","Use Riemann-sum convergence.","For continuous f, finer partitions generally converge to the definite integral."]
      ]],
      ["Velocity accumulation", "A particle's velocity is v(t)=t−2 m/s on 0≤t≤4 and its initial position is s(0)=3 m.", [
        ["Find displacement from 0 to 4.","Integrate velocity.","∫₀⁴(t−2)dt=0 m."],
        ["Find position at t=4.","Add displacement to initial position.","3 m."],
        ["Find total distance traveled.","Integrate speed over intervals split at v=0.","1+2=3 m."],
        ["Find when the particle changes direction.","Set v=0.","t=2 s."],
        ["Explain the difference between displacement and distance here.","Use signed versus absolute accumulation.","Displacement is zero; distance is 3 m because opposite directions cancel only in the signed integral."]
      ]]
    ])
  },
  "AP Biology": {
    "Unit 1 Chemistry of Life": _makeFrqs("FRQ-BIO-CHE", [
      ["Enzyme temperature", "An enzyme's relative rate is measured at 10, 20, 30, 40, and 60°C; rate rises through 30°C then falls sharply.", [
        ["Describe the trend in the observed rates.","Summarize data pattern.","Rate increases to 30°C, then declines by 60°C."],
        ["Explain the initial rise.","Connect temperature to collisions.","More molecules reach activation energy as kinetic energy increases."],
        ["Explain the decline at high temperature.","Relate structure and function.","Denaturation alters active-site shape."],
        ["Identify the independent and dependent variables.","Name manipulated and measured quantities.","Temperature; reaction rate."],
        ["Suggest a control condition.","Hold conditions constant except temperature.","Use identical enzyme/substrate concentrations and pH at each temperature."]
      ]],
      ["Macromolecule assay", "A food sample gives a positive Benedict's test after heating and a positive Biuret test; iodine test is negative.", [
        ["Identify a molecule class indicated by Benedict's test.","Interpret reducing-sugar reagent.","Reducing sugars are present."],
        ["Interpret the Biuret result.","Identify peptide bonds.","Protein is present."],
        ["Interpret the iodine result.","Identify starch assay.","No detectable starch."],
        ["Explain why a negative iodine result does not show absence of all carbohydrates.","Differentiate carbohydrate types.","Iodine detects starch, not all mono- or disaccharides."],
        ["Propose a quantitative follow-up for reducing sugar.","Describe calibration.","Measure absorbance and compare with a glucose standard curve."]
      ]],
      ["Water and osmosis", "Red blood cells are placed in solutions of 0.1%, 0.9%, and 2.0% NaCl; the middle solution is isotonic.", [
        ["Predict cell-volume change in 0.1% NaCl.","Compare external solute concentration.","Cells gain water and may lyse."],
        ["Predict change in 2.0% NaCl.","Apply osmosis.","Cells lose water and shrink."],
        ["Explain why water crosses the membrane.","Describe water potential/osmosis.","Net water movement follows the solute gradient across a selectively permeable membrane."],
        ["Identify a suitable dependent variable.","Choose measurable outcome.","Mean cell volume or fraction of lysed cells."],
        ["State why 0.9% is a useful control.","Use isotonic baseline.","It provides the no-net-volume-change comparison."]
      ]]
    ]),
    "Unit 2 Cell Structure & Function": _makeFrqs("FRQ-BIO-CEL", [
      ["Membrane transport", "Cells are placed in 0.30 M sucrose. A membrane transporter moves sucrose into cells only when ATP is supplied.", [
        ["Classify the transport mechanism.","Use energy dependence and direction if uphill.","Active transport."],
        ["Predict sucrose movement without ATP.","Use provided dependence.","Little or no transporter-mediated uptake."],
        ["Explain how a control can distinguish active transport from diffusion.","Compare energy condition.","Measure uptake with and without ATP while maintaining equal external concentration."],
        ["Predict effect of inhibiting the transporter protein.","Relate protein to flux.","Uptake decreases."],
        ["Describe one role of the plasma membrane besides transport.","Give valid function.","Cell signaling, recognition, or compartment boundary."]
      ]],
      ["Organelle tracing", "A pancreatic cell synthesizes and secretes a digestive enzyme protein.", [
        ["Name the organelle where translation of this secreted protein begins.","Identify ribosome location.","Ribosomes on rough ER."],
        ["Describe the route from synthesis to release.","Order secretory pathway.","Rough ER → transport vesicle → Golgi → secretory vesicle → plasma membrane."],
        ["Explain the Golgi's contribution.","State processing role.","Modifies, sorts, and packages proteins."],
        ["Predict the effect of blocking vesicle fusion at the plasma membrane.","Use exocytosis.","Protein accumulates in vesicles and secretion falls."],
        ["Identify an energy-demanding step and source.","Name ATP use.","Vesicle transport/fusion can require ATP from cellular respiration."]
      ]],
      ["Cell-size limits", "Two spherical cells have radii 1 μm and 3 μm.", [
        ["Compare their surface-area ratio.","Area scales as r².","Large cell has 9 times the area."],
        ["Compare their volume ratio.","Volume scales as r³.","Large cell has 27 times the volume."],
        ["Compare surface-area-to-volume ratios.","Use 3/r for spheres.","Small cell's ratio is three times larger."],
        ["Explain why this can constrain cell size.","Relate exchange to demand.","Volume-linked needs grow faster than surface available for exchange."],
        ["Give one adaptation that improves exchange without a larger cell.","Offer structural response.","Folded membrane or microvilli increase surface area."]
      ]]
    ]),
    "Unit 3 Cellular Energetics": _makeFrqs("FRQ-BIO-ENE", [
      ["Respiration inhibitor", "A chemical blocks electron transfer between complexes III and IV in mitochondria.", [
        ["Predict the effect on oxygen consumption.","Track terminal electron acceptor use.","Oxygen consumption decreases."],
        ["Predict the effect on proton pumping and gradient.","Follow electron-chain activity.","Electron flow and proton pumping decline; gradient weakens."],
        ["Predict oxidative phosphorylation rate.","Connect gradient to ATP synthase.","ATP synthesis decreases."],
        ["Explain why glycolysis may continue briefly.","Distinguish cytosol and mitochondria.","Glycolysis does not directly require mitochondrial electron transport, though NAD+ availability can later constrain it."],
        ["Name a measurement to test ATP-production effects.","Propose assay.","Measure ATP concentration or ATP synthesis rate in treated and control cells."]
      ]],
      ["Photosynthesis conditions", "Leaf disks float as oxygen accumulates. Under bright light, 18 of 20 disks float in 10 min; in darkness, 2 float.", [
        ["Identify the likely gas causing flotation.","Connect photosynthetic output.","Oxygen."],
        ["Explain the light-dependent difference.","Relate light to photosynthesis.","Light reactions supply energy for photosynthesis and oxygen release."],
        ["State one independent and dependent variable.","Name tested and measured quantities.","Light condition; number of floating disks or time to float."],
        ["Suggest a controlled variable.","Keep experimental conditions matched.","Leaf disk size, solution, temperature, or disk number."],
        ["Explain why some disks may float in darkness.","Allow respiration and experimental variation.","Trapped air or handling differences can cause flotation; dark disks do not photosynthetically produce oxygen."]
      ]],
      ["Enzyme kinetics", "An enzyme's initial rate rises with substrate concentration and plateaus at high concentration.", [
        ["Explain the initial increase.","Relate occupancy to rate.","More substrate-enzyme collisions form more enzyme-substrate complexes."],
        ["Explain the plateau.","Identify saturation.","Most active sites are occupied; enzyme concentration limits rate."],
        ["Predict effect of doubling enzyme concentration at saturating substrate.","Apply limiting factor.","Maximum rate approximately doubles."],
        ["Describe how a competitive inhibitor changes apparent substrate response.","Explain competition.","It raises apparent substrate requirement; high substrate can partly overcome inhibition."],
        ["Name a variable that must be controlled in rate comparisons.","Ensure valid test.","Temperature, pH, or enzyme concentration."]
      ]]
    ]),
    "Unit 4 Cell Communication & Cell Cycle": _makeFrqs("FRQ-BIO-COM", [
      ["Hormone response", "A hormone binds a membrane receptor and raises cytosolic cAMP in target cells; receptor-blocked cells show no cAMP rise.", [
        ["Identify the receptor-blocking cells' response.","Interpret data.","They fail to produce the measured signaling response."],
        ["Describe the role of cAMP.","Identify second messenger.","It relays/amplifies the receptor signal inside the cell."],
        ["Explain why only some cells respond to the hormone.","Use receptor specificity.","Only cells expressing the matching receptor can detect it."],
        ["Predict effect of adding cAMP directly to receptor-blocked cells.","Bypass receptor step.","Downstream responses may occur if the cAMP pathway remains functional."],
        ["Propose a control for this experiment.","Control treatment.","Expose receptor-positive cells to vehicle without hormone."]
      ]],
      ["Cell-cycle checkpoint", "Cells exposed to DNA-damaging radiation accumulate before S phase; normal cells resume cycling after repair.", [
        ["Identify the likely checkpoint response.","Interpret arrest.","Progression is delayed to prevent copying damaged DNA."],
        ["Explain why arrest can reduce mutation transmission.","Connect replication.","Repair occurs before DNA is replicated and passed to daughter cells."],
        ["Predict outcome if checkpoint signaling is lost.","Relate control failure.","Damaged cells may replicate and accumulate mutations."],
        ["Distinguish apoptosis from cell-cycle arrest.","Compare mechanisms.","Apoptosis is programmed death; arrest pauses progression."],
        ["Suggest a measurable dependent variable.","Provide assay.","Fraction of cells in each phase by DNA-content analysis."]
      ]],
      ["Signal pathway mutation", "A growth-factor receptor is constitutively active in mutant cells even without ligand.", [
        ["Predict pathway activity without growth factor.","Use mutation description.","It remains elevated."],
        ["Predict a likely cell-level consequence.","Relate growth signaling.","Increased proliferation or survival."],
        ["Explain how a receptor inhibitor could affect the mutant.","Consider target activation.","It may reduce signaling if it blocks the receptor's kinase/activity."],
        ["Propose a wild-type comparison.","Design control.","Measure pathway output in matched normal-receptor cells with and without ligand."],
        ["Explain why this mutation can contribute to cancer.","Connect cell-cycle control.","Persistent growth signals can bypass normal requirements for division."]
      ]]
    ]),
    "Unit 5 Heredity": _makeFrqs("FRQ-BIO-HER", [
      ["Dihybrid cross", "In peas, seed shape R is dominant to r and color Y to y. Cross RrYy×RrYy; genes assort independently.", [
        ["State possible gametes from each parent.","Apply independent assortment.","RY, Ry, rY, ry."],
        ["Find probability of rr.","Use monohybrid segregation.","1/4."],
        ["Find probability of yy.","Use monohybrid segregation.","1/4."],
        ["Find probability of rr yy.","Multiply independent probabilities.","1/16."],
        ["Explain the assumption required for multiplying these probabilities.","State independence.","Alleles at the two loci assort independently."]
      ]],
      ["Linkage mapping", "A testcross yields 420 parental-type and 80 recombinant offspring among 500 total.", [
        ["Calculate recombination frequency.","Recombinants divided by total.","80/500=0.16 or 16%."],
        ["Estimate map distance.","Use percent recombination for linked loci.","About 16 cM."],
        ["Explain why parental combinations predominate.","Use linkage.","Genes on the same chromosome are often inherited together."],
        ["Name a process producing recombinant gametes.","Identify meiosis event.","Crossing over between homologous chromatids."],
        ["State one limitation of this estimate for far-apart genes.","Discuss multiple crossover.","Multiple crossovers can restore parental arrangements and be undercounted."]
      ]],
      ["Sex-linked inheritance", "A carrier female for an X-linked recessive allele has children with an unaffected male.", [
        ["Write parental genotypes using Xᴺ and Xⁿ.","Represent carrier and normal male.","Mother XᴺXⁿ; father XᴺY."],
        ["Find probability a son is affected.","Condition on being a son.","1/2."],
        ["Find probability a daughter is affected.","Account for paternal Xᴺ.","0; daughters receive normal Xᴺ from father."],
        ["Find probability any child is an affected son, assuming equal sex probability.","Multiply probabilities.","1/2×1/2=1/4."],
        ["Explain why fathers do not pass an X-linked allele to sons.","Trace sex chromosomes.","Sons receive the father's Y chromosome."]
      ]]
    ]),
    "Unit 6 Gene Expression & Regulation": _makeFrqs("FRQ-BIO-GEN", [
      ["Transcription and translation", "A DNA coding strand is 5′-ATG GAA TGA-3′; assume standard codons and that TGA is a stop codon.", [
        ["Write the mRNA sequence.","Replace coding-strand T with U.","5′-AUG GAA UGA-3′."],
        ["Translate the amino-acid sequence.","Use codon table.","Methionine–glutamate, then stop."],
        ["State the role of the ribosome.","Describe translation.","It reads mRNA codons and catalyzes peptide-bond formation."],
        ["Predict the result of changing GAA to GUA.","Translate codon substitution.","Glutamate is replaced by valine (missense mutation)."],
        ["Explain why the stop codon does not encode an amino acid.","Describe termination.","It recruits release factors to terminate translation."]
      ]],
      ["Operon regulation", "In a bacterial inducible operon, a repressor binds the operator without lactose; lactose-derived allolactose can bind the repressor.", [
        ["Predict transcription when lactose is absent.","Apply repressor action.","Low; repressor blocks transcription."],
        ["Predict what allolactose binding does.","Describe inducer effect.","Changes repressor conformation so it leaves operator."],
        ["Predict transcription when lactose is present and glucose is scarce.","Combine induction and positive regulation.","High, if activator signaling also promotes transcription."],
        ["Explain why this regulation conserves resources.","Connect expression to substrate.","Enzymes are produced mainly when lactose can be used."],
        ["Describe a control for measuring operon expression.","Choose baseline condition.","Compare reporter expression in matched cells lacking inducer."]
      ]],
      ["Mutation consequences", "A one-base deletion occurs near the start of a protein-coding exon; a separate substitution changes one codon to a stop.", [
        ["Classify the deletion's likely coding effect.","Consider reading frame.","Frameshift, altering downstream codons."],
        ["Classify the stop-generating substitution.","Use mutation terminology.","Nonsense mutation."],
        ["Predict which mutation may truncate the protein sooner and why.","Compare sequence position/context.","The early frameshift may create a premature stop; the stated stop substitution terminates at its changed codon."],
        ["Explain why effects can differ among cell types for the same DNA variant.","Invoke expression regulation.","Different regulatory programs and transcript usage can alter where/how much gene product is made."],
        ["Name one method to compare resulting protein abundance.","Suggest experiment.","Immunoblot or quantitative protein assay across matched samples."]
      ]]
    ])
  },
  "AP Physics 1": {
    "Unit 1 Kinematics": _makeFrqs("FRQ-PHY-KIN", [
      ["Drone ascent", "A drone rises vertically from rest with constant acceleration 2.0 m/s² for 5.0 s, then coasts upward under gravity (g=10 m/s²).", [
        ["Find its velocity after the powered rise.","Use v=v₀+at with consistent sign.","10 m/s upward."],
        ["Find its height after 5.0 s.","Use constant-acceleration displacement.","25 m."],
        ["Find additional time until its upward velocity reaches zero.","Apply v=v₀−gt.","1.0 s."],
        ["Find its additional rise during coasting.","Use v²=v₀²−2gΔy.","5.0 m."],
        ["Sketch or describe velocity versus time through the full motion.","Award correct slopes and continuity.","Line rises to 10 m/s by 5 s, then decreases with slope −10 m/s² to zero."]
      ]],
      ["Cart data analysis", "A cart's measured positions at t=0,1,2,3 s are 1,4,9,16 m; assume a smooth trend.", [
        ["Estimate average velocity from t=1 to 3 s.","Use displacement/time.","(16−4)/2=6 m/s."],
        ["Use the data to identify a likely position model.","Recognize the square pattern with initial offset.","x≈t²+1 m."],
        ["Find the model's velocity at t=2 s.","Differentiate position.","v=2t=4 m/s."],
        ["Find its acceleration.","Differentiate velocity.","a=2 m/s²."],
        ["Explain why the average velocity from 0 to 3 s differs from v(2).","Compare secant and tangent rates.","The interval average is 5 m/s; instantaneous velocity at 2 s is 4 m/s."]
      ]],
      ["Projectile comparison", "Two balls leave a 20 m high platform simultaneously; A is dropped and B is launched horizontally at 8 m/s. Ignore drag and use g=10 m/s².", [
        ["Determine each ball's vertical acceleration.","Identify gravitational acceleration.","Both have 10 m/s² downward."],
        ["Find the fall time.","Use 20=½gt².","2.0 s."],
        ["Find B's horizontal range.","Horizontal velocity is constant.","16 m."],
        ["Compare impact speeds.","Combine horizontal and vertical components.","A: 20 m/s; B: √(8²+20²)≈21.5 m/s."],
        ["Explain why their impact times match.","Separate horizontal and vertical motion.","Their identical vertical initial velocity and acceleration give equal fall times."]
      ]]
    ]),
    "Unit 2 Dynamics": _makeFrqs("FRQ-PHY-DYN", [
      ["Connected crates", "A 4 kg crate and 2 kg crate are pulled together across a frictionless floor by a 18 N horizontal force applied to the 4 kg crate.", [
        ["Find the system acceleration.","Apply Newton's second law to combined mass.","a=18/6=3 m/s²."],
        ["Find the tension between crates.","Apply F=ma to the 2 kg crate.","T=2(3)=6 N."],
        ["Draw or describe the 4 kg crate's horizontal forces.","Name applied force and tension directions.","18 N right and 6 N left."],
        ["Find the net force on the 4 kg crate.","Use its acceleration.","4(3)=12 N right."],
        ["If the applied force is doubled, state the new acceleration and justify.","Recompute for same total mass.","36/6=6 m/s²; acceleration doubles."]
      ]],
      ["Elevator scale", "A 60 kg rider stands on a scale in an elevator; take g=10 m/s².", [
        ["Find the scale reading at rest.","Use vertical equilibrium.","N=mg=600 N."],
        ["Find the reading when accelerating upward at 2 m/s².","Use N−mg=ma.","N=720 N."],
        ["Find it while accelerating downward at 2 m/s².","Use N−mg=−ma.","N=480 N."],
        ["Describe the rider's apparent weight at constant downward speed.","Zero acceleration implies equilibrium.","600 N; speed alone does not change the reading."],
        ["State the rider's acceleration if the scale reads zero.","Apply Newton's second law.","Free fall: a=10 m/s² downward."]
      ]],
      ["Friction experiment", "A 5 kg block is pulled on a horizontal surface; a force sensor shows motion begins at 20 N and constant-speed sliding needs 15 N. Use g=10 m/s².", [
        ["Find the normal force.","Vertical equilibrium.","50 N."],
        ["Estimate the coefficient of static friction.","Use maximum static friction divided by normal force.","μs=20/50=0.40."],
        ["Estimate the coefficient of kinetic friction.","Use sliding friction divided by normal force.","μk=15/50=0.30."],
        ["Predict acceleration for a 25 N pull while sliding.","Net force is 25−15 N.","a=10/5=2 m/s²."],
        ["Propose one controlled method to test whether kinetic friction depends on speed.","Vary speed while controlling other factors.","Pull same block at several steady speeds and compare sensor force."]
      ]]
    ]),
    "Unit 3 Circular Motion & Gravitation": _makeFrqs("FRQ-PHY-CIR", [
      ["Turntable motion", "A 0.20 kg puck moves in a horizontal circle of radius 0.50 m at 2.0 m/s, held by a string.", [
        ["Find its centripetal acceleration.","Use v²/r.","8.0 m/s² inward."],
        ["Find the string tension.","The string provides centripetal force.","1.6 N."],
        ["Find the period.","Use circumference divided by speed.","T=2πr/v≈1.57 s."],
        ["Predict the acceleration if speed triples at fixed radius.","Use a=v²/r.","It becomes nine times as large, 72 m/s²."],
        ["Describe the path after the string breaks.","Use instantaneous velocity direction.","The puck travels tangent to the circle at release."]
      ]],
      ["Satellite orbit", "A satellite travels in a circular orbit of radius r around a planet of mass M; gravitational constant is G.", [
        ["Write the gravitational force magnitude.","Use Newton's law of gravitation.","F=GMm/r²."],
        ["Derive the satellite's orbital speed.","Set gravity equal to mv²/r.","v=√(GM/r)."],
        ["State how speed changes if orbital radius becomes 4r.","Apply the derived dependence.","Speed halves."],
        ["Explain whether satellite mass affects orbital speed.","Cancel mass in centripetal equation.","No; m cancels, so v depends on M and r."],
        ["Compare periods at r and 4r.","Use T=2πr/v or Kepler relation.","T(4r)/T(r)=8."]
      ]],
      ["Curve safety", "A 1000 kg car rounds a level curve of radius 50 m. The tire-road friction coefficient is 0.40; use g=10 m/s².", [
        ["Identify the force supplying centripetal acceleration.","Construct a horizontal force model.","Static friction toward the curve center."],
        ["Find the maximum friction force.","Use μN and N=mg.","4000 N."],
        ["Find the maximum safe speed.","Set mv²/r=μmg.","v=√(μgr)=√200≈14.1 m/s."],
        ["Predict the effect of doubling the radius on safe speed.","Use v∝√r.","Speed increases by √2."],
        ["Explain why friction points inward rather than outward.","Relate net force to acceleration.","Centripetal acceleration is inward, so net horizontal force must be inward."]
      ]]
    ]),
    "Unit 4 Energy": _makeFrqs("FRQ-PHY-ENE", [
      ["Ramp and spring", "A 2 kg cart starts from rest 1.8 m above a spring; it slides without friction and compresses a spring with k=400 N/m. Use g=10 m/s².", [
        ["Find the initial gravitational potential energy relative to the spring level.","Use mgh.","36 J."],
        ["Find the cart's speed just before spring contact.","Conserve mechanical energy.","v=√(2gh)=6.0 m/s."],
        ["Find maximum spring compression.","Set spring energy equal to 36 J.","x=√(72/400)=0.424 m."],
        ["Describe energy at maximum compression.","Identify kinetic and elastic energies.","K=0; 36 J is stored elastically."],
        ["Predict how compression changes if cart mass doubles at fixed height and spring.","Use ½kx²=mgh.","Compression increases by √2."]
      ]],
      ["Power on a hill", "A 500 kg electric cart rises 12 m vertically in 20 s at constant speed; ignore losses and use g=10 m/s².", [
        ["Find the increase in gravitational potential energy.","Use mgh.","60,000 J."],
        ["Find the minimum average power.","Divide energy by time.","3000 W."],
        ["Find the work done by gravity.","Gravity opposes upward displacement.","−60,000 J."],
        ["If the motor efficiency is 75%, find energy drawn from its battery.","Useful energy is efficiency times input.","80,000 J."],
        ["Explain why constant speed does not mean zero motor work.","Use work-energy and force balance.","Motor's positive work offsets gravity's negative work; net work is zero."]
      ]],
      ["Force-position investigation", "A variable force acts on a 1 kg cart: F=4 N from x=0–2 m, then decreases linearly to zero from x=2–5 m.", [
        ["Find work over the first 2 m.","Area under F-x graph.","8 J."],
        ["Find work from 2 to 5 m.","Triangular area.","6 J."],
        ["Find total work.","Add areas.","14 J."],
        ["If the cart starts from rest, find its final speed.","Use Wnet=ΔK.","v=√28≈5.29 m/s."],
        ["Describe how an opposing 2 N friction force changes the total work.","Subtract friction work across 5 m.","Friction does −10 J; net work becomes 4 J."]
      ]]
    ]),
    "Unit 5 Momentum": _makeFrqs("FRQ-PHY-MOM", [
      ["Air-track collision", "A 0.40 kg glider at 3 m/s collides and sticks to a stationary 0.60 kg glider on a low-friction track.", [
        ["Find total initial momentum.","Add signed momenta.","1.2 kg·m/s."],
        ["Find their common final velocity.","Conserve momentum.","1.2/1.0=1.2 m/s in the original direction."],
        ["Find initial kinetic energy.","Use ½mv².","1.8 J."],
        ["Find final kinetic energy and classify the collision.","Calculate combined kinetic energy.","0.72 J; perfectly inelastic, so kinetic energy is not conserved."],
        ["State one reason the track is useful experimentally.","Reduce external impulse.","Low friction makes the two-glider system approximately isolated."]
      ]],
      ["Protective padding", "A 0.15 kg ball moving at 20 m/s is stopped by a wall; stopping time is 0.010 s with padding and 0.002 s without.", [
        ["Find the ball's momentum change magnitude.","Use final minus initial momentum magnitude.","3.0 kg·m/s."],
        ["Find average force magnitude with padding.","Use impulse divided by time.","300 N."],
        ["Find the average force without padding.","Use shorter stopping interval.","1500 N."],
        ["Explain the padding's effect using impulse.","Same momentum change over longer time.","Longer collision time reduces average force."],
        ["Describe an appropriate graph comparison.","Force-time areas match impulse.","The padded pulse is wider and lower; both areas are 3.0 N·s."]
      ]],
      ["Two-dimensional recoil", "A robot that has mass 4 kg after ejection initially rests, then ejects a 1 kg module east at 6 m/s on a frictionless surface.", [
        ["Write the initial total momentum.","State the system momentum.","Zero."],
        ["Find robot velocity after ejection.","Conserve horizontal momentum.","4v+6=0, so v=−1.5 m/s (west)."],
        ["Compare magnitudes of the two momenta.","Use momentum conservation.","Both are 6 kg·m/s, in opposite directions."],
        ["Find total kinetic energy after ejection.","Add kinetic energies.","18+4.5=22.5 J."],
        ["Explain why kinetic energy increased without violating conservation.","Identify energy source.","Stored internal energy converted to kinetic energy; momentum remains conserved."]
      ]]
    ]),
    "Unit 6 Simple Harmonic Motion": _makeFrqs("FRQ-PHY-SHM", [
      ["Spring oscillator", "A 0.50 kg block oscillates on a horizontal spring with k=8.0 N/m and amplitude 0.20 m; friction is negligible.", [
        ["Find angular frequency and period.","Use ω=√(k/m), T=2π/ω.","ω=4 rad/s; T=π/2≈1.57 s."],
        ["Find total mechanical energy.","Use ½kA².","0.16 J."],
        ["Find maximum speed.","Set total energy equal to maximum kinetic energy.","vmax=ωA=0.80 m/s."],
        ["Find acceleration at displacement x=0.10 m.","Use a=−(k/m)x.","−1.6 m/s², toward equilibrium."],
        ["Describe speed and restoring force at equilibrium.","Evaluate at x=0.","Speed is maximum; spring force and acceleration are zero."]
      ]],
      ["Pendulum timing", "A small-angle pendulum has length 0.90 m; use g=10 m/s².", [
        ["Estimate its period.","Use T=2π√(L/g).","T≈1.89 s."],
        ["Predict the period if the bob mass triples.","Inspect period equation.","Unchanged; mass is absent."],
        ["Predict the period if length becomes 3.6 m.","Apply square-root scaling.","It doubles to about 3.78 s."],
        ["Explain why a large-angle release can change the ideal estimate.","State model limitation.","The small-angle approximation sinθ≈θ becomes less accurate."],
        ["Propose a measurement method to reduce timing uncertainty.","Use repeated cycles.","Time many oscillations, divide by cycle count, and repeat trials."]
      ]],
      ["Energy through an oscillation", "A 0.25 kg mass on a spring has total energy 0.50 J and amplitude 0.10 m.", [
        ["Find the spring constant.","Use E=½kA².","k=100 N/m."],
        ["Find maximum speed.","Use E=½mv².","vmax=2.0 m/s."],
        ["At x=0.06 m find spring potential energy.","Use ½kx².","0.18 J."],
        ["Find kinetic energy at that displacement.","Subtract from total.","0.32 J."],
        ["Explain why acceleration at x=−0.06 m points positive.","Use Hooke's law.","The restoring acceleration is opposite displacement."]
      ]]
    ])
  },
  "AP Chemistry": {
    "Unit 1 Atomic Structure & Properties": _makeFrqs("FRQ-CHE-ATO", [
      ["Isotope abundance", "Element Q has isotopes of mass 24.0 u and 26.0 u. The measured average atomic mass is 24.6 u.", [
        ["Let x be the fractional abundance of Q-26; write a mass-balance equation.","Weight isotope masses by fractions.","24.0(1−x)+26.0x=24.6."],
        ["Solve for the abundance of Q-26.","Solve the weighted average.","x=0.30, or 30%."],
        ["Determine the abundance of Q-24.","Fractions sum to one.","70%."],
        ["For Q-26 with atomic number 12, state protons and neutrons.","Use atomic and mass numbers.","12 protons and 14 neutrons."],
        ["Explain why an ion's isotope identity is not changed by electron loss.","Distinguish nuclear and electron changes.","Ionization changes electron count; isotope identity depends on nuclear neutron count."]
      ]],
      ["Photoelectron evidence", "Photoelectron spectroscopy of element Z shows peaks corresponding to 2, 2, and 3 electrons in successively higher subshells.", [
        ["State the total number of electrons represented.","Add peak populations.","7 electrons."],
        ["Write the ground-state electron configuration.","Fill subshells in energy order.","1s² 2s² 2p³."],
        ["Identify the number of valence electrons.","Count outer-shell electrons.","5."],
        ["Predict the common ion charge for a simple monatomic ion and explain.","Consider attaining a noble-gas configuration.","Often 3− by gaining three electrons."],
        ["Explain why electrons in the outer subshell have lower binding energy.","Relate distance and shielding.","They experience weaker effective attraction from the nucleus."]
      ]],
      ["Periodic trend study", "A class compares atomic radii and first ionization energies of Li, Be, B, and C.", [
        ["Predict the overall radius trend across the set.","Relate effective nuclear charge and shell.","Radius generally decreases Li to C."],
        ["Predict the overall first-ionization-energy trend.","More nuclear attraction makes removal harder.","Generally increases across the period."],
        ["Explain why B's first ionization energy is slightly below Be's.","Compare subshells.","B's removed 2p electron is higher in energy than Be's 2s electron."],
        ["Define effective nuclear charge.","Account for shielding.","Net positive attraction experienced by an electron after shielding."],
        ["Give a measurement-based way to compare ionization energies.","Describe experimental evidence.","Compare energy needed to remove one electron from gaseous atoms."]
      ]]
    ]),
    "Unit 2 Molecular & Ionic Compound Structure": _makeFrqs("FRQ-CHE-STR", [
      ["Unknown molecule", "A molecule has formula AX₃; the central atom A has one lone pair and three single bonds.", [
        ["Determine the electron-domain geometry.","Count four domains.","Tetrahedral."],
        ["Determine molecular geometry and approximate bond angle.","Exclude lone pair from shape name.","Trigonal pyramidal; angle slightly less than 109.5°."],
        ["Predict whether the molecule has a net dipole if all X atoms are identical.","Consider symmetry and lone pair.","Yes, bond dipoles do not cancel in the pyramidal geometry."],
        ["Draw or describe a valid Lewis electron arrangement.","Show three bonds and one lone pair.","A has three shared pairs and one lone pair; each X completes its valence shell."],
        ["Explain why lone-pair repulsion alters the bond angle.","Compare electron-domain repulsions.","A lone pair occupies more space and compresses bonding domains."]
      ]],
      ["Ionic lattice", "A solid compound forms from M²⁺ and X⁻ ions; ionic radii are 0.070 nm and 0.140 nm, respectively.", [
        ["Write the empirical formula.","Balance charge.","MX₂."],
        ["Describe the charge balance in one formula unit.","Sum cation and anion charges.","(+2)+2(−1)=0."],
        ["Predict relative lattice attraction compared with a 1+/1− solid at equal separation.","Use Coulombic charge product.","Stronger for M²⁺/X⁻ due to larger charge product."],
        ["Explain why the crystal is electrically neutral overall.","Use repeating-unit charge balance.","Equal total positive and negative charge in the lattice."],
        ["Predict which ion is larger and explain using the given data.","Compare radii.","X− is larger: 0.140 nm versus 0.070 nm."]
      ]],
      ["Resonance and bonding", "The carbonate ion, CO₃²⁻, has three equivalent C–O bonds in experimental data.", [
        ["Describe the Lewis-resonance model.","Give equivalent contributors.","Three structures place one C=O bond in different positions."],
        ["Estimate average C–O bond order.","Average formal bond orders.","(2+1+1)/3=4/3."],
        ["Explain why all bonds have equal length.","Relate delocalization to equivalence.","π bonding and charge are delocalized over all three C–O links."],
        ["Find the formal charge on carbon in a typical contributor.","Apply formal-charge counting.","Carbon's formal charge is zero."],
        ["State the ion's molecular geometry.","Count three domains at carbon.","Trigonal planar."]
      ]]
    ]),
    "Unit 3 Intermolecular Forces & Properties": _makeFrqs("FRQ-CHE-IMF", [
      ["Boiling-point comparison", "At 1 atm, ethanol boils at 78°C and dimethyl ether at −25°C; both have formula C₂H₆O.", [
        ["Identify the strongest intermolecular force between ethanol molecules.","Use structure and O–H bond.","Hydrogen bonding."],
        ["Identify the strongest force in dimethyl ether.","Recognize polar molecule without O–H donor.","Dipole-dipole attractions; also dispersion."],
        ["Explain the large boiling-point difference.","Connect attraction strength to vaporization.","Ethanol hydrogen bonds require more energy to separate molecules."],
        ["Predict which has higher vapor pressure at 20°C.","Relate volatility to boiling point.","Dimethyl ether has higher vapor pressure."],
        ["State a structural feature responsible for hydrogen bonding in ethanol.","Identify donor and acceptor.","An O–H bond and oxygen lone pairs."]
      ]],
      ["Gas-law collection", "A 0.50 mol ideal gas occupies 12.3 L at 300 K; use R=0.0821 L·atm·mol⁻¹·K⁻¹.", [
        ["Calculate its pressure.","Use PV=nRT.","P≈1.00 atm."],
        ["Find its volume at 600 K if pressure stays constant.","Use Charles's law.","24.6 L."],
        ["Find its pressure if original sample is compressed to 6.15 L at 300 K.","Use Boyle's law.","2.00 atm."],
        ["Explain why absolute temperature is used.","Relate to molecular kinetic energy.","Kelvin is proportional to average translational kinetic energy and has an absolute zero."],
        ["Name one condition where ideal behavior is least accurate.","Discuss particle assumptions.","High pressure or low temperature, where volume and attractions matter."]
      ]],
      ["Solution preparation", "A student dissolves 5.85 g NaCl (molar mass 58.5 g/mol) and makes 500. mL solution.", [
        ["Calculate moles of NaCl.","Divide mass by molar mass.","0.100 mol."],
        ["Calculate molarity.","Use moles per liter.","0.200 M."],
        ["Determine moles in a 25.0 mL aliquot.","Use n=MV.","0.00500 mol."],
        ["Describe how to make a 0.0500 M dilution from the stock.","Apply M₁V₁=M₂V₂ for 100 mL final.","Measure 25.0 mL stock and dilute to 100. mL."],
        ["Explain why dissolving NaCl increases electrical conductivity.","Describe mobile charge carriers.","Dissociation produces mobile Na+ and Cl− ions."]
      ]]
    ]),
    "Unit 4 Chemical Reactions": _makeFrqs("FRQ-CHE-REA", [
      ["Precipitation stoichiometry", "50.0 mL of 0.200 M AgNO₃ is mixed with 40.0 mL of 0.150 M NaCl; AgCl(s) forms.", [
        ["Write the balanced molecular equation.","Conserve atoms and charge.","AgNO₃+NaCl→AgCl+NaNO₃."],
        ["Calculate initial moles of each reactant.","Use n=MV.","AgNO₃: 0.0100 mol; NaCl: 0.00600 mol."],
        ["Identify limiting reactant and theoretical AgCl amount.","Use 1:1 stoichiometry.","NaCl limits; 0.00600 mol AgCl."],
        ["Calculate theoretical mass of AgCl (M=143.3 g/mol).","Multiply amount by molar mass.","0.860 g."],
        ["Write the net ionic equation.","Remove spectator ions.","Ag⁺(aq)+Cl⁻(aq)→AgCl(s)."]
      ]],
      ["Redox metal reaction", "A strip of Zn(s) is placed in CuSO₄(aq), forming ZnSO₄(aq) and Cu(s).", [
        ["Write the balanced net ionic equation.","Represent aqueous ions and solid.","Zn(s)+Cu²⁺(aq)→Zn²⁺(aq)+Cu(s)."],
        ["Identify the species oxidized.","Track oxidation-state increase.","Zn: 0 to +2."],
        ["Identify the oxidizing agent.","Species reduced accepts electrons.","Cu²⁺ is reduced and is the oxidizing agent."],
        ["Write the oxidation half-reaction.","Balance electrons.","Zn→Zn²⁺+2e⁻."],
        ["Predict the solution's blue-color change and explain.","Relate color to Cu²⁺.","Blue fades as Cu²⁺ ions are consumed."]
      ]],
      ["Combustion analysis", "A 0.440 g sample of a compound containing C and H yields 0.880 g CO₂ and 0.360 g H₂O on complete combustion.", [
        ["Calculate moles of carbon in the sample.","Each CO₂ contains one C.","0.0200 mol C."],
        ["Calculate moles of hydrogen atoms.","Each H₂O contains two H.","0.0400 mol H."],
        ["Determine the empirical formula.","Find simplest mole ratio.","CH₂."],
        ["If molar mass is 42 g/mol, find molecular formula.","Compare empirical mass 14.","Three empirical units: C₃H₆."],
        ["Explain why complete combustion products reveal the original C and H amounts.","Use atom conservation.","All sample carbon becomes CO₂ and all hydrogen becomes H₂O."]
      ]]
    ]),
    "Unit 5 Kinetics": _makeFrqs("FRQ-CHE-KIN", [
      ["Initial-rate data", "For A+B→products: [A],[B],rate are (0.10,0.10,2.0×10⁻³), (0.20,0.10,8.0×10⁻³), and (0.10,0.30,6.0×10⁻³), with concentrations in M and rate in M/s.", [
        ["Determine order in A.","Compare trials 1 and 2.","Doubling [A] quadruples rate; second order."],
        ["Determine order in B.","Compare trials 1 and 3.","Tripling [B] triples rate; first order."],
        ["Write the rate law.","Combine experimentally determined orders.","rate=k[A]²[B]."],
        ["Calculate k from trial 1.","Substitute concentrations and rate.","k=2.0 M⁻²s⁻¹."],
        ["Predict rate if both reactants double from trial 1.","Apply rate-law factors.","Rate increases 4×2=8-fold to 1.6×10⁻² M/s."]
      ]],
      ["Temperature and rate", "A reaction's measured rate constant is 0.010 s⁻¹ at 290 K and 0.040 s⁻¹ at 310 K.", [
        ["State how the rate constant changes.","Compare values.","It increases fourfold."],
        ["Explain the trend using collision theory.","Relate temperature to energy distribution.","A larger fraction of collisions exceeds activation energy."],
        ["Predict whether a catalyst changes equilibrium composition.","Distinguish kinetics from thermodynamics.","No; it speeds forward and reverse reactions."],
        ["Describe an experiment to determine reaction order from concentration data.","Identify data and graph strategy.","Measure concentration over time and test linear [A], ln[A], or 1/[A] plots."],
        ["For a first-order process with k=0.040 s⁻¹, calculate half-life.","Use ln2/k.","17.3 s."]
      ]],
      ["Mechanism test", "Proposed mechanism: (1) NO₂+NO₂→NO₃+NO slow; (2) NO₃+CO→NO₂+CO₂ fast.", [
        ["Write the overall reaction.","Cancel intermediates.","NO₂+CO→NO+CO₂."],
        ["Identify the intermediate.","Species made then consumed.","NO₃."],
        ["Predict rate law from the slow elementary step.","Use reactants of step 1.","rate=k[NO₂]²."],
        ["Explain why NO₃ is absent from the net equation.","Cancel across steps.","It is produced and consumed and therefore an intermediate."],
        ["State one experimental check of the predicted rate law.","Vary concentration systematically.","Measure initial rate while varying [NO₂] at fixed [CO]."]
      ]]
    ]),
    "Unit 6 Thermodynamics": _makeFrqs("FRQ-CHE-THER", [
      ["Coffee-cup calorimetry", "A 0.0500 mol reaction warms 100.0 g water from 22.0°C to 28.0°C; cwater=4.18 J g⁻¹°C⁻¹.", [
        ["Calculate heat absorbed by water.","Use q=mcΔT.","qwater=+2.51 kJ."],
        ["Find heat released by reaction, assuming no losses.","Use energy conservation.","qrxn=−2.51 kJ."],
        ["Calculate molar reaction enthalpy.","Divide by reaction amount.","ΔH≈−50.2 kJ/mol."],
        ["Classify the reaction as exothermic or endothermic.","Interpret enthalpy sign.","Exothermic."],
        ["Name one source of experimental error and its likely impact.","Connect heat loss to measured q.","Heat lost to cup/environment makes measured temperature rise too small, underestimating |ΔH|."]
      ]],
      ["Free-energy prediction", "A reaction has ΔH=−30.0 kJ/mol and ΔS=−80.0 J mol⁻¹ K⁻¹.", [
        ["Convert entropy to kJ mol⁻¹ K⁻¹.","Convert joule units.","−0.0800 kJ mol⁻¹ K⁻¹."],
        ["Write ΔG(T).","Use ΔG=ΔH−TΔS.","ΔG=−30.0+0.0800T kJ/mol."],
        ["Find the temperature where ΔG=0.","Set expression to zero.","375 K."],
        ["Predict spontaneity at 300 K.","Evaluate sign.","ΔG=−6.0 kJ/mol; spontaneous."],
        ["Predict spontaneity at 500 K and explain.","Evaluate free energy.","ΔG=+10 kJ/mol; not spontaneous in forward direction."]
      ]],
      ["Formation enthalpies", "For 2H₂(g)+O₂(g)→2H₂O(l), ΔHf°[H₂O(l)]=−286 kJ/mol; elements in standard states have zero formation enthalpy.", [
        ["Calculate reaction enthalpy.","Use products minus reactants.","ΔH°=2(−286)=−572 kJ."],
        ["State the heat sign for the system at constant pressure.","Relate q_p to ΔH.","q_p=−572 kJ per reaction as written."],
        ["Explain why H₂ and O₂ contribute zero in this calculation.","Apply formation definition.","Each is an element in its standard state."],
        ["Find ΔH for producing 0.50 mol H₂O(l).","Scale stoichiometrically.","−143 kJ."],
        ["Describe energy flow to surroundings.","Use exothermic sign.","The system releases heat to surroundings."]
      ]]
    ])
  }
};

delete frqBank["AP Physics 1"]["Unit 2 Dynamics"];
Object.assign(frqBank["AP Physics 1"], {
  "Unit 2 Force and Translational Dynamics": _makeFrqs("FRQ-PHY-FORCE", [
    ["Cart with drag", "A 2 kg cart is pulled right by 18 N while moving; kinetic friction is 4 N left and air drag is 2 N left.", [
      ["Draw or describe the horizontal forces on the cart.","Identify applied force, friction, and drag with directions.","18 N right; 4 N friction and 2 N drag left."],
      ["Find the net horizontal force.","Add signed forces.","Fnet=18−4−2=12 N right."],
      ["Find the acceleration.","Apply Newton's second law.","a=12/2=6 m/s² right."],
      ["Find the pulling force needed for constant speed.","Set net force to zero.","Fpull=4+2=6 N."],
      ["Explain what happens to acceleration if drag grows to 6 N with the pull unchanged.","Recompute net force and use the same mass.","Net force is 18−4−6=8 N, so a=4 m/s² right."]
    ]],
    ["Spring and incline", "A 1 kg block is released from rest on a frictionless 30° incline; it is attached to a spring parallel to the slope. Take g=10 m/s².", [
      ["Find the block's weight component down the slope.","Resolve mg parallel to incline.","mg sin30°=5 N."],
      ["Write the block's acceleration before the spring is stretched.","Apply Fnet=ma along slope.","a=5 m/s² downhill."],
      ["At extension 0.20 m, find spring force if k=100 N/m.","Use Hooke's law.","Fspring=kx=20 N uphill."],
      ["Find net force and acceleration at that extension.","Subtract downhill gravity component from spring force.","15 N uphill; a=15 m/s² uphill."],
      ["Propose a measurement to test whether spring force is proportional to extension.","Vary extension and measure force.","Record force for several extensions and test whether an F-versus-x graph is linear through the origin."]
    ]],
    ["Circular motion on a curve", "A 1000 kg car moves around a level circular curve of radius 50 m at 10 m/s; static tire friction supplies the inward force. Use g=10 m/s².", [
      ["Find centripetal acceleration.","Use v²/r.","a_c=100/50=2 m/s² inward."],
      ["Find the required inward net force.","Use Newton's second law.","Fnet=ma=2000 N inward."],
      ["Find the minimum coefficient of static friction required.","Use f_s=μN with N=mg.","μ=2000/10000=0.20."],
      ["If speed doubles at the same radius, find the new friction requirement.","Centripetal force scales as v².","The required force and μ become four times as large: 8000 N and μ=0.80."],
      ["Explain why a car may slide outward when friction is insufficient without positing an outward force.","Relate motion to missing inward net force.","The car continues approximately tangent while lacking enough inward acceleration to follow the curve."]
    ]]
  ]),
  "Unit 5 Torque and Rotational Dynamics": _makeFrqs("FRQ-PHY-TORQUE", [
    ["Opening a hatch", "A 20 N force is applied perpendicular to a hatch 0.60 m from its hinge. The hatch has rotational inertia 3.0 kg·m².", [
      ["Find the applied torque magnitude.","Use perpendicular lever arm.","τ=Fr=12 N·m."],
      ["Find angular acceleration if opposing friction torque is 3.0 N·m.","Subtract opposing torque, then divide by I.","α=(12−3)/3=3 rad/s²."],
      ["Find angular speed after 2 s from rest.","Use constant angular acceleration.","ω=αt=6 rad/s."],
      ["Find angular displacement in those 2 s.","Use rotational kinematics.","Δθ=½αt²=6 rad."],
      ["Describe how torque changes if the same force is applied at 30° to the radius.","Use perpendicular component.","τ=Fr sin30°=6 N·m, half the perpendicular value."]
    ]],
    ["Balance beam", "A massless horizontal beam is pivoted at its center. A 30 N load is 0.8 m left of the pivot.", [
      ["Find the load's torque magnitude.","Multiply force by lever arm.","24 N·m."],
      ["State the direction of the load's torque.","Use rotational tendency.","Counterclockwise."],
      ["Where should a 20 N force act on the right to balance it?","Set clockwise and counterclockwise torque equal.","At 1.2 m from pivot, downward."],
      ["Find the net torque if that force acts only 1.0 m away.","Subtract opposing torques.","24−20=4 N·m counterclockwise."],
      ["Explain why zero net torque does not require zero forces.","Distinguish force balance from torque balance.","Forces can be nonzero and either balance translationally or form a couple."]
    ]],
    ["Rotating platform investigation", "Students measure angular speed for a platform after applying a known tangential force at radius r; rotational inertia I is known.", [
      ["State the torque exerted by force F at the rim.","Identify perpendicular geometry.","τ=Fr."],
      ["Relate measured angular acceleration to torque and inertia.","Apply rotational Newton's law.","Fr=Iα."],
      ["Predict the effect of doubling r at fixed F and I.","Use proportionality.","Angular acceleration doubles."],
      ["Describe a graph that tests the rotational law.","Specify plotted variables and trend.","Plot torque Fr versus measured α; a straight line through the origin has slope I."],
      ["Name one control needed for reliable trials.","Keep physical conditions fixed.","Use the same platform and keep bearing friction and applied-force direction consistent."]
    ]]
  ]),
  "Unit 6 Energy and Momentum of Rotating Systems": _makeFrqs("FRQ-PHY-ROTE", [
    ["Rolling cylinder", "A solid cylinder of mass 2 kg and radius 0.20 m rolls without slipping at 3 m/s on a level track.", [
      ["Find its angular speed.","Use v=ωR.","ω=15 rad/s."],
      ["Find its translational kinetic energy.","Use ½Mv².","Ktrans=9 J."],
      ["Find its rotational kinetic energy.","Use I=½MR² and Krot=½Iω².","I=0.040 kg·m²; Krot=4.5 J."],
      ["Find the total kinetic energy.","Add independent energy components.","Ktotal=13.5 J."],
      ["Explain what changes if the cylinder begins slipping while its center speed is unchanged.","Distinguish rolling constraint from rotation.","ω need not equal v/R, so rotational kinetic energy and total energy can differ."]
    ]],
    ["Skater and angular momentum", "A skater spins with I=4 kg·m² at 2 rad/s, then draws in her arms so I becomes 2 kg·m²; external torque is negligible.", [
      ["Find initial angular momentum.","Use L=Iω.","L=8 kg·m²/s."],
      ["Find final angular speed.","Conserve angular momentum.","ωf=8/2=4 rad/s."],
      ["Compare initial and final rotational kinetic energy.","Calculate ½Iω² in each state.","Ki=8 J; Kf=16 J."],
      ["Explain the source of increased rotational kinetic energy.","Use work-energy reasoning.","The skater does internal work pulling the arms inward."],
      ["Predict angular speed if the final inertia instead is 8 kg·m².","Apply L conservation.","ω=1 rad/s."]
    ]],
    ["Impulsive collision at a pivot", "A 0.20 kg clay ball moving at 10 m/s sticks to the end of a 0.50 m light rod pivoted at its center; the rod's initial rotation is zero.", [
      ["Find the ball's initial angular momentum about the pivot.","Use perpendicular L=rmv.","L=0.50(0.20)(10)=1.0 kg·m²/s."],
      ["Find the combined rotational inertia after collision.","Treat stuck ball as point mass.","I=mr²=0.20(0.50²)=0.050 kg·m²."],
      ["Find angular speed immediately after collision.","Conserve angular momentum about pivot.","ω=L/I=20 rad/s."],
      ["Find the post-collision rotational kinetic energy.","Use ½Iω².","K=10 J."],
      ["Explain why kinetic energy need not be conserved in this collision.","Characterize sticking collision.","Some initial kinetic energy becomes internal energy, sound, or deformation."]
    ]]
  ]),
  "Unit 8 Fluids": _makeFrqs("FRQ-PHY-FLUID", [
    ["Floating research buoy", "A sealed buoy of volume 0.030 m³ floats in freshwater of density 1000 kg/m³ with 0.018 m³ submerged; use g=10 m/s².", [
      ["Find the buoyant force.","Use displaced-fluid weight.","FB=ρVsubg=180 N."],
      ["Find the buoy's mass when in floating equilibrium.","Set weight equal to buoyancy.","m=180/10=18 kg."],
      ["Find the fraction of buoy volume submerged.","Divide displaced by total volume.","0.018/0.030=0.60."],
      ["Predict the submerged volume in a liquid of density 1200 kg/m³ for the same buoy.","Equate buoyancy to its 180 N weight.","Vsub=180/(1200·10)=0.015 m³."],
      ["Explain why buoyant force acts upward.","Describe pressure variation.","Pressure is greater at the object's bottom than top, producing a net upward force."]
    ]],
    ["Hydraulic lift", "A hydraulic lift has input piston area 0.020 m² and output area 0.50 m²; an ideal fluid transmits pressure.", [
      ["Find output force for a 200 N input.","Use equal pressure in both pistons.","Fout=200(0.50/0.020)=5000 N."],
      ["Find pressure transmitted by the input.","Divide force by area.","P=200/0.020=10,000 Pa."],
      ["How far does output piston rise if input piston moves down 0.25 m?","Conserve displaced fluid volume.","dout=0.020(0.25)/0.50=0.010 m."],
      ["Compare input work and output work ideally.","Calculate force times displacement.","Both are 50 J."],
      ["Name a reason a real lift delivers less useful output work.","Identify nonideal energy transfer.","Fluid friction, leakage, or mechanical deformation dissipates energy."]
    ]],
    ["Flow through a narrowing pipe", "Water flows steadily through a horizontal pipe of area 8 cm² and then a section of area 2 cm²; speed in the wide section is 1.5 m/s.", [
      ["Find the speed in the narrow section.","Apply continuity.","v₂=(8/2)(1.5)=6 m/s."],
      ["Find volume flow rate in SI units.","Use Q=Av.","Q=8×10⁻⁴(1.5)=1.2×10⁻³ m³/s."],
      ["Compare static pressures in the two sections for ideal flow.","Apply Bernoulli at equal height.","Pressure is lower in the faster narrow section."],
      ["Calculate the pressure difference Pwide−Pnarrow using water density 1000 kg/m³.","Use Bernoulli's equation.","½ρ(v₂²−v₁²)=½(1000)(36−2.25)=16,875 Pa."],
      ["State an assumption in the model.","Name an idealization.","Flow is steady and incompressible with negligible viscosity."]
    ]]
  ])
});

Object.assign(frqBank["AP Chemistry"], {
  "Unit 7 Equilibrium": _makeFrqs("FRQ-CHE-EQ7", [
    ["Gas equilibrium", "For N₂O₄(g)⇌2NO₂(g), a mixture at equilibrium has [N₂O₄]=0.20 M and [NO₂]=0.40 M.", [
      ["Write the equilibrium-constant expression.","Use products over reactants and coefficients.","Kc=[NO₂]²/[N₂O₄]."],
      ["Calculate Kc for these data.","Substitute equilibrium concentrations.","Kc=(0.40)²/0.20=0.80."],
      ["If [NO₂] is suddenly increased, state the initial comparison of Q and K.","Update numerator of reaction quotient.","Q becomes greater than K."],
      ["Predict the direction of net reaction after that disturbance.","Apply Le Châtelier's principle.","The reaction shifts left, forming N₂O₄."],
      ["Explain why Kc remains unchanged after concentration is changed at constant temperature.","Separate K from Q.","K depends on temperature, while concentrations adjust until Q returns to K."]
    ]],
    ["Equilibrium and temperature", "The reaction 2SO₂(g)+O₂(g)⇌2SO₃(g) is exothermic in the forward direction.", [
      ["Predict the shift when O₂ is added.","Apply reactant perturbation.","Shifts right toward SO₃."],
      ["Predict the shift when volume is decreased.","Compare gaseous stoichiometric totals.","Shifts right, from three gas moles to two."],
      ["Predict how K changes if temperature increases.","Treat heat as a product for forward reaction.","K decreases because heating favors the endothermic reverse reaction."],
      ["Write Kp for the reaction.","Use partial pressures and coefficients.","Kp=P(SO₃)²/[P(SO₂)²P(O₂)]."],
      ["Explain the effect of a catalyst on equilibrium yield.","Compare forward and reverse rates.","It speeds both directions equally and does not alter equilibrium composition."]
    ]],
    ["ICE-table analysis", "For A(g)⇌2B(g), initially [A]=1.00 M and [B]=0; at equilibrium [A]=0.60 M.", [
      ["Determine the change in [A].","Compare initial and final concentrations.","Δ[A]=−0.40 M."],
      ["Find equilibrium [B].","Use stoichiometric change ratio.","[B]=0.80 M."],
      ["Calculate Kc.","Substitute equilibrium values.","Kc=(0.80)²/0.60≈1.07."],
      ["Find Qc initially and describe the initial direction.","Use initial concentrations.","Qc=0<K, so net reaction proceeds right."],
      ["Explain why B's concentration change is twice the magnitude of A's change.","Use balanced stoichiometry.","Each A consumed produces two B particles."]
    ]]
  ]),
  "Unit 8 Acids and Bases": _makeFrqs("FRQ-CHE-ACID8", [
    ["Weak acid equilibrium", "A 0.10 M solution of monoprotic acid HA has Ka=1.0×10⁻⁵ at 25°C.", [
      ["Write the acid-ionization reaction.","Show proton transfer to water.","HA+H₂O⇌H₃O⁺+A⁻."],
      ["Set up the equilibrium expression.","Omit liquid water.","Ka=[H₃O⁺][A⁻]/[HA]."],
      ["Estimate [H₃O⁺] using the small-x approximation.","Use x≈√(KaC).","[H₃O⁺]≈√(10⁻⁵·0.10)=1.0×10⁻³ M."],
      ["Find the approximate pH.","Take negative base-10 logarithm.","pH≈3.00."],
      ["Explain why the approximation is reasonable.","Compare x with starting concentration.","Dissociation is about 1% of 0.10 M, small relative to initial HA."]
    ]],
    ["Buffer capacity", "A buffer contains 0.20 mol HA and 0.20 mol A⁻ in 1.0 L; pKa=4.76.", [
      ["Find initial pH.","Apply Henderson–Hasselbalch equation.","pH=4.76."],
      ["Find pH after adding 0.020 mol strong acid.","Neutralize A⁻ and form HA, then use ratio.","A⁻=0.18 mol, HA=0.22 mol; pH=4.76+log(0.18/0.22)≈4.67."],
      ["Identify the buffer component that reacts with added H⁺.","Use conjugate acid-base reaction.","A⁻ accepts H⁺ to form HA."],
      ["Explain why the pH shift is smaller than in unbuffered water.","Describe buffer neutralization.","The conjugate pair consumes added acid, limiting the change in hydronium concentration."],
      ["Predict the pH effect of adding a small amount of NaOH.","Identify neutralization direction.","OH⁻ consumes HA, increasing the A⁻/HA ratio and raising pH."]
    ]],
    ["Strong-base titration", "25.0 mL of 0.100 M HCl is titrated with 0.100 M NaOH at 25°C.", [
      ["Find initial moles of HCl.","Use n=MV.","n=0.00250 mol."],
      ["Calculate NaOH volume at equivalence.","Match acid and base mole ratio.","25.0 mL."],
      ["Find pH at equivalence.","Strong acid and base neutralize stoichiometrically.","pH=7.00 at 25°C."],
      ["Find pH after 30.0 mL base is added.","Compute excess OH⁻ and concentration.","Excess=0.00050 mol in 0.0550 L; [OH⁻]=0.00909 M, pH≈11.96."],
      ["Select an appropriate indicator transition region.","Match steep equivalence region.","An indicator changing near pH 7, such as bromothymol blue, is appropriate."]
    ]]
  ]),
  "Unit 9 Applications of Thermodynamics": _makeFrqs("FRQ-CHE-APP9", [
    ["Free-energy threshold", "A reaction has ΔH°=−24.0 kJ/mol and ΔS°=−60.0 J/(mol·K); assume both are constant over the temperature range.", [
      ["Convert ΔS° to kJ/(mol·K).","Convert joules to kilojoules.","−0.0600 kJ/(mol·K)."],
      ["Write ΔG° as a function of temperature.","Use ΔG°=ΔH°−TΔS°.","ΔG°=−24.0+0.0600T kJ/mol."],
      ["Find the temperature at which ΔG°=0.","Set expression equal to zero.","T=400 K."],
      ["Predict spontaneity at 300 K.","Evaluate sign.","ΔG°=−6.0 kJ/mol, spontaneous forward."],
      ["Explain the high-temperature behavior.","Interpret entropy term.","At high T, −TΔS° is positive and can make ΔG° positive."]
    ]],
    ["Electrochemical cell", "A galvanic cell transfers 2 mol electrons per reaction and has standard cell potential E°=1.10 V.", [
      ["State the sign of ΔG°.","Use sign relation to E°.","Negative."],
      ["Calculate ΔG° in kJ/mol using F=96,500 C/mol.","Use ΔG°=−nFE°.","−2(96,500)(1.10)=−212 kJ/mol."],
      ["Identify where oxidation and reduction occur.","Apply cell conventions.","Oxidation at anode; reduction at cathode."],
      ["Describe electron direction in the external circuit.","Follow spontaneous electron transfer.","Electrons flow from anode to cathode."],
      ["Explain the effect of making E° more positive on ΔG° for the same n.","Use equation proportionality.","ΔG° becomes more negative."]
    ]],
    ["Nonstandard spontaneity", "For a reaction at 298 K, ΔG°=+5.0 kJ/mol and the current reaction quotient is Q=0.10; use R=8.314 J mol⁻¹ K⁻¹.", [
      ["Write the expression for ΔG under nonstandard conditions.","Include the reaction quotient.","ΔG=ΔG°+RT ln Q."],
      ["Calculate the RT ln Q contribution in kJ/mol.","Substitute and convert units.","(8.314)(298)ln(0.10)/1000≈−5.71 kJ/mol."],
      ["Determine the sign of current ΔG.","Add standard and quotient terms.","ΔG≈−0.71 kJ/mol."],
      ["Predict the direction of net change.","Use sign of ΔG.","Forward reaction is spontaneous at this composition."],
      ["Explain what happens as equilibrium is approached.","Relate Q and free energy.","Q rises toward K and ΔG approaches zero."]
    ]]
  ])
});

Object.assign(frqBank["AP Calculus AB"], {
  "Unit 7 Differential Equations": _makeFrqs("FRQ-CAL-DEQ7", [
    ["Exponential cooling model", "The temperature difference y from room temperature satisfies dy/dt=−0.2y and y(0)=30°C.", [
      ["Classify the differential equation.","Identify order and linearity.","First-order linear differential equation."],
      ["Solve for y(t).","Separate variables or use exponential form.","y(t)=30e⁻⁰·²ᵗ."],
      ["Find y after 5 time units.","Evaluate solution.","y(5)=30e⁻¹≈11.0°C."],
      ["Find the initial rate of temperature change.","Evaluate the differential equation at t=0.","y'(0)=−0.2(30)=−6°C per time unit."],
      ["Interpret the long-term behavior.","Take t to infinity.","The difference approaches zero, so the object approaches room temperature."]
    ]],
    ["Euler approximation", "A solution satisfies y'=x−y and y(0)=1. Use Euler's method with step size 0.2.", [
      ["Find the initial slope.","Evaluate f(x,y) at (0,1).","y'=-1."],
      ["Calculate the Euler estimate at x=0.2.","Use y₁=y₀+h f(x₀,y₀).","y(0.2)≈1+0.2(−1)=0.8."],
      ["Find the slope at the new estimate.","Evaluate at (0.2,0.8).","y'=0.2−0.8=−0.6."],
      ["Calculate the next Euler estimate at x=0.4.","Apply one more update.","y(0.4)≈0.8+0.2(−0.6)=0.68."],
      ["Explain one effect of reducing step size.","Describe approximation behavior.","More, smaller steps generally improve the numerical approximation for a smooth solution."]
    ]],
    ["Slope field and equilibria", "A population model is dP/dt=0.5P(1−P/100), with initial population P(0)=20.", [
      ["Find equilibrium solutions.","Set the derivative to zero.","P=0 and P=100."],
      ["Find initial population growth rate.","Substitute P=20.","dP/dt=0.5(20)(0.8)=8 individuals per time unit."],
      ["Determine whether the population initially increases or decreases.","Interpret rate sign.","It increases because the rate is positive."],
      ["Describe the long-term population predicted for this initial value.","Use logistic behavior.","P approaches carrying capacity 100."],
      ["Explain why growth rate eventually declines as P approaches 100.","Analyze the model factors.","The factor 1−P/100 shrinks toward zero."]
    ]]
  ]),
  "Unit 8 Applications of Integration": _makeFrqs("FRQ-CAL-APP8", [
    ["Accumulated traffic flow", "Cars pass a checkpoint at rate r(t)=120+20t cars/hour for 0≤t≤3, with t in hours.", [
      ["Find the rate at t=2.","Evaluate r.","160 cars/hour."],
      ["Write an integral for the number of cars passing in three hours.","Accumulate the rate over the interval.","∫₀³(120+20t)dt."],
      ["Calculate the total cars passing.","Evaluate the integral.","[120t+10t²]₀³=450 cars."],
      ["Find average flow rate during the interval.","Divide total by elapsed time.","450/3=150 cars/hour."],
      ["Explain why r(3) is not the total number of cars.","Distinguish rate from accumulation.","r(3) is an instantaneous flow rate, whereas integration accumulates cars over time."]
    ]],
    ["Area between curves", "Consider y=2x and y=x² on 0≤x≤2.", [
      ["Find the intersection points in the interval.","Solve 2x=x².","x=0 and x=2."],
      ["Determine which function is above the other between intersections.","Compare values in the interval.","2x is above x² for 0<x<2."],
      ["Set up the area integral.","Integrate upper minus lower.","A=∫₀²(2x−x²)dx."],
      ["Calculate the enclosed area.","Evaluate antiderivative.","A=[x²−x³/3]₀²=4/3."],
      ["Explain why absolute value is unnecessary on this interval.","Use ordering evidence.","The integrand 2x−x² is nonnegative from 0 to 2."]
    ]],
    ["Velocity and total distance", "A particle moves on a line with velocity v(t)=t²−4 for 0≤t≤3 meters per second.", [
      ["Find when the particle changes direction.","Solve v(t)=0 in interval.","t=2 s."],
      ["Find displacement over 0≤t≤3.","Integrate signed velocity.","∫₀³(t²−4)dt=−3 m."],
      ["Find total distance traveled.","Integrate absolute velocity across the zero.","∫₀²(4−t²)dt+∫₂³(t²−4)dt=16/3+7/3=23/3 m."],
      ["Find position at t=3 if initial position is 5 m.","Add displacement to initial position.","x(3)=5−3=2 m."],
      ["Explain why displacement differs from total distance.","Distinguish signed and absolute integrals.","The particle reverses direction, so signed motion partly cancels but distance does not."]
    ]]
  ])
});

Object.assign(frqBank["AP Biology"], {
  "Unit 7 Natural Selection": _makeFrqs("FRQ-BIO-NS7", [
    ["Beak variation in drought", "A bird population contains heritable variation in beak depth. During drought, hard seeds are common and deeper-beaked birds leave more offspring.", [
      ["Identify the source of variation selection acts on.","Name inherited differences.","Heritable variation in beak depth, arising from genetic variation."],
      ["Describe the selective pressure.","Connect environment to trait.","Hard seeds during drought favor birds able to crack them."],
      ["Predict the direction of change in mean beak depth.","Relate fitness to allele/trait frequency.","Mean beak depth is expected to increase across generations."],
      ["Explain why an individual bird's beak does not evolve during its lifetime.","Distinguish individual from population change.","Selection changes inherited trait frequencies in populations over generations."],
      ["Propose data supporting selection rather than random drift.","Use fitness association and repeated evidence.","Show deeper-beaked birds survive or reproduce more and that the trait mean shifts in offspring."]
    ]],
    ["Hardy–Weinberg survey", "In a large randomly mating population, a recessive phenotype occurs in 9% of individuals; assume Hardy–Weinberg conditions for estimation.", [
      ["Find q, the recessive allele frequency.","Use q²=0.09.","q=0.30."],
      ["Find p.","Use p+q=1.","p=0.70."],
      ["Calculate expected heterozygote frequency.","Use 2pq.","2(0.70)(0.30)=0.42."],
      ["Estimate heterozygote number in a sample of 1000.","Multiply frequency by sample size.","420 individuals."],
      ["Name one condition whose violation could change allele frequencies over time.","Identify a Hardy–Weinberg assumption.","Selection, mutation, migration, small population size, or nonrandom mating."]
    ]],
    ["Island founder event", "A few lizards colonize an island from a diverse mainland population. By chance, the island founders carry a high frequency of a rare color allele.", [
      ["Identify the evolutionary mechanism initially changing island allele frequency.","Distinguish random sampling from selection.","Founder effect, a form of genetic drift."],
      ["Explain why the island's small founding size matters.","Relate sampling variance to size.","Chance sampling has a larger effect on allele frequencies in a small population."],
      ["Predict genetic diversity relative to the mainland.","Consider alleles sampled.","The island population likely has reduced diversity."],
      ["Describe a possible effect of later gene flow from the mainland.","Predict allele exchange.","Migration may introduce alleles and reduce differentiation."],
      ["What evidence would distinguish selection on color from drift?","Compare phenotype fitness and environmental relation.","Measure survival and reproductive success by color under island conditions; consistent fitness differences support selection."]
    ]]
  ]),
  "Unit 8 Ecology": _makeFrqs("FRQ-BIO-ECO8", [
    ["Lake nutrient enrichment", "Fertilizer runoff increases phosphate entering a lake; algal biomass rises and dissolved oxygen later declines.", [
      ["Identify the process initiated by excess nutrient input.","Name the ecological process.","Eutrophication."],
      ["Explain why algal biomass increases initially.","Connect limiting nutrient to production.","Added phosphate relieves nutrient limitation and increases primary production."],
      ["Explain why dissolved oxygen declines after the bloom.","Describe decomposition and respiration.","Decomposers consume oxygen while breaking down dead algae."],
      ["Predict one effect on fish populations if oxygen remains low.","Relate oxygen to organism survival.","Fish mortality may rise or fish may leave the affected area."],
      ["Propose a control to reduce the problem.","Target nutrient source.","Reduce fertilizer runoff using buffer strips, reduced application, or improved wastewater treatment."]
    ]],
    ["Population growth", "A deer population has 80 individuals and grows at 0.25 per individual per year when resources are abundant.", [
      ["Calculate the initial population growth rate under exponential growth.","Use dN/dt=rN.","dN/dt=0.25(80)=20 deer/year."],
      ["Write the exponential model for population size.","Use N=N₀eʳᵗ.","N(t)=80e⁰·²⁵ᵗ."],
      ["Explain why growth cannot remain exponential indefinitely in a finite habitat.","Identify limiting resources.","Food, space, disease, or predation become limiting."],
      ["Describe the logistic model's behavior near carrying capacity.","Interpret density dependence.","Net population growth slows toward zero as N approaches K."],
      ["Distinguish density-dependent from density-independent limiting factors.","Give ecological relationship.","Competition often strengthens with density; severe weather can affect populations regardless of density."]
    ]],
    ["Trophic energy transfer", "A grassland producer level stores 20,000 kJ of energy; assume approximately 10% transfer efficiency between trophic levels.", [
      ["Estimate energy available to primary consumers.","Apply 10% transfer.","2000 kJ."],
      ["Estimate energy available to secondary consumers.","Apply another 10% transfer.","200 kJ."],
      ["Explain why less energy is available at each higher trophic level.","Describe energy use and loss.","Organisms respire, release heat, and do not assimilate all consumed biomass."],
      ["Predict how a decline in producer productivity affects top predators.","Trace food-web energy.","Less energy enters the food web, potentially reducing prey and predator populations."],
      ["Explain why matter, unlike energy, can cycle through an ecosystem.","Contrast conservation and heat loss.","Atoms are reused through biogeochemical cycles, while usable energy ultimately dissipates as heat."]
    ]]
  ])
});
