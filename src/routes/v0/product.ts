import { Router } from "express";
import { wrapper } from "../../helpers/exception_wrapper";
import { ProductController } from "../../controllers/product";

const router = Router();

router.get("/", wrapper(ProductController.getAll));

export default router;
