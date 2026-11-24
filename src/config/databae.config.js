import mongoose from "mongoose";
import config from "./env.config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongo_uri);
    console.log("Conexión a la base de datos establecida");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1); // Salir del proceso con un código de error
  }
};
export default connectDB;
