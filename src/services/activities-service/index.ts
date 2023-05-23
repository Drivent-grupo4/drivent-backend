import { notFoundError } from '@/errors';
import activitiesRepository from '@/repositories/activities-repository';

async function getActivitiesDays() {
  const activities = await activitiesRepository.findActivitiesDays();
  if (!activities) throw notFoundError();

  return activities;
}

export default { getActivitiesDays };
