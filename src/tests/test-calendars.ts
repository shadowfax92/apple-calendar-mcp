import * as calendars from '../calendars.js';

// Constant to control event deletion
const ENABLE_EVENT_DELETION = false;

async function runTests() {
  console.log('Running calendar API tests...');
  
  try {
    // Test getting all calendars
    console.log('\n1. Getting all calendars:');
    const allCalendars = await calendars.getCalendars();
    console.log(JSON.stringify(allCalendars, null, 2));
    
    if (allCalendars.length === 0) {
      console.log('No calendars found. Please create a calendar first.');
      return;
    }
    
    // Use the first calendar that allows modifications
    const targetCalendar = allCalendars.find(cal => cal.allowsModifications === true);
    
    if (!targetCalendar) {
      console.log('No modifiable calendars found. Please create a modifiable calendar first.');
      return;
    }
    
    console.log(`\nUsing calendar: ${targetCalendar.title} (${targetCalendar.id})`);
    const calendarId = targetCalendar.id;
    
    // Test getting events
    console.log('\n2. Getting events from the selected calendar:');
    const events = await calendars.getCalendarEvents(calendarId);
    console.log(JSON.stringify(events, null, 2));
    
    // Test creating an event
    console.log('\n3. Creating a test event:');
    
    // Create dates for tomorrow at 10:00 and 11:00
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    
    const tomorrowEnd = new Date(tomorrow);
    tomorrowEnd.setHours(11, 0, 0, 0);
    
    // Format dates as ISO strings
    const startDateStr = tomorrow.toISOString();
    const endDateStr = tomorrowEnd.toISOString();
    
    console.log(`Using start date: ${startDateStr}`);
    console.log(`Using end date: ${endDateStr}`);
    
    try {
      const newEvent = await calendars.createCalendarEvent(
        calendarId,
        'Test Event from MCP',
        startDateStr,
        endDateStr,
        'Test Location',
        'Test Notes - Created by MCP Apple Calendars test'
      );
      
      console.log('Event created successfully:');
      console.log(JSON.stringify(newEvent, null, 2));
      
      // If event creation was successful, try to delete it
      if (newEvent && newEvent.id && ENABLE_EVENT_DELETION) {
        console.log(`\n4. Deleting the test event (ID: ${newEvent.id}):`);
        const deleteResult = await calendars.deleteCalendarEvent(calendarId, newEvent.id);
        console.log(`Event deleted: ${deleteResult}`);
      }
    } catch (error: any) {
      console.error('Error during event creation:', error.message);
      
      // If we couldn't create an event, try to get existing events and delete one
      console.log('\nTrying to get and delete an existing event instead...');
      const currentEvents = await calendars.getCalendarEvents(calendarId);
      
      if (currentEvents && currentEvents.length > 0) {
        const eventToDelete = currentEvents[0];
        console.log(`Found existing event: ${eventToDelete.title} (${eventToDelete.id})`);
        console.log(`Deleting event...`);
        
        const deleteResult = await calendars.deleteCalendarEvent(calendarId, eventToDelete.id);
        console.log(`Event deleted: ${deleteResult}`);
      } else {
        console.log('No existing events found to delete.');
      }
    }
    
    console.log('\nAll tests completed!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

runTests(); 