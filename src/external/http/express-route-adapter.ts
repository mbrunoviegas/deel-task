import { Controller } from '@adapters/controllers/port/controller';
import { FactoryDependency } from '@external/dependency-injection/factory';
import { Request as ExpressRequest, Response as ExpressResponse, NextFunction } from 'express';
import { Request } from '@adapters/controllers/port/request';
import { Response } from '@adapters/controllers/port/response';

export const adapterRouterJson = (controllerName: string) => {
  return async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    const controller = FactoryDependency.resolve<Controller>(controllerName);
    const request: Request = {
      body: req.body,
      headers: req.body,
      params: req.params,
      query: req.query,
      profile: req.profile,
    };

    const response = await controller.handle(request);

    res.status(response.statusCode);
    if (response.body) {
      res.json(response.body); 
    } else {
      res.send();
    }
  };
};
