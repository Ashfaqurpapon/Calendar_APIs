import { Schema, model } from 'mongoose';
import { IEvent } from './event_interface';

const RecurrenceSchema = new Schema({
  frequency: { type: String, enum: ['daily', 'weekly', 'monthly'] },
  interval: { type: Number, default: 1 },
  endDate: { type: Date },
});

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    participants: [{ type: String }],
    createdBy: { type: String, required: true },
    recurrence: { type: RecurrenceSchema },
    seriesId: { type: String },
  },
  { timestamps: true },
);

export const Event = model<IEvent>('Event', EventSchema);
