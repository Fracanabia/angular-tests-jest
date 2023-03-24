import { Product } from '../../entities/product';
import { ProductRepository } from '../product-repository';

export class InMemoryProductRepository implements ProductRepository {
  private products: Product[] = [];

  public actions: InMemoryProductRepository.Action[] = [];

  async create(product: Product): Promise<void> {
    this.actions.push(InMemoryProductRepository.Action.create);
    this.products.push(product);
  }

  async find(name: string): Promise<Product | null> {
    this.actions.push(InMemoryProductRepository.Action.find);
    const product = this.products.find(product => product.name === name);

    if (!product) {
      return null;
    }

    return product;
  }
}

export namespace InMemoryProductRepository {
  export enum Action {
    create,
    find,
  }
}
