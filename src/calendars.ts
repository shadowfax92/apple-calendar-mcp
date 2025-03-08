import axios from 'axios';

// Base URL for the Calendar API Bridge
const API_BASE_URL = 'http://localhost:8080';

/**
 * Format a date string for consistency
 */
function formatDate(date: Date | string | null): string | null {
  if (!date) return null;
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return null;
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
    const eventData = {
      title,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      location,
      notes
    };
    
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
    // Format dates if provided
    if (updates.startDate) {
      updates.startDate = formatDate(updates.startDate) || updates.startDate;
    }
    
    if (updates.endDate) {
      updates.endDate = formatDate(updates.endDate) || updates.endDate;
    }
    
    const response = await axios.put(
      `${API_BASE_URL}/calendars/${calendarId}/events/${eventId}`,
      updates
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