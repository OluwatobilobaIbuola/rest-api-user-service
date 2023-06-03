import { Request, Response } from "express";
import crypto from "crypto";
import dotenv from "dotenv";
import { BaseService } from "./baseService";
import { PrismaClient } from "@prisma/client";
import { BasicResponse } from "../dto/basicResponse";
import { StatusCode } from "../enums/httpStatusCode";

const prisma = new PrismaClient();
export class UserService extends BaseService {
  private static readonly Successful = "Successful";

  public async getUserByEmail(email: string) {
      return await prisma.user.findFirst({
        where: {
          email: email,
        },
      })
  }
  public async deleteUser(req: Request, res: Response){
    await prisma.user.delete({
      where: {
        email: req.body.email
      }
    }
    )
    this.sendResponse(new BasicResponse(true, StatusCode.SUCCESS, UserService.Successful), req, res)
  }
}
