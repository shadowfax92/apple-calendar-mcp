import axios from 'axios';

// Get port from environment variable or use default 8080
const API_PORT = process.env.MAC_API_BRIDGE_PORT || '8080';
// Base URL for the Calendar API Bridge
const API_BASE_URL = `http://localhost:${API_PORT}`;

/**
 * Validate and format a date string for the Calendar API Bridge
 * Supported formats:
 * 1. ISO8601 with milliseconds and Z timezone (recommended): 2025-03-09T10:00:00.000Z
 * 2. ISO8601 without milliseconds: 2025-03-09T10:00:00
 * 3. ISO8601 with space instead of T: 2025-03-09 10:00:00
 * 4. ISO8601 with forward slashes: 2025/03/09 10:00:00
 */
function formatDate(date: Date | string | null): string | null {
  if (!date) return null;

  try {
    // If it's already a Date object, just return ISO string
    if (date instanceof Date) {
      if (isNaN(date.getTime())) return null;
      return date.toISOString();
    }

    // Handle string input
    const dateStr = date.trim();

    // Try parsing the date string as-is first
    let dateObj = new Date(dateStr);
    
    // If the direct parse failed, try alternative formats
    if (isNaN(dateObj.getTime())) {
      // Handle forward slash format
      if (dateStr.includes('/')) {
        dateObj = new Date(dateStr.replace(/\//g, '-'));
      }
      // Handle space instead of T
      else if (dateStr.includes(' ')) {
        dateObj = new Date(dateStr.replace(' ', 'T'));
      }
    }

    if (isNaN(dateObj.getTime())) {
      console.error('Invalid date format:', dateStr);
      return null;
    }

    return dateObj.toISOString();
  } catch (error) {
    console.error('Date formatting error:', error);
    return null;
  }
}

/**
 * Get all calendars
 */
export async function getCalendars(): Promise<any[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/calendars`);
    return response.data;
  } catch (error) {
    console.error('Failed to get calendars:', error);
    throw new Error(`Failed to get calendars: ${error}`);
  }
}

/**
 * Get a specific calendar by ID
 */
export async function getCalendar(calendarId: string): Promise<any> {
  try {
    const response = await axios.get(`${API_BASE_URL}/calendars/${calendarId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to get calendar with ID "${calendarId}":`, error);
    throw new Error(`Failed to get calendar: ${error}`);
  }
}

/**
 * Get events from a specific calendar
 */
export async function getCalendarEvents(calendarId: string): Promise<any[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/calendars/${calendarId}/events`);
    return response.data;
  } catch (error) {
    console.error(`Failed to get events from calendar "${calendarId}":`, error);
    throw new Error(`Failed to get calendar events: ${error}`);
  }
}

/**
 * Get a specific event by ID
 */
export async function getCalendarEvent(calendarId: string, eventId: string): Promise<any> {
  try {
    const response = await axios.get(`${API_BASE_URL}/calendars/${calendarId}/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to get event "${eventId}" from calendar "${calendarId}":`, error);
    throw new Error(`Failed to get calendar event: ${error}`);
  }
}

/**
 * Create a new calendar
 */
export async function createCalendar(title: string, color?: string): Promise<any> {
  try {
    const response = await axios.post(`${API_BASE_URL}/calendars`, {
      title,
      color
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to create calendar "${title}":`, error);
    throw new Error(`Failed to create calendar: ${error}`);
  }
}

/**
 * Create a new event in a calendar
 */
export async function createCalendarEvent(
  calendarId: string, 
  title: string, 
  startDate: string, 
  endDate: string, 
  location?: string, 
  notes?: string
): Promise<any> {
  try {
    // Format dates using our flexible date formatter
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    
    if (!formattedStartDate || !formattedEndDate) {
      throw new Error('Invalid date format provided. Please use one of the supported formats.');
    }
    
    // Create the event data
    const eventData: any = {
      title,
      startDate: formattedStartDate,
      endDate: formattedEndDate
    };
    
    // Add optional fields if provided
    if (location) eventData.location = location;
    if (notes) eventData.notes = notes;
    
    console.log('Creating event with data:', JSON.stringify(eventData));
    
    // Send the request
    const response = await axios.post(
      `${API_BASE_URL}/calendars/${calendarId}/events`, 
      eventData
    );
    
    return response.data;
  } catch (error) {
    console.error(`Failed to create event "${title}" in calendar "${calendarId}":`, error);
    throw new Error(`Failed to create calendar event: ${error}`);
  }
}

/**
 * Update an existing event
 */
export async function updateCalendarEvent(
  calendarId: string,
  eventId: string,
  updates: {
    title?: string;
    startDate?: string;
    endDate?: string;
    location?: string;
    notes?: string;
  }
): Promise<any> {
  try {
    const updatedData: any = { ...updates };
    
    // Format dates if provided
    if (updatedData.startDate) {
      const formattedStartDate = formatDate(updatedData.startDate);
      if (!formattedStartDate) {
        throw new Error('Invalid start date format provided. Please use one of the supported formats.');
      }
      updatedData.startDate = formattedStartDate;
    }
    
    if (updatedData.endDate) {
      const formattedEndDate = formatDate(updatedData.endDate);
      if (!formattedEndDate) {
        throw new Error('Invalid end date format provided. Please use one of the supported formats.');
      }
      updatedData.endDate = formattedEndDate;
    }
    
    console.log('Updating event with data:', JSON.stringify(updatedData));
    
    // Send the request
    const response = await axios.put(
      `${API_BASE_URL}/calendars/${calendarId}/events/${eventId}`,
      updatedData
    );
    
    return response.data;
  } catch (error) {
    console.error(`Failed to update event "${eventId}" in calendar "${calendarId}":`, error);
    throw new Error(`Failed to update calendar event: ${error}`);
  }
}

/**
 * Delete an event
 */
export async function deleteCalendarEvent(calendarId: string, eventId: string): Promise<boolean> {
  try {
    await axios.delete(`${API_BASE_URL}/calendars/${calendarId}/events/${eventId}`);
    return true;
  } catch (error) {
    console.error(`Failed to delete event "${eventId}" from calendar "${calendarId}":`, error);
    throw new Error(`Failed to delete calendar event: ${error}`);
  }
}

/**
 * Delete a calendar
 */
export async function deleteCalendar(calendarId: string): Promise<boolean> {
  try {
    await axios.delete(`${API_BASE_URL}/calendars/${calendarId}`);
    return true;
  } catch (error) {
    console.error(`Failed to delete calendar "${calendarId}":`, error);
    throw new Error(`Failed to delete calendar: ${error}`);
  }
} 