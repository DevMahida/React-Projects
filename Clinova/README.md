# Clinova

Clinova is a React-based healthcare platform for connecting patients with specialists and giving doctors a workspace to manage their availability.

## Current Phase

The project is currently in the functional MVP phase. The following flows are available:

- Public home page and specialist directory
- Patient registration and login
- Persisted login state with protected dashboard routes
- Role-based routing for patients and doctors
- Doctor dashboard with slot creation, listing, and deletion
- Local mock REST API backed by `db.json`

The patient dashboard and appointment booking flow are still being developed. The application is not yet connected to a production backend.

## Tech Stack

- React 19 with Vite
- React Router
- Redux Toolkit and React Redux
- Axios
- React Bootstrap and Bootstrap
- React Toastify
- JSON Server for local development data

## Getting Started

### Prerequisites

- Node.js and npm

### Installation

```bash
npm install
```

### Run the application

Start the mock API in one terminal:

```bash
npm run server
```

Start the Vite development server in a second terminal:

```bash
npm run dev
```

The frontend will be available at the URL printed by Vite, usually `http://localhost:5173`. The JSON Server API runs at `http://localhost:3001`.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run server` | Start JSON Server with `db.json` on port 3001 |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```text
src/
├── components/       Reusable home and dashboard UI
├── features/         Redux slices and async API actions
├── pages/            Route-level pages and dashboard layout
├── store/            Redux store configuration
└── utils/            Shared route utilities, including protection
db.json               Local users, doctors, and slot data
```

## Development Notes

The frontend expects JSON Server to be running on port `3001`. Authentication and data access are intended for local development only; credentials in `db.json` are sample data and must not be used in a production environment.
