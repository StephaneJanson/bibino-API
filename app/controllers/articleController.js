const articleDataMapper = require('../models/article');

/**
 * Un controller :
 * 1. il récupère les infos de l'utilisateur
 * 2. il les vérifie
 * 3. il exécute une action
 * 4. il répond à l'utilisateur
 */

module.exports = {
    /**
     *
     * Article controller to get all records.
     * ExpressMiddleware signature
     * @param {object} _ Express request object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async findAll(_, res) {
        const articles = await articleDataMapper.findAll();
        return res.json(articles);
    },
    /**
     * Article controller to get a record.
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async findByPk(req, res) {
        const article = await articleDataMapper.findByPk(req.params.id);

        if (!article) {
            throw new Error('Article not found', { statusCode: 404 });
        }

        return res.json(article);
    },
    /**
     * Article controller to create a record.
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async create(req, res) {
        const article = {
            title: req.body.title,
            content: req.body.content,
            beer_id: req.body.beer_id,
            publication_date: new Date(),
            user_account_id: req.body.user_account_id,
        };

        const savedArticle = await articleDataMapper.create(article);
        return res.json(savedArticle);
    },
    /**
     * Article controller to update a record.
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async update(req, res) {
        const article = await articleDataMapper.findByPk(req.params.id);
        if (!article) {
            throw new Error('This article does not exists', {
                statusCode: 404,
            });
        }
        const savedArticle = await articleDataMapper.update(
            req.params.id,
            req.body
        );
        return res.json(savedArticle);
    },
    /**
     * Article controller to delete a record.
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async delete(req, res) {
        const article = await articleDataMapper.findByPk(req.params.id);

        if (!article) {
            throw new Error('This article does not exists', {
                statusCode: 404,
            });
        }
        await articleDataMapper.delete(req.params.id);

        return res.json(article);
    },
};
