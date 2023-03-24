import { faker } from '@faker-js/faker';
import { Product } from '../entities/product';
import { InMemoryProductRepository } from '../repositories/in-memory/in-memory-product-repository';
import { CreateProduct } from './create-product';

type SutTypes = {
  sut: CreateProduct;
};

const makeSut = (): SutTypes => {
  const inMemoryProductRepository = new InMemoryProductRepository();
  const sut = new CreateProduct(inMemoryProductRepository);
  return { sut };
};

describe('CreateProduct', () => {
  test('should init sut CreateProduct', () => {
    const { sut } = makeSut();
    expect(sut).toBeInstanceOf(CreateProduct);
  });

  test('should create an product', async () => {
    const { sut } = makeSut();
    const execute = sut.execute({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
    });
    expect(execute).resolves.toBeInstanceOf(Product);
  });

  test('should not create product if it already exists', async () => {
    const { sut } = makeSut();

    const product = {
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
    };

    await sut.execute(product);

    const execute = sut.execute(product);
    expect(execute).rejects.toThrow('Product already registered!');
  });
});
