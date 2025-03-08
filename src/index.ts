import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as calendars from "./calendars.js";

// Create a simple MCP server for Apple Calendars
const server = new McpServer({
  name: "apple-calendars",
  version: "1.0.0"
});

// Tool to get all calendars
server.tool(
  "getCalendars",
  {},
  async () => {
    try {
      const calendarList = await calendars.getCalendars();
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify({ calendars: calendarList }) 
        }]
      };
    } catch (error) {
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify({ error: "Failed to get calendars" }) 
        }],
        isError: true
      };
    }
  }
);

// Tool to get events from a specific calendar
server.tool(
  "getCalendarEvents",
  { calendarId: z.string() },
  async ({ calendarId }) => {
    try {
      const events = await calendars.getCalendarEvents(calendarId);
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify({ events }) 
        }]
      };
    } catch (error) {
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify({ error: `Failed to get events from calendar: ${calendarId}` }) 
        }],
        isError: true
      };
    }
  }
);

// Tool to create a new calendar
server.tool(
  "createCalendar",
  { 
    title: z.string(),
    color: z.string().optional()
  },
  async ({ title, color }) => {
    try {
      const result = await calendars.createCalendar(title, color);
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify({ 
            success: true, 
            message: "Calendar created", 
            calendar: result 
          }) 
        }]
      };
    } catch (error) {
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify({ error: "Failed to create calendar" }) 
        }],
        isError: true
      };
    }
  }
);

// Tool to create a new event in a calendar
server.tool(
  "createCalendarEvent",
  { 
    calendarId: z.string(),
    title: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    location: z.string().optional(),
    notes: z.string().optional()
  },
  async ({ calendarId, title, startDate, endDate, location, notes }) => {
    try {
      try {
        const result = await calendars.createCalendarEvent(
          calendarId, 
          title, 
          startDate, 
          endDate, 
          location, 
          notes
        );
        
        return {
          content: [{ 
            type: "text", 
            text: JSON.stringify({ 
              success: true, 
              message: "Event created", 
              event: result 
            }) 
          }]
        };
      } catch (error: any) {
        // Check if it's a date format error
        if (error.message && (error.message.includes('date') || 
            (error.response?.data?.reason && error.response.data.reason.includes('ISO8601')))) {
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify({ 
                error: "Failed to create event due to date format issues", 
                message: "The Calendar API requires a specific ISO8601 format that we couldn't determine. The Swift API is expecting a specific format that we haven't been able to match.",
                details: "This is a known issue with the Calendar API Bridge. Please check the API documentation for the correct date format.",
                workaround: "You can try creating events directly through the macOS Calendar app instead."
              }) 
            }],
            isError: true
          };
        }
        
        // If it's not a date format error, rethrow
        throw error;
      }
    } catch (error) {
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify({ error: "Failed to create event" }) 
        }],
        isError: true
      };
    }
  }
);

// Tool to update an existing event
server.tool(
  "updateCalendarEvent",
  { 
    calendarId: z.string(),
    eventId: z.string(),
    title: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    location: z.string().optional(),
    notes: z.string().optional()
  },
  async ({ calendarId, eventId, title, startDate, endDate, location, notes }) => {
    try {
      try {
        const updates = {
          title,
          startDate,
          endDate,
          location,
          notes
        };
        
        // Filter out undefined values
        Object.keys(updates).forEach(key => {
          if (updates[key as keyof typeof updates] === undefined) {
            delete updates[key as keyof typeof updates];
          }
        });
        
        const result = await calendars.updateCalendarEvent(calendarId, eventId, updates);
        
        return {
          content: [{ 
            type: "text", 
            text: JSON.stringify({ 
              success: true, 
              message: "Event updated", 
              event: result 
            }) 
          }]
        };
      } catch (error: any) {
        // Check if it's a date format error
        if (error.message && error.message.includes('date')) {
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify({ 
                error: "Failed to update event due to date format issues", 
                message: "The Calendar API requires a specific date format that we couldn't determine. Please try using a different date format or contact the API provider for the correct format.",
                details: error.message
              }) 
            }],
            isError: true
          };
        }
        
        // If it's not a date format error, rethrow
        throw error;
      }
    } catch (error) {
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify({ error: "Failed to update event" }) 
        }],
        isError: true
      };
    }
  }
);

// Tool to delete an event
server.tool(
  "deleteCalendarEvent",
  { 
    calendarId: z.string(),
    eventId: z.string()
  },
  async ({ calendarId, eventId }) => {
    try {
      const success = await calendars.deleteCalendarEvent(calendarId, eventId);
      
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify({ 
            success, 
            message: success ? "Event deleted" : "Failed to delete event" 
          }) 
        }]
      };
    } catch (error) {
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify({ error: "Failed to delete event" }) 
        }],
        isError: true
      };
    }
  }
);

// Tool to delete a calendar
server.tool(
  "deleteCalendar",
  { 
    calendarId: z.string()
  },
  async ({ calendarId }) => {
    try {
      const success = await calendars.deleteCalendar(calendarId);
      
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify({ 
            success, 
            message: success ? "Calendar deleted" : "Failed to delete calendar" 
          }) 
        }]
      };
    } catch (error) {
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify({ error: "Failed to delete calendar" }) 
        }],
        isError: true
      };
    }
  }
);

// Start the server
async function runServer() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("MCP Apple Calendars server started");
  } catch (error) {
    console.error("Failed to start MCP server:", error);
    process.exit(1);
  }
}

runServer(); 