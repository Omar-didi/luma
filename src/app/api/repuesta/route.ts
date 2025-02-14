import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb"; 
import { Respuesta } from "@/models/respuesta";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const data = await req.json();

    const nuevaRespuesta = new Respuesta(data);
    await nuevaRespuesta.save();

    return NextResponse.json({ message: "Respuesta guardada con éxito" }, { status: 201 });
  } catch (error) {
    void error
    return NextResponse.json({ error: "Error al guardar la respuesta" }, { status: 500 });
  }
}
