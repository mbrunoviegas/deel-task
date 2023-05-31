import { jobsRepositoryMock } from '@usecases/port/repositories/mocks/repositories.mock';
import { JobPayment, JobPaymentUseCase } from './job-payment-use-case';
import { jobMock, profileMock } from '@entities/mock/entities.mock';

describe('job-payment-use-case', () => {
  let sut: JobPaymentUseCase;

  beforeEach(() => {
    sut = new JobPayment(jobsRepositoryMock);
  });

  test('should return success when all steps were successful', async () => {
    const response = await sut.execute({
      clientProfile: profileMock,
      jobId: jobMock.id,
    });

    expect(jobsRepositoryMock.payJob).toHaveBeenCalledTimes(1);
    expect(jobsRepositoryMock.payJob).toHaveBeenCalledWith(jobMock.id, profileMock.balance);
    expect(response.isFailure()).toBeFalsy();
    expect(response.isSuccess()).toBeTruthy();
    expect(response.value).toBeUndefined();
  });

  test('should return an Error instance when code inside try scope throws an error', async () => {
    jobsRepositoryMock.payJob.mockRejectedValue(new Error('mock error'));

    const response = await sut.execute({
      clientProfile: profileMock,
      jobId: jobMock.id,
    });

    expect(response.isFailure()).toBeTruthy();
    expect(response.isSuccess()).toBeFalsy();
    expect(response.value).toBeInstanceOf(Error);
    expect(response.value).toHaveProperty('message', 'mock error');
  });
});
