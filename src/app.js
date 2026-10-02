import express from "express";
import ServicesRouter from "./routes/services.router.js";
import BookingsRouter from "./routes/bookings.router.js";

const app = express();
app.use(express.json());

app.use("/api/services", ServicesRouter);
app.use("/api/bookings", BookingsRouter);

export default app;
