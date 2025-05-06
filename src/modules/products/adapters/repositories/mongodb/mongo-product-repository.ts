import { ProductRepositoryInterface } from '@/modules/products/domain/repositories/product-repository.interface';
import { ProductEntity } from '@/modules/products/domain/entities/product.entity';
import { MongoProductGateway } from '@/modules/products/adapters/gatewyas/mongo-product-gateway';

export class MongoProductRepository implements ProductRepositoryInterface {
  constructor(private _mongoProductGateway = new MongoProductGateway()) {}

  findAll(): Promise<ProductEntity[]> {
    return this._mongoProductGateway.fetchAll();
  }

  findById(id: string): Promise<ProductEntity | null> {
    return this._mongoProductGateway.fetchById(id);
  }

  create(data: { name: string; description: string }): Promise<ProductEntity> {
    return this._mongoProductGateway.save(data);
  }

  update(
    id: string,
    data: { name: string; description: string },
  ): Promise<ProductEntity | null> {
    return this._mongoProductGateway.update(id, data);
  }

  delete(id: string): Promise<void> {
    return this._mongoProductGateway.delete(id);
  }
}
