import {
  getParticipants as dbGetParticipants,
  addParticipant as dbAddParticipant,
} from "../database/repositories/participant";
import {
  AddParticipantParams,
  GetParticipantsParams,
  Participant,
} from "../types/participant";
import { RepositoryResponse } from "../types/repositoryResponse";

const participantService = {
  getParticipants: async (
    params: GetParticipantsParams
  ): Promise<RepositoryResponse<Participant[]>> => {
    const response = await dbGetParticipants(params);
    return {
      data: response.data,
      errorMessage: response.errorMessage,
      errorRaw: response.errorRaw,
    };
  },

  addParticipant: async (
    params: AddParticipantParams
  ): Promise<RepositoryResponse<Participant>> => {
    const response = await dbAddParticipant(params);
    return {
      data: response.data,
      errorMessage: response.errorMessage,
      errorRaw: response.errorRaw,
    };
  },
};

export { participantService };
