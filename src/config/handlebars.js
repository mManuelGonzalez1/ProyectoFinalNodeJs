import path from "path";
import { engine } from "express-handlebars";

const configHandlebars = (app, __dirname) => {
  app.engine(
    "handlebars",
    engine({
      defaultLayout: "main",
      layoutsDir: path.join(__dirname, "views"),
      extname: "handlebars",
    }),
  );
  app.set("view engine", "handlebars");
  app.set("views", path.join(__dirname, "views"));
};
export default configHandlebars;
