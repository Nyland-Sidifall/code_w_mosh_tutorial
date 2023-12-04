import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

//Getting Specific User - READ
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });
  if (!user)
    return NextResponse.json({ error: "User Not Found" }, { status: 404 });
  return NextResponse.json(user);
}

//Update A Specific User - UPDATE
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!validation.success)
    return NextResponse.json({ error: validation.error }, { status: 400 });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: body.name,
      email: body.email,
      hashedPassword: hashedPassword,
    },
  });

  return NextResponse.json(
    { user: updatedUser, message: "Your User Info Has Been Updated!" },
    { status: 200 }
  );
}

//Deleting A Specific User - DELETE
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const deletedUser = await prisma.user.delete({ where: { id: user.id } });
  return NextResponse.json(deletedUser, { status: 200 });
}
