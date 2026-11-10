-- Outil de sondage survey.immer-executive.com
-- Les créneaux sont des heures locales (Europe/Paris), sans conversion de fuseau.

CREATE TABLE polls (
    id              TEXT PRIMARY KEY,
    type            TEXT NOT NULL CHECK (type IN ('reunion', 'choix')),
    title           TEXT NOT NULL,
    place           TEXT NOT NULL DEFAULT '',
    organizer_name  TEXT NOT NULL,
    organizer_email TEXT NOT NULL,
    allow_maybe     INTEGER NOT NULL DEFAULT 1,
    slot_limit      INTEGER,
    closed_option   TEXT,
    created_at      TEXT NOT NULL,
    last_action_at  TEXT NOT NULL
);

CREATE INDEX polls_last_action ON polls (last_action_at);

CREATE TABLE poll_options (
    id        TEXT PRIMARY KEY,
    poll_id   TEXT NOT NULL REFERENCES polls (id) ON DELETE CASCADE,
    position  INTEGER NOT NULL,
    kind      TEXT NOT NULL CHECK (kind IN ('time', 'day', 'text')),
    day       TEXT,
    start_min INTEGER,
    end_min   INTEGER,
    label     TEXT
);

CREATE INDEX poll_options_poll ON poll_options (poll_id, position);

-- votes : objet JSON { "<id de l'option>": "y" | "m" } ; une option absente vaut « non ».
CREATE TABLE poll_responses (
    id         TEXT PRIMARY KEY,
    poll_id    TEXT NOT NULL REFERENCES polls (id) ON DELETE CASCADE,
    name       TEXT NOT NULL,
    votes      TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE INDEX poll_responses_poll ON poll_responses (poll_id, created_at);
