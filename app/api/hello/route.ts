import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({ name: "Mazen" });
};

export const POST = async (req: Request) => {
  const { name } = await req.json();
  return NextResponse.json({ message: `this is you name ${name}` });
};
