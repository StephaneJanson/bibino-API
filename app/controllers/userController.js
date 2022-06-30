const userDataMapper = require('../models/user');
const encrypt = require('../utils/encrypt');

module.exports = {
    /**
     * User controller to find all users
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async findAll(req, res) {
        const users = await userDataMapper.findAll();

        return res.json(users);
    },
    /**
     * User controller to find one user
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async findByPk(req, res) {
        const user = await userDataMapper.findByPk(req.params.id);

        if (!user) {
            throw new Error('User not found', { statusCode: 404 });
        }

        return res.json(user);
    },
    /**
     * User controller to find one user with its reviews
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async findByPkAndReview(req, res) {
        const userWithReview = await userDataMapper.findByPkAndReview(
            req.params.id
        );

        if (!userWithReview) {
            throw new Error('User not found', { statusCode: 404 });
        }

        return res.json(userWithReview);
    },
    /**
     * User controller to create one user
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async create(req, res) {
        if (req.body.password !== req.body.confirmPassword) {
            throw new Error(
                'Your confirmation password does not match the password you entered'
            );
        }
        const user = {
            alias: req.body.alias,
            date_of_birth: req.body.date_of_birth,
            email: req.body.email,
            password: encrypt(req.body.password),
            role_id: req.body.role_id,
        };

        const savedUser = await userDataMapper.create(user);
        return res.json(savedUser);
    },
    /**
     * User controller to delete one user
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async delete(req, res) {
        const user = await userDataMapper.findByPk(req.params.id);

        if (!user) {
            throw new Error('This user does not exists', { statusCode: 404 });
        }
        await userDataMapper.delete(req.params.id);

        return res.json(user);
    },
};
