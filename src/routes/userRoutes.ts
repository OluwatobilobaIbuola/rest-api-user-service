import { Router } from "express";
import { UserController } from "../controllers/UserController";

export class UserRoutes {
  public routes(): Router {
    const router = Router();
    new UserController().loadRoutes("/user", router);
    return router;
  }
}
