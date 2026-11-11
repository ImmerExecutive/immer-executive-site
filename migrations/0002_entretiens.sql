-- Type de sondage « Entretien candidat » : un créneau par candidat, réservations nominatives.
-- Un entretien est stocké avec type = 'reunion' et mode = 'entretien' (la contrainte CHECK sur type
-- est conservée : reconstruire la table polls déclencherait les suppressions en cascade).

ALTER TABLE polls ADD COLUMN mode TEXT NOT NULL DEFAULT 'vote';
ALTER TABLE polls ADD COLUMN description TEXT NOT NULL DEFAULT '';
ALTER TABLE polls ADD COLUMN closed_at TEXT;

ALTER TABLE poll_responses ADD COLUMN email TEXT;
ALTER TABLE poll_responses ADD COLUMN phone TEXT;
ALTER TABLE poll_responses ADD COLUMN option_id TEXT;

-- Garantit qu'un créneau d'entretien n'est jamais réservé deux fois, même en cas de clics simultanés.
CREATE UNIQUE INDEX poll_responses_booking ON poll_responses (option_id) WHERE option_id IS NOT NULL;
