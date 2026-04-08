-- Run this in your Supabase SQL editor

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  phone text,
  created_at timestamptz default now(),
  status text default 'pending' check (status in ('pending', 'paid', 'cancelled')),
  notes text
);

-- Enable Row Level Security (optional, since we use service role key)
alter table subscriptions enable row level security;

-- Index for faster queries
create index if not exists idx_subscriptions_status on subscriptions(status);
create index if not exists idx_subscriptions_email on subscriptions(email);
