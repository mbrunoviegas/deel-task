import { BelongsTo, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import Contract from './contract.model';

@Table
export default class Job extends Model {
  @PrimaryKey
  @Column
    id: number;

  @Column
    description: string;
  
  @Column(DataType.DECIMAL(12, 2))
    price: number;

  @Column
    paid: boolean;
    
  @Column
    paymentDate: Date;

  @Column
    createdAt?: Date;
  
  @Column
    updatedAt?: Date;
  
  @BelongsTo(() => Contract, { as: 'contract', foreignKey: 'contractId' })
    contract: Contract;
}

