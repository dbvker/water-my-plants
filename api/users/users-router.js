const router = require('express').Router();
const User = require('./users-model');
const { verifyUsernameAvailable, verifyUsernameExists, restricted, verifyLogin } = require('./users-middleware');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get all users
router.get('/', (req, res, next) => {
    User.getAllUsers()
        .then((users) => {
            res.json(users);
        })
        .catch(next);
});

// get user by ID
router.get('/:user_id', restricted, (req, res, next) => {
    const { user_id } = req.params;
    User.getUserById(user_id)
        .then((user) => {
            res.json(user);
        })
        .catch(next);
});

// Register a new user
router.post('/register', verifyUsernameAvailable, async (req, res, next) => {
    const { username, phoneNumber, password } = req.body;
    const usernameFix = username.toLowerCase();
    const passwordHash = bcrypt.hashSync(password, 8);

    res.status(201).json(await User.insertUser({ username: usernameFix, phoneNumber, password: passwordHash }));
});

// User can login
router.post('/login', verifyLogin, async (req, res, next) => {
    try {
        const { username, password } = req.body;
        User.getUserBy({ username }).then(([user]) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.user = user;
                // console.log(req.user);



                const token = generateToken(user);
                res.status(200).json({
                    user_id: user.user_id,
                    username: user.username,
                    phone_number: user.phoneNumber,
                    token
                });
            } else {
                next({ status: 401, message: 'invalid credentials' });
            }
        });
    } catch (err) {
        next(err);
    }
});

// Generate a new token once logged in
const generateToken = (user) => {
    const payload = {
        user_id: user.user_id,
        username: user.username,
        phoneNumber: user.phoneNumber
    };
    const secret = 'secret message';
    const options = {
        expiresIn: '1d'
    };

    return jwt.sign(payload, secret, options);
};

// Update a user
router.put('/:user_id', restricted, (req, res, next) => {
    const { phoneNumber, password } = req.body;
    const { user_id } = req.params;
    const passwordHash = bcrypt.hashSync(password, 8);

    User.updateUser({ phoneNumber, password: passwordHash }, user_id)
        .then(updatedUser => {
            res.json(updatedUser);
        }).catch(next);
});

// Delete a user by ID
router.delete('/remove/:user_id', restricted, (req, res, next) => {
    try {
        const { user_id } = req.params;
        User.deleteUserById(user_id)
            .then((deletedUser) => {
                res.json(deletedUser);
            })
            .catch(next);
    } catch (err) {
        next(err);
    }
});



module.exports = router;
