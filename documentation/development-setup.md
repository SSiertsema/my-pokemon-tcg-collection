# Development Setup

## Prerequisites

### Option A: Using Devcontainer (Recommended)

| Software                      | Version | Installation                                                                                                  |
| ----------------------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| Docker                        | Latest  | [docker.com](https://www.docker.com/get-started)                                                              |
| VS Code                       | Latest  | [code.visualstudio.com](https://code.visualstudio.com)                                                        |
| Remote - Containers extension | Latest  | [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) |

### Option B: Local Development

| Software | Version | Installation                       |
| -------- | ------- | ---------------------------------- |
| Node.js  | >= 22.x | [nodejs.org](https://nodejs.org)   |
| npm      | >= 10.x | Included with Node.js              |
| Git      | Latest  | [git-scm.com](https://git-scm.com) |

## Quick Start

### Using Devcontainer (Recommended)

```bash
# Clone the repository
git clone https://github.com/BakStijn/Pokemon-collectie-app.git

# Open in VS Code
code Pokemon-collectie-app

# VS Code will prompt to "Reopen in Container" - click yes
# Or use Command Palette: "Remote-Containers: Reopen in Container"
```

The devcontainer will automatically:

- Set up Node.js 22 environment
- Install npm dependencies
- Install Orval globally
- Install Claude Code SDK
- Configure VS Code extensions

### Local Development

```bash
# Clone the repository
git clone https://github.com/BakStijn/Pokemon-collectie-app.git
cd Pokemon-collectie-app

# Install dependencies
npm install

# Install Orval globally (for API client generation)
npm install -g orval

# Start development server (once Nuxt is set up)
npm run dev
```

## Detailed Setup

### 1. Clone the Repository

```bash
git clone https://github.com/BakStijn/Pokemon-collectie-app.git
cd Pokemon-collectie-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Once the project has environment-specific configuration, copy the example file:

```bash
cp .env.example .env
```

Configure required variables as documented in [configuration.md](./configuration.md).

### 4. Start Development Server

Once Nuxt is initialized:

```bash
npm run dev
```

The application will be available at: `http://localhost:3000`

## IDE Setup

### VS Code (Recommended)

The devcontainer automatically installs these recommended extensions:

| Extension              | Purpose                        |
| ---------------------- | ------------------------------ |
| Vue - Official (Volar) | Vue 3 language support         |
| TypeScript Vue Plugin  | TypeScript integration for Vue |
| Nuxt                   | Nuxt-specific features         |
| ESLint                 | Code linting                   |
| Prettier               | Code formatting                |
| npm Intellisense       | npm module autocomplete        |
| Path Intellisense      | File path autocomplete         |
| DotENV                 | .env file syntax highlighting  |
| GitLens                | Git integration                |
| REST Client            | API testing                    |
| Jest                   | Test runner integration        |
| Live Server            | Local server for static files  |

### Manual VS Code Setup

If not using devcontainer, install these extensions manually:

- `Vue.volar`
- `Vue.vscode-typescript-vue-plugin`
- `Nuxt.nuxt-vscode-extension`
- `dbaeumer.vscode-eslint`
- `esbenp.prettier-vscode`

## Common Development Tasks

| Task                     | Command           |
| ------------------------ | ----------------- |
| Start dev server         | `npm run dev`     |
| Run tests                | `npm test`        |
| Lint code                | `npm run lint`    |
| Format code              | `npm run format`  |
| Build for production     | `npm run build`   |
| Generate API client      | `orval`           |
| Preview production build | `npm run preview` |

## Docker Development

The project includes a devcontainer configuration that runs in Docker:

```bash
# The devcontainer uses this base image
mcr.microsoft.com/devcontainers/javascript-node:22

# Features included:
# - Docker-in-Docker support
```

### Manual Docker Commands

```bash
# Build the devcontainer image
docker build -t pokemon-collectie-app .devcontainer/

# Run the container
docker run -it -v $(pwd):/workspaces/Pokemon-collectie-app pokemon-collectie-app
```

## Troubleshooting Setup Issues

### Issue: Devcontainer fails to build

**Symptoms:** VS Code shows error when opening in container

**Solution:**

1. Ensure Docker is running
2. Check Docker has enough resources allocated
3. Try rebuilding without cache:
   - Command Palette > "Remote-Containers: Rebuild Container Without Cache"

### Issue: npm install fails

**Symptoms:** Dependency installation errors

**Solution:**

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 3000 already in use

**Symptoms:** Dev server fails to start

**Solution:**

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process or use a different port
npm run dev -- --port 3001
```

### Issue: Orval command not found

**Symptoms:** `orval: command not found` error

**Solution:**

```bash
# Install Orval globally
npm install -g orval

# Or use npx
npx orval
```
