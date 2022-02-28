import express from "express";
import schemas from "../utils/todoSchemas";

function schemaValidator(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const method = req.method;

  if (!schemas[method]) {
    return next();
  }

  if (schemas[method].body) {
    const { error, value } = schemas[method].body.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({ error: error.details.map((x) => x.message).join(", ") });
    }
  }

  if (schemas[method].params) {
    const { error, value } = schemas[method].params.validate(req.params);

    if (error) {
      return res
        .status(400)
        .json({ error: error.details.map((x) => x.message).join(", ") });
    }
  }

  next();
}

export default schemaValidator;
