import { BelongsTo, Column, HasMany, PrimaryKey, Table, Model, DataType } from 'sequelize-typescript';
import Profile from './profile.model';
import Job from './job.model';
import { ContractStatus } from '@entities/enum/contract-status';

@Table
export default class Contract extends Model {
  @PrimaryKey
  @Column
    id: number;

  @Column
    terms: string;
  
  @Column(DataType.ENUM(ContractStatus.InProgress, ContractStatus.New, ContractStatus.Terminated))
    status: ContractStatus;
    
  @Column
    createdAt?: Date;
  
  @Column
    updatedAt?: Date;
  
  @BelongsTo(() => Profile, { as: 'contractor', foreignKey: 'contractorId' })
    contractor: Profile;

  @BelongsTo(() => Profile, { as: 'client', foreignKey: 'clientId' })
    client: Profile; 
  
  @HasMany(() => Job, { as: 'job', foreignKey: 'contractId' })
    jobs: Job[];
  
  @Column
    contractorId: number;

  @Column
    clientId: number;
}

