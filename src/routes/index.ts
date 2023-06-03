import { Router } from "express";
import { UserRoutes } from "./userRoutes";
import { AuthRoutes } from "./authRoutes";

const route = Router();

route.use(
    new UserRoutes().routes(),
    new AuthRoutes().routes()
);

export default route;
