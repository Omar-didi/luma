import mongoose, { Schema, model, models } from "mongoose";
void mongoose
interface IFormInterface {
  nombre: string;
  telefono?: string;
  calificacion: number;
  aspectos: string[];
  deseaPromociones: boolean | null;
}

const RespuestaSchema = new Schema<IFormInterface>(
  {
    nombre: { type: String, required: true },
    telefono: { type: String, required: false },
    calificacion: { type: Number, required: true },
    aspectos: { type: [String], required: true },
    deseaPromociones: { type: Boolean, required: false, default: null },
  },
  { timestamps: true }
);

export const Respuesta = models.Respuesta || model<IFormInterface>("Respuesta", RespuestaSchema);
