create table public.profiles (
  user_id uuid primary key default auth.uid()
    references auth.users (id) on delete cascade,
  display_name text not null default 'Learner'
    check (char_length(display_name) between 1 and 50),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- create table public.profiles (...): builds the drawer. public is the schema (the room) the web API can see.
-- user_id uuid primary key: the owner’s ID, a long random-looking code (a UUID). primary key means every card has a different one, so one person can have only one profile.
-- default auth.uid(): if the code doesn’t say who owns a new card, the database fills in the ID of the logged-in user. The browser never needs to send it, so it can’t lie about it. That ties into the mass-assignment idea in step 2.4.
-- references auth.users (id) on delete cascade: the ID must belong to a real account, and if the account is deleted, the card is thrown away too. This will help with “delete my account” in Phase 9.
-- display_name text not null default 'Learner': a name that always exists. If nobody sets one, it says “Learner”.
-- check (char_length(display_name) between 1 and 50): the database itself refuses empty or huge names. It’s a second line of defence behind Zod in Phase 4, because the database must not trust the app.
-- created_at timestamptz not null default now(): when the card was made, with a time zone, filled in automatically.
-- alter table ... enable row level security: puts the lock on. With the lock on and no rules yet, nobody who uses the API can see any row. Closed by default is the safe starting point.