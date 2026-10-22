create table if not exists public.subscriptions (
  user_id uuid primary key references auth.users (id) on delete cascade,
  stripe_customer_id text unique not null,
  stripe_subscription_id text unique not null,
  status text not null,
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.subscriptions enable row level security;

create policy "Users can read their own subscription"
  on public.subscriptions
  for select
  to authenticated
  using (user_id = (select auth.uid()));

create table if not exists public.premium_content (
  id uuid primary key default gen_random_uuid(),
  course text not null,
  content_key text not null,
  content_type text not null check (content_type in ('mcq', 'frq')),
  content jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.premium_content enable row level security;

create policy "Active subscribers can read premium content"
  on public.premium_content
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.subscriptions
      where subscriptions.user_id = (select auth.uid())
        and subscriptions.status in ('active', 'trialing')
        and subscriptions.current_period_end > now()
    )
  );