BEGIN;

-- regex de vérification d'un email

CREATE DOMAIN "email" AS text CHECK (
    value ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'
);

-- regex de vérification du pseudo

CREATE DOMAIN "alias" AS text CHECK (
    value ~ '^[a-zA-ZÀ-ÿ0-9-]{2,32}$'
);

CREATE TABLE IF NOT EXISTS "style" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "brewery" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "color" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "country" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "role" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "user_account" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "alias" TEXT NOT NULL UNIQUE,
    "date_of_birth" DATE NOT NULL,
    "email" EMAIL NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "role_id" INT REFERENCES "role" ("id") DEFAULT 1,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "beer" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "description" TEXT NOT NULL,
    "alcohol_level" FLOAT NOT NULL,
    "country_id" INT NOT NULL REFERENCES "country" ("id"),
    "style_id" INT NOT NULL REFERENCES "style" ("id"),
    "color_id" INT NOT NULL REFERENCES "color" ("id"),
    "brewery_id" INT NOT NULL REFERENCES "brewery" ("id"),
    "user_account_id" INT NOT NULL REFERENCES "user_account" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "article" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "beer_id" INT REFERENCES "beer" ("id") ON DELETE CASCADE,
    "publication_date" DATE NOT NULL DEFAULT now(),
    "user_account_id" INT NOT NULL REFERENCES "user_account" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "review" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "content" TEXT NOT NULL,
    "note" FLOAT NOT NULL,
    "beer_id" INT NOT NULL REFERENCES "beer" ("id") ON DELETE CASCADE,
    "user_account_id" INT NOT NULL REFERENCES "user_account" ("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

COMMIT;