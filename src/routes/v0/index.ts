import { Router } from "express";
import product from "./product";

const router = Router();

router.use("/product", product);

export default router;
