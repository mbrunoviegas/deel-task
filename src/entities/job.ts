export class Job {
  id: number;

  description: string;

  price: number;

  paid: boolean;

  paymentDate: Date;

  contractorId?: number;

  clientId?: number;

  createdAt: Date;

  updatedAt: Date;
}
