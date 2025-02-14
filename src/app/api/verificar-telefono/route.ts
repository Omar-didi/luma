import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import { Respuesta } from "@/models/respuesta";

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const telefono = searchParams.get("telefono");

  if (!telefono) {
    return NextResponse.json({ error: "Número de teléfono requerido" }, { status: 400 });
  }

  const exists = await Respuesta.findOne({ telefono });

  return NextResponse.json({ exists: !!exists });
}
