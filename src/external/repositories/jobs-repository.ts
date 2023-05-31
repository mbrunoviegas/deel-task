import { Job } from '@entities/job';
import { sequelize } from '@external/database';
import ContractsSequelize from '@external/database/models/contract.model';
import JobsSequelize from '@external/database/models/job.model';
import ProfileSequelize from '@external/database/models/profile.model';
import { InsufficientAmountError } from '@usecases/errors/insuffient-amount-error';
import { JobNotFoundError } from '@usecases/errors/job-not-found-error';
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
            attributes: ['id'],
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
        contractId: job.contract.id,
        createdAt: job.createdAt,
        updatedAt: job.updatedAt,
      }));
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      throw error;
    }
  }

  async getJobById(jobId: number): Promise<Job> {
    const transaction = await sequelize.transaction();

    try {
      const job = await JobsSequelize.findOne({
        include: [
          {
            attributes: ['contractorId', 'clientId'],
            required: true,
            model: ContractsSequelize,
          },
        ],
        where: {
          id: jobId,
          paid: false,
        },
        transaction,
        lock: true,
      });

      await transaction.commit();

      return job ? {
        id: job.id,
        description: job.description,
        paid: job.paid,
        paymentDate: job.paymentDate,
        price: job.price,
        contractorId: job.contract.dataValues.contractorId,
        clientId: job.contract.dataValues.clientId,
        createdAt: job.createdAt,
        updatedAt: job.updatedAt,
      } : undefined;
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      throw error;
    }
  }

  async payJob(jobId: number, clientBalance: number): Promise<void> {
    const transaction = await sequelize.transaction();
    
    try {
      const job = await JobsSequelize.findOne({
        include: [
          {
            attributes: ['contractorId', 'clientId'],
            required: true,
            model: ContractsSequelize,
          },
        ],
        where: {
          id: jobId,
          paid: false,
        },
        transaction,
        lock: true,
      });

      if (!job) {
        throw new JobNotFoundError();
      }

      if (clientBalance < job.price) { 
        throw new InsufficientAmountError();
      }

      await JobsSequelize.update({
        paid: true,
        paymentDate: new Date(),
      }, {
        where: {
          id: job.id,
        },
        transaction,
      });

      await ProfileSequelize.decrement('balance', {
        by: job.price,
        where: {
          id: job.contract.dataValues.clientId,
        },
        transaction,
      });
      await ProfileSequelize.increment('balance', {
        by: job.price, 
        where: { 
          id: job.contract.dataValues.contractorId,
        },
        transaction,
      });
      await transaction.commit();
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      throw error;
    }
  }
}
