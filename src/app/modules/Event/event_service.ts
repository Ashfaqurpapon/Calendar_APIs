import { Event } from './event_model';
import { IEvent } from './event_interface';
import { v4 as uuidv4 } from 'uuid';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

//
//
//**Create Event Service
//
//

export const createEvent = async (data: IEvent) => {
  const seriesId = data.recurrence ? uuidv4() : undefined;
  const baseEvent = { ...data, seriesId };

  const events: IEvent[] = [];

  if (data.recurrence) {
    const current = new Date(data.startTime);
    const endDate =
      data.recurrence.endDate ||
      new Date(current.getTime() + 30 * 24 * 60 * 60 * 1000); // default 30 days

    while (current <= endDate) {
      const nextEnd = new Date(
        current.getTime() +
          (new Date(data.endTime).getTime() -
            new Date(data.startTime).getTime()),
      );
      events.push({
        ...baseEvent,
        startTime: new Date(current),
        endTime: nextEnd,
        recurrence: data.recurrence,
      });

      if (data.recurrence.frequency === 'daily') {
        current.setDate(current.getDate() + (data.recurrence.interval || 1));
      } else if (data.recurrence.frequency === 'weekly') {
        current.setDate(
          current.getDate() + 7 * (data.recurrence.interval || 1),
        );
      } else if (data.recurrence.frequency === 'monthly') {
        current.setMonth(current.getMonth() + (data.recurrence.interval || 1));
      }
    }
    return Event.insertMany(events);
  } else {
    const event = new Event(baseEvent);
    return event.save();
  }
};

//
//
//**Update Event Service
//
//

export const updateEvent = async (
  eventId: string,
  updateData: Partial<IEvent>,
  mode: 'thisEvent' | 'thisAndFollowing' | 'allEvents',
  user: { userId: string; role: string },
) => {
  const now = new Date();
  const event = await Event.findById(eventId);

  //Check ID is Valid or not
  if (!event) throw new AppError(httpStatus.BAD_REQUEST, 'This ID is Invalid');

  //Check Authorization
  if (event.createdBy !== user.userId && user.role !== 'admin') {
    throw new Error('Unauthorized: You are not allowed to update this event');
  }

  if (mode === 'thisEvent') {
    return Event.findByIdAndUpdate(eventId, updateData, { new: true });
  } else if (mode === 'thisAndFollowing') {
    return Event.updateMany(
      {
        seriesId: event.seriesId,
        startTime: { $gte: event.startTime },
        endTime: { $gte: now },
      },
      updateData,
    );
  } else if (mode === 'allEvents') {
    return Event.updateMany({ seriesId: event.seriesId }, updateData);
  }
};

//
//
//**Delete Event Service
//
//

export const deleteEvent = async (
  eventId: string,
  mode: 'thisEvent' | 'thisAndFollowing' | 'allEvents',
  user: { userId: string; role: string },
) => {
  const event = await Event.findById(eventId);
  const now = new Date();

  //Check ID is Valid or not
  if (!event) throw new Error('Event not found');

  //Check Authorization
  if (event.createdBy !== user.userId && user.role !== 'admin') {
    throw new Error('Unauthorized: You are not allowed to update this event');
  }

  if (mode === 'thisEvent') {
    return Event.findByIdAndDelete(eventId);
  } else if (mode === 'thisAndFollowing') {
    return Event.deleteMany({
      seriesId: event.seriesId,
      startTime: { $gte: event.startTime },
      endTime: { $gte: now },
    });
  } else if (mode === 'allEvents') {
    return Event.deleteMany({ seriesId: event.seriesId });
  }
};

export const getMyEvents = async (userId: string) => {
  return Event.find({ participants: userId });
};
