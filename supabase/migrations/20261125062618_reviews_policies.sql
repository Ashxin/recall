grant select, insert on public.reviews to authenticated;

create policy "reviews_select_own" on public.reviews
  for select to authenticated
  using (user_id = (select auth.uid()));

create policy "reviews_insert_own_note" on public.reviews
  for insert to authenticated
  with check (
    user_id = (select auth.uid())
    and exists (
      select 1 from public.notes n
      where n.id = note_id
        and n.user_id = (select auth.uid())
    )
  );