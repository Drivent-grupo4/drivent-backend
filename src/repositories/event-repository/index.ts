import { Event } from '@prisma/client';
import { prisma, redis } from '@/config';

async function findFirst(): Promise<Event> {
  const cacheKey = 'event';
  const expiration = 3600 * 24;
  const cachedEvent = await redis.get(cacheKey);
  // redis.del(cacheKey);

  if (cachedEvent !== null) {
    console.log('cached');
    return JSON.parse(cachedEvent);
  }
  const event = await prisma.event.findFirst();

  redis.setEx(cacheKey, expiration, JSON.stringify(event));
  return event;
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
