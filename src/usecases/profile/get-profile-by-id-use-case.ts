import { UseCase } from '@usecases/port/use-case';
import { GetProfileByIdRequest } from './get-profile-by-id/interfaces/get-profile-by-id-request';
import { GetProfileByIdResponseEither } from './get-profile-by-id/interfaces/get-profile-by-id-response';
import { inject, injectable } from 'tsyringe';
import { ProfileRepository } from '@usecases/port/repositories/profile-repository';
import { failure, success } from '@usecases/helpers/either';

export interface GetProfileByIdUseCase extends UseCase<GetProfileByIdRequest, GetProfileByIdResponseEither> { }

@injectable()
export class GetProfileById implements GetProfileByIdUseCase {
  constructor(
    @inject('ProfileRepository')
    private profileRepository: ProfileRepository,
  ) { }

  async execute(request: GetProfileByIdRequest): Promise<GetProfileByIdResponseEither> {
    try {
      const profile = await this.profileRepository.getProfileById(request.profileId);

      if (!profile) {
        return failure(new Error('profile not found'));
      }

      return success(profile);
    } catch (error) {
      console.log('Error when trying to get profile', error);
      return failure(error);
    }
  }
}
