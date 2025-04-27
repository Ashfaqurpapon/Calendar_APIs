import { Router } from 'express';

import { EventRoutes } from '../modules/Event/event_route';

const router = Router();

const moduleRoutes = [
  {
    path: '/events',
    route: EventRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
