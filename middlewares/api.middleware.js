const API_KEY = "4f8c7e2f5a1234bafac9d88e3a4c5e9b";

const apiKeyMiddleware = (req, res, next) => {
    try {
        console.warn('NEW REQUEST', req.headers);
        const apiKey = req.headers.authorization;

        if (apiKey === API_KEY) {
            return next();
        }

        res.status(401).send('Not authorized');
    } catch (e) {
        res.status(401).send('Unauthorized');
    }
}

module.exports = apiKeyMiddleware;