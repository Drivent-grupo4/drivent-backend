import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import { TicketStatus } from '@prisma/client';
import {
  createBooking,
  createEnrollmentWithAddress,
  createHotel,
  createPayment,
  createRoomWithHotelId,
  createTicket,
  createTicketTypeWithHotel,
  createUser,
} from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import {
  createActivities,
  createActivitiesDay,
  createActivitiesPlace,
  createActivityBooking,
  createActivityOneCapacity,
  createConflictingActivity,
  createConflictingEndActivity,
  createConflictingStartActivity,
} from '../factories/activities-factory';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /activities/', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/activities');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/activities').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/activities').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 200 with list of all activities', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const payment = await createPayment(ticket.id, ticketType.price);

      const hotel = await createHotel();
      const room = await createRoomWithHotelId(hotel.id);
      const booking = await createBooking({ userId: user.id, roomId: room.id });
      const day = await createActivitiesDay();
      const place = await createActivitiesPlace();
      const activities = await createActivities(day.id, place.id);

      const response = await server.get('/activities').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([
        expect.objectContaining({
          id: day.id,
          date: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      ]);
    });
  });
});

describe('GET /activities/all', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/activities/all');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/activities/all').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/activities/all').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 404 when there`s no activity', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const payment = await createPayment(ticket.id, ticketType.price);

      const hotel = await createHotel();
      const room = await createRoomWithHotelId(hotel.id);
      const booking = await createBooking({ userId: user.id, roomId: room.id });

      const response = await server.get('/activities/all').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it('should respond with status 200 with list of all activities', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const payment = await createPayment(ticket.id, ticketType.price);

      const hotel = await createHotel();
      const room = await createRoomWithHotelId(hotel.id);
      const booking = await createBooking({ userId: user.id, roomId: room.id });
      const day = await createActivitiesDay();
      const place = await createActivitiesPlace();
      const activities = await createActivities(day.id, place.id);

      const response = await server.get('/activities/all').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([
        expect.objectContaining({
          ActivitiesDays: {
            id: day.id,
            date: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          },
          ActivitiesPlace: {
            id: place.id,
            namePlace: place.namePlace,
          },
          id: activities.id,
          activitiesPlaceId: place.id,
          activityDayId: day.id,
          name: activities.name,
          startTime: expect.any(String),
          endTime: expect.any(String),
          capacity: activities.capacity,
        }),
      ]);
    });
  });
});

describe('GET /activities/booking', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/activities/booking');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/activities/booking').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/activities/booking').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should return an empty string if there is no bookings', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const payment = await createPayment(ticket.id, ticketType.price);

      const hotel = await createHotel();
      const room = await createRoomWithHotelId(hotel.id);
      const booking = await createBooking({ userId: user.id, roomId: room.id });
      const day = await createActivitiesDay();
      const place = await createActivitiesPlace();
      const activities = await createActivities(day.id, place.id);

      const response = await server.get('/activities/booking').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([]);
    });

    it('should return activities of user if there is bookings', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const payment = await createPayment(ticket.id, ticketType.price);

      const hotel = await createHotel();
      const room = await createRoomWithHotelId(hotel.id);
      const booking = await createBooking({ userId: user.id, roomId: room.id });
      const day = await createActivitiesDay();
      const place = await createActivitiesPlace();
      const activities = await createActivities(day.id, place.id);
      const bookActivity = await createActivityBooking(activities.id, user.id);

      const response = await server.get('/activities/booking').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toStrictEqual([
        {
          id: bookActivity.id,
          activitiesId: bookActivity.activitiesId,
          userId: bookActivity.userId,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]);
    });
  });
});

describe('GET /activities/booking/:activityId', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get(`/activities/booking/0`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();
    const id = faker.datatype.number();

    const response = await server.get(`/activities/booking/${id}`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
    const id = faker.datatype.number();

    const response = await server.get(`/activities/booking/${id}`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should return an empty string if there is no bookings', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const payment = await createPayment(ticket.id, ticketType.price);

      const hotel = await createHotel();
      const room = await createRoomWithHotelId(hotel.id);
      const booking = await createBooking({ userId: user.id, roomId: room.id });
      const day = await createActivitiesDay();
      const place = await createActivitiesPlace();
      const activities = await createActivities(day.id, place.id);

      const response = await server.get(`/activities/booking/${activities.id}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([]);
    });

    it('should return activities of user if there is bookings', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const payment = await createPayment(ticket.id, ticketType.price);

      const hotel = await createHotel();
      const room = await createRoomWithHotelId(hotel.id);
      const booking = await createBooking({ userId: user.id, roomId: room.id });
      const day = await createActivitiesDay();
      const place = await createActivitiesPlace();
      const activities = await createActivities(day.id, place.id);
      const bookActivity = await createActivityBooking(activities.id, user.id);

      const response = await server.get(`/activities/booking/${activities.id}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toStrictEqual([
        {
          id: bookActivity.id,
          activitiesId: bookActivity.activitiesId,
          userId: bookActivity.userId,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]);
    });
  });
});

describe('POST /activities/booking', () => {
  it('should respond with status 401 if no token is given', async () => {
    const id = faker.random.numeric();
    const response = await server.post(`/activities/booking/${id}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();
    const id = faker.random.numeric();
    const response = await server.post(`/activities/booking/${id}`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const id = faker.random.numeric();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post(`/activities/booking/${id}`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe('when token is valid', () => {
    it('should respond with status 403 if there is no booking', async () => {
      const user = await createUser();
      const bookedUser = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);
      const hotel = await createHotel();
      const room = await createRoomWithHotelId(hotel.id);
      const day = await createActivitiesDay();
      const place = await createActivitiesPlace();
      const activities = await createActivityOneCapacity(day.id, place.id);

      const response = await server
        .post(`/activities/booking/${activities.id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.FORBIDDEN);
    });

    it('should respond with status 404 if there is no activity', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const payment = await createPayment(ticket.id, ticketType.price);
      const hotel = await createHotel();
      const room = await createRoomWithHotelId(hotel.id);
      const booking = await createBooking({ userId: user.id, roomId: room.id });
      const day = await createActivitiesDay();
      const place = await createActivitiesPlace();
      const id = faker.random.numeric();

      const response = await server.post(`/activities/booking/${id}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it('should respond with 403 if there is no capacity', async () => {
      const user = await createUser();
      const bookedUser = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);

      const hotel = await createHotel();
      const room = await createRoomWithHotelId(hotel.id);
      await createBooking({ userId: user.id, roomId: room.id });
      const day = await createActivitiesDay();
      const place = await createActivitiesPlace();
      const activities = await createActivityOneCapacity(day.id, place.id);
      await createActivityBooking(activities.id, bookedUser.id);

      const response = await server
        .post(`/activities/booking/${activities.id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.FORBIDDEN);
    });

    it('should respond with 403 if there is conflicting between both starting times', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);

      const hotel = await createHotel();
      const room = await createRoomWithHotelId(hotel.id);
      await createBooking({ userId: user.id, roomId: room.id });
      const day = await createActivitiesDay();
      const place = await createActivitiesPlace();
      const activities = await createActivities(day.id, place.id);
      const secondActivity = await createConflictingActivity(
        day.id,
        place.id,
        activities.startTime,
        activities.endTime,
      );
      await createActivityBooking(activities.id, user.id);

      const response = await server
        .post(`/activities/booking/${secondActivity.id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.FORBIDDEN);
    });

    it('should respond with 403 if activity starts before previous activity has ended', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);

      const hotel = await createHotel();
      const room = await createRoomWithHotelId(hotel.id);
      await createBooking({ userId: user.id, roomId: room.id });
      const day = await createActivitiesDay();
      const place = await createActivitiesPlace();
      const activities = await createConflictingStartActivity(day.id, place.id);
      await createActivityBooking(activities.id, user.id);
      const secondActivity = await createConflictingEndActivity(day.id, place.id);

      const response = await server
        .post(`/activities/booking/${secondActivity.id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.FORBIDDEN);
    });

    it('should respond with 200 and activity info on success', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);

      const hotel = await createHotel();
      const room = await createRoomWithHotelId(hotel.id);
      await createBooking({ userId: user.id, roomId: room.id });
      const day = await createActivitiesDay();
      const place = await createActivitiesPlace();
      const activities = await createActivities(day.id, place.id);

      const response = await server
        .post(`/activities/booking/${activities.id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
    });
  });
});
