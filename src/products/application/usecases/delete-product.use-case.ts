import { ProductRepositoryInterface } from '@/products/domain/repositories/product-repository.interface';

export class DeleteProductUseCase {
  constructor(
    private readonly _productRepository: ProductRepositoryInterface,
  ) {}

  async execute(id: string): Promise<string> {
    const product = await this._productRepository.findById(id);

    if (!product) {
      throw new Error('Product not found');
    }

    await this._productRepository.delete(id);
    return `Product with id ${id} deleted successfully`;
  }
}
