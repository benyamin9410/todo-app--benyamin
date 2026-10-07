import { Router } from "express";

import taskRouter from "./tasks/index.js";
import categoryRouter from "./category/index.js";
import authRouter from "./auth/index.js";
import userRouter from "./user/index.js";

const router = Router();

router.use("/task", taskRouter);
router.use("/category", categoryRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;
