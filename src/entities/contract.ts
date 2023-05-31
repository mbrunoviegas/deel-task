import { ContractStatus } from './enum/contract-status';

export class Contract {
  id: number;
  
  terms: string;

  status: ContractStatus;

  contractorId: number;

  clientId: number;

  createdAt: Date;

  updatedAt: Date;
}
