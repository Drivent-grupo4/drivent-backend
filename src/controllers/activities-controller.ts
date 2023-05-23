import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';

import { AuthenticatedRequest } from '@/middlewares';
import activitiesService from '@/services/activities-service';

export async function getActivitiesDays(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    // const { userId } = req;
    const activities = await activitiesService.getActivitiesDays();
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    next(error);
  }
}
