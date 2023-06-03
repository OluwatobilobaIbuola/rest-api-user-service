import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import { StatusCode } from "../enums/httpStatusCode";

dotenv.config();
const userSecret = process.env.USER_SECRET;
export class BaseController {
  private notAuthorized: Record<string, string> = {
    message: "you are not authorized to access this resource",
  };

  private sendError(res: Response, code: number, data?: any) {
    const responseData = {
      status: false,
      code,
      message: "unauthorized",
      data,
    };
    res.status(code);
    res.send(responseData);
  }
  protected authorize(req: Request, res: Response, next: NextFunction) {
  }
  protected validateRole(...allowedRoles:string[]) {
    return  (req: Request, res: Response, next: NextFunction) => {
      const allowRoles = [...allowedRoles];
      const {roles}:{roles: string[]} = req.body;
      const result = roles.map((role: string) => allowRoles.includes(role)).find((val: boolean) => val === true);
      if(!result) return this.sendError(res, StatusCode.UNAUTHORIZED, this.notAuthorized);
      return next()
    }
  }
  protected validateToken(req: Request, res: Response, next: NextFunction) {
      const authHeader = req.headers.authorization || req.headers.Authorization as string;
      if (!authHeader?.startsWith('Bearer ')) return this.sendError(res, StatusCode.UNAUTHORIZED, this.notAuthorized);
      const token = authHeader.split(' ')[1];
      jwt.verify(
          token,
          userSecret!,
          (err:any, decoded:any) => {
              if (err) return this.sendError(res, StatusCode.UNAUTHORIZED);
              req.body.email = decoded.UserInfo.email;
              req.body.roles = decoded.UserInfo.roles;
              next();
          }
      );
  }
  
}
