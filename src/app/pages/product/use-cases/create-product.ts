import { Product } from '../entities/product';
import { ProductRepository } from '../repositories/product-repository';

interface CreateProductRequest {
  id: string;
  name: string;
  price: number;
}

type CreateProductResponse = Product;

export class CreateProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({
    id,
    name,
    price,
  }: CreateProductRequest): Promise<CreateProductResponse> {
    const findProduct = await this.productRepository.find(name);

    if (findProduct) {
      throw new Error('Product already registered!');
    }

    const product = new Product({
      id,
      name,
      price,
    });

    this.productRepository.create(product);

    return product;
  }
}
