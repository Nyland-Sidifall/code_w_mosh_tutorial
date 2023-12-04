import { NextRequest, NextResponse } from "next/server";
import { schema } from "../products/schema";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number; name: string; price: number } }
) {
  const products = "await prisma.products.findMany();";
  return NextResponse.json(products, { status: 200 });
}

/* 
//Get All Products
export async function GET(
  request: NextRequest,
  { params }: { params: { id: number; name: string; price: number } }
) {
  const products = await prisma.products.findMany();
  return NextResponse.json(products, { status: 200 });
}

//Create new Product
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json({ error: validation.error }, { status: 400 });

  const newProduct = await prisma.products.create({
    data: { name: body.name, price: body.price },
  });
  return NextResponse.json(newProduct, { status: 201 });
}

*/
