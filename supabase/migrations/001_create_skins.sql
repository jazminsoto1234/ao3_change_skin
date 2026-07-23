-- B1-1: tabla skins
create table public.skins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null check (char_length(name) <= 100),
  config jsonb not null,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- trigger auto-actualizar updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger skins_set_updated_at
  before update on public.skins
  for each row
  execute function public.set_updated_at();

-- B1-2: RLS policies
alter table public.skins enable row level security;

create policy "select_own_skins"
  on public.skins for select
  using (auth.uid() = user_id);

create policy "insert_own_skins"
  on public.skins for insert
  with check (auth.uid() = user_id);

create policy "update_own_skins"
  on public.skins for update
  using (auth.uid() = user_id);

create policy "delete_own_skins"
  on public.skins for delete
  using (auth.uid() = user_id);

-- B1-3: indices
create index skins_user_id_idx on public.skins (user_id);
create index skins_is_public_idx on public.skins (is_public);
