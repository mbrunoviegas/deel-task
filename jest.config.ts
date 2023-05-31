import { pathsToModuleNameMapper } from 'ts-jest';
import tsconfig from './tsconfig.json';

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  cacheDirectory: '<rootDir>/target/jest-cache',
  coverageDirectory: '<rootDir>/target/test-results/',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
  rootDir: '.',
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './target/test-results/',
        outputName: 'tests-results-jest.xml',
      },
    ],
  ],
  // The directory where Jest should output its coverage files
  transformIgnorePatterns: ['node_modules/'],
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    'src/**/*.{js,jsx}'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
