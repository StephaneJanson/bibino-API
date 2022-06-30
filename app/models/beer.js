const client = require('../config/db');
/**
 * @typedef {object} Beer
 * @property {number} id - Identifiant unique Pk de la table
 * @property {string} name -nom de la bière
 * @property {string} description -description de la bière
 * @property {number} alcohol_level -taux d'alcool de la bière
 * @property {number} country_id -id du pays
 * @property {number} style_id -id du style
 * @property {number} color_id -id de la couleur
 * @property {number} brewery_id -id de la brasserie
 * @property {number} user_account_id -id de l'user
 */
/**
 * @typedef {object} InputBeer
 * @property {string} name -nom du pays
 * @property {string} description -nom de la bière
 * @property {number} alcohol_level -nom de la bière
 * @property {string} country_id -nom du pays
 * @property {string} style_id -nom du style
 * @property {string} color_id -nom de la couleur
 * @property {string} brewery_id -nom de la brasserie
 * @property {number} user_account_id -id de l'user
 */

module.exports = {
    /**
     * Récupére tout sans filtre ni ordre
     * @returns Tous les bière dans la base de donnée
     */
    async findAll() {
        const result = await client.query(
            `SELECT beer.id, beer.name, beer.description, beer.alcohol_level, country.name AS country, style.name AS style, color.name AS color, brewery.name AS brewery, user_account.alias AS user, json_strip_nulls(json_build_object('average', AVG((review.note))::numeric(4, 2))) AS note 
            FROM beer
            LEFT JOIN review ON review.beer_id = beer.id
            JOIN country ON country.id = beer.country_id 
            JOIN style ON style.id = beer.style_id 
            JOIN color ON color.id = beer.color_id 
            JOIN brewery ON brewery.id = beer.brewery_id 
            JOIN user_account ON user_account.id = beer.user_account_id
            GROUP BY beer.id, country.name, style.name, color.name, brewery.name, user_account.alias
            ORDER BY beer.id`
        );
        return result.rows;
    },
    /**
     * @returns 7 bières classée par note
     */
    async findTopBeers() {
        const result = await client.query(
            `SELECT beer.id, beer.name, beer.description, beer.alcohol_level, country.name AS country, style.name AS style, color.name AS color, brewery.name AS brewery, user_account.alias AS user, jsonb_strip_nulls(jsonb_build_object('average', AVG((review.note))::numeric(4, 2))) AS note 
            FROM beer
            LEFT JOIN review ON review.beer_id = beer.id
            JOIN country ON country.id = beer.country_id 
            JOIN style ON style.id = beer.style_id 
            JOIN color ON color.id = beer.color_id 
            JOIN brewery ON brewery.id = beer.brewery_id 
            JOIN user_account ON user_account.id = beer.user_account_id
            GROUP BY beer.id, country.name, style.name, color.name, brewery.name, user_account.alias ORDER BY note DESC LIMIT 10`
        );
        return result.rows;
    },
    /**
     * Récupère par son id
     * @param {number} beerId - L'id de la bière souhaitée
     * @returns La bière souhaitée ou undefined si aucune bière à cet id
     */
    async findByPk(beerId) {
        const result = await client.query(
            // eslint-disable-next-line quotes
            `SELECT beer.id, beer.name, beer.description, beer.alcohol_level, country.name AS country, style.name AS style, color.name AS color, brewery.name AS brewery, user_account.alias AS user, json_strip_nulls(json_build_object('average', AVG((review.note))::numeric(4, 2))) AS note, json_agg(json_strip_nulls(
                    json_build_object('id', review.id, 'content', review.content, 'note', review.note, 'author', author.alias, 'created_at', to_char(review.created_at, 'dd/mm/yyyy')))) 
                    AS reviews
                 FROM beer 
                 JOIN country ON country.id = beer.country_id 
                 JOIN style ON style.id = beer.style_id 
                 JOIN color ON color.id = beer.color_id 
                 JOIN brewery ON brewery.id = beer.brewery_id 
                 LEFT JOIN review ON review.beer_id = beer.id 
                 JOIN user_account ON user_account.id = beer.user_account_id 
                 LEFT JOIN user_account AS author ON author.id = review.user_account_id 
                 WHERE beer.id = $1 
                 GROUP BY beer.id, country.id,style.name,color.name, brewery.name, user_account.alias, review.beer_id`,
            [beerId]
        );
        return result.rows[0];
    },
    /**
     * Créer une bière
     * @param {InputBeer} beer
     * @returns beer
     */
    async create(beer) {
        const verificationName = {
            text: 'SELECT name FROM beer WHERE name = $1',
            values: [beer.name],
        };
        const verificationCountry = {
            text: 'SELECT country.name FROM country WHERE country.name = $1',
            values: [beer.country_id],
        };
        const verificationBrewery = {
            text: 'SELECT brewery.name FROM brewery WHERE brewery.name = $1',
            values: [beer.brewery_id],
        };
        // je vérifie que le nom de la bière, le pays et la brasserie que je
        // reçoi de l'utilisateur existent dans la BDD
        const resultName = await client.query(verificationName);
        const resultCountry = await client.query(verificationCountry);
        const resultBrewery = await client.query(verificationBrewery);
        // si la bière existe déjà je lève une erreur
        if (resultName.rows.length > 0) {
            throw new Error('This beer already exists');
        }
        // si le pays ou la brasserie n'existent pas dans la BDD alors je dois
        // d'abord les insérer dans leur tables respectives
        if (
            // eslint-disable-next-line operator-linebreak
            resultCountry.rows.length === 0 ||
            resultBrewery.rows.length === 0
        ) {
            // si le pays proposé n'est pas dans la BDD je l'insère déjà dans sa table
            if (resultCountry.rows.length === 0) {
                await client.query(
                    `INSERT INTO country (name) VALUES ('${beer.country_id}') RETURNING *`
                );
            }
            // si la brasserie proposée n'est pas dans la BDD je l'insère déjà dans sa table
            if (resultBrewery.rows.length === 0) {
                await client.query(
                    `INSERT INTO brewery (name) VALUES ('${beer.brewery_id}') RETURNING *`
                );
            }
        }
        // je récupère les id nécessaires avant insertion dans beer
        const queryCountryId = {
            text: 'SELECT country.id FROM country WHERE country.name = $1',
            values: [beer.country_id],
        };
        const countryId = await client.query(queryCountryId);

        const queryBreweryId = {
            text: 'SELECT brewery.id FROM brewery WHERE brewery.name = $1',
            values: [beer.brewery_id],
        };
        const breweryId = await client.query(queryBreweryId);

        const queryColorId = {
            text: 'SELECT color.id FROM color WHERE color.name = $1',
            values: [beer.color_id],
        };
        const colorId = await client.query(queryColorId);

        const queryStyleId = {
            text: 'SELECT style.id FROM style WHERE style.name = $1',
            values: [beer.style_id],
        };
        const styleId = await client.query(queryStyleId);
        // je peux maintenant faire l'insertion dans la table beer avec les id récupérés
        const queryCreateBeer = {
            text: 'INSERT INTO beer (name, description, alcohol_level, country_id, style_id, color_id, brewery_id, user_account_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
            values: [
                beer.name,
                beer.description,
                beer.alcohol_level,
                countryId.rows[0].id,
                styleId.rows[0].id,
                colorId.rows[0].id,
                breweryId.rows[0].id,
                beer.user_account_id,
            ],
        };
        const savedBeer = await client.query(queryCreateBeer);

        console.log('Beer created');
        return savedBeer.rows[0];
    },
    /**
     * Modifie une bière
     * @param {number} beerId
     * @param {InputBeer} beer
     * @returns beer
     */
    async update(beerId, beer) {
        // je récupère les id nécessaires avant insertion dans beer
        const verificationName = {
            text: 'SELECT name FROM beer WHERE name = $1',
            values: [beer.name],
        };
        const verificationCountry = {
            text: 'SELECT country.name FROM country WHERE country.name = $1',
            values: [beer.country_id],
        };
        const verificationBrewery = {
            text: 'SELECT brewery.name FROM brewery WHERE brewery.name = $1',
            values: [beer.brewery_id],
        };
        // je vérifie que le nom de la bière, le pays et la brasserie que je
        // reçoi de l'utilisateur existent dans la BDD
        const resultName = await client.query(verificationName);
        const resultCountry = await client.query(verificationCountry);
        const resultBrewery = await client.query(verificationBrewery);
        // si la bière existe déjà et que ce n'est pas la bière que je veux
        // modifier, je lève une erreur
        if (
            // eslint-disable-next-line operator-linebreak
            resultName.rows.length > 0 &&
            resultName.rows[0].name !== beer.name
        ) {
            throw new Error('This beer already exists');
        }
        // si le pays ou la brasserie n'existent pas dans la BDD alors je dois
        // d'abord les insérer dans leur tables respectives
        if (
            // eslint-disable-next-line operator-linebreak
            resultCountry.rows.length === 0 ||
            resultBrewery.rows.length === 0
        ) {
            // si le pays proposé n'est pas dans la BDD je l'insère déjà dans sa table
            if (resultCountry.rows.length === 0) {
                await client.query(
                    `INSERT INTO country (name) VALUES ('${beer.country_id}') RETURNING *`
                );
            }
            // si la brasserie proposée n'est pas dans la BDD je l'insère déjà dans sa table
            if (resultBrewery.rows.length === 0) {
                await client.query(
                    `INSERT INTO brewery (name) VALUES ('${beer.brewery_id}') RETURNING *`
                );
            }
        }
        // je récupère les id nécessaires avant insertion dans beer
        const queryCountryId = {
            text: 'SELECT country.id FROM country WHERE country.name = $1',
            values: [beer.country_id],
        };
        const countryId = await client.query(queryCountryId);

        const queryBreweryId = {
            text: 'SELECT brewery.id FROM brewery WHERE brewery.name = $1',
            values: [beer.brewery_id],
        };
        const breweryId = await client.query(queryBreweryId);

        const queryColorId = {
            text: 'SELECT color.id FROM color WHERE color.name = $1',
            values: [beer.color_id],
        };
        const colorId = await client.query(queryColorId);

        const queryStyleId = {
            text: 'SELECT style.id FROM style WHERE style.name = $1',
            values: [beer.style_id],
        };
        const styleId = await client.query(queryStyleId);
        // je peux maintenant mettre à jour la bière
        const query = {
            text: 'UPDATE beer SET name = $1, description = $2, alcohol_level = $3, country_id = $4, style_id = $5, color_id = $6, brewery_id = $7, user_account_id = $8 WHERE id = $9 RETURNING *',
            values: [
                beer.name,
                beer.description,
                beer.alcohol_level,
                countryId.rows[0].id,
                styleId.rows[0].id,
                colorId.rows[0].id,
                breweryId.rows[0].id,
                beer.user_account_id,
                beerId,
            ],
        };
        const updateBeer = await client.query(query);
        console.log('Beer updated');
        return updateBeer.rows[0];
    },
    /**
     * Supprime de la base de données
     * @param {number} beerId - L'id à supprimer
     * @returns Le résultat de la suppression
     */
    async delete(beerId) {
        const query = {
            text: 'DELETE FROM beer WHERE id = $1 RETURNING *',
            values: [beerId],
        };

        const deletedBeer = await client.query(query);

        console.log('Beer deleted');
        return deletedBeer.rows[0];
    },
};
