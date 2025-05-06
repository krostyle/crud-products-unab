import { ProductModel } from '@/modules/products/infrastructure/database/mongodb/schemas/product-schema';
import { ProductEntity } from '@/modules/products/domain/entities/product.entity';
import { dbConnect } from '@/config/client';

export class MongoProductGateway {
  private async connect() {
    await dbConnect();
  }

  async fetchAll() {
    await this.connect();
    const docs = await ProductModel.find();
    return docs.map(
      (doc) => new ProductEntity(doc._id.toString(), doc.name, doc.description),
    );
  }

  async fetchById(id: string) {
    await this.connect();
    const doc = await ProductModel.findById(id);
    if (!doc) {
      return null;
    }
    return new ProductEntity(doc._id.toString(), doc.name, doc.description);
  }

  async save(data: { name: string; description: string }) {
    await this.connect();
    try {
      const doc = new ProductModel({
        name: data.name,
        description: data.description,
      });
      await doc.save();
      return new ProductEntity(doc._id.toString(), doc.name, doc.description);
    } catch (error) {
      console.error('Error saving product:', error);
      throw new Error('Error saving product in database');
    }
  }

  async update(id: string, data: { name: string; description: string }) {
    await this.connect();
    const doc = await ProductModel.findByIdAndUpdate(
      id,
      {
        name: data.name,
        description: data.description,
      },
      { new: true },
    );
    if (!doc) {
      return null;
    }
    return new ProductEntity(doc._id.toString(), doc.name, doc.description);
  }

  async delete(id: string) {
    await this.connect();
    await ProductModel.findByIdAndDelete(id);
  }
}
