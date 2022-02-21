import { Router } from "express";
import v0 from "./v0";

const router = Router();

router.use("/v0", v0);

export default router;
