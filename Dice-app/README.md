# Dice App

A simple React dice roller built with Vite and Bootstrap. The app lets you choose one or two dice, roll them, and reset the values back to `1`.

## Setup

1. Install dependencies:

	```bash
	npm install
	```

2. Bootstrap is already included in the project dependencies. If you are adding it to a fresh React app, install it with:

	```bash
	npm install bootstrap
	```

3. Bootstrap styles and scripts are loaded in [src/main.jsx](src/main.jsx) with these imports:

	```jsx
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap/dist/js/bootstrap.bundle.min.js';
	```

4. Start the development server:

	```bash
	npm run dev
	```

5. Open the app in the browser using the local URL shown in the terminal.

## Available Scripts

- `npm run dev` starts the Vite development server.
- `npm run build` creates a production build.
- `npm run preview` previews the production build locally.
- `npm run lint` runs ESLint across the project.

## Project Overview

- The header introduces the dice roller.
- The selector lets you switch between one die and two dice.
- The Roll button generates random values from 1 to 6.
- The Reset button returns both dice to their starting values.

## Video Recordings

Future screen recordings or demo clips for this project should be stored in the [recordings](recordings/README.md) folder.

## Notes

- This project uses React 19, Vite, and Bootstrap.
