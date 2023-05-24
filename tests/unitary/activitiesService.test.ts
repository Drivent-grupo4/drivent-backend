import { returnAllActivities } from '../factories/activities-factory';
import { notFoundError } from '@/errors';
import activitiesRepository from '@/repositories/activities-repository';
import activitiesService from '@/services/activities-service';

describe('getAllActivities function', () => {
  it('should return not found if there`s no activity', async () => {
    jest.spyOn(activitiesRepository, 'getAllActivities').mockImplementationOnce(null);

    await expect(activitiesService.getAllActivities).rejects.toEqual(notFoundError());
  });

  it('should return not found if there`s no activity', async () => {
    const allActivities = returnAllActivities();
    jest.spyOn(activitiesRepository, 'getAllActivities').mockImplementationOnce((): any => {
      return allActivities;
    });

    const result = await activitiesService.getAllActivities();

    expect(result).toEqual(allActivities);
  });
});
