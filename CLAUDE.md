# Project CLAUDE.md - Auth Server

## Project Overview

Authentication server providing OAuth flows for GitHub and Reddit, using AWS Secrets Manager for credential storage, built on Koa.

## Tech Stack

- **Language:** TypeScript (ESM, `"type": "module"`)
- **Runtime:** Node.js (ts-node)
- **Framework:** Koa with @koa/cors, @koa/router, koa-bodyparser
- **Auth integrations:** @octokit/rest (GitHub), snoowrap (Reddit)
- **Secrets:** @aws-sdk/client-secrets-manager
- **Linting:** mikey-pro (ESLint 10 flat config)
- **Formatting:** Prettier via `mikey-pro/prettier`, Stylelint via `mikey-pro/stylelint`

## Architecture

```
app.ts                    # Entry point (re-exports from server/app)
server/
  app.ts                  # Koa app with CORS, route loading (gitlang, convert)
  dist/                   # Compiled output
  init.sh                 # Server initialization script
  stop.sh                 # Server stop script
appspec.yml               # AWS CodeDeploy spec
user-data.sh              # EC2 user data script
eslint.config.js          # Re-exports mikey-pro
```

## Commands

```bash
npm run dev               # Start dev server (NODE_ENV=development ts-node app.ts)
npm run prod              # Start production server (NODE_ENV=production ts-node app.ts)
npm run fix               # Auto-fix ESLint issues
```

## Conventions

- ESM only (`"type": "module"`)
- ESLint via `mikey-pro` base config
- Prettier and Stylelint configs from `mikey-pro`
- Origin allowlist for CORS (gitlang.net)
- Conventional commits: `feat:`, `fix:`, `chore:`, etc.

## Testing

No test framework configured. No test scripts defined.
