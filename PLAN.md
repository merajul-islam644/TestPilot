# PLAN

Look & Feel only this run. The PRD explicitly says "No feature work this run — the look and feel above is what changed. Restyle the app so every screen and component already built matches it, then verify the build. Change presentation only: do not add, remove or alter what any feature does."

Every feature below is therefore a restyling task. The workspace had no `package.json` when this run started, so the constitution requires the run to start from `blocks-bootstrap`'s scaffold flow rather than an empty directory.

- [x] Register an OIDC client for TestPilot with all three redirect URIs, register it as an identity provider, and turn OIDC login on (blocks-bootstrap/oidc-client)
- [x] Scaffold the Blocks web app at the workspace root with `blocks new web` and flatten it up (blocks-bootstrap/new-web-app)
- [x] Apply the midnight design tokens to `src/app/styles.css` from `.codex/design/tokens.css` and add a coherent `.light` override (this app's own skill — design tokens are already written)
- [x] Brand the app: TestPilot name and a fitting icon in `AppShell.tsx`, `<title>`, README first line (this app's own skill — branding)
- [x] Build a collapsible left sidebar with the section list (Overview, Projects, Test Runs, Test Suites, Code Workspace, Findings, Reports, Settings, Help) and a top bar with workspace selector, search, run status, notifications, theme toggle, user menu (this app's own skill — shell)
- [x] Wire dark by default + a light theme toggle that sticks to the user (this app's own skill — theme)
- [x] Make the sidebar a slide-in drawer on small screens with a backdrop, and show a "best experienced on desktop" hint in Code Workspace (this app's own skill — shell)
- [x] Replace `/` and profile copy so every visible string reads as TestPilot, drop `JsonPanel` and developer dumps from user pages (this app's own skill — branding)
- [x] Remove starter-leaking text (Blocks, SELISE, starter, sample, demo) from user-facing strings (this app's own skill — branding)
- [x] Set `.env` with the three `VITE_BLOCKS_*` keys so the build picks up Blocks (blocks-bootstrap/new-web-app)
- [x] Check and build app (`npm install`, then `npm run build`, then `npm run lint`)