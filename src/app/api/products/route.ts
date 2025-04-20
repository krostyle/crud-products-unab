import { NextRequest, NextResponse } from 'next/server';
import { ProductsController } from '@/products/adapters/controllers/products.controller';

export async function GET() {
  return await new ProductsController().list();
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  return await new ProductsController().create(data);
}
