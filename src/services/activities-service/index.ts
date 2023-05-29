import { notFoundError } from '@/errors';
import { cannotBookingError } from '@/errors/cannot-booking-error';
import activitiesRepository from '@/repositories/activities-repository';
import bookingRepository from '@/repositories/booking-repository';

async function getActivitiesDays() {
  const activities = await activitiesRepository.findActivitiesDays();
  if (!activities) throw notFoundError();

  return activities;
}

async function getAllActivities() {
  const allActivities = await activitiesRepository.getAllActivities();
  if (!allActivities || !allActivities[0]) throw notFoundError();

  return allActivities;
}

async function getActivitiesPlaces() {
  const activities = await activitiesRepository.findActivitiesPlaces();
  if (!activities || !activities[0]) throw notFoundError();

  return activities;
}

async function getActivitiesByUserId(userId: number) {
  const activities = await activitiesRepository.findBookingsByUserId(userId);

  return activities;
}

async function getActivitiesByActivityId(activitiesId: number) {
  const activities = await activitiesRepository.findBookingsByActivity(activitiesId);

  return activities;
}

async function bookActivity(activitiesId: number, userId: number) {
  const booking = await bookingRepository.findByUserId(userId);

  if (!booking) throw cannotBookingError();

  const activity = await activitiesRepository.findActivityById(activitiesId);
  if (activity === null) throw notFoundError();

  const bookings = await activitiesRepository.findBookingsByActivity(activitiesId);
  if (activity.capacity <= bookings.length) throw cannotBookingError();

  const userActivities = await activitiesRepository.findActivityByTime(userId, activity.activityDayId);
  if (userActivities !== null) {
    if (
      (activity.startTime.getDate() === userActivities.Activities.startTime.getDate() &&
        activity.startTime.getUTCHours() === userActivities.Activities.startTime.getUTCHours() &&
        activity.startTime.getUTCMinutes() === userActivities.Activities.startTime.getUTCMinutes()) ||
      userActivities.Activities.endTime.getTime() > activity.startTime.getTime()
    )
      throw cannotBookingError();
  }
  return activitiesRepository.bookActivity(activitiesId, userId);
}

export default {
  getActivitiesDays,
  getAllActivities,
  getActivitiesPlaces,
  bookActivity,
  getActivitiesByUserId,
  getActivitiesByActivityId,
};
