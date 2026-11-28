# Database backups

Every night a GitHub Action (`.github/workflows/backup.yml`) backs up the
Supabase database and then proves the backup works:

1. **Backup** dumps everything in the `public` schema (tables, data, indexes,
   grants, RLS policies) with `pg_dump`, encrypts it with your passphrase
   (AES-256), and stores it as a workflow artifact for 30 days.
2. **Test restore** decrypts that same file, restores it into a throwaway
   Postgres, and checks that every table has the same row count and that the
   same RLS tables and policies exist. If anything differs, the run fails.

If either step fails, GitHub emails you (it emails whoever last changed the
workflow's schedule, so that's you once you merge it).

It costs nothing: artifacts on public repos are free, and the files are
encrypted, so nobody can read them without the passphrase.

**What is not backed up:** Supabase Auth users (just your admin login; recreate
it with `docs/setup-admin.md`), Storage files, and settings like API keys and
email templates. For client sites that store important files in Supabase
Storage, add a Storage backup too.

## Setup (once per project, ~5 minutes)

### 1. Copy the database connection string

1. Open the Supabase project and click **Connect** at the top.
2. Choose the **Session pooler** connection string (the direct connection
   doesn't work from GitHub, which has no IPv6). It looks like
   `postgresql://postgres.<project-ref>:[YOUR-PASSWORD]@aws-0-<region>.pooler.supabase.com:5432/postgres`
3. Replace `[YOUR-PASSWORD]` with the database password. Don't know it? In
   **Project Settings → Database**, click **Reset database password**. That's
   safe: the website uses API keys, not this password. If the password has
   symbols like `@`, `#` or `/`, pick one without them (or URL-encode them).

### 2. Make a backup passphrase

Make a long random passphrase (a password manager can generate one, 30+
characters) and **save it in your password manager**. Without it, the backups
can't be opened by anyone, including you.

### 3. Add both as GitHub secrets

GitHub → the repo → **Settings → Secrets and variables → Actions → New
repository secret**:

| Name | Value |
| --- | --- |
| `SUPABASE_DB_URL` | the connection string from step 1 |
| `BACKUP_PASSPHRASE` | the passphrase from step 2 |

### 4. Run it once by hand

GitHub → **Actions → Database backup → Run workflow**. After a minute or two,
both jobs ("Back up database" and "Test restore") should be green. Open
"Test restore" to see the row counts it checked.

After that it runs on its own every night around 3 AM Central.

> GitHub pauses scheduled workflows in a public repo after 60 days with no
> commits. If you get an email saying so, click **Enable workflow** in the
> Actions tab.

## Restoring for real

Use this if data was deleted or the project is broken. Restore into a **new,
empty Supabase project** (restoring over tables that still exist fails on
purpose, so nothing gets half-overwritten). Then point the site at it.

1. **Download the backup:** GitHub → Actions → Database backup → pick the run
   from before the problem → under **Artifacts**, download it and unzip it.
   You get a `db-backup-<date>.tar.gpg` file.
2. **Create the new Supabase project** and copy its Session pooler
   connection string (step 1 above).
3. **Decrypt and restore.** With Docker Desktop installed, open a terminal in
   the repo folder, put the `.tar.gpg` file there, and run:

   ```bash
   docker run --rm -it -v "${PWD}:/work" -w /work postgres:17 bash
   ```

   Then inside that shell:

   ```bash
   apt-get update -qq && apt-get install -y -qq gnupg >/dev/null
   gpg --decrypt --output backup.tar db-backup-<date>.tar.gpg   # asks for the passphrase
   mkdir -p restore && tar -C restore -xf backup.tar
   scripts/backup/restore.sh restore/database.dump "<new project's connection string>"
   cat restore/row-counts.txt   # what the backup contained, to compare in the Table Editor
   ```

   It restores in one transaction: either everything is restored or nothing
   changes.
4. **Switch the site over:** in Vercel, update `NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY` to the new
   project's values, redeploy, recreate the admin user (`docs/setup-admin.md`),
   and update `SUPABASE_DB_URL` in GitHub so backups follow the new project.
5. **Delete the decrypted files** (`backup.tar`, `restore/`). They contain
   customer data in plain text.

## Files

- `.github/workflows/backup.yml`: the nightly backup and restore test
- `scripts/backup/row-counts.sql`: row counts, RLS tables and policy count, used to compare
- `scripts/backup/restore.sh`: restore script (used by the test and for real restores)
- `scripts/backup/restore-test-prep.sql`: Supabase stand-ins (roles, `auth.jwt()`) for the throwaway test database only
