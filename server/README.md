# ElectroLeaf UI - React Material Dashboard

A modern React-based dashboard application built with Material-UI.

> **Node.js Version**: This application is compatible with **Node.js 18**

## Prerequisites

Ensure you have the following installed:
- Node.js 18 (see [Node.js Setup](#nodejs-setup) below)
- npm (comes with Node.js)

### Node.js Setup

#### Using NVM (Node Version Manager) - Recommended

NVM allows you to manage multiple Node.js versions on your system.

##### Windows Users

1. Install NVM for Windows:
   - Download from: https://github.com/coreybutler/nvm-windows/releases
   - Download the `nvm-setup.exe` installer
   - Run the installer and follow the setup wizard

2. Verify NVM installation:
   ```powershell
   nvm --version
   ```

3. Install Node.js 18:
   ```powershell
   nvm install 18
   ```

4. Set Node.js 18 as the active version:
   ```powershell
   nvm use 18
   ```

5. Verify Node.js version:
   ```powershell
   node --version  # Should display v18.x.x
   npm --version
   ```

##### macOS/Linux Users

1. Install NVM:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   ```

2. Reload your shell configuration:
   ```bash
   source ~/.bashrc  # or ~/.zshrc for zsh users
   ```

3. Install Node.js 18:
   ```bash
   nvm install 18
   ```

4. Set Node.js 18 as the active version:
   ```bash
   nvm use 18
   ```

5. Verify Node.js version:
   ```bash
   node --version  # Should display v18.x.x
   npm --version
   ```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

### 2. Start the Development Server

```bash
npm start
```

The application will automatically open in your default browser at `http://localhost:3000`

The app will reload whenever you make changes to the code.

### 3. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

### 4. Run Tests

```bash
npm test
```

Runs the test suite in interactive watch mode.

## Original Template

Based on Material UI template by DeviasIO
