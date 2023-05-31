import { profilesRepositoryMock } from '@usecases/port/repositories/mocks/repositories.mock';
import { profileMock } from '@entities/mock/entities.mock';
import { GetBestClients, GetBestClientsUseCase } from './get-best-clients-use-case';
import { fakerEN_US as faker } from '@faker-js/faker';

describe('get-best-clients-use-case.spec.ts', () => {
  let sut: GetBestClientsUseCase;
  const request = {
    end: faker.date.future(),
    start: faker.date.past(),
    limit: faker.number.int(),
  };

  beforeEach(() => {
    sut = new GetBestClients(profilesRepositoryMock);
  });

  test('should return a list of the best client when repository returns it', async () => {
    const bestClient = {
      id: profileMock.id,
      firstName: profileMock.firstName,
      lastName: profileMock.lastName,
      totalPaid: faker.number.int(),
    };
    profilesRepositoryMock.getBestClients.mockResolvedValue([bestClient]);
    const response = await sut.execute(request);

    expect(profilesRepositoryMock.getBestClients).toHaveBeenCalledTimes(1);
    expect(profilesRepositoryMock.getBestClients).toHaveBeenCalledWith({
      startDate: request.start,
      endDate: request.end,
      limit: request.limit ?? 2,
    });
    expect(response.isFailure()).toBeFalsy();
    expect(response.isSuccess()).toBeTruthy();
    expect(response.value).toStrictEqual([{
      id: bestClient.id,
      fullName: bestClient.firstName.concat(' ', bestClient.lastName),
      paid: bestClient.totalPaid,
    }]);
  });

  test('should return an Error instance when code inside try scope throws an error', async () => {
    profilesRepositoryMock.getBestClients.mockRejectedValue(new Error('mock error'));

    const response = await sut.execute(request);

    expect(response.isFailure()).toBeTruthy();
    expect(response.isSuccess()).toBeFalsy();
    expect(response.value).toBeInstanceOf(Error);
    expect(response.value).toHaveProperty('message', 'mock error');
  });
});
