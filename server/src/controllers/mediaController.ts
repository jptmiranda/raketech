import { Request, Response } from "express";
import { SearchMediaRequest } from "../types";
import { z } from "zod";
import mediaService from "../services/mediaService";

const searchMediaQuerySchema = z.object({
  title: z.string().optional(),
  type: z.enum(["movie", "series", "episode"]).optional(),
  year: z
    .preprocess((y) => parseInt(z.string().parse(y)), z.number())
    .optional(),
  page: z
    .preprocess((p) => parseInt(z.string().parse(p)), z.number())
    .optional(),
});

const searchMedia = async (req: Request, resp: Response) => {
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

export default {
  searchMedia,
};
