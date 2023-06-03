import { Request, Response } from "express";
import { BasicResponse } from "../dto/basicResponse";
import { StatusCode } from "../enums/httpStatusCode";
import { UserService } from "../services/userService";
import { Constants } from "../utils/Constants";
import { BaseService } from "../services/baseService";

export class UserRequestValidation extends BaseService {
    private readonly UserExists = "User already exists";
    public async validateExistingUser (req: Request, res: Response) {
        const { email } = req.body;
        const existingUser = await new UserService().getUserByEmail(email);
        if (existingUser) {
            this.sendResponse(new BasicResponse(false, StatusCode.BAD_REQUEST, this.UserExists), req, res);
            return Constants.INVALID;
        }
    }
}