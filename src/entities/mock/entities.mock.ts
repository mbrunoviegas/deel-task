import { Contract } from '@entities/contract';
import { ContractStatus } from '@entities/enum/contract-status';
import { ProfileType } from '@entities/enum/profile-type';
import { Job } from '@entities/job';
import { Profile } from '@entities/profile';
import { fakerEN_US as faker } from '@faker-js/faker';

export const profileMock: Profile = {
  id: faker.number.int(),
  firstName: faker.person.firstName(),
  lastName: faker.person.jobTitle(),
  profession: faker.string.alpha(),
  balance: faker.number.float(),
  type: faker.helpers.arrayElement(Object.values(ProfileType)),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
};

export const contractMock: Contract = {
  id: faker.number.int(),
  terms: faker.string.alphanumeric(),
  status: faker.helpers.arrayElement(Object.values(ContractStatus)),
  contractId: faker.number.int(),
  clientId: faker.number.int(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
};

export const jobMock: Job = {
  id: faker.number.int(),
  description: faker.string.alphanumeric(),
  price: faker.number.float({ min: 10, max: 1000 }),
  paid: faker.datatype.boolean(),
  paymentDate: faker.date.recent(),
  contractorId: faker.number.int(),
  clientId: faker.number.int(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
};
