import mediaController from "./controllers/mediaController";
import express from "express";

const router = express.Router();

router.get("/", mediaController.searchMedia);

export { router };
