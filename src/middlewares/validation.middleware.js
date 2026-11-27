export const validateRequest = (schemas) => (req, res, next) => {
  const validated = {};

  for (const [source, schema] of Object.entries(schemas)) {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: [source, ...issue.path].join("."),
        message: issue.message,
      }));

      return res.status(400).json({
        status: "error",
        message: errors
          .map(({ field, message }) => `${field}: ${message}`)
          .join(", "),
        errors,
      });
    }

    validated[source] = result.data;
  }

  req.validated = { ...req.validated, ...validated };
  next();
};
