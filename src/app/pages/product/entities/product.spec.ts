import { faker } from '@faker-js/faker';
import { Product } from './product';

const getProductToAdd = () => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  price: Number(faker.commerce.price(0, 1000)),
});

type SutTypes = {
  sut: Product;
};

const makeSut = (): SutTypes => {
  const product = getProductToAdd();
  const sut = new Product(product);
  return { sut };
};

describe('Product', () => {
  test('should init instance', () => {
    const { sut } = makeSut();
    expect(sut).toBeInstanceOf(Product);
  });

  test('should valid price', () => {
    const product = getProductToAdd();
    product.price = -1;
    expect(() => new Product(product)).toThrow('Invalid price!');
  });
});
