import { model, models, Schema } from 'mongoose';

interface ProductDocumentInterface {
  name: string;
  description: string;
}

const ProductSchema = new Schema<ProductDocumentInterface>({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

export const ProductModel =
  models.Product || model<ProductDocumentInterface>('Product', ProductSchema);
