create table if not exists public.premium_access_grants (
  user_id uuid primary key references auth.users (id) on delete cascade,
  granted_at timestamptz not null default now()
);

alter table public.premium_access_grants enable row level security;
revoke all on public.premium_access_grants from anon, authenticated;
grant select on public.premium_access_grants to authenticated;

create policy "Users can read their own premium access grant"
  on public.premium_access_grants
  for select
  to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "Active subscribers can read premium content"
  on public.premium_content;

create policy "Premium members can read premium content"
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
    or exists (
      select 1
      from public.premium_access_grants
      where premium_access_grants.user_id = (select auth.uid())
    )
  );
