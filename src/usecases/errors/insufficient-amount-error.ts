import { AppError } from './app-error';

export class InsufficientAmountError extends AppError {
  constructor() {
    super('Insufficient amount error');
  }
}
