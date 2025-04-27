import { body } from 'express-validator';

export const createEventValidation = [
  body('title').notEmpty().withMessage('Title is required'),

  body('startTime')
    .isISO8601()
    .withMessage('startTime must be a valid ISO8601 date'),

  body('endTime')
    .isISO8601()
    .withMessage('endTime must be a valid ISO8601 date'),

  body('participants')
    .optional()
    .isArray()
    .withMessage('Participants must be an array'),

  body('recurrence.frequency')
    .optional()
    .isIn(['daily', 'weekly', 'monthly'])
    .withMessage('Recurrence frequency must be daily, weekly, or monthly'),

  //  Custom validator to check startTime < endTime
  body().custom((value) => {
    if (value.startTime && value.endTime) {
      const start = new Date(value.startTime);
      const end = new Date(value.endTime);
      if (start >= end) {
        throw new Error('startTime must be earlier than endTime');
      }
    }
    return true;
  }),
];

export const updateEventValidation = [
  body('title').optional().isString().withMessage('Title must be a string'),

  body('startTime')
    .optional()
    .isISO8601()
    .withMessage('Start time must be a valid ISO8601 date'),

  body('endTime')
    .optional()
    .isISO8601()
    .withMessage('End time must be a valid ISO8601 date'),

  body('participants')
    .optional()
    .isArray()
    .withMessage('Participants must be an array of user IDs'),

  body('recurrenceUpdateOption')
    .exists()
    .withMessage('Recurrence update option is required')
    .isIn(['thisEvent', 'thisAndFollowing', 'allEvents'])
    .withMessage(
      'Recurrence update option must be one of: thisEvent, thisAndFollowing, allEvents',
    ),

  //  Same custom validation on update
  body().custom((value) => {
    if (value.startTime && value.endTime) {
      const start = new Date(value.startTime);
      const end = new Date(value.endTime);
      if (start >= end) {
        throw new Error('startTime must be earlier than endTime');
      }
    }
    return true;
  }),
];
