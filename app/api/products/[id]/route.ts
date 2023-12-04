import { NextRequest, NextResponse } from "next/server";
import { schema } from "../../products/schema";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number; name: string; price: number } }
) {
  const products = "await prisma.products.findMany();";
  return NextResponse.json(products, { status: 200 });
}

/* 
//Update product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; name: string; price: number } }
) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success)
    return NextResponse.json({ error: validation.error }, { status: 400 });

  const product = await prisma.products.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  const newProduct = await prisma.products.update({
    where: { id: product.id },
    data: { name: body.name, price: body.price },
  });

  return NextResponse.json(newProduct, { status: 200 });
}

//Delete a specific product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = await prisma.products.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  const deletedProduct = await prisma.products.delete({
    where: { id: product.id },
  });
  return NextResponse.json(deletedProduct, { status: 200 });
}

*/
