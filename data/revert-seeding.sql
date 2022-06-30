BEGIN;

TRUNCATE "style", "brewery", "color", "country", "role", "user_account", "article", "beer", "review" RESTART IDENTITY;

COMMIT;
