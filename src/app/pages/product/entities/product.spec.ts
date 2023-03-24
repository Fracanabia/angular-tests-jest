import { faker } from '@faker-js/faker';
import { Product } from './product';

type SutTypes = {
  sut: Product;
};

const makeSut = (): SutTypes => {
  const sut = new Product({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: Number(faker.commerce.price()),
  });
  return { sut };
};

describe('Product', () => {
  test('should init instance', () => {
    const { sut } = makeSut();
    expect(sut).toBeInstanceOf(Product);
  });

  test('should valid price', () => {
    expect(
      () =>
        new Product({
          id: faker.datatype.uuid(),
          name: faker.commerce.productName(),
          price: -1,
        })
    ).toThrow('Invalid price!');
  });
});
