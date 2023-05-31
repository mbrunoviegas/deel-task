import { Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import Contract from './contract.model';
import { ProfileType } from '@entities/enum/profile-type';

@Table
export default class Profile extends Model {
  @PrimaryKey
  @Column
    id: number;
  
  @Column
    firstName: string;

  @Column
    lastName: string;

  @Column
    profession: string;

  @Column(DataType.DECIMAL(12, 2))
    balance: number;

  @Column(DataType.ENUM(ProfileType.Client, ProfileType.Contractor))
    type: ProfileType;
  
  @Column
    createdAt?: Date;
  
  @Column
    updatedAt?: Date;
  
  @HasMany(() => Contract, { as: 'contractor', foreignKey: 'contractorId' })
    contractorContracts: Contract[];
  
  @HasMany(() => Contract, { as: 'client', foreignKey: 'clientId' })
    clientContracts: Contract[];
}
