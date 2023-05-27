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

async function checkValidActivity(activitiesId: number, userId: number) {
  const activity = await activitiesRepository.findActivityById(activitiesId);
  if (activity === null) throw notFoundError();

  const bookings = await activitiesRepository.findBookingsByActivity(activitiesId);
  if (activity.capacity <= bookings.length) throw cannotBookingError();
  const userActivities = await activitiesRepository.findActivityByTime(userId, activity.startTime, activity.endTime);
  console.log('activity', activity);
  console.log('user activity', userActivities);
  console.log('here');
  console.log('activity date', activity.startTime.getDate());
  console.log('user activity date', userActivities.Activities.startTime.getDate());
  console.log('activity start time', activity.startTime.getTime());
  console.log('activity end time', activity.endTime.getTime());
  console.log('user activity start time', userActivities.Activities.startTime.getTime());

  if (
    (activity.startTime.getDate() === userActivities.Activities.startTime.getDate() &&
      activity.startTime.getTime() === userActivities.Activities.startTime.getTime()) ||
    activity.endTime.getTime() > userActivities.Activities.startTime.getTime()
  )
    throw cannotBookingError();
}

async function bookActivity(activitiesId: number, userId: number) {
  const booking = await bookingRepository.findByUserId(userId);

  if (!booking) throw cannotBookingError();

  await checkValidActivity(activitiesId, userId);

  return activitiesRepository.bookActivity(activitiesId, userId);
}

export default {
  getActivitiesDays,
  getAllActivities,
  getActivitiesPlaces,
  bookActivity,
  checkValidActivity,
};
