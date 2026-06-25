# BrainStack

**BrainStack** is an advanced EdTech platform designed for children aged **6–14**. It helps young learners build **logical reasoning**, **analytical thinking**, and **Scratch programming** skills through structured, age-appropriate content that feels like play—not homework.

## Mission

We believe every child can learn to think like a problem-solver. BrainStack combines guided instruction, hands-on coding, and measurable progress so students grow confident in breaking down problems, testing ideas, and expressing solutions—on screen and in everyday life.

## What learners experience

- **Gamified lessons** — Short, rewarding learning paths with badges, streaks, and level-ups that keep motivation high.
- **Logical reasoning & analytics** — Puzzles, patterns, and step-by-step challenges that strengthen critical thinking before and alongside code.
- **Scratch programming** — Block-based projects that teach sequences, loops, conditionals, and events in a safe, visual environment.
- **Automated quizzes** — Instant feedback and adaptive checks so students (and educators) see mastery gaps early.
- **Live webinars** — Scheduled sessions for demos, Q&A, and community learning with instructors and peers.

## Monorepo structure

This repository is an [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces) monorepo. Application packages live under `apps/`:

| Workspace   | Path        | Role                                      |
| ----------- | ----------- | ----------------------------------------- |
| Web         | `apps/web`  | Student-facing web experience (Next.js)   |
| API         | `apps/api`  | Backend services and integrations (NestJS)|

See [`apps/api/README.md`](apps/api/README.md) for API setup, environment variables, and database migrations.

## Prerequisites

- [Node.js](https://nodejs.org/) 20 or later
- npm 10+ (bundled with current Node LTS releases)

## Root scripts

From the repository root, after workspace `package.json` files and dependencies exist:

| Script          | Command   | Description                                                |
| --------------- | --------- | ---------------------------------------------------------- |
| Development     | `npm run dev`   | Runs `dev` in each workspace that defines it       |
| Production build| `npm run build` | Runs `build` in each workspace that defines it     |
| Lint            | `npm run lint`  | Runs `lint` in each workspace that defines it      |

These commands use `npm run <script> --workspaces --if-present`, so missing scripts in a workspace are skipped safely.

## Getting started

```bash
npm install
# Copy apps/api/.env.example to apps/api/.env and configure values
npm run migration:run -w @brainstack/api
npm run dev
```

## Target audience

- **Students (6–14)** — Primary learners on guided paths and Scratch projects.
- **Parents & guardians** — Progress visibility and encouragement at home.
- **Educators & program leads** — Cohorts, quizzes, and webinar scheduling (planned).

## License

Private — all rights reserved unless otherwise noted.
