import express, { Request, Response } from "express";
import {
  AddParticipantParams,
  GetParticipantsParams,
  WhereHearOptions,
} from "../types/participant";
import { participantService } from "../services/participant";

const Router = express.Router();

Router.post("/", async (req: Request, res: Response) => {
  const { name, email, eventId } = req.body;

  const params: GetParticipantsParams = {
    name: name,
    email: email,
    eventId: eventId,
  };

  const { data, errorMessage, errorRaw } =
    await participantService.getParticipants(params);

  if (!data) {
    return res.status(500).json({
      message: errorMessage,
      error: errorRaw,
      data: null,
    });
  }

  res.status(200).json({
    message: "Participants fetched successfully",
    error: null,
    data: data,
  });
});

Router.post("/add", async (req: Request, res: Response) => {
  const { name, email, birthDate, whereHear, eventId } = req.body;

  if (!Object.values(WhereHearOptions).includes(whereHear)) {
    return res.status(400).json({
      message: "Invalid value for whereHear",
      data: null,
    });
  }

  const params: AddParticipantParams = {
    name,
    email,
    birthDate: new Date(birthDate),
    whereHear,
    eventId,
  };

  const { data, errorMessage, errorRaw } =
    await participantService.addParticipant(params);

  if (!data) {
    return res.status(500).json({
      message: errorMessage,
      error: errorRaw,
      data: null,
    });
  }

  res.status(200).json({
    message: "Participant added successfully",
    error: null,
    data,
  });
});

export default Router;
