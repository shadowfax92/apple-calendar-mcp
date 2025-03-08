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

## Troubleshooting

### Common Issues

1. **Calendar Access Denied**: Make sure to grant Calendar access to the application in System Preferences > Security & Privacy > Privacy > Calendars.

2. **Port Already in Use**: If port 8080 is already in use, you can modify the port in the code or terminate the other application using that port.

3. **Application Crashes**: Check the error logs for more information. The application may crash if it cannot access the Calendar or if there are issues with the HTTP server.

4. **Permission Issues**: If you're having trouble with calendar permissions, try running the setup script:
   ```
   ./setup-permissions.swift
   ``` 