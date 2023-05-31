import { UseCase } from '@usecases/port/use-case';
import { DepositBalanceRequest } from './interfaces/deposit-balance-request';
import { DepositBalanceResponseEither } from './interfaces/deposit-balance-response';
import { inject, injectable } from 'tsyringe';
import { JobsRepository } from '@usecases/port/repositories/jobs-repository';
import { ContractStatus } from '@entities/enum/contract-status';
import { Job } from '@entities/job';
import { ProfileRepository } from '@usecases/port/repositories/profile-repository';
import { failure, success } from '@usecases/helpers/either';
import { InvalidAmountError } from '@usecases/errors/invalid-amount-error';

export interface DepositBalanceUseCase extends UseCase<DepositBalanceRequest, DepositBalanceResponseEither> { }

@injectable()
export class DepositBalance implements DepositBalanceUseCase {
  private MAX_PERCENTAGE_TO_DEPOSIT_FROM_TOTAL_TO_PAY = 0.25;

  constructor(
    @inject('JobsRepository')
    private jobsRepository: JobsRepository,
    @inject('ProfileRepository')
    private profileRepository: ProfileRepository,
  ) { }

  async execute(request: DepositBalanceRequest): Promise<DepositBalanceResponseEither> {
    try {
      const unpaidJobs = await this.jobsRepository.listJobs({
        contractStatus: [ContractStatus.InProgress, ContractStatus.New, ContractStatus.Terminated],
        clientId: request.userId,
        paid: false,
      });
  
      if (this.isAbleToDeposit(unpaidJobs, request.depositAmount)) {
        await this.profileRepository.depositBalance(request.userId, request.depositAmount);
      } else {
        return failure(new InvalidAmountError());
      }
  
      return success();
    } catch (error) {
      console.log('Error when updating client\'s balance', error);
      return failure(error);
    }
  }

  private isAbleToDeposit(unpaidJobs: Job[], depositAmount: number): boolean {
    const totalToPaid = unpaidJobs.reduce((accumulator, job) => accumulator + job.price, 0);
  
    return depositAmount <= totalToPaid * this.MAX_PERCENTAGE_TO_DEPOSIT_FROM_TOTAL_TO_PAY;
  }

}
