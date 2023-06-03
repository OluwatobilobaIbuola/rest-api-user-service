import { Router, Request, Response } from "express";
import { BaseController } from "./BaseController";
import { UserService } from "../services/userService";
import { Roles } from "../enums/roles";

export class UserController extends BaseController {
  public loadRoutes(path: string, router: Router) {
    this.initDeleteUser(path, router)
  }
  private initDeleteUser(path: string, router: Router) {
    router.post(path , [this.validateToken.bind(this)], this.validateRole(Roles.ADMIN, Roles.SUPER_ADMIN),
     (req: Request, res: Response) => {
      new UserService().deleteUser(req, res);
    });
  }
}
