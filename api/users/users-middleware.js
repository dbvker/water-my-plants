const { getUserBy } = require('./users-model');
const jwt = require('jsonwebtoken')

const verifyUsernameAvailable = async (req, res, next) => {
    try {
        const { username } = req.body;
        const usernameFix = username.toLowerCase();
        const [user] = await getUserBy({ username: usernameFix });
        if (!user) {
            next();
        } else {
            next({ status: 401, message: 'A user with that username already exists, please try again.' });
        }
    } catch (err) {
        next(err);
    }
};

const verifyUsernameExists = async (req, res, next) => {
    try {
        const { username } = req.body;
        const usernameFix = username.toLowerCase();
        const [user] = await getUserBy({ username: usernameFix });
        if (user) {
            next();
        } else {
            next({ status: 401, message: 'A user with that username already exists, please try again.' });
        }
    } catch (err) {
        next(err);
    }
};

const verifyLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            next({ status: 401, message: 'Invalid credentials' });
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
};

const restricted = (req, res, next) => {
    const token = req.headers.authorization;
	if (!token) {
		next({ status: 401, message: 'Token required', });
	}
	jwt.verify(token, 'secret message', (err, decoded) => {
		if (err) {
			next({ status: 401, message: 'Token invalid', });
		}
		req.decodedJWT = decoded;
		next();
	});
};

module.exports = {
    verifyUsernameAvailable,
    verifyUsernameExists,
    verifyLogin,
    restricted
};