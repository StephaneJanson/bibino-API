BEGIN;

DROP TABLE IF EXISTS "style", "brewery", "color", "country", "role", "user_account", "article", "beer", "review";

DROP DOMAIN "email", "alias";

COMMIT;

