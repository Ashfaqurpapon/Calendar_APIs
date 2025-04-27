export interface IRecurrence {
  frequency: 'daily' | 'weekly' | 'monthly';
  interval?: number;
  endDate?: Date;
}

export interface IEvent {
  _id?: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  participants: string[];
  createdBy: string;
  recurrence?: IRecurrence;
  seriesId?: string;
}
