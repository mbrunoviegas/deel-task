import { jobsRepositoryMock, profilesRepositoryMock } from '@usecases/port/repositories/mocks/repositories.mock';
import { jobMock, profileMock } from '@entities/mock/entities.mock';
import { DepositBalance, DepositBalanceUseCase } from './deposit-balance-use-case';
import { mockReset } from 'jest-mock-extended';
import { InvalidAmountError } from '@usecases/errors/invalid-amount-error';

describe('deposit-balance-use-case.spec.ts', () => {
  let sut: DepositBalanceUseCase;
  const request = {
    depositAmount: 25,
    userId: profileMock.id,
  };

  beforeEach(() => {
    mockReset(jobsRepositoryMock);
    mockReset(profilesRepositoryMock);

    sut = new DepositBalance(jobsRepositoryMock, profilesRepositoryMock);
  });

  test('should return success when all steps were successful', async () => {
    jobMock.price = 100;

    jobsRepositoryMock.listJobs.mockResolvedValue([jobMock]);
    const response = await sut.execute(request);

    expect(jobsRepositoryMock.listJobs).toHaveBeenCalledTimes(1);
    expect(jobsRepositoryMock.listJobs).toHaveBeenCalledWith({
      contractStatus: ['in_progress', 'new', 'terminated'],
      clientId: request.userId,
      paid: false,
    });
    expect(profilesRepositoryMock.depositBalance).toHaveBeenCalledTimes(1);
    expect(profilesRepositoryMock.depositBalance).toHaveBeenCalledWith(request.userId, request.depositAmount);
    expect(response.isFailure()).toBeFalsy();
    expect(response.isSuccess()).toBeTruthy();
    expect(response.value).toBeUndefined();
  });

  test(
    'should return failure with InvalidAmountError instance when deposit amount if bigger than 25% of jobs price sum',
    async () => {
      jobMock.price = 50;

      jobsRepositoryMock.listJobs.mockResolvedValue([jobMock]);
      const response = await sut.execute(request);

      expect(jobsRepositoryMock.listJobs).toHaveBeenCalledTimes(1);
      expect(jobsRepositoryMock.listJobs).toHaveBeenCalledWith({
        contractStatus: ['in_progress', 'new', 'terminated'],
        clientId: request.userId,
        paid: false,
      });
      expect(profilesRepositoryMock.depositBalance).toHaveBeenCalledTimes(0);
      expect(response.isFailure()).toBeTruthy();
      expect(response.isSuccess()).toBeFalsy();
      expect(response.value).toBeInstanceOf(InvalidAmountError);
    });

  test('should return an Error instance when code inside try scope throws an error', async () => {
    jobsRepositoryMock.listJobs.mockRejectedValue(new Error('mock error'));

    const response = await sut.execute(request);

    expect(response.isFailure()).toBeTruthy();
    expect(response.isSuccess()).toBeFalsy();
    expect(response.value).toBeInstanceOf(Error);
    expect(response.value).toHaveProperty('message', 'mock error');
  });
});
