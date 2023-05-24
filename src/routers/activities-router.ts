import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getActivitiesDays, getActivitiesPlaces, getAllActivities } from '@/controllers/activities-controller';

const activitiesRouter = Router();

activitiesRouter
  .all('/*', authenticateToken)
  .get('/', getActivitiesDays)
  .get('/all', getAllActivities)
  .get('/places', getActivitiesPlaces);

export { activitiesRouter };
