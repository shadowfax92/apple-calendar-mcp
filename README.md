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

## Development

To run the server in development mode with automatic reloading:

```
npm run dev
```

## License

MIT 