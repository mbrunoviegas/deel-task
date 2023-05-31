import { Job } from '@entities/job';
import { sequelize } from '@external/database';
import ContractsSequelize from '@external/database/models/contract.model';
import JobsSequelize from '@external/database/models/job.model';
import { JobsRepository, ListJobsOptions } from '@usecases/port/repositories/jobs-repository';
import { Op, WhereOptions } from 'sequelize';


export class JobsRepositorySequelize implements JobsRepository {
  async listJobs(options: ListJobsOptions): Promise<Job[]> {
    const transaction = await sequelize.transaction();

    try {
      const contractWhere: WhereOptions<ContractsSequelize> = {
        status: {
          [Op.in]: options.contractStatus,
        },
      };
      
      if (options.contractorId && options.clientId) {
        Object.assign(contractWhere, {
          [Op.or]: {
            clientId: options.clientId,
            contractorId: options.contractorId,
          },
        });
      } else if (options.contractorId) {
        Object.assign(contractWhere, {
          contractorId: options.contractorId,
        });
      } else if (options.clientId) {
        Object.assign(contractWhere, {
          clientId: options.clientId,
        });
      }

      const jobs = await JobsSequelize.findAll({
        include: [
          {
            attributes: [],
            required: true,
            model: ContractsSequelize,
            where: contractWhere,
          },
        ],
        where: {
          paid: options.paid,
        },
        transaction,
        lock: true,
      });

      await transaction.commit();
      
      return jobs.map((job) => ({
        id: job.id,
        description: job.description,
        paid: job.paid,
        paymentDate: job.paymentDate,
        price: job.price,
        createdAt: job.createdAt,
        updatedAt: job.updatedAt,
      }));
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      throw error;
    }
  }
}
