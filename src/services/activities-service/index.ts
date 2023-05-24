import { notFoundError } from '@/errors';
import activitiesRepository from '@/repositories/activities-repository';

async function getActivitiesDays() {
  const activities = await activitiesRepository.findActivitiesDays();
  if (!activities) throw notFoundError();

  return activities;
}

async function getAllActivities() {
  const allActivities = await activitiesRepository.getAllActivities();
  if (!allActivities) throw notFoundError();

  return allActivities;
}

async function getActivitiesPlaces() {
  const activities = await activitiesRepository.findActivitiesPlaces();
  if (!activities) throw notFoundError();

  return activities;
}

export default {
  getActivitiesDays,
  getAllActivities,
  getActivitiesPlaces,
};
