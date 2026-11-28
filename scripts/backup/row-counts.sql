-- Prints one line per table in the public schema with its exact row count,
-- plus how many tables have RLS on and how many policies exist.
-- The backup job saves this next to the dump; the restore test runs it again
-- on the restored copy and fails if anything differs.
select line from (
  select format('table %s %s', table_name,
    (xpath('/row/c/text()',
      query_to_xml(format('select count(*) as c from public.%I', table_name), false, true, '')))[1]::text) as line
  from information_schema.tables
  where table_schema = 'public' and table_type = 'BASE TABLE'
  union all
  select format('rls_tables %s', count(*))
  from pg_class c join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public' and c.relkind = 'r' and c.relrowsecurity
  union all
  select format('policies %s', count(*)) from pg_policies where schemaname = 'public'
) s
order by line;
