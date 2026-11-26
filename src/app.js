import express from "express";
import ServicesRouter from "./routes/services.router.js";
import BookingsRouter from "./routes/bookings.router.js";
import ViewRouter from "./routes/view.router.js";

import configHandlebars from "./config/handlebars.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
configHandlebars(app, __dirname);

app.use("/api/services", ServicesRouter);
app.use("/api/bookings", BookingsRouter);
app.use("/", ViewRouter);
app.use(express.static(path.join(__dirname, "./public")));

export default app;
