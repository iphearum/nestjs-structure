import { faker } from '@faker-js/faker';

export const PG_CONNECTION = '';

export const user = {
  username: faker.internet.userName(),
  password: faker.internet.password(),
  first_name: faker.internet.displayName(),
  last_name: faker.internet.domainName(),
  phone: faker.internet.ipv4(),
  email: faker.internet.email(),
  role_id: 1, // Replace with actual role_id from your user_role table
};

export function createRandomUser() {
  return user;
}

export const users = faker.helpers.multiple(createRandomUser, {
  count: 5,
});
