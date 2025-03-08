import * as calendars from '../calendars.js';

async function runTests() {
  console.log('Running calendar API tests...');
  
  try {
    // Test getting all calendars
    console.log('\n1. Getting all calendars:');
    const allCalendars = await calendars.getCalendars();
    console.log(JSON.stringify(allCalendars, null, 2));
    
    if (allCalendars.length === 0) {
      console.log('No calendars found. Creating a test calendar...');
      
      // Test creating a calendar
      console.log('\n2. Creating a test calendar:');
      const newCalendar = await calendars.createCalendar('Test Calendar', '#FF0000');
      console.log(JSON.stringify(newCalendar, null, 2));
      
      // Use the newly created calendar for further tests
      const calendarId = newCalendar.id;
      
      // Test creating an event
      console.log('\n3. Creating a test event:');
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(10, 0, 0, 0);
      
      const tomorrowEnd = new Date(tomorrow);
      tomorrowEnd.setHours(11, 0, 0, 0);
      
      const newEvent = await calendars.createCalendarEvent(
        calendarId,
        'Test Event',
        tomorrow.toISOString(),
        tomorrowEnd.toISOString(),
        'Test Location',
        'Test Notes'
      );
      console.log(JSON.stringify(newEvent, null, 2));
      
      // Test getting events
      console.log('\n4. Getting events from the test calendar:');
      const events = await calendars.getCalendarEvents(calendarId);
      console.log(JSON.stringify(events, null, 2));
      
      if (events.length > 0) {
        const eventId = events[0].id;
        
        // Test updating an event
        console.log('\n5. Updating the test event:');
        const updatedEvent = await calendars.updateCalendarEvent(
          calendarId,
          eventId,
          {
            title: 'Updated Test Event',
            notes: 'Updated Test Notes'
          }
        );
        console.log(JSON.stringify(updatedEvent, null, 2));
        
        // Test deleting an event
        console.log('\n6. Deleting the test event:');
        const deleteEventResult = await calendars.deleteCalendarEvent(calendarId, eventId);
        console.log(`Event deleted: ${deleteEventResult}`);
      }
      
      // Test deleting the calendar
      console.log('\n7. Deleting the test calendar:');
      const deleteCalendarResult = await calendars.deleteCalendar(calendarId);
      console.log(`Calendar deleted: ${deleteCalendarResult}`);
    } else {
      // Use the first calendar for testing
      const calendarId = allCalendars[0].id;
      
      // Test getting events
      console.log('\n2. Getting events from the first calendar:');
      const events = await calendars.getCalendarEvents(calendarId);
      console.log(JSON.stringify(events, null, 2));
      
      // Test creating an event
      console.log('\n3. Creating a test event:');
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(10, 0, 0, 0);
      
      const tomorrowEnd = new Date(tomorrow);
      tomorrowEnd.setHours(11, 0, 0, 0);
      
      const newEvent = await calendars.createCalendarEvent(
        calendarId,
        'Test Event',
        tomorrow.toISOString(),
        tomorrowEnd.toISOString(),
        'Test Location',
        'Test Notes'
      );
      console.log(JSON.stringify(newEvent, null, 2));
      
      // Test getting the event
      console.log('\n4. Getting the test event:');
      const eventId = newEvent.id;
      const event = await calendars.getCalendarEvent(calendarId, eventId);
      console.log(JSON.stringify(event, null, 2));
      
      // Test updating the event
      console.log('\n5. Updating the test event:');
      const updatedEvent = await calendars.updateCalendarEvent(
        calendarId,
        eventId,
        {
          title: 'Updated Test Event',
          notes: 'Updated Test Notes'
        }
      );
      console.log(JSON.stringify(updatedEvent, null, 2));
      
      // Test deleting the event
      console.log('\n6. Deleting the test event:');
      const deleteResult = await calendars.deleteCalendarEvent(calendarId, eventId);
      console.log(`Event deleted: ${deleteResult}`);
    }
    
    console.log('\nAll tests completed successfully!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

runTests(); 