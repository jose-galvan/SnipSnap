# ESLint and Prettier Configuration

This project uses ESLint and Prettier for code linting and formatting across both the React client and NestJS server packages.

## Configuration

### ESLint
- Configuration file: `eslint.config.mjs`
- Uses TypeScript ESLint parser and rules
- React-specific rules for the client package
- NestJS-specific rules for the server package
- Integrates with Prettier for formatting

### Prettier
- Configuration file: `.prettierrc`
- Settings:
  - No semicolons (`"semi": false`)
  - Single quotes (`"singleQuote": true`)
  - 120 character line limit (`"printWidth": 120`)
  - 2-space indentation
  - Trailing commas where valid in ES5
  - LF line endings

## Available Scripts

### Root Level
- `npm run lint` - Run ESLint on all packages
- `npm run lint:fix` - Run ESLint with auto-fix on all packages
- `npm run format` - Format all files with Prettier
- `npm run format:check` - Check if files are formatted correctly
- `npm run lint-and-format` - Run lint:fix followed by format

### Package Level
Each package (client/server) has its own scripts that delegate to the root configuration:
- `npm run lint` - Lint only that package
- `npm run lint:fix` - Lint and fix only that package
- `npm run format` - Format only that package

## VS Code Integration

The `.vscode/settings.json` file is configured to:
- Use Prettier as the default formatter
- Format on save
- Auto-fix ESLint issues on save
- Show a ruler at 120 characters
- Use single quotes for TypeScript/JavaScript

## Pre-commit Hooks (Optional)

Consider adding husky and lint-staged for pre-commit hooks:

```bash
npm install --save-dev husky lint-staged
```

Then add to package.json:
```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"]
  }
}
```
