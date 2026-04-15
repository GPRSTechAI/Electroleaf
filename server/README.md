# ElectroLeaf API

Backend API for the ElectroLeaf project.

## Prerequisites

- Node.js 18.x
- npm (comes with Node.js)

## Use Node 18 with nvm

This project should be run with **Node.js 18**.

### Windows (nvm-windows)

```powershell
nvm install 18
nvm use 18
node -v
```

### macOS/Linux (nvm)

```bash
nvm install 18
nvm use 18
node -v
```

You should see a Node version that starts with `v18`.

## Install Dependencies

```bash
npm install
```

## Environment Variables

Create a local environment file before running the API.

```bash
cp .env.example .env
```

If `cp` is not available on your shell (for example, on PowerShell), use:

```powershell
Copy-Item .env.example .env
```

Then update `.env` with your actual configuration values.

## Run the Project

### Development mode

```bash
npm run dev
```

### Production mode

```bash
npm start
```

By default, this starts the API from `index.js`.

## Available Scripts

- `npm run dev` - Start with nodemon for development
- `npm start` - Start with node
- `npm test` - Placeholder test script
