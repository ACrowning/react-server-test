import { pool } from "../../db";
import { QueryResult } from "pg";
import { Event, EventRow, GetEventsParams } from "../../types/event";
import { RepositoryResponse } from "../../types/repositoryResponse";

function mapEventRowToEvent(row: EventRow): Event {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    date: row.date,
    organizer: row.organizer,
  };
}

export async function getEvents(
  params: GetEventsParams
): Promise<RepositoryResponse<{ events: Event[]; total: number }>> {
  const { sortBy = "title", sortOrder = "asc", page = 1, limit = 12 } = params;

  let query = "SELECT * FROM events";
  let countQuery = "SELECT COUNT(*) FROM events";
  const values: (string | number)[] = [];

  const allowedSortFields = ["title", "date", "organizer"];
  if (allowedSortFields.includes(sortBy)) {
    query += ` ORDER BY ${sortBy} ${sortOrder === "desc" ? "DESC" : "ASC"}`;
  }

  if (limit !== "*") {
    const offset = (page - 1) * limit;
    values.push(limit, offset);
    query += ` LIMIT $${values.length - 1} OFFSET $${values.length}`;
  }

  try {
    const result: QueryResult<EventRow> = await pool.query(query, values);
    const mappedEvents = result.rows.map(mapEventRowToEvent);

    const countResult: QueryResult<{ count: string }> = await pool.query(
      countQuery
    );

    const total = parseInt(countResult.rows[0].count, 10);

    return {
      data: { events: mappedEvents, total },
      errorMessage: null,
      errorRaw: null,
    };
  } catch (error) {
    return {
      data: null,
      errorMessage: "Error fetching events",
      errorRaw: error as Error,
    };
  }
}
