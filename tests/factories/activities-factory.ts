import faker from '@faker-js/faker';
import { prisma } from '@/config';

export function createActivitiesDay() {
  return prisma.activitiesDays.create({
    data: {
      date: faker.datatype.datetime(),
    },
  });
}

export function createActivitiesPlace() {
  return prisma.activitiesPlace.create({
    data: {
      namePlace: faker.datatype.string(),
    },
  });
}

export function createActivities(dayId: number, placeId: number) {
  return prisma.activities.create({
    data: {
      activitiesPlaceId: dayId,
      activityDayId: placeId,
      name: faker.datatype.string(),
      startTime: faker.datatype.datetime(),
      endTime: faker.datatype.datetime(),
      capacity: faker.datatype.number(),
    },
  });
}
