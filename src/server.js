import app from "./app.js";
import config from "./config/env.config.js";
import connectDB from "./config/databae.config.js";

const startServer = async () => {
  try {
    await connectDB();
    app.listen(config.port, () => {
      console.log("El servidor esta escuchando");
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1); // Salir del proceso con un código de error
  }
};

startServer();
