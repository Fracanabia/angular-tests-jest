import { faker } from '@faker-js/faker';
import { InMemoryProductRepository } from '../repositories/in-memory/in-memory-product-repository';
import { CreateProduct } from './create-product';

type SutTypes = {
  sut: CreateProduct;
  inMemoryProductRepository: InMemoryProductRepository;
};

const makeSut = (): SutTypes => {
  const inMemoryProductRepository = new InMemoryProductRepository();
  const sut = new CreateProduct(inMemoryProductRepository);
  return { sut, inMemoryProductRepository };
};

const getProductToAdd = () => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  price: Number(faker.commerce.price(0, 1000)),
});

describe('CreateProduct', () => {
  test('should init sut CreateProduct', () => {
    const { sut } = makeSut();
    expect(sut).toBeInstanceOf(CreateProduct);
  });

  test('should create an product', async () => {
    const { sut, inMemoryProductRepository } = makeSut();
    const product = getProductToAdd();
    await sut.execute(product);
    expect(inMemoryProductRepository.actions).toEqual([
      InMemoryProductRepository.Action.find,
      InMemoryProductRepository.Action.create,
    ]);
  });

  test('should not create product if it already exists', async () => {
    const { sut } = makeSut();
    const product = getProductToAdd();
    await sut.execute(product);
    const execute = sut.execute(product);
    expect(execute).rejects.toThrow('Product already registered!');
  });
});
