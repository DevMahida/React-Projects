# Employee CRUD (React + Vite)

A small, responsive Employee Management System built with React and Vite. It demonstrates a simple CRUD workflow (Create, Read, Update, Delete) with client-side persistence using LocalStorage, search/sort, and pagination — styled with Bootstrap.

**Live during development:** Runs with Vite's dev server (HMR).

**Quick links**
- **App entry:** [src/main.jsx](src/main.jsx#L1-L50)
- **Top-level app:** [src/App.jsx](src/App.jsx#L1-L400)
- **Form & list components:** [src/components/main/Form.jsx](src/components/main/Form.jsx#L1-L200) • [src/components/main/ViewData.jsx](src/components/main/ViewData.jsx#L1-L300)
- **Validation utility:** [src/utils/validation.js](src/utils/validation.js#L1-L200)

**Features**
- Add new employee records (name, email, contact, role).
- Edit and update existing records.
- Delete records with confirmation.
- Search across all fields (id, name, email, contact, role).
- Sort names A–Z / Z–A.
- Client-side pagination (5 items per page).
- Form validation for empty fields and valid 10-digit contact numbers.
- Data persisted to `localStorage` so records survive page reloads.

**Tech stack**
- React 19 + Vite
- Bootstrap 5 for layout and UI

**Prerequisites**
- Node.js (recommended: 18 or later)
- npm (or yarn)

**Install & run**
```bash
npm install
npm run dev
```

Build and preview
```bash
npm run build
npm run preview
```

Lint
```bash
npm run lint
```

**Project structure (key files)**
- **src/App.jsx**: Main application logic — state, localStorage load/save, search/sort/pagination, and handlers.
- **src/components/Header.jsx**: Page header.
- **src/components/main/Form.jsx**: Add / edit employee form.
- **src/components/main/ViewData.jsx**: Table UI, search, sort selector and pagination.
- **src/utils/validation.js**: Simple synchronous validation helper used by the form.


