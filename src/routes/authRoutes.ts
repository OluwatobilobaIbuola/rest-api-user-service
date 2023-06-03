
import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

export class AuthRoutes {
  public routes(): Router {
    const router = Router();
    new AuthController().loadRoutes("/auth", router);
    return router;
  }
}
