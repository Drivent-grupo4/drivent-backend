import faker from '@faker-js/faker';
import { Activities, ActivitiesDays, ActivitiesPlace, BookingActivities } from '@prisma/client';
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

export function createActivityOneCapacity(dayId: number, placeId: number) {
  return prisma.activities.create({
    data: {
      activitiesPlaceId: dayId,
      activityDayId: placeId,
      name: faker.datatype.string(),
      startTime: faker.datatype.datetime(),
      endTime: faker.datatype.datetime(),
      capacity: 1,
    },
  });
}

export function createConflictingActivity(dayId: number, placeId: number, startTime: Date, endTime: Date) {
  return prisma.activities.create({
    data: {
      activitiesPlaceId: dayId,
      activityDayId: placeId,
      name: faker.datatype.string(),
      startTime: startTime,
      endTime: endTime,
      capacity: faker.datatype.number(),
    },
  });
}

export function createConflictingStartActivity(dayId: number, placeId: number) {
  return prisma.activities.create({
    data: {
      activitiesPlaceId: dayId,
      activityDayId: placeId,
      name: faker.datatype.string(),
      startTime: '2066-10-23T00:04:09.772Z',
      endTime: '2066-10-23T02:04:09.772Z',
      capacity: faker.datatype.number(),
    },
  });
}

export function createConflictingEndActivity(dayId: number, placeId: number) {
  return prisma.activities.create({
    data: {
      activitiesPlaceId: dayId,
      activityDayId: placeId,
      name: faker.datatype.string(),
      startTime: '2066-10-23T01:04:09.772Z',
      endTime: '2066-10-23T03:04:09.772Z',
      capacity: faker.datatype.number(),
    },
  });
}

export function createActivityBooking(activitiesId: number, userId: number) {
  return prisma.bookingActivities.create({
    data: {
      activitiesId,
      userId,
    },
  });
}

export function returnAllActivities() {
  const allActivities: (Activities & {
    ActivitiesPlace: ActivitiesPlace;
    ActivitiesDays: ActivitiesDays;
  })[] = Array({
    id: faker.datatype.number(),
    activitiesPlaceId: faker.datatype.number(),
    activityDayId: faker.datatype.number(),
    name: faker.datatype.string(),
    startTime: faker.datatype.datetime(),
    endTime: faker.datatype.datetime(),
    capacity: faker.datatype.number(),
    ActivitiesDays: {
      id: faker.datatype.number(),
      date: faker.datatype.datetime(),
      createdAt: faker.datatype.datetime(),
      updatedAt: faker.datatype.datetime(),
    },
    ActivitiesPlace: {
      id: faker.datatype.number(),
      namePlace: faker.datatype.string(),
    },
  });
  return allActivities;
}
