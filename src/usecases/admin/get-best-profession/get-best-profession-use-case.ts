import { UseCase } from '@usecases/port/use-case';
import { GetBestProfessionRequest } from './interfaces/get-best-profession-request';
import { GetBestProfessionResponseEither } from './interfaces/get-best-profession-response';
import { inject, injectable } from 'tsyringe';
import { failure, success } from '@usecases/helpers/either';
import { ProfileRepository } from '@usecases/port/repositories/profile-repository';

export interface GetBestProfessionUseCase extends UseCase<GetBestProfessionRequest, GetBestProfessionResponseEither> {}

@injectable()
export class GetBestProfession implements GetBestProfessionUseCase {
  constructor(
    @inject('ProfileRepository')
    private profileRepository: ProfileRepository,
  ) { }

  async execute(request: GetBestProfessionRequest): Promise<GetBestProfessionResponseEither> {
    try {
      const bestProfession = await this.profileRepository.getBestProfession({
        endDate: request.end,
        startDate: request.start,
      });

      return success({
        profession: bestProfession,
      });
    } catch (error) {
      console.log('Error when trying to get the best profession');
      return failure(error);
    }
  }
}
