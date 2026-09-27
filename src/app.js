import express from "express";
import ServicesRouter from "./routes/services.router.js";

const app = express();
app.use(express.json());

app.use("/api/services", ServicesRouter);

export default app;
