import { ProductRepositoryInterface } from '@/modules/products/domain/repositories/product-repository.interface';
import { ProductEntity } from '@/modules/products/domain/entities/product.entity';
import { JsonProductGateway } from '@/modules/products/adapters/gatewyas/json-product-gateway';

export class JsonProductRepository implements ProductRepositoryInterface {
  constructor(private _jsonProductGateway = new JsonProductGateway()) {}

  findAll(): Promise<ProductEntity[]> {
    return this._jsonProductGateway.fetchAll();
  }

  findById(id: string): Promise<ProductEntity | null> {
    return this._jsonProductGateway.fetchById(id);
  }

  create(data: { name: string; description: string }): Promise<ProductEntity> {
    return this._jsonProductGateway.save(data);
  }

  update(
    id: string,
    data: { name: string; description: string },
  ): Promise<ProductEntity | null> {
    return this._jsonProductGateway.update(id, data);
  }

  delete(id: string): Promise<void> {
    return this._jsonProductGateway.delete(id);
  }
}
