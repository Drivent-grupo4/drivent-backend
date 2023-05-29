import faker from '@faker-js/faker';
import { Activities, ActivitiesDays, ActivitiesPlace, BookingActivities } from '@prisma/client';
import { prisma } from '@/config';
import activitiesService from '@/services/activities-service';

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

export function returnAllDays() {
  const ActivitiesDays: ActivitiesDays[] = Array({
    id: faker.datatype.number(),
    date: faker.datatype.datetime(),
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
  });

  return ActivitiesDays;
}

export function returnAllPlaces() {
  const ActivitiesPlace: ActivitiesPlace[] = Array({
    id: faker.datatype.number(),
    namePlace: faker.datatype.string(),
  });

  return ActivitiesPlace;
}

export function returnActivityBookings() {
  const ActivityBookings = [
    {
      id: faker.datatype.number(),
      activitiesId: faker.datatype.number(),
      userId: faker.datatype.number(),
      createdAt: faker.datatype.datetime(),
      updatedAt: faker.datatype.datetime(),
    },
  ];

  return ActivityBookings;
}

export function returnBooked() {
  const bookedActivity = {
    id: faker.datatype.number(),
    activitiesId: faker.datatype.number(),
    userId: faker.datatype.number(),
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
    Activities: {
      name: faker.company.companyName(),
      startTime: faker.datatype.datetime(),
      endTime: faker.datatype.datetime(),
      ActivitiesDays: { date: faker.datatype.datetime() },
    },
  };
  return bookedActivity;
}

export function returnActivity() {
  const activity = {
    id: faker.datatype.number(),
    activitiesPlaceId: faker.datatype.number(),
    activityDayId: faker.datatype.number(),
    name: faker.datatype.string(),
    startTime: faker.datatype.datetime(1893456000000),
    endTime: faker.datatype.datetime(2893456000000),
    capacity: 1,
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
  };
  return activity;
}

export function returnSameStartActivity() {
  const activity = returnActivity();

  const secondActivity = {
    Activities: {
      id: faker.datatype.number(),
      activitiesPlaceId: faker.datatype.number(),
      activityDayId: activity.activityDayId,
      name: faker.datatype.string(),
      startTime: activity.startTime,
      endTime: activity.endTime,
      capacity: faker.datatype.number(),
    },
  };
  return secondActivity;
}

export function returnLateEndActivity() {
  const activity = returnActivity();

  const secondActivity = {
    Activities: {
      id: faker.datatype.number(),
      activitiesPlaceId: faker.datatype.number(),
      activityDayId: activity.activityDayId,
      name: faker.datatype.string(),
      startTime: faker.datatype.datetime(7893456000000),
      endTime: faker.datatype.datetime(8193456000000),
      capacity: faker.datatype.number(),
    },
  };
  return secondActivity;
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
