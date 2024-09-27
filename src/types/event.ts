export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  organizer: string;
}

export interface EventRow {
  id: string;
  title: string;
  description: string;
  date: Date;
  organizer: string;
}

export interface GetEventsParams {
  sortBy?: "title" | "date" | "organizer";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number | "*";
}
