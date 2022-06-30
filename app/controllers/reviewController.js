const reviewDataMapper = require('../models/review');

module.exports = {
    /**
     * Review controller to find all reviews
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async findAll(req, res) {
        const reviews = await reviewDataMapper.findAll();
        return res.json(reviews);
    },
    /**
     * Review controller to find one review
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async findByPk(req, res) {
        const review = await reviewDataMapper.findByPk(req.params.id);

        if (!review) {
            throw new Error('review not found', { statusCode: 404 });
        }

        return res.json(review);
    },
    /**
     * Review controller to create one review
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async create(req, res) {
        const review = {
            content: req.body.content,
            note: req.body.note,
            beer_id: req.body.beer_id,
            user_account_id: req.body.user_account_id,
        };

        const savedReview = await reviewDataMapper.create(review);
        return res.json(savedReview);
    },
    /**
     * Review controller to update one review
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async update(req, res) {
        const review = await reviewDataMapper.findByPk(req.params.id);
        if (!review) {
            throw new Error('This review does not exists', { statusCode: 404 });
        }
        const userAlias = req.user.alias;
        const userRole = req.user.role_id;
        if (userAlias !== review.alias) {
            if (userRole === 2) {
                await reviewDataMapper.update(req.params.id, req.body);
                return res.json(review);
            }
            throw new Error(
                'Unable to update, you are not the author of this review',
                { statusCode: 403 }
            );
        }
        await reviewDataMapper.update(req.params.id, req.body);
        return res.json(review);
    },
    /**
     * Review controller to delete one review
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async delete(req, res) {
        const review = await reviewDataMapper.findByPk(req.params.id);
        const userAlias = req.user.alias;
        const userRole = req.user.role_id;
        if (!review) {
            throw new Error('This review does not exists', { statusCode: 404 });
        }
        if (userAlias !== review.alias) {
            if (userRole === 2) {
                await reviewDataMapper.delete(req.params.id);

                return res.json(review);
            }
            throw new Error(
                'Unable to delete, you are not the author of this review',
                { statusCode: 403 }
            );
        }
        await reviewDataMapper.delete(req.params.id);

        return res.json(review);
    },
};
