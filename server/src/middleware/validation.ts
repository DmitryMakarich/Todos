import express from "express";
import { validationResult } from "express-validator";

function validation(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      message: "Некорректные данные при входе в систему",
    });
  }

  next();
}

export default validation;
