import { AppError } from './app-error';

export class ContractNotFoundError extends AppError {
  constructor() {
    super('Contract not found error');
  }
}
