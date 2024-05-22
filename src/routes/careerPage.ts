import { Router } from "express";
import { getCareerPageData } from "../controller/careerPageController";

const router = Router();

router.get("/", getCareerPageData);

export default router;
