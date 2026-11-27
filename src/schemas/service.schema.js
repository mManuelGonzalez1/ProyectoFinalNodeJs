import { z } from "zod";

const serviceName = z.string().trim().min(1, "Este campo es obligatorio");
const numericValue = (minimum, message) =>
  z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() !== "" ? Number(value) : value,
    z.number().finite("Debe ser un número válido").min(minimum, message),
  );
const booleanValue = z.preprocess(
  (value) => (value === "true" ? true : value === "false" ? false : value),
  z.boolean({ message: "Debe ser true o false" }),
);

const serviceFields = {
  name: serviceName,
  description: serviceName,
  duration: numericValue(1, "La duración debe ser al menos 1"),
  price: numericValue(0, "El precio no puede ser negativo"),
  category: serviceName,
  available: booleanValue,
};

export const createServiceSchema = z.object(serviceFields).strict();

export const updateServiceSchema = z
  .object(serviceFields)
  .partial()
  .strict()
  .refine((service) => Object.keys(service).length > 0, {
    message: "Debes enviar al menos un campo para actualizar",
  });

const positiveInteger = (defaultValue, maximum = Number.MAX_SAFE_INTEGER) =>
  z.preprocess(
    (value) =>
      value === undefined
        ? defaultValue
        : typeof value === "string" && value.trim() !== ""
          ? Number(value)
          : value,
    z.number().int().min(1).max(maximum),
  );

export const servicesQuerySchema = z.object({
  category: z.string().trim().min(1).optional(),
  available: booleanValue.optional(),
  page: positiveInteger(1),
  limit: positiveInteger(10, 100),
  sort: z.enum(["asc", "desc"]).optional(),
});
