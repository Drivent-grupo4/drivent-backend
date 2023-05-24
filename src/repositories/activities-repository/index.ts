import { prisma } from '@/config';

async function findActivitiesDays() {
  return prisma.activitiesDays.findMany();
}

async function getAllActivities() {
  return prisma.activities.findMany({
    include: {
      ActivitiesDays: true,
      ActivitiesPlace: true,
    },
  });
}

async function findActivitiesPlaces() {
  return prisma.activitiesPlace.findMany();
}

export default {
  findActivitiesDays,
  getAllActivities,
  findActivitiesPlaces,
};
