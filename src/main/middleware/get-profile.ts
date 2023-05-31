import { FactoryDependency } from '@external/dependency-injection/factory';
import { GetProfileByIdUseCase } from '@usecases/profile/get-profile-by-id-use-case';
import { NextFunction, Request, Response } from 'express';

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  const getProfileUseCase = FactoryDependency.resolve<GetProfileByIdUseCase>('GetProfileByIdUseCase');
  const profileId = Number(req.get('profile_id') ?? 0);

  const profile = await getProfileUseCase.execute({
    profileId,
  });

  if (profile.isFailure()) {
    return res.status(401).end();
  } else {
    req.profile = profile.value;
  }
  
  next();
};
