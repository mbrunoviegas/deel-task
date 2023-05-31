import { profilesRepositoryMock } from '@usecases/port/repositories/mocks/repositories.mock';
import { profileMock } from '@entities/mock/entities.mock';
import { fakerEN_US as faker } from '@faker-js/faker';
import {
  GetBestProfession,
  GetBestProfessionUseCase,
} from '@usecases/admin/get-best-profession/get-best-profession-use-case';

describe('get-best-profession-use-case.spec.ts', () => {
  let sut: GetBestProfessionUseCase;
  const request = {
    end: faker.date.future(),
    start: faker.date.past(),
  };

  beforeEach(() => {
    sut = new GetBestProfession(profilesRepositoryMock);
  });

  test('should return the best profession when repository returns it', async () => {
    profilesRepositoryMock.getBestProfession.mockResolvedValue(profileMock.profession);
    const response = await sut.execute(request);

    expect(profilesRepositoryMock.getBestProfession).toHaveBeenCalledTimes(1);
    expect(profilesRepositoryMock.getBestProfession).toHaveBeenCalledWith({
      startDate: request.start,
      endDate: request.end,
    });
    expect(response.isFailure()).toBeFalsy();
    expect(response.isSuccess()).toBeTruthy();
    expect(response.value).toStrictEqual({
      profession: profileMock.profession,
    });
  });

  test('should return an Error instance when code inside try scope throws an error', async () => {
    profilesRepositoryMock.getBestProfession.mockRejectedValue(new Error('mock error'));

    const response = await sut.execute(request);

    expect(response.isFailure()).toBeTruthy();
    expect(response.isSuccess()).toBeFalsy();
    expect(response.value).toBeInstanceOf(Error);
    expect(response.value).toHaveProperty('message', 'mock error');
  });
});
