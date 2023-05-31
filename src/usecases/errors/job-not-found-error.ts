import { AppError } from './app-error';

export class JobNotFoundError extends AppError {
  constructor() {
    super('Job not found');
  }
}
