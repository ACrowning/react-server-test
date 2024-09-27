import { getEvents as dbGetEvents } from "../database/repositories/event";
import { Event, GetEventsParams } from "../types/event";
import { RepositoryResponse } from "../types/repositoryResponse";

const eventService = {
  getEvents: async (
    params: GetEventsParams
  ): Promise<RepositoryResponse<{ events: Event[]; total: number }>> => {
    const response = await dbGetEvents(params);
    return {
      data: response.data,
      errorMessage: response.errorMessage,
      errorRaw: response.errorRaw,
    };
  },
};

export { eventService };
