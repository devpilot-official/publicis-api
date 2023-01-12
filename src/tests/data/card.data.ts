import { faker } from '@faker-js/faker'

export const user = {
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  cardNumber: faker.finance.creditCardNumber(),
  limit: 0
}
