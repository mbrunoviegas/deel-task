import { Express, NextFunction, Request, Response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import YAML from 'yaml';

export const setupSwagger = (app: Express): void => {
  const swaggerOptions: swaggerJSDoc.OAS3Options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Deel Task - Marcelo Viegas',
        version: '1.0.0',
        description: 'This is a home task from Deel.',
        license: {
          name: 'MIT',
        },
      },
    },
    apis: [
      './src/main/routes/**/*.ts',
      './src/usecases/**/interfaces/*.ts',
    ],
  };

  const docJs = swaggerJSDoc(swaggerOptions);
  const docYaml = new YAML.Document(docJs);

  app.use('/api-docs', (request: Request, response: Response, next: NextFunction) => {
    if (request.query.format === 'json') {
      response.send(docJs);
      return;
    }
    if (request.query.format === 'yaml') {
      response.contentType('text/x-yaml').send(docYaml.toString());
      return;
    }
    next();
  }, serve, setup(docJs));
};
