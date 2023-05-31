import { contractsRepositoryMock } from '@usecases/port/repositories/mocks/repositories.mock';
import { ListContracts, ListContractsUseCase } from './list-contracts-use-case';
import { contractMock, profileMock } from '@entities/mock/entities.mock';

describe('list-contracts-use-case', () => {
  let sut: ListContractsUseCase;

  beforeEach(() => {
    sut = new ListContracts(contractsRepositoryMock);
  });

  test('should return an array of contracts when repository returns', async () => {
    contractsRepositoryMock.listContracts.mockResolvedValue([contractMock]);

    const response = await sut.execute({
      profile: profileMock,
    });

    expect(contractsRepositoryMock.listContracts).toHaveBeenCalledTimes(1);
    expect(contractsRepositoryMock.listContracts).toHaveBeenCalledWith({
      status: ['in_progress', 'new'],
      profileId: profileMock.id,
    });
    expect(response.isFailure()).toBeFalsy();
    expect(response.isSuccess()).toBeTruthy();
    expect(response.value).toStrictEqual([contractMock]);
  });

  test('should return an Error instance when code inside try scope throws an error', async () => {
    contractsRepositoryMock.listContracts.mockRejectedValue(new Error('mock error'));

    const response = await sut.execute({
      profile: profileMock,
    });

    expect(response.isFailure()).toBeTruthy();
    expect(response.isSuccess()).toBeFalsy();
    expect(response.value).toBeInstanceOf(Error);
    expect(response.value).toHaveProperty('message', 'mock error');
  });
});
