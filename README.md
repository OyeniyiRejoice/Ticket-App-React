# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

# TicketApp (React)

This repository contains the React implementation of the Multi-Framework Ticket Web App (frontend stage). It implements the landing page, auth (simulated via localStorage), dashboard, and ticket management (CRUD) with client-side persistence.

## Quick start

Requirements: Node 14+ and npm

1. Install dependencies

```powershell
npm install
```

2. Start the dev server

```powershell
npm run dev
```

3. Open the app in your browser at the Vite URL (normally http://localhost:5173)

## What I added in this fork

- Toast notifications (app-wide) for success/error/info messages.
- Ticket edit modal with validation (title required; status must be one of `open`, `in_progress`, `closed`).
- Ticket CRUD persists to `localStorage` under the `tickets` key.
- Protected routes (Dashboard and Ticket Manager) use `ticketapp_session` and redirect unauthorized users to `/auth/login`.
- Layout container constrained to `max-width: 1440px` to match the design rule.

## Test credentials

Signup any test user via the Sign Up screen. Example user you can create:

- Email: test@example.com
- Password: any

After signing up, login and you will be redirected to the Dashboard.

## Notes / Next steps

- This is the React implementation only. The task requires Vue.js and Twig implementations too; they are not included here.
- For acceptance: the app must also strictly follow the design rules (wave hero, decorative circles, responsive layout). Some visual tweaks and accessibility verifications are recommended.
