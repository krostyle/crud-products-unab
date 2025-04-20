import { MongoProductRepository } from '@/products/adapters/repositories/mongodb/mongo-product-repository';
import { GetAllProductsUseCase } from '@/products/application/usecases/get-all-products.use-case';
import { NextResponse } from 'next/server';
import { CreateProductUseCase } from '@/products/application/usecases/create-product.use-case';
import { GetProductByIdUseCase } from '@/products/application/usecases/get-product-by-id.use-case';
import { UpdateProductUseCase } from '@/products/application/usecases/update-product.use-case';
import { DeleteProductUseCase } from '@/products/application/usecases/delete-product.use-case';

export class ProductsController {
  private readonly productRepository = new MongoProductRepository();

  async list(): Promise<NextResponse> {
    const getAllProductUseCase = new GetAllProductsUseCase(
      this.productRepository,
    );
    const products = await getAllProductUseCase.execute();
    return NextResponse.json(products, {
      status: 200,
    });
  }

  async create(data: {
    name: string;
    description: string;
  }): Promise<NextResponse> {
    const createProductUseCase = new CreateProductUseCase(
      this.productRepository,
    );
    const product = await createProductUseCase.execute(data);
    return NextResponse.json(product, { status: 201 });
  }

  async getById(id: string): Promise<NextResponse> {
    const productRepository = new MongoProductRepository();
    const getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
    const product = await getProductByIdUseCase.execute(id);
    return NextResponse.json(product, { status: 200 });
  }

  async update(
    id: string,
    data: { name: string; description: string },
  ): Promise<NextResponse> {
    const uc = new UpdateProductUseCase(this.productRepository);
    const product = await uc.execute(id, data);
    return NextResponse.json(product);
  }

  async delete(id: string): Promise<NextResponse> {
    const productRepository = new MongoProductRepository();
    const deleteProductUseCase = new DeleteProductUseCase(productRepository);
    await deleteProductUseCase.execute(id);
    return NextResponse.json({ message: 'Product deleted' }, { status: 200 });
  }
}
