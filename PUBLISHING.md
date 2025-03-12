# Publishing to npm

Follow these steps to publish your MCP Apple Calendars package to npm:

## Prerequisites

1. Make sure you have an npm account. If not, create one at [npmjs.com](https://www.npmjs.com/signup).
2. Make sure you have the latest version of npm installed:
   ```
   npm install -g npm@latest
   ```

## Steps to Publish

1. **Login to npm** (if you haven't already):
   ```
   npm login
   ```
   Follow the prompts to enter your username, password, and email.

2. **Test the package locally** (optional but recommended):
   ```
   ./test-package.sh
   ```
   This will build the package and show you what files will be included.

3. **Publish the package**:
   
   If this is your first time publishing a scoped package, you need to specify that it's public:
   ```
   npm publish --access=public
   ```
   
   If you're updating an existing package:
   ```
   npm publish
   ```

4. **Verify the publication**:
   ```
   npm view mcp-apple-calendars
   ```

## Using the Package

Once published, you can use the package with npx:

```
npx mcp-apple-calendars
```

Or install it globally:

```
npm install -g mcp-apple-calendars
mcp-apple-calendars
```

## Updating the Package

1. Update the version in `package.json` (follow [semver](https://semver.org/) guidelines):
   ```json
   {
     "version": "1.0.1"
   }
   ```

2. Rebuild and publish:
   ```
   npm run build
   npm publish
   ```

## Troubleshooting

### Error: Not found - 404

If you get a 404 error when trying to publish with a scoped package name (e.g., `@username/package-name`), it means:

1. You don't have permission to publish under that scope, or
2. The scope hasn't been created yet

**Solutions:**

1. **Create the scope first**: 
   Visit https://www.npmjs.com/org/create to create your scope organization.

2. **Use a non-scoped package name**:
   Edit package.json to use a non-scoped name (e.g., `mcp-apple-calendars` instead of `@shadowfax/mcp-apple-calendars`).

3. **Use your npm username as scope**:
   Make sure the scope matches your npm username exactly.
   ```
   npm whoami
   ```
   Then update package.json to use that username as the scope. 