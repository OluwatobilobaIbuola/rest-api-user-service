import { BasicResponse } from '../dto/basicResponse';
import { Request, Response } from "express";
import logger from "../utils/logger";

export class BaseService {
  public sendResponse(
    serviceResponse: BasicResponse,
    req: Request,
    res: Response
  ): any {
    const response = {
      status: serviceResponse.getStatus,
      statusCode: serviceResponse.getStatusCode,
      message: serviceResponse.getMessage,
      data: serviceResponse.getData,
    };

    res.status(serviceResponse.getStatusCode);

    logger.debug(
      `request to:  ${req.protocol}://${req.get("host")}${req.originalUrl} - ${
        response.status
      }`
    );
    logger.debug(`req body: ${JSON.stringify(req.body)}`);

    res.json(response);
  }

  
}
