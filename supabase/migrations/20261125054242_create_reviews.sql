create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid()
    references auth.users (id) on delete cascade,
  note_id uuid not null
    references public.notes (id) on delete cascade,
  grade text not null
    check (grade in ('again', 'hard', 'good', 'easy')),
  ease_factor numeric(4, 2) not null
    check (ease_factor >= 1.30),
  interval_days integer not null
    check (interval_days >= 0),
  repetitions integer not null
    check (repetitions >= 0),
  due_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index reviews_user_created_idx on public.reviews (user_id, created_at desc);
create index reviews_note_created_idx on public.reviews (note_id, created_at desc);

alter table public.reviews enable row level security;