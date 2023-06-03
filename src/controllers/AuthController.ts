import { Router, Request, Response } from "express";
import { BaseController } from "./BaseController";
import { AuthService } from "../services/authService";
import validateBody from "../utils/validateSchema";
import { loginSchema, registrationSchema } from "../schemas/userSchema";
import { UserService } from "../services/userService";
import { Roles } from "../enums/roles";

export class AuthController extends BaseController {
  public loadRoutes(path: string, router: Router) {
    this.initRegisterUser(path, router);
    this.initLoginUser(path, router);
    this.initLogOutUser(path, router);
    this.initDeleteUser(path, router)
  }
  private initRegisterUser(path: string, router: Router) {
    router.post(path + "/register", validateBody(registrationSchema), (req, res) => {
      new AuthService().registerUser(req, res);
    });
  }
  private initLoginUser(path: string, router: Router) {
    router.post(path + "/login", validateBody(loginSchema), (req, res) => {
      new AuthService().loginUser(req, res);
    });
  }
  private initLogOutUser(path: string, router: Router) {
    router.post(path + "/logout", (req, res) => {
      new AuthService().logOutUser(req, res);
    });
  }
  private initDeleteUser(path: string, router: Router) {
    router.post(path + "/user", [this.validateToken.bind(this)], this.validateRole(Roles.ADMIN, Roles.SUPER_ADMIN),
     (req: Request, res: Response) => {
      new UserService().deleteUser(req, res);
    });
  }
}
