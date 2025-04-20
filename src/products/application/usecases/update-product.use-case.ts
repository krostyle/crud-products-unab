import { ProductRepositoryInterface } from '@/products/domain/repositories/product-repository.interface';
import { ProductOutputDto } from '@/products/application/dtos/product-output.dto';

export class UpdateProductUseCase {
  constructor(
    private readonly _productRepository: ProductRepositoryInterface,
  ) {}

  async execute(
    id: string,
    productData: { name: string; description: string },
  ): Promise<ProductOutputDto | null> {
    const product = await this._productRepository.update(id, productData);

    if (!product) {
      return null;
      throw new Error('Product not found');
    }

    return {
      id: product.id,
      name: product.name,
      description: product.description,
    };
  }
}
