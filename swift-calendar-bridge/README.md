# Calendar API Bridge Setup

This directory contains the Swift code for the Calendar API Bridge, which is required for the MCP Apple Calendars module to work.

## Prerequisites

- macOS 12.0 or later
- Swift 5.5 or later
- Xcode 13.0 or later (for development)

## Installation

1. Clone the [Calendar API Bridge repository](https://github.com/your-username/swift-apple-api) or copy the Swift code into this directory.

2. Build the application:
   ```
   swift build -c release
   ```

3. Set up calendar permissions:
   ```
   ./setup-permissions.swift
   ```
   This will prompt you to grant calendar access permissions.

4. Copy the built executable to a location of your choice:
   ```
   cp .build/release/CalendarAPIBridge /usr/local/bin/
   ```

## Running the Calendar API Bridge

Start the Calendar API Bridge before using the MCP Apple Calendars module:

```
CalendarAPIBridge
```

The server will start on port 8080 by default.

## Running in the Background

To run the application in the background:

```
nohup CalendarAPIBridge > /tmp/calendar-api-bridge.log 2>&1 &
```

## Date Format

The Calendar API Bridge now supports multiple date formats. When creating or updating events, you can use any of the following formats:

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

The Calendar API Bridge has been updated with a flexible date decoder that can handle these formats automatically.

## Troubleshooting

### Common Issues

1. **Calendar Access Denied**: Make sure to grant Calendar access to the application in System Preferences > Security & Privacy > Privacy > Calendars.

2. **Port Already in Use**: If port 8080 is already in use, you can modify the port in the code or terminate the other application using that port.

3. **Application Crashes**: Check the error logs for more information. The application may crash if it cannot access the Calendar or if there are issues with the HTTP server.

4. **Permission Issues**: If you're having trouble with calendar permissions, try running the setup script:
   ```
   ./setup-permissions.swift
   ```

5. **Date Format Errors**: If you're seeing errors about date formats, make sure you're using the correct ISO8601 format as described above. 