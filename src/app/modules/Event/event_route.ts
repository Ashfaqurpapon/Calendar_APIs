import { Router } from 'express';

import {
  createEventValidation,
  updateEventValidation,
} from './event_validation';
import {
  createEventHandler,
  deleteEventHandler,
  getMyEventsHandler,
  updateEventHandler,
} from './event_controller';
import { mockAuth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';

const router = Router();

router.use(mockAuth);

router.post('/', createEventValidation, validateRequest, createEventHandler);

router.put(
  '/:eventId',
  updateEventValidation,
  validateRequest,
  updateEventHandler,
);

router.delete('/:eventId', deleteEventHandler);

router.get('/myEvents', getMyEventsHandler);

export const EventRoutes = router;
