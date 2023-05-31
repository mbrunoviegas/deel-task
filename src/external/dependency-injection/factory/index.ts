import { DependencyContainer, container } from 'tsyringe';
import { containerV1 } from '../containers';

export enum FactoryVersion {
  DEFAULT,
  V1,
}

export class FactoryDependency {
  private static containerMap = new Map<FactoryVersion, DependencyContainer>([
    [FactoryVersion.DEFAULT, container],
    [FactoryVersion.V1, containerV1],
  ]);

  static resolve<TInstance>(token: string, version = FactoryVersion.V1): TInstance {
    const dependencyContainer = this.containerMap.get(version);

    return dependencyContainer.resolve<TInstance>(token);
  }
}
