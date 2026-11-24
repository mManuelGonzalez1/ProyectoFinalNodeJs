import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

const envPath = fileURLToPath(new URL("../../.env", import.meta.url));
dotenv.config({ path: envPath });

const requiredEnvVals = ["PORT", "NODE_ENV", "MONGO_URI"];
const missingVars = requiredEnvVals.filter((key) => !process.env[key]);
if (missingVars.length > 0) {
  throw new Error(
    `Faltan variables de entorno: ${missingVars.join(", ")}. Revisa el archivo ${envPath}`,
  );
}

const config = {
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  mongo_uri: process.env.MONGO_URI,
};
if (!config.mongo_uri) {
  throw new Error("Falta la variable de entorno MONGO_URI");
}
export default config;
