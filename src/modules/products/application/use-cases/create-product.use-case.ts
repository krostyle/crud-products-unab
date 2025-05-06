import { ProductRepositoryInterface } from '@/modules/products/domain/repositories/product-repository.interface';
import { ProductOutputDto } from '@/modules/products/application/dtos/product-output.dto';

export class CreateProductUseCase {
  constructor(
    private readonly _productRepository: ProductRepositoryInterface,
  ) {}

  async execute(data: {
    name: string;
    description: string;
  }): Promise<ProductOutputDto> {
    const createdProduct = await this._productRepository.create(data);
    return {
      id: createdProduct.id,
      name: createdProduct.name,
      description: createdProduct.description,
    };
  }
}
