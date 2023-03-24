import { Product } from '../../entities/product';
import { ProductRepository } from '../product-repository';

export class InMemoryProductRepository implements ProductRepository {
  private products: Product[] = [];

  async create(product: Product): Promise<void> {
    this.products.push(product);
  }

  async find(name: string): Promise<Product | null> {
    const product = this.products.find(product => product.name === name);

    if (!product) {
      return null;
    }

    return product;
  }
}
