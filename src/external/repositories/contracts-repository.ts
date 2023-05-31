import { Contract } from '@entities/contract';
import { sequelize } from '@external/database';
import {
  ContractsRepository,
  GetContractByIdOptions,
  ListContractsOptions,
} from '@usecases/port/repositories/contracts-repository';
import SequelizeContract from '@external/database/models/contract.model';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

export class ContractsRepositorySequelize implements ContractsRepository {
  async getById(id: number, options: GetContractByIdOptions): Promise<Contract> {
    const transaction = await sequelize.transaction();

    try {
      const contract = await SequelizeContract.findOne({
        where: Sequelize.and(
          { id },
          Sequelize.or(
            { clientId: options.profileId },
            { contractorId: options.profileId },
          ),
        ),
        transaction,
        lock: true,
      });
      await transaction.commit();

      return contract ? {
        id: contract.id,
        terms: contract.terms,
        status: contract.status,
        clientId: contract.client.id,
        contractId: contract.contractor.id,
        createdAt: contract.createdAt,
        updatedAt: contract.updatedAt,
      } : undefined;
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      throw error;
    }
  }

  async listContracts(options: ListContractsOptions): Promise<Contract[]> {
    const transaction = await sequelize.transaction();
    
    try {
      const contracts = await SequelizeContract.findAll({
        where: Sequelize.and(
          {
            status: {
              [Op.in]: options.status,
            },
          },
          Sequelize.or(
            { clientId: options.profileId },
            { contractorId: options.profileId },
          ),
        ),
        transaction,
        lock: true,
      });

      await transaction.commit();

      return contracts.map(({ dataValues }) => ({
        id: dataValues.id,
        terms: dataValues.terms,
        status: dataValues.status,
        clientId: dataValues.clientId,
        contractId: dataValues.contractorId,
        createdAt: dataValues.createdAt,
        updatedAt: dataValues.updatedAt,
      }));
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      throw error;
    }
  }
}
