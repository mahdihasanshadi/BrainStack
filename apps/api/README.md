# BrainStack API

NestJS 11 backend for BrainStack. Uses TypeORM with PostgreSQL, Redis for session cache, and JWT authentication.

## Prerequisites

- Node.js 20+
- PostgreSQL (see root `.env.example` values in `apps/api/.env.example`)
- Redis
- Copy `apps/api/.env.example` to `apps/api/.env` and fill in values

From the repository root:

```bash
npm install
```

## Development

```bash
# From repository root
npm run dev -w @brainstack/api

# Or from this directory
npm run dev
```

The API listens on `http://localhost:3001` with routes under the `/api` prefix.

## Database migrations

TypeORM is configured with `synchronize: false`. Schema changes are applied through migrations in `src/database/migrations/`.

The CLI entry point is `src/database/data-source.ts`, which loads `apps/api/.env` and registers all entities (`User`, `RegistrationLead`, `ClassSlot`, `Course`, `CourseLevel`).

### Run pending migrations

From `apps/api` (with PostgreSQL running and `DATABASE_URL` set in `.env`):

```bash
npm run migration:run
```

This creates the `migrations` table (if needed) and applies any pending migration files.

### Revert the last migration

```bash
npm run migration:revert
```

### Generate a new migration

After changing an entity, compare the current database schema to entities and generate a migration. The database must be reachable and should reflect the **current** applied migration state (not empty unless generating the initial migration).

```bash
npm run migration:generate -- src/database/migrations/DescriptiveName
```

Example:

```bash
npm run migration:generate -- src/database/migrations/AddUserPhoneIndex
```

Review the generated file before committing. Every migration must include a working `down()` that fully reverses `up()`.

### Fresh local database

1. Create an empty PostgreSQL database.
2. Set `DATABASE_URL` in `.env`.
3. Run `npm run migration:run`.
4. Seed class slots: `npm run seed:class-slots`.
5. Seed courses: `npm run seed:courses`.
6. Start the API with `npm run dev`.

The initial migration (`InitialSchema`) creates:

- `users` — with unique index on `email` and `users_role_enum` for roles
- `registration_leads`

## Authentication and roles

Public `POST /api/auth/register` always creates accounts with the `parent` role. Any `role` field sent in the request body is stripped and ignored — self-registration cannot assign `admin` or `student`.

Admins create elevated accounts via `POST /api/admin/users` (requires a JWT for an existing `admin` user). The request body uses `CreateUserDto`, including a `role` field (`parent`, `student`, or `admin`).

### Bootstrap the first admin (local only)

There is no public route to create the initial admin. Use one of the following **once** on a fresh database:

**Option A — seed script (recommended)**

```bash
npm run seed:admin -w @brainstack/api -- admin@example.com 'your-secure-password' "Admin Name"
```

**Option B — manual SQL**

Generate a bcrypt hash (cost 12) for your password, then insert:

```sql
INSERT INTO users (
  id, "fullName", email, "passwordHash", phone, role,
  "isVerified", "onboardingCompleted", "assessmentResult",
  "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid(),
  'BrainStack Admin',
  'admin@example.com',
  '<bcrypt-hash-here>',
  '0000000000',
  'admin',
  true,
  true,
  NULL,
  NOW(),
  NOW()
);
```

Log in with `POST /api/auth/login` to obtain a JWT, then call `POST /api/admin/users` with `Authorization: Bearer <token>`.

## Scripts

| Script | Description |
| ------ | ----------- |
| `npm run dev` | Start with watch mode |
| `npm run build` | Compile to `dist/` |
| `npm run start:prod` | Run compiled app |
| `npm run migration:run` | Apply pending migrations |
| `npm run migration:revert` | Revert last migration |
| `npm run migration:generate -- src/database/migrations/Name` | Generate migration from entity diff |
| `npm run seed:admin -- <email> <password> [fullName] [phone]` | Create the first local admin user |
| `npm run seed:class-slots` | Seed placeholder recurring class slots (6–14 age ranges) |
| `npm run seed:courses` | Seed placeholder courses and levels for program pages |
