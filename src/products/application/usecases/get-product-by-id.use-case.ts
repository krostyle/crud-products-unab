import { ProductRepositoryInterface } from '@/products/domain/repositories/product-repository.interface';
import { ProductOutputDto } from '@/products/application/dtos/product-output.dto';

export class GetProductByIdUseCase {
  constructor(
    private readonly _productRepository: ProductRepositoryInterface,
  ) {}

  async execute(id: string): Promise<ProductOutputDto> {
    const product = await this._productRepository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }
}
