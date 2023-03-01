import { searchMedia } from "../controllers";
import express from "express";

const router = express.Router();

router.get("/", searchMedia);

export { router };
