const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];

const router = express.Router();

router.put(
    '/status',
    async (req, res) => {
        const userId = req.user.id
        const { status } = req.body;
        console.log('backend route to change current user online status')
        console.log('status:', status)
        const user = await User.findByPk(userId);
        user.isOnline = status;
        await user.save();
        console.log('user:', user)
        return res.json({
            user
        });
    }
)

router.get(
    '/',
    restoreUser,
    (req, res) => {
        const { user } = req;
        if (user) {
            const safeUser = {
                id: user.id,
                email: user.email,
                username: user.username,
                guid: user.guid
            };
            return res.json({
                user: safeUser
            });
        } else return res.json({ user: null });
    }
);

router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
        const { credential, password } = req.body;

        const user = await User.unscoped().findOne({
            where: {
                [Op.or]: {
                    username: credential,
                    email: credential
                }
            }
        });

        if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = { credential: 'The provided credentials were invalid.' };
            return next(err);
        }

        const safeUser = {
            id: user.id,
            email: user.email,
            username: user.username,
            guid: user.guid
        };

        await setTokenCookie(res, safeUser);

        return res.json({
            user: safeUser
        });
    }
);

router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);

module.exports = router;
