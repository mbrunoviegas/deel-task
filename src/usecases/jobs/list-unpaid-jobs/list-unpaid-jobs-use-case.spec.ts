import { jobsRepositoryMock } from '@usecases/port/repositories/mocks/repositories.mock';
import { ListUnpaidJobs, ListUnpaidJobsUseCase } from './list-unpaid-jobs-use-case';
import { jobMock, profileMock } from '@entities/mock/entities.mock';

describe('list-unpaid-jobs-use-case.spec.ts', () => {
  let sut: ListUnpaidJobsUseCase;

  beforeEach(() => {
    sut = new ListUnpaidJobs(jobsRepositoryMock);
  });

  test('should return a list of jobs un jobsRepository returns it', async () => {
    jobsRepositoryMock.listJobs.mockResolvedValue([jobMock]);

    const response = await sut.execute({
      profile: profileMock,
    });

    expect(jobsRepositoryMock.listJobs).toHaveBeenCalledTimes(1);
    expect(jobsRepositoryMock.listJobs).toHaveBeenCalledWith({
      paid: false,
      contractStatus: ['in_progress'],
      clientId: profileMock.id,
      contractorId: profileMock.id,
    });
    expect(response.isFailure()).toBeFalsy();
    expect(response.isSuccess()).toBeTruthy();
    expect(response.value).toStrictEqual([jobMock]);
  });

  test('should return an Error instance when code inside try scope throws an error', async () => {
    jobsRepositoryMock.listJobs.mockRejectedValue(new Error('mock error'));

    const response = await sut.execute({
      profile: profileMock,
    });

    expect(response.isFailure()).toBeTruthy();
    expect(response.isSuccess()).toBeFalsy();
    expect(response.value).toBeInstanceOf(Error);
    expect(response.value).toHaveProperty('message', 'mock error');
  });
});
