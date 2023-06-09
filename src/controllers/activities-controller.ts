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

export async function getAllActivities(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const allActivities = await activitiesService.getAllActivities();
    return res.status(httpStatus.OK).send(allActivities);
  } catch (error) {
    next(error);
  }
}

export async function getActivitiesPlaces(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const activities = await activitiesService.getActivitiesPlaces();
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    next(error);
  }
}

export async function getActivitiesByUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const activities = await activitiesService.getActivitiesByUserId(userId);
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    next(error);
  }
}

export async function getBookingsByActivity(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const activityId = Number(req.params.activityId);
    const bookings = await activitiesService.getActivitiesByActivityId(activityId);
    return res.status(httpStatus.OK).send(bookings);
  } catch (error) {
    next(error);
  }
}

export async function bookUserActivity(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;

    const activityId = Number(req.params.activityId);

    const booking = await activitiesService.bookActivity(activityId, userId);

    return res.status(httpStatus.OK).send({
      booking: booking.Activities,
    });
  } catch (error) {
    next(error);
  }
}
