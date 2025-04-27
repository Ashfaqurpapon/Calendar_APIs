/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  createEvent,
  deleteEvent,
  getMyEvents,
  updateEvent,
} from './event_service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

//
//
//**Create Event
//
//

export const createEventHandler = catchAsync(async (req, res) => {
  const eventData = { ...req.body, createdBy: req.user?.userId };
  const event = await createEvent(eventData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Event Created successfully',
    data: event,
  });
});

//
//
//**Update Event
//
//

export const updateEventHandler = catchAsync(async (req, res) => {
  const recurrenceMode = req.body.recurrenceUpdateOption; // 'thisEvent', 'thisAndFollowing', 'allEvents'
  const eventId = req.params.eventId;

  const updated = await updateEvent(
    eventId,
    req.body,
    recurrenceMode as any,
    req.user as any,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Updated Events successfully',
    data: updated,
  });
});

//
//
//**Delete Event
//
//

export const deleteEventHandler = catchAsync(async (req, res) => {
  const recurrenceMode = req.body.recurrenceUpdateOption;
  const eventId = req.params.eventId;

  const deleted = await deleteEvent(
    eventId,
    recurrenceMode as any,
    req.user as any,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Deleted Events successfully',
    data: deleted,
  });
});

//
//
//**Get Myu Event
//
//

export const getMyEventsHandler = catchAsync(async (req, res) => {
  const events = await getMyEvents(req.user!.userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Events retrieved successfully',
    data: events,
  });
});
