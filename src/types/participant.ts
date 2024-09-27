export enum WhereHearOptions {
  SOCIAL_MEDIA = "social_media",
  FRIENDS = "friends",
  FOUND_MYSELF = "found_myself",
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  birthDate: Date;
  whereHear: WhereHearOptions;
  eventId: string;
}

export interface ParticipantRow {
  id: string;
  name: string;
  email: string;
  birthDate: Date;
  whereHear: WhereHearOptions;
  event_id: string;
}

export interface GetParticipantsParams {
  name?: string;
  email?: string;
  eventId: string;
}

export interface AddParticipantParams {
  name: string;
  email: string;
  birthDate: Date;
  whereHear: WhereHearOptions;
  eventId: string;
}
