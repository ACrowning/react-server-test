import express, { Request, Response } from "express";
import { GetEventsParams } from "../types/event";
import { eventService } from "../services/event";

const Router = express.Router();

Router.post("/", async (req: Request, res: Response) => {
  const { sortBy, sortOrder, page, limit } = req.body;

  const params: GetEventsParams = {
    sortBy: sortBy,
    sortOrder: sortOrder,
    page: page ? parseInt(page, 10) : 1,
    limit: limit === "*" ? "*" : limit ? parseInt(limit, 10) : 10,
  };

  const { data, errorMessage, errorRaw } = await eventService.getEvents(params);

  if (!data) {
    return res.status(500).json({
      message: errorMessage,
      error: errorRaw,
      data: null,
    });
  }

  res.status(200).json({
    message: "Events fetched successfully",
    error: null,
    data: data.events,
    total: data.total,
  });
});

export default Router;
