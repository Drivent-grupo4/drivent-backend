import { prisma } from '@/config';

async function findActivitiesDays() {
  return prisma.activitiesDays.findMany();
}

export default { findActivitiesDays };
