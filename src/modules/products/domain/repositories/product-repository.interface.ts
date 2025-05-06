import { ProductEntity } from '@/modules/products/domain/entities/product.entity';

export interface ProductRepositoryInterface {
  findAll(): Promise<ProductEntity[]>;

  findById(id: string): Promise<ProductEntity | null>;

  create(data: { name: string; description: string }): Promise<ProductEntity>;

  update(
    id: string,
    data: { name: string; description: string },
  ): Promise<ProductEntity | null>;

  delete(id: string): Promise<void>;
}
