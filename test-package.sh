#!/bin/bash

# Build the package
npm run build

# Pack it locally
npm pack

# Show the contents of the tarball
echo "Contents of the npm package:"
tar -tvf $(ls -t *.tgz | head -1)

echo ""
echo "To test the package locally, you can run:"
echo "npm install -g $(ls -t *.tgz | head -1)"
echo "mcp-apple-calendars" 