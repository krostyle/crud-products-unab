import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ProductEntity } from '@/modules/products/domain/entities/product.entity';

interface ProductData {
  id: string;
  name: string;
  description: string;
}

export class JsonProductGateway {
  private filePath: string;

  constructor() {
    // Ruta al archivo JSON de productos
    this.filePath = path.join(process.cwd(), 'src/lib/storage/products.json');
  }

  private async readProducts(): Promise<ProductData[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data || '[]');
    } catch (error) {
      // Si el archivo no existe o está vacío, devolver un array vacío
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        await this.writeProducts([]);
        return [];
      }
      console.error('Error reading products file:', error);
      return [];
    }
  }

  private async writeProducts(products: ProductData[]): Promise<void> {
    try {
      // Asegurar que el directorio existe
      const dir = path.dirname(this.filePath);
      await fs.mkdir(dir, { recursive: true });

      // Escribir los datos en el archivo
      await fs.writeFile(
        this.filePath,
        JSON.stringify(products, null, 2),
        'utf8',
      );
    } catch (error) {
      console.error('Error writing products file:', error);
      throw new Error('Failed to write products data');
    }
  }

  async fetchAll(): Promise<ProductEntity[]> {
    const products = await this.readProducts();
    return products.map(
      (product) =>
        new ProductEntity(product.id, product.name, product.description),
    );
  }

  async fetchById(id: string): Promise<ProductEntity | null> {
    const products = await this.readProducts();
    const product = products.find((p) => p.id === id);

    if (!product) {
      return null;
    }

    return new ProductEntity(product.id, product.name, product.description);
  }

  async save(data: {
    name: string;
    description: string;
  }): Promise<ProductEntity> {
    try {
      const products = await this.readProducts();

      // Crear nuevo producto con ID único
      const newProduct: ProductData = {
        id: uuidv4(),
        name: data.name,
        description: data.description,
      };

      // Añadir a la lista y guardar
      products.push(newProduct);
      await this.writeProducts(products);

      return new ProductEntity(
        newProduct.id,
        newProduct.name,
        newProduct.description,
      );
    } catch (error) {
      console.error('Error saving product:', error);
      throw new Error('Error saving product in JSON storage');
    }
  }

  async update(
    id: string,
    data: { name: string; description: string },
  ): Promise<ProductEntity | null> {
    try {
      const products = await this.readProducts();
      const index = products.findIndex((p) => p.id === id);

      if (index === -1) {
        return null;
      }

      // Actualizar el producto
      products[index] = {
        ...products[index],
        name: data.name,
        description: data.description,
      };

      await this.writeProducts(products);
      return new ProductEntity(
        products[index].id,
        products[index].name,
        products[index].description,
      );
    } catch (error) {
      console.error('Error updating product:', error);
      throw new Error('Error updating product in JSON storage');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      let products = await this.readProducts();
      products = products.filter((p) => p.id !== id);
      await this.writeProducts(products);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error('Error deleting product from JSON storage');
    }
  }
}
