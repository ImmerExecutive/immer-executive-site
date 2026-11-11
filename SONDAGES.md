# Outil de sondage · survey.immer-executive.com

Équivalent interne de Doodle : l'équipe crée un sondage (réunion à planifier ou choix à faire),
transmet un lien unique aux participants, et chacun indique ses réponses.

## Fonctionnement

- **Espace équipe** (`/`, `/nouveau`) protégé par un mot de passe unique (secret `SURVEY_PASSWORD`).
  La session dure 30 jours ; changer le mot de passe ferme toutes les sessions.
- **Page participant** (`/s/<identifiant>`) publique : nom seul, trois niveaux de réponse
  (oui, si nécessaire, non), toutes les réponses visibles et modifiables par tous.
- Option de plafond par créneau (seuls les « oui » comptent) ; avec un plafond de 1,
  la réponse « si nécessaire » est désactivée.
- Email à l'organisateur à chaque réponse, modification ou suppression (Resend, `RESEND_API_KEY`).
- Clôture par un membre de l'équipe, sans email ; le sondage peut être rouvert.
- **Entretien candidat** (troisième type) : l'équipe propose des créneaux, chaque candidat
  (nom, email, téléphone) en réserve un seul. Les candidats ne voient que les créneaux libres,
  jamais les autres candidats. Le candidat reçoit une confirmation avec fichier calendrier (.ics)
  et l'organisateur un email par réservation, avec un fichier calendrier « Titre // Candidat »
  (réponse directe possible : `reply_to`). L'équipe peut
  libérer, modifier, supprimer ou ajouter un créneau ; le candidat concerné est prévenu par email.
- Suppression automatique après 60 jours sans action (tâche planifiée quotidienne et contrôle
  à l'ouverture de la liste).

## Architecture

| Élément | Fichier |
| --- | --- |
| Application React | `survey/index.html`, `src/survey/` |
| API et routage par sous-domaine | `worker/survey.js` (appelé depuis `worker/index.js`) |
| Base Cloudflare D1 | `migrations/`, liaison `SURVEY_DB` dans `wrangler.toml` |

Le Worker reconnaît le sous-domaine `survey.` : il y sert l'API (`/api/...`) et l'application.
Sur le site principal, `/survey` redirige vers le sous-domaine.

## Mise en service (une seule fois)

```bash
npx wrangler d1 create immer-survey          # reporter l'identifiant dans wrangler.toml (database_id)
npx wrangler d1 migrations apply immer-survey --remote
npx wrangler secret put SURVEY_PASSWORD      # mot de passe de l'équipe
npm run build && npx wrangler deploy
```

Puis, dans le tableau de bord Cloudflare : Workers › immer-executive-site › Settings ›
Domains & Routes › Add › Custom domain › `survey.immer-executive.com`.

`RESEND_API_KEY` est déjà utilisé par le formulaire de contact : rien à ajouter.

## Évolutions de la base

Chaque nouvelle migration de `migrations/` doit être appliquée à la base de production **avant**
la fusion qui déploie le code correspondant :

```bash
npx wrangler d1 migrations apply immer-survey --remote
```

## Développement local

```bash
printf 'SURVEY_LOCAL=1\nSURVEY_PASSWORD=essai\n' > .dev.vars
npx wrangler d1 migrations apply immer-survey --local
npm run build && npx wrangler dev
```

`SURVEY_LOCAL=1` fait servir l'outil de sondage sur `http://localhost:8787`.
