import { AppError } from './app-error';

export class InvalidAmountError extends AppError {
  constructor() {
    super('Invalid amount to be deposited');
  }
}
