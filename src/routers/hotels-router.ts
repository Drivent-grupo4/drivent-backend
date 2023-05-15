import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getBookingsByHotelId, getHotels, getHotelsWithRooms } from '@/controllers/hotel-controller';

const hotelsRouter = Router();

hotelsRouter
  .all('/*', authenticateToken)
  .get('/', getHotels)
  .get('/:hotelId', getHotelsWithRooms)
  .get('/bookings/:hotelId', getBookingsByHotelId);

export { hotelsRouter };
