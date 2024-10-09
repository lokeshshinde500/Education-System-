import { Router } from "express";
import authRoutes from "./authRoutes.js";
import courseRoutes from "./courseRoutes.js";
import userRoutes from "./userRoutes.js";
import {
  authenticate,
} from "../middleware/authenticate.js";
const routes = Router();

// auth routes
routes.use("/auth", authRoutes);

// course routes
routes.use("/course", authenticate, courseRoutes);

// course routes
routes.use("/user", authenticate, userRoutes);

export default routes;
