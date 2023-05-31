import { Profile } from '@entities/profile';
import { sequelize } from '@external/database';
import ProfileSequelize from '@external/database/models/profile.model';
import {
  BestClientDetails,
  GetBestClientOptions,
  GetBestProfessionOptions,
  ProfileRepository,
} from '@usecases/port/repositories/profile-repository';
import { QueryTypes } from 'sequelize';

export class ProfileRepositorySequelize implements ProfileRepository {
  async getProfileById(profileId: number): Promise<Profile> {
    const transaction = await sequelize.transaction();
    
    try {
      const profile = await ProfileSequelize.findByPk(profileId,
        {
          transaction,
        },
      );
      await transaction.commit();
      
      return profile ? {
        balance: profile.balance,
        createdAt: profile.createdAt,
        firstName: profile.firstName,
        id: profile.id,
        lastName: profile.lastName,
        profession: profile.profession,
        updatedAt: profile.updatedAt,
        type: profile.type,
      } : undefined;
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      throw error;
    }
  }

  async getBestProfession(options: GetBestProfessionOptions): Promise<string> {
    const transaction = await sequelize.transaction();

    try {
      const [results] = await sequelize.query<{ profession: string }>(`
      SELECT profession, SUM(Jobs.price) as totalReceived FROM Profiles
      INNER JOIN Contracts 
        ON Contracts.contractorId = Profiles.id 
      INNER JOIN Jobs
        ON Jobs.contractId = Contracts.id 
      WHERE (Jobs.paymentDate BETWEEN :startDate AND :endDate) AND Jobs.paid = true
      GROUP BY profession
      ORDER BY totalReceived DESC
      LIMIT 1`,
      {
        replacements: {
          startDate: options.startDate,
          endDate: options.endDate,
        },
        transaction,
        type: QueryTypes.SELECT,
      },
      );
      await transaction.commit();

      return results ?  results.profession : undefined;
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      throw error;
    }
  }

  async getBestClients(options: GetBestClientOptions): Promise<BestClientDetails[]> {
    const transaction = await sequelize.transaction();

    try {
      const bestClients = await sequelize.query<BestClientDetails>(`
      SELECT Profiles.id, Profiles.firstName, profiles.LastName, SUM(Jobs.price) as totalPaid FROM Profiles
      INNER JOIN Contracts 
        ON Contracts.clientId = Profiles.id 
      INNER JOIN Jobs
        ON Jobs.contractId = Contracts.id 
      WHERE (Jobs.paymentDate BETWEEN :startDate AND :endDate) AND Jobs.paid = true
      GROUP BY Profiles.id
      ORDER BY totalPaid DESC
      LIMIT :limit`,
      {
        replacements: {
          startDate: options.startDate,
          endDate: options.endDate,
          limit: Number(options.limit),
        },
        transaction,
        type: QueryTypes.SELECT,
      },
      );
      await transaction.commit();

      return bestClients?.length ? bestClients : undefined;
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      throw error;
    }
  }
}
