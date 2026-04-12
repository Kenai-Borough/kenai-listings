create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  role text not null check (role in ('user','admin')),
  phone text,
  city text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  parent_slug text,
  created_at timestamptz default now()
);

create table if not exists listings (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references profiles(id) on delete cascade,
  category_id uuid references categories(id) on delete set null,
  title text not null,
  description text not null,
  price numeric(12,2) default 0,
  condition text,
  location text,
  city text,
  lat numeric(10,6),
  lng numeric(10,6),
  photos text[] default '{}',
  is_free boolean default false,
  is_trade boolean default false,
  status text default 'active' check (status in ('active','sold','expired','flagged')),
  view_count integer default 0,
  expires_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists saved_listings (
  user_id uuid not null references profiles(id) on delete cascade,
  listing_id uuid not null references listings(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, listing_id)
);

create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references listings(id) on delete cascade,
  buyer_id uuid references profiles(id) on delete set null,
  seller_id uuid references profiles(id) on delete set null,
  created_at timestamptz default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  sender_id uuid references profiles(id) on delete set null,
  body text not null,
  created_at timestamptz default now()
);

create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references listings(id) on delete cascade,
  reporter_id uuid references profiles(id) on delete set null,
  reason text not null,
  details text,
  status text default 'open' check (status in ('open','reviewing','resolved')),
  created_at timestamptz default now()
);

create table if not exists listing_views (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references listings(id) on delete cascade,
  viewer_id uuid references profiles(id) on delete set null,
  viewed_at timestamptz default now()
);

create index if not exists idx_listings_status_created on listings(status, created_at desc);
create index if not exists idx_listings_category_city on listings(category_id, city);
create index if not exists idx_listings_price on listings(price);
create index if not exists idx_listings_photos on listings using gin(photos);
create index if not exists idx_messages_conversation on messages(conversation_id, created_at);
create index if not exists idx_reports_listing on reports(listing_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on profiles;
create trigger profiles_updated_at before update on profiles for each row execute function public.set_updated_at();

drop trigger if exists listings_updated_at on listings;
create trigger listings_updated_at before update on listings for each row execute function public.set_updated_at();

alter table profiles enable row level security;
alter table categories enable row level security;
alter table listings enable row level security;
alter table saved_listings enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;
alter table reports enable row level security;
alter table listing_views enable row level security;

create policy "profiles public read" on profiles for select using (true);
create policy "categories public read" on categories for select using (true);
create policy "listings public read" on listings for select using (status in ('active','sold'));
create policy "users manage own listings" on listings for all using (auth.uid() = seller_id);
create policy "users manage saved listings" on saved_listings for all using (auth.uid() = user_id);
create policy "participants view conversations" on conversations for select using (auth.uid() = buyer_id or auth.uid() = seller_id);
create policy "participants view messages" on messages for select using (exists (select 1 from conversations c where c.id = conversation_id and (c.buyer_id = auth.uid() or c.seller_id = auth.uid())));
create policy "participants insert messages" on messages for insert with check (exists (select 1 from conversations c where c.id = conversation_id and (c.buyer_id = auth.uid() or c.seller_id = auth.uid())));
create policy "users create reports" on reports for insert with check (true);
create policy "listing views insertable" on listing_views for insert with check (true);
