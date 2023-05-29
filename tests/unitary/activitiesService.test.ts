import {
  returnActivity,
  returnActivityBookings,
  returnAllActivities,
  returnAllDays,
  returnAllPlaces,
  returnBooked,
  returnLateEndActivity,
  returnSameStartActivity,
} from '../factories/activities-factory';
import { getBookingReturn } from '../factories';
import { notFoundError } from '@/errors';
import activitiesRepository from '@/repositories/activities-repository';
import activitiesService from '@/services/activities-service';
import bookingRepository from '@/repositories/booking-repository';
import { cannotBookingError } from '@/errors/cannot-booking-error';

describe('getAllActivities function', () => {
  it('should return not found if there`s no activity', async () => {
    jest.spyOn(activitiesRepository, 'getAllActivities').mockImplementationOnce(null);

    await expect(activitiesService.getAllActivities).rejects.toEqual(notFoundError());
  });

  it('should return the list of activities', async () => {
    const allActivities = returnAllActivities();
    jest.spyOn(activitiesRepository, 'getAllActivities').mockImplementationOnce((): any => {
      return allActivities;
    });

    const result = await activitiesService.getAllActivities();

    expect(result).toEqual(allActivities);
  });
});

describe('getActivitiesDays function', () => {
  it('should return not found if there is no days', async () => {
    jest.spyOn(activitiesRepository, 'findActivitiesDays').mockImplementationOnce(null);

    await expect(activitiesService.getActivitiesDays).rejects.toEqual(notFoundError());
  });

  it('should return the list of days', async () => {
    const allDays = returnAllDays();

    jest.spyOn(activitiesRepository, 'findActivitiesDays').mockImplementationOnce((): any => {
      return allDays;
    });

    const result = await activitiesService.getActivitiesDays();

    expect(result).toEqual(allDays);
  });
});

describe('getActivitiesPlaces function', () => {
  it('should return not found if there is no places', async () => {
    jest.spyOn(activitiesRepository, 'findActivitiesPlaces').mockImplementationOnce(null);

    await expect(activitiesService.getActivitiesPlaces).rejects.toEqual(notFoundError());
  });

  it('should return the list of places', async () => {
    const allPlaces = returnAllPlaces();

    jest.spyOn(activitiesRepository, 'findActivitiesPlaces').mockImplementationOnce((): any => {
      return allPlaces;
    });

    const result = await activitiesService.getActivitiesPlaces();

    expect(result).toEqual(allPlaces);
  });
});

describe('bookActivity function', () => {
  it('should return cannot booking if there is no booking', async () => {
    jest.spyOn(bookingRepository, 'findByUserId').mockImplementationOnce(null);

    await expect(activitiesService.bookActivity).rejects.toEqual(cannotBookingError());
  });

  it('should return not found error if there is no activity', async () => {
    const booking = getBookingReturn();
    jest.spyOn(bookingRepository, 'findByUserId').mockImplementationOnce((): any => {
      return booking;
    });

    jest.spyOn(activitiesRepository, 'findActivityById').mockImplementationOnce((): any => {
      return null;
    });

    await expect(activitiesService.bookActivity).rejects.toEqual(notFoundError());
  });

  it('should return cannot booking error if there is no capacity', async () => {
    const booking = getBookingReturn();
    jest.spyOn(bookingRepository, 'findByUserId').mockImplementationOnce((): any => {
      return booking;
    });

    const activity = returnActivity();
    jest.spyOn(activitiesRepository, 'findActivityById').mockImplementationOnce((): any => {
      return activity;
    });

    const bookings = returnActivityBookings();
    jest.spyOn(activitiesRepository, 'findBookingsByActivity').mockImplementationOnce((): any => {
      return bookings;
    });

    await expect(activitiesService.bookActivity).rejects.toEqual(cannotBookingError());
  });

  it('should return cannot booking error if activities starts the same time', async () => {
    const booking = getBookingReturn();
    jest.spyOn(bookingRepository, 'findByUserId').mockImplementationOnce((): any => {
      return booking;
    });

    const activity = returnActivity();
    jest.spyOn(activitiesRepository, 'findActivityById').mockImplementationOnce((): any => {
      return activity;
    });

    jest.spyOn(activitiesRepository, 'findBookingsByActivity').mockImplementationOnce((): any => {
      return [];
    });

    const userActivity = returnSameStartActivity();
    jest.spyOn(activitiesRepository, 'findActivityByTime').mockImplementationOnce((): any => {
      return userActivity;
    });

    await expect(activitiesService.bookActivity).rejects.toEqual(cannotBookingError());
  });

  it('should return cannot booking error if activities ends after next start time', async () => {
    const booking = getBookingReturn();
    jest.spyOn(bookingRepository, 'findByUserId').mockImplementationOnce((): any => {
      return booking;
    });

    const activity = returnActivity();
    jest.spyOn(activitiesRepository, 'findActivityById').mockImplementationOnce((): any => {
      return activity;
    });

    jest.spyOn(activitiesRepository, 'findBookingsByActivity').mockImplementationOnce((): any => {
      return [];
    });

    const userActivity = returnLateEndActivity();
    jest.spyOn(activitiesRepository, 'findActivityByTime').mockImplementationOnce((): any => {
      return userActivity;
    });

    await expect(activitiesService.bookActivity).rejects.toEqual(cannotBookingError());
  });

  it('should return booking info on success', async () => {
    const booking = getBookingReturn();
    jest.spyOn(bookingRepository, 'findByUserId').mockImplementationOnce((): any => {
      return booking;
    });

    const activity = returnActivity();
    jest.spyOn(activitiesRepository, 'findActivityById').mockImplementationOnce((): any => {
      return activity;
    });

    jest.spyOn(activitiesRepository, 'findBookingsByActivity').mockImplementationOnce((): any => {
      return [];
    });

    jest.spyOn(activitiesRepository, 'findActivityByTime').mockImplementationOnce((): any => {
      return null;
    });

    const bookedActivity = returnBooked();
    jest.spyOn(activitiesRepository, 'bookActivity').mockImplementationOnce((): any => {
      return bookedActivity;
    });

    const result = await activitiesService.bookActivity(bookedActivity.activitiesId, bookedActivity.userId);

    expect(result).toEqual(bookedActivity);
  });
});
