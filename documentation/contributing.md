# Contributing

Thank you for your interest in contributing to Pokemon-collectie-app! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR-USERNAME/Pokemon-collectie-app.git
   ```
3. Set up the development environment (see [Development Setup](./development-setup.md))
4. Create a branch for your changes

## Development Workflow

### Branch Naming

Use descriptive branch names following this convention:

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/description` | `feature/add-card-search` |
| Bug fix | `fix/description` | `fix/card-image-loading` |
| Documentation | `docs/description` | `docs/api-examples` |
| Refactor | `refactor/description` | `refactor/simplify-store` |
| Chore | `chore/description` | `chore/update-dependencies` |

### Making Changes

1. Create a new branch from `main`:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-feature
   ```

2. Make your changes with clear, focused commits

3. Write/update tests for your changes

4. Ensure all tests pass:
   ```bash
   npm test
   ```

5. Ensure code passes linting:
   ```bash
   npm run lint
   ```

6. Format your code:
   ```bash
   npm run format
   ```

## Commit Messages

Follow the conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting, semicolons, etc.) |
| `refactor` | Code refactoring |
| `test` | Adding or updating tests |
| `chore` | Maintenance tasks |
| `perf` | Performance improvements |

### Examples

```
feat(collection): add card search functionality

Implement fuzzy search for Pokemon cards by name, set, or type.

fix(api): handle rate limiting from Pokemon TCG API

Add exponential backoff when API returns 429 status.

docs(readme): update installation instructions

chore(deps): update Vue to 3.4.0
```

## Pull Requests

### Before Submitting

- [ ] Branch is up to date with `main`
- [ ] Tests pass locally (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Code is formatted (`npm run format`)
- [ ] Documentation updated (if applicable)
- [ ] Commit messages follow conventions

### Creating a Pull Request

1. Push your branch to your fork:
   ```bash
   git push origin feature/your-feature
   ```

2. Open a Pull Request on GitHub

3. Fill in the PR template with:
   - **What**: What changes does this PR make?
   - **Why**: Why are these changes needed?
   - **How**: How were these changes implemented?
   - **Testing**: How did you test these changes?

### PR Description Template

```markdown
## Summary
Brief description of changes

## Changes
- Change 1
- Change 2

## Testing
- How to test these changes
- Test cases covered

## Screenshots (if applicable)
```

### Review Process

1. Submit your PR
2. Automated checks will run (tests, linting)
3. A maintainer will review your code
4. Address any feedback by pushing additional commits
5. Once approved, your PR will be merged

## Code Style

This project uses automated formatting and linting:

| Tool | Purpose | Config File |
|------|---------|-------------|
| ESLint | Code linting | `.eslintrc` |
| Prettier | Code formatting | `.prettierrc` |
| TypeScript | Type checking | `tsconfig.json` |

### Run Before Committing

```bash
npm run format  # Auto-format code
npm run lint    # Check for issues
```

### Vue/Nuxt Style Guidelines

- Use Composition API with `<script setup>`
- Use TypeScript for all new code
- Follow Vue 3 naming conventions:
  - Components: PascalCase (`CardDetails.vue`)
  - Composables: camelCase with `use` prefix (`useCardSearch.ts`)
  - Stores: camelCase with `use` prefix (`useCollectionStore.ts`)

## Testing Requirements

- All new features must include tests
- Bug fixes should include a test that would have caught the bug
- Maintain or improve code coverage

### Test Structure

```
tests/
├── unit/           # Unit tests for composables, utilities
├── components/     # Component tests
└── e2e/           # End-to-end tests (Playwright)
```

## Documentation

Update documentation when:
- Adding new features
- Changing existing behavior
- Modifying configuration options
- Updating dependencies with breaking changes

Documentation lives in the `documentation/` folder.

## Getting Help

- **Bug reports**: Open an issue with the "bug" label
- **Feature requests**: Open an issue with the "enhancement" label
- **Questions**: Open a discussion in the GitHub Discussions tab
- **Security issues**: See [Security Policy](./security.md)

## Code of Conduct

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). Please be respectful and inclusive in all interactions.

### Our Standards

- Be welcoming and inclusive
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what is best for the community

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Personal attacks
- Publishing others' private information

## Recognition

Contributors will be recognized in the project README. Thank you for helping improve Pokemon-collectie-app!
