import { NextRequest, NextResponse } from 'next/server';
import { ProductsController } from '@/products/adapters/controllers/products.controller';

export const GET = async (
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> => {
  const { id } = await params;
  return await new ProductsController().getById(id);
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> => {
  const { id } = await params;
  const data = (await req.json()) as { name: string; description: string };
  return await new ProductsController().update(id, data);
};

export const DELETE = async (
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> => {
  const { id } = await params;
  return await new ProductsController().delete(id);
};
