import { UseCase } from '@usecases/port/use-case';
import { GetBestClientsRequest } from './interfaces/get-best-clients-request';
import { GetBestClientsResponse, GetBestClientsResponseEither } from './interfaces/get-best-clients-response';
import { inject, injectable } from 'tsyringe';
import { BestClientDetails, ProfileRepository } from '@usecases/port/repositories/profile-repository';
import { failure, success } from '@usecases/helpers/either';

export interface GetBestClientsUseCase extends UseCase<GetBestClientsRequest, GetBestClientsResponseEither> {}

@injectable()
export class GetBestClients implements GetBestClientsUseCase {
  private DEFAULT_LIMIT = 2;
  
  constructor(
    @inject('ProfileRepository')
    private profileRepository: ProfileRepository,
  ) { }

  async execute(request: GetBestClientsRequest): Promise<GetBestClientsResponseEither> {
    try {
      const response = await this.profileRepository.getBestClients({
        startDate: request.start,
        endDate: request.end,
        limit: request.limit ?? this.DEFAULT_LIMIT,
      });

      return success(this.parseResponse(response));
    } catch (error) {
      console.log('Error when trying to get best clients', error);
      return failure(error);
    }
  }

  private parseResponse(clients: BestClientDetails[]): GetBestClientsResponse[] {
    return clients.map((client) => ({
      id: client.id,
      fullName: client.firstName.concat(' ', client.lastName),
      paid: client.totalPaid,
    }));
  }
}
