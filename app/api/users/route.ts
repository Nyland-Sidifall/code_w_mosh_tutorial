//GET
//POST
//PUT

import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

//Get All Users - READ
export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

//Create New User - CREATE
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  const user = await prisma.user.findUnique({ where: { email: body.email } });

  if (user)
    return NextResponse.json(
      { error: "That account already exists." },
      { status: 400 }
    );

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });

  if (!validation.success)
    return NextResponse.json({ error: validation.error }, { status: 400 });
  return NextResponse.json(newUser, { status: 201 });
}
