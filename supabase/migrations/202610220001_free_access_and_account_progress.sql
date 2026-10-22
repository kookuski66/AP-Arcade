drop policy if exists "Active subscribers can read premium content"
  on public.premium_content;
drop policy if exists "Premium members can read premium content"
  on public.premium_content;
drop policy if exists "Anyone can read free practice content"
  on public.premium_content;

create policy "Anyone can read free practice content"
  on public.premium_content
  for select
  to anon, authenticated
  using (true);

revoke all on public.premium_content from anon, authenticated;
grant select on public.premium_content to anon, authenticated;

drop table if exists public.subscriptions;
drop table if exists public.premium_access_grants;

create table if not exists public.player_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  progress jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.player_progress enable row level security;

drop policy if exists "Users can manage their own progress"
  on public.player_progress;

create policy "Users can manage their own progress"
  on public.player_progress
  for all
  to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

grant select, insert, update, delete on public.player_progress to authenticated;
