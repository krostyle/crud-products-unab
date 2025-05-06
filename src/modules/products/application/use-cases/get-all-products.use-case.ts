import { ProductOutputDto } from '@/modules/products/application/dtos/product-output.dto';
import { ProductRepositoryInterface } from '@/modules/products/domain/repositories/product-repository.interface';

export class GetAllProductsUseCase {
  constructor(
    private readonly _productRepository: ProductRepositoryInterface,
  ) {}

  async execute(): Promise<ProductOutputDto[]> {
    const products = await this._productRepository.findAll();
    return products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        description: product.description,
      };
    });
  }
}
