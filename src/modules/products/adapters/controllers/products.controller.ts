import { MongoProductRepository } from '@/modules/products/adapters/repositories/mongodb/mongo-product-repository';
import { GetAllProductsUseCase } from '@/modules/products/application/use-cases/get-all-products.use-case';
import { NextResponse } from 'next/server';
import { CreateProductUseCase } from '@/modules/products/application/use-cases/create-product.use-case';
import { GetProductByIdUseCase } from '@/modules/products/application/use-cases/get-product-by-id.use-case';
import { UpdateProductUseCase } from '@/modules/products/application/use-cases/update-product.use-case';
import { DeleteProductUseCase } from '@/modules/products/application/use-cases/delete-product.use-case';
import { JsonProductRepository } from '@/modules/products/adapters/repositories/mongodb/json-product-repository';

export class ProductsController {
  private readonly productRepository = new JsonProductRepository();

  async list(): Promise<NextResponse> {
    try {
      const getAllProductUseCase = new GetAllProductsUseCase(
        this.productRepository,
      );
      const products = await getAllProductUseCase.execute();
      return NextResponse.json(products, {
        status: 200,
      });
    } catch (error: any) {
      console.error('Error al obtener los productos:', error);
      return NextResponse.json(
        { error: 'Error al obtener los productos' },
        { status: 500 },
      );
    }
  }

  async create(data: {
    name: string;
    description: string;
  }): Promise<NextResponse> {
    try {
      const createProductUseCase = new CreateProductUseCase(
        this.productRepository,
      );
      const product = await createProductUseCase.execute(data);
      return NextResponse.json(product, { status: 201 });
    } catch (error: any) {
      console.error('Error al crear el producto:', error);
      return NextResponse.json(
        { error: 'Error al crear el producto' },
        { status: 500 },
      );
    }
  }

  async getById(id: string): Promise<NextResponse> {
    try {
      const getProductByIdUseCase = new GetProductByIdUseCase(
        this.productRepository,
      );
      const product = await getProductByIdUseCase.execute(id);
      return NextResponse.json(product, { status: 200 });
    } catch (error: any) {
      console.error('Error al obtener el producto:', error);
      return NextResponse.json(
        { error: 'Error al obtener el producto' },
        { status: 500 },
      );
    }
  }

  async update(
    id: string,
    data: { name: string; description: string },
  ): Promise<NextResponse> {
    try {
      const updateProductUseCase = new UpdateProductUseCase(
        this.productRepository,
      );
      const product = await updateProductUseCase.execute(id, data);
      return NextResponse.json(product, { status: 200 });
    } catch (error: any) {
      console.error('Error al actualizar el producto:', error);
      return NextResponse.json(
        { error: 'Error al actualizar el producto' },
        { status: 500 },
      );
    }
  }

  async delete(id: string): Promise<NextResponse> {
    try {
      const deleteProductUseCase = new DeleteProductUseCase(
        this.productRepository,
      );
      await deleteProductUseCase.execute(id);
      return NextResponse.json(
        { message: 'Producto eliminado' },
        { status: 200 },
      );
    } catch (error: any) {
      console.error('Error al eliminar el producto:', error);
      return NextResponse.json(
        { error: 'Error al eliminar el producto' },
        { status: 500 },
      );
    }
  }
}
