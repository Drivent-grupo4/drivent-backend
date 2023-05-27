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

async function findActivityById(id: number) {
  return prisma.activities.findFirst({
    where: {
      id,
    },
  });
}

async function findBookingsByActivity(activitiesId: number) {
  return prisma.bookingActivities.findMany({
    where: {
      activitiesId,
    },
  });
}

async function findActivityByTime(userId: number, startTime: Date, endTime: Date) {
  return prisma.bookingActivities.findFirst({
    where: {
      userId,
      AND: {
        Activities: {
          OR: [
            {
              startTime,
            },
            {
              endTime,
            },
          ],
        },
      },
    },
    select: {
      Activities: true,
    },
  });
}

async function bookActivity(activitiesId: number, userId: number) {
  return prisma.bookingActivities.create({
    data: {
      activitiesId,
      userId,
    },
    include: {
      Activities: {
        select: {
          name: true,
          startTime: true,
          endTime: true,
          ActivitiesDays: {
            select: {
              date: true,
            },
          },
        },
      },
    },
  });
}

export default {
  findActivitiesDays,
  getAllActivities,
  findActivitiesPlaces,
  bookActivity,
  findActivityById,
  findBookingsByActivity,
  findActivityByTime,
};
