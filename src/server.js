import http from "http";
import app from "./app.js";
import config from "./config/env.config.js";
import connectDB from "./config/databae.config.js";
import { Server } from "socket.io";
import { ServiceModel } from "./dao/models/service.model.js";

const startServer = async () => {
  try {
    await connectDB();
    const httpServer = http.createServer(app);
    const io = new Server(httpServer);

    const emitServices = async (target) => {
      try {
        const services = await ServiceModel.find().lean();
        target.emit("services__updated", services);
      } catch (error) {
        console.error("Error al sincronizar servicios por Socket.IO:", error);
        target.emit("services__error", {
          message: "No se pudieron sincronizar los servicios.",
        });
      }
    };

    io.on("connection", (socket) => {
      console.log("Nuevo cliente conectado", socket.id);

      void emitServices(socket);
    });

    const serviceChanges = ServiceModel.watch();
    serviceChanges.on("change", () => {
      void emitServices(io);
    });
    serviceChanges.on("error", (error) => {
      console.error("Error en el stream de cambios de servicios:", error);
      io.emit("services__error", {
        message: "El servicio de actualizaciones en vivo no está disponible.",
      });
    });

    httpServer.listen(config.port, () => {
      console.log("El servidor esta escuchando");
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1); // Salir del proceso con un código de error
  }
};

startServer();
