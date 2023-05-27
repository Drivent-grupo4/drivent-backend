import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import {
  bookActivity,
  getActivitiesDays,
  getActivitiesPlaces,
  getAllActivities,
} from '@/controllers/activities-controller';

const activitiesRouter = Router();

activitiesRouter
  .all('/*', authenticateToken)
  .get('/', getActivitiesDays)
  .get('/all', getAllActivities)
  .get('/places', getActivitiesPlaces)
  .post('/booking/:activityId', bookActivity);

export { activitiesRouter };
