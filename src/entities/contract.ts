import { ContractStatus } from './enum/contract-status';

export class Contract {
  id: number;
  
  terms: string;

  status: ContractStatus;

  contractId: number;

  clientId: number;

  createdAt: Date;

  updatedAt: Date;
}
