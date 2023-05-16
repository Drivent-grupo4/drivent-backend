import { prisma } from '@/config';

async function findAllByHotelId(hotelId: number) {
  return prisma.room.findMany({
    where: {
      hotelId,
    },
    orderBy: [
      {
        id: 'asc',
      },
    ],
    include: {
      Booking: true,
      _count: {
        select: {
          Booking: true,
        },
      },
    },
  });
}
async function findById(roomId: number) {
  return prisma.room.findFirst({
    where: {
      id: roomId,
    },
  });
}

const roomRepository = {
  findAllByHotelId,
  findById,
};

export default roomRepository;
