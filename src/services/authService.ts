import { Request, Response } from "express";
import crypto from "crypto";
import dotenv from "dotenv";
import { BaseService } from "./baseService";
import { PrismaClient } from "@prisma/client";
import logger from "../utils/logger";
import { BasicResponse } from "../dto/basicResponse";
import { StatusCode } from "../enums/httpStatusCode";
import { Constants } from "../utils/Constants";
import { Helper } from "../utils/helper";
import { UserRequestValidation } from "../validations/userRequestValidation";
import jwt from "jsonwebtoken";
import { Roles } from "../enums/roles";
import { UserService } from "./userService";

const prisma = new PrismaClient();

dotenv.config();
const userSecret = process.env.USER_SECRET;
export class AuthService extends BaseService {
  private static readonly UserRegistered = "Registration Successful";
  private static readonly UserLoggedIn = "Login Successful";
  public async registerUser(req: Request, res: Response) {
    try {
      const { first_name, last_name, member_type, email, phone, password } =
        req.body;
      const result = await new UserRequestValidation().validateExistingUser(req, res);
      if(result) return;
      const hashedPassword = this.hashPassword(password);
      const user = await prisma.user.create({
        data: {
          firstName: first_name,
          lastName: last_name,
          memberType: member_type,
          email: email,
          phone: phone,
          password: hashedPassword,
          roles: [Roles.USER]
        },
        
      });
      Helper.removeIdFromRecord(user);
      Helper.removePassword(user);
      this.sendResponse(new BasicResponse(true, StatusCode.SUCCESS, AuthService.UserRegistered, {user}), req, res)
    } catch (error) {
      logger.error(`"There was an error while creating user": ${error}`);
      this.sendResponse(
        new BasicResponse(
          false,
          StatusCode.SERVER_ERROR,
          Constants.SERVICE_UNAVAILABLE
        ),
        req,
        res
      );
    }
  }
  public async loginUser  (req:Request, res:Response) {
    try {
      const { email, password } = req.body;
      const user = await new UserService().getUserByEmail(email);
      if(!user) return this.sendResponse(new BasicResponse(false, StatusCode.BAD_REQUEST, "Unauthorized Request"), req, res)
      const newHashPassword = this.hashPassword(password);
      const match = this.comparePassword(newHashPassword, user.password);
      if(!match) return this.sendResponse(new BasicResponse(false, StatusCode.BAD_REQUEST, "Wrong Password"), req, res)
      const accessToken = jwt.sign(
        {
          "UserInfo": {
              "email": user.email,
              "memberType": user.memberType,
              "roles": user.roles
          }
        },
        userSecret!,
        { expiresIn: '3d' }
      );
      Helper.removeIdFromRecord(user);
      Helper.removePassword(user);
      res.cookie('jwt', accessToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 });
      this.sendResponse(new BasicResponse(true, StatusCode.SUCCESS, AuthService.UserLoggedIn, {user}), req, res)
    } catch (error) {
      logger.error(`"There was an error while fetching user": ${error}`);
      this.sendResponse(
        new BasicResponse(
          false,
          StatusCode.SERVER_ERROR,
          Constants.SERVICE_UNAVAILABLE
        ),
        req,
        res
      );
    }
  }
  public logOutUser(req:Request, res:Response) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(StatusCode.SUCCESS_NO_CONTENT);
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    res.sendStatus(StatusCode.SUCCESS_NO_CONTENT)
  }
  private hashPassword(password: string) {
    return crypto
      .createHash("sha512")
      .update(`${password}:${userSecret}`)
      .digest("hex");
  }
  private comparePassword(newHashPassword: string, userPassword:string) {
    return userPassword === newHashPassword;
  }
}
