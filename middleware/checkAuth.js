const jwt = require('jsonwebtoken');
const { getConfiguration } = require('../service/configuration')

module.exports = async (req, res, next) => {

    const configuration = await getConfiguration()
    try {
        const token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, `${configuration.secretKey}`);
        req.userData = decoded;
        next();

    } catch (error) {
        return res.status(403).json({
            message: "auth failed",
            // redirectUrl: `${configuration.authFailedUrl}`,
            isAuthenticated: false
        });
        // res.redirect(`${configuration.authFailedUrl}`);
    }

}

// "C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="C:/ChromeDevSession