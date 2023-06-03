import { Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import logger from "./logger";
import { StatusCode } from "../enums/httpStatusCode";

const validateBody = (schemaObject: ObjectSchema, path: any = undefined) => {
  return (req: any, res: Response, next: NextFunction) => {
    const schema = schemaObject.options({ stripUnknown: false });
    const body = path ? req[path] : req?.body?.input ?? req?.body;
    const { error } = schema.validate(body);
    if (error) {
      logger.warn(error.message);
      return res.status(StatusCode.BAD_REQUEST).json({
        status: false,
        statusCode: StatusCode.BAD_REQUEST,
        message: error.message,
      });
    }
    req.body = body;
    return next();
  };
};

export default validateBody;
