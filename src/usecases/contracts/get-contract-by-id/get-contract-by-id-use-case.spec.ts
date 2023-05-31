import { contractsRepositoryMock } from '@usecases/port/repositories/mocks/repositories.mock';
import { GetContractById, GetContractByIdUseCase } from './get-contract-by-id-use-case';
import { mockReset } from 'jest-mock-extended';
import { fakerEN_US as faker } from '@faker-js/faker';
import { contractMock, profileMock } from '@entities/mock/entities.mock';
import { ContractNotFoundError } from '@usecases/errors/contract-not-found-error';

describe('get-contract-by-id-use-case', () => {
  let sut: GetContractByIdUseCase;

  beforeEach(() => {
    mockReset(contractsRepositoryMock);

    sut = new GetContractById(contractsRepositoryMock);
  });

  test(
    'should return failure with an instance of ContractNotFoundError when repository returns undefined', async () => {
      contractsRepositoryMock.getById.mockResolvedValue(undefined);

      const response = await sut.execute({
        contractId: faker.number.int(),
        profile: profileMock,
      });

      expect(response.isFailure()).toBeTruthy();
      expect(response.isSuccess()).toBeFalsy();
      expect(response.value).toBeInstanceOf(ContractNotFoundError);
    });
  
  test('should return an instance of contract when repository returns a found contract', async () => {
    contractsRepositoryMock.getById.mockResolvedValue(contractMock);

    const response = await sut.execute({
      contractId: contractMock.id,
      profile: profileMock,
    });

    expect(response.isFailure()).toBeFalsy();
    expect(response.isSuccess()).toBeTruthy();
    expect(response.value).toStrictEqual(contractMock);
  });
});
