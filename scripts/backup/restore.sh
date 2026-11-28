#!/usr/bin/env bash
# Restores a database.dump made by the "Database backup" workflow.
#
#   scripts/backup/restore.sh database.dump "postgresql://..."
#
# Skips the parts every Supabase project already has (the public schema itself
# and Supabase's default privileges), then restores tables, data, indexes,
# grants and RLS policies in one transaction: it either fully works or changes
# nothing. Used by the automatic restore test and for a real restore
# (see docs/backups.md).
set -euo pipefail

dump="${1:?usage: restore.sh <database.dump> <database-url>}"
db_url="${2:?usage: restore.sh <database.dump> <database-url>}"

list="$(mktemp)"
trap 'rm -f "$list"' EXIT

pg_restore --list "$dump" \
  | grep -v -E '^[0-9]+; [0-9]+ [0-9]+ (SCHEMA - public|COMMENT - SCHEMA public|DEFAULT ACL) ' \
  > "$list"

pg_restore --no-owner --exit-on-error --single-transaction \
  --use-list="$list" --dbname="$db_url" "$dump"
