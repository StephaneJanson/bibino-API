const client = require('../config/db');
/**
 * @typedef {object} Article
 * @property {number} id - Identifiant unique Pk de la table
 * @property {string} title -titre de l'article
 * @property {string} content -contenu de l'article
 * @property {string} beer_id -id de la bière
 * @property {string} publication_date -date actuelle
 * @property {number} user_account_id -id de l'user
 */
/**
 * @typedef {object} InputArticle
 * @property {string} title -titre de l'article
 * @property {string} content -contenu de l'article
 * @property {string} beer_id -nom de la bière
 * @property {number} user_account_id -id de l'user
 */

module.exports = {
    /**
     * Récupére tout sans filtre ni ordre
     * @returns Tous les brasseries dans la base de donnée
     */
    async findAll() {
        const result = await client.query(
            "SELECT article.id, article.title, article.content, beer.name AS beer, to_char(article.publication_date,'dd/mm/yyyy') AS publication_date, user_account.alias AS user FROM article JOIN user_account ON user_account.id = article.user_account_id LEFT JOIN beer ON beer.id = article.beer_id "
        );
        return result.rows;
    },
    /**
     * Récupère par son id
     * @param {number} articleId - L'id de l'article souhaité
     * @returns L'article souhaité ou undefined si aucun article à cet id
     */
    async findByPk(articleId) {
        const result = await client.query(
            "SELECT article.id, article.title, article.content, beer.name AS beer, to_char(article.publication_date,'dd/mm/yyyy') AS publication_date, user_account.alias AS user FROM article JOIN user_account ON user_account.id = article.user_account_id  LEFT JOIN beer ON beer.id = article.beer_id WHERE article.id = $1",
            [articleId]
        );
        return result.rows[0];
    },
    /**
     * Créer un article
     * @param {InputArticle} article
     * @returns article
     */
    async create(article) {
        // article.beer_id n'est pas obligatoire donc si l'utilisteur n'en fournit pas, je n'insère rien dans la table
        if (article.beer_id === undefined) {
            const query = {
                text: 'INSERT INTO article (title, content, user_account_id) VALUES ($1, $2, $3) RETURNING *',
                values: [
                    article.title,
                    article.content,
                    article.user_account_id,
                ],
            };
            const savedArticle = await client.query(query);

            console.log('Article created with beer_id null');
            return savedArticle.rows[0];
        }
        // comme je reçoi le beer_id en string (l'utilisateur m'envoi le nom de la bière) je vais récupérer son id
        const verificationBeerId = {
            text: 'SELECT name FROM beer WHERE name = $1 ',
            values: [article.beer_id],
        };
        const resultBeerId = await client.query(verificationBeerId);
        // si la bière n'existe pas je lève une erreur
        if (resultBeerId.rows.length === 0) {
            throw new Error('This beer does not exist');
        }
        // je récupère l'id gràce au nom de la bière fourni par l'utilisateur
        const queryBeerId = {
            text: 'SELECT beer.id FROM beer WHERE beer.name = $1',
            values: [article.beer_id],
        };
        const beerId = await client.query(queryBeerId);
        const query = {
            text: 'INSERT INTO article (title, content, beer_id, user_account_id) VALUES ($1, $2, $3, $4) RETURNING *',
            values: [
                article.title,
                article.content,
                beerId.rows[0].id,
                article.user_account_id,
            ],
        };
        const savedArticle = await client.query(query);

        console.log('Article created');
        return savedArticle.rows[0];
    },
    /**
     * Modifie un article
     * @param {number} articleId
     * @param {InputArticle} article
     * @returns brewery
     */
    async update(articleId, article) {
        const fields = Object.keys(article).map(
            (prop, index) => `"${prop}" = $${index + 1}`
        );
        const values = Object.values(article);

        const query = {
            text: `UPDATE article SET ${fields} WHERE id = $${
                fields.length + 1
            } RETURNING *`,
            values: [...values, articleId],
        };
        const updateArticle = await client.query(query);

        console.log('Article updated');
        return updateArticle.rows[0];
    },
    /**
     * Supprime de la base de données
     * @param {number} articleId - L'id à supprimer
     * @returns Le résultat de la suppression
     */
    async delete(articleId) {
        const query = {
            text: 'DELETE FROM article WHERE id = $1 RETURNING *',
            values: [articleId],
        };

        const articleBeer = await client.query(query);

        console.log('Article deleted');
        return articleBeer.rows[0];
    },
};
