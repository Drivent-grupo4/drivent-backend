import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { bookingRoom, listBooking } from '@/controllers';

const bookingRouter = Router();

bookingRouter.all('/*', authenticateToken).get('/', listBooking).post('/', bookingRoom);

export { bookingRouter };
