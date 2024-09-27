import { pool } from "../../db";
import { QueryResult } from "pg";
import { RepositoryResponse } from "../../types/repositoryResponse";
import {
  AddParticipantParams,
  GetParticipantsParams,
  Participant,
  ParticipantRow,
} from "../../types/participant";
import ShortUniqueId from "short-unique-id";

function mapParticipantRowToParticipant(row: ParticipantRow): Participant {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    birthDate: row.birthDate,
    whereHear: row.whereHear,
    eventId: row.event_id,
  };
}

export async function getParticipants(
  params: GetParticipantsParams
): Promise<RepositoryResponse<Participant[]>> {
  const { name, email, eventId } = params;

  let paramNum = 1;

  let query = `SELECT * FROM participants WHERE event_id = $${paramNum}`;
  const values: (string | number)[] = [eventId];

  if (name) {
    paramNum++;
    values.push(`%${name}%`);
    query += ` AND name ILIKE $${paramNum}`;
  }

  if (email) {
    paramNum++;
    values.push(`%${email}%`);
    query += ` AND email ILIKE $${paramNum}`;
  }

  try {
    const result: QueryResult<ParticipantRow> = await pool.query(query, values);
    const mappedParticipants = result.rows.map(mapParticipantRowToParticipant);

    return {
      data: mappedParticipants,
      errorMessage: null,
      errorRaw: null,
    };
  } catch (error) {
    return {
      data: null,
      errorMessage: "Error fetching participants",
      errorRaw: error as Error,
    };
  }
}

export async function addParticipant(
  params: AddParticipantParams
): Promise<RepositoryResponse<Participant>> {
  const { name, email, birthDate, whereHear, eventId } = params;

  const uid = new ShortUniqueId({ length: 10 });
  const id = uid.rnd();

  const query = `
    INSERT INTO participants (id, name, email, birthDate, whereHear, event_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [id, name, email, birthDate, whereHear, eventId];

  try {
    const result: QueryResult<ParticipantRow> = await pool.query(query, values);
    const mappedParticipant = mapParticipantRowToParticipant(result.rows[0]);
    return {
      data: mappedParticipant,
      errorMessage: null,
      errorRaw: null,
    };
  } catch (error) {
    return {
      data: null,
      errorMessage: "Error adding participant",
      errorRaw: error as Error,
    };
  }
}
