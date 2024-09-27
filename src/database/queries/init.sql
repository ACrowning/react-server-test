  DO $$
  BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'where_hear_enum') THEN
          CREATE TYPE where_hear_enum AS ENUM ('social_media', 'friends', 'found_myself'); 
      END IF;
  END $$;

  CREATE TABLE IF NOT EXISTS events (
      id VARCHAR(255) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      date DATE NOT NULL,
      organizer VARCHAR(255) NOT NULL
  );


  CREATE TABLE IF NOT EXISTS participants (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    birthDate DATE NOT NULL,
    whereHear where_hear_enum NOT NULL,
    event_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events(id)
  );
