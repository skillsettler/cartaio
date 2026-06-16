-- Enable UUID
create extension if not exists "uuid-ossp";

-- Profiles (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  plan text default 'free' check (plan in ('free','pro','teams')),
  stripe_customer_id text unique,
  stripe_subscription_id text,
  api_calls_this_month integer default 0,
  api_calls_limit integer default 0,
  files_today integer default 0,
  files_limit integer default 5,
  max_file_size_mb integer default 10,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- API Keys
create table public.api_keys (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  name text not null,
  key_hash text not null unique,
  key_prefix text not null,
  last_used_at timestamptz,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Jobs (async processing)
create table public.jobs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade,
  tool text not null,
  status text default 'pending' check (status in ('pending','processing','complete','failed','expired')),
  input_urls text[],
  output_url text,
  output_filename text,
  error_message text,
  metadata jsonb default '{}',
  expires_at timestamptz default now() + interval '1 hour',
  processing_ms integer,
  created_at timestamptz default now()
);

-- Conversions (analytics)
create table public.conversions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade,
  job_id uuid references public.jobs on delete set null,
  tool text not null,
  file_size_bytes bigint,
  processing_ms integer,
  plan text,
  via_api boolean default false,
  created_at timestamptz default now()
);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.api_keys enable row level security;
alter table public.jobs enable row level security;
alter table public.conversions enable row level security;

create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can view own api_keys" on public.api_keys for all using (auth.uid() = user_id);
create policy "Users can view own jobs" on public.jobs for all using (auth.uid() = user_id);
create policy "Users can view own conversions" on public.conversions for select using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Update profiles updated_at
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at before update on public.profiles
  for each row execute procedure public.update_updated_at();
