const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            throw new Error('Auth token not provided');
        } else {
            if (token.startsWith('Bearer ')) {
                // Remove Bearer from string
                token = token.slice(7, token.length);
            }
        }
        const decoded = jwt.verify(token, 'superSecret');
        req.userData = decoded; // Store the decoded token data in the request object
        next();
    } catch (error) {
        next({
            message: 'Auth failed',
            status: 401
        });
    }
};