import { Profile } from '@entities/profile';
import { Either } from '@usecases/helpers/either';

export type GetProfileByIdResponseEither = Either<Error, Profile>;
