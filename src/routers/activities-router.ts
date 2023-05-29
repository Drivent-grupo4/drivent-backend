import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import {
  bookUserActivity,
  getActivitiesByUser,
  getActivitiesDays,
  getActivitiesPlaces,
  getAllActivities,
  getBookingsByActivity,
} from '@/controllers/activities-controller';

const activitiesRouter = Router();

activitiesRouter
  .all('/*', authenticateToken)
  .get('/', getActivitiesDays)
  .get('/all', getAllActivities)
  .get('/places', getActivitiesPlaces)
  .get('/booking', getActivitiesByUser)
  .get('/booking/:activityId', getBookingsByActivity)
  .post('/booking/:activityId', bookUserActivity);

export { activitiesRouter };
