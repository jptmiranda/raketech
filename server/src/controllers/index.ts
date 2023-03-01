import { Request, Response } from "express";
import { SearchMediaRequest } from "../types";
import { z } from "zod";
import mediaService from "../services/mediaService";

const searchMediaQuerySchema = z.object({
  title: z.string(),
  type: z.enum(["movie", "series", "episode"]).optional(),
  year: z.preprocess(Number, z.number().optional()),
});

export const searchMedia = async (req: Request, resp: Response) => {
  try {
    const queryParams: SearchMediaRequest = searchMediaQuerySchema.parse(
      req.query
    );

    const results = await mediaService.searchMedia(queryParams);

    resp.json(results);
  } catch (e: any) {
    resp.status(500);

    if (e.constructor.name === "ZodError") {
      resp.json(e);

      return;
    }

    resp.json({
      error: e.message,
    });
  }
};
