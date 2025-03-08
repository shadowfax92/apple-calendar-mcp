# MCP Apple Calendars

A Model Context Protocol (MCP) server for interacting with Apple Calendars on macOS. This module allows AI models to access and manipulate calendar data through a standardized interface.

## Prerequisites

- macOS 12.0 or later
- Node.js 16.0 or later
- [Calendar API Bridge](https://github.com/your-username/swift-apple-api) running locally

## Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Build the TypeScript code:
   ```
   npm run build
   ```

## Usage

1. Make sure the Calendar API Bridge is running on port 8080
2. Start the MCP server:
   ```
   npm start
   ```

## Available Tools

The MCP server provides the following tools for AI models:

- `getCalendars`: List all available calendars
- `getCalendarEvents`: Get events from a specific calendar
- `createCalendarEvent`: Create a new event in a calendar
- `updateCalendarEvent`: Update an existing event
- `deleteCalendarEvent`: Delete an event from a calendar

## Date Formats

When creating or updating events, you can use any of the following date formats:

1. ISO8601 with milliseconds and Z timezone (recommended):
   ```
   2025-03-09T10:00:00.000Z
   ```

2. ISO8601 without milliseconds:
   ```
   2025-03-09T10:00:00
   ```

3. ISO8601 with space instead of T:
   ```
   2025-03-09 10:00:00
   ```

4. ISO8601 with forward slashes:
   ```
   2025/03/09 10:00:00
   ```

The Calendar API Bridge has been updated to handle these date formats automatically.

## Development

To run the server in development mode with automatic reloading:

```
npm run dev
```

## License

MIT 