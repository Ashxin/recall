grant select, insert, update, delete on public.notes to authenticated;

create policy "notes_select_own" on public.notes
  for select to authenticated
  using (user_id = (select auth.uid()));

create policy "notes_insert_own" on public.notes
  for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy "notes_update_own" on public.notes
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy "notes_delete_own" on public.notes
  for delete to authenticated
  using (user_id = (select auth.uid()));