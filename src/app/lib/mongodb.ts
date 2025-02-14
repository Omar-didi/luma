import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Por favor define la variable de entorno MONGODB_URI");
}

// Definimos la interfaz para tipar `cached`
interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// Extendemos el objeto global para que TypeScript lo reconozca correctamente
const globalWithMongoose = global as typeof globalThis & { mongoose?: MongooseCache };

// Usamos `globalWithMongoose` para mantener la conexión en caché
const cached: MongooseCache = globalWithMongoose.mongoose || { conn: null, promise: null };

export async function connectToDatabase(): Promise<mongoose.Connection> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "formularioDB",
        bufferCommands: false,
      })
      .then((mongoose) => mongoose.connection);
  }

  cached.conn = await cached.promise;
  globalWithMongoose.mongoose = cached; // Guardamos la conexión en `global`
  
  return cached.conn;
}
