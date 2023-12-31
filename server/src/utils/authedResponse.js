import { refreshTokenExpireTime } from "./cookieTimers.js";

const withRefreshToken = (req, res, data) => {
    
    if(req.withNewTokens) {

        return res.status(200).cookie('access_token', req.accessToken, {
            'path': '/',
            'domain': 'localhost',
            'httpOnly': true,
            'sameSite': 'Lax',
            'signed': true
        }).cookie('refresh_token', req.refreshToken, {
            'path': '/',
            'domain': 'localhost',
            'httpOnly': true,
            'expires': refreshTokenExpireTime(),
            'sameSite': 'Lax',
            'signed': true
        }).send(data);

    } else if(req.route.path.includes('profile') && req?.signedCookies?.refresh_token) {

        const refresh_cookie = req.signedCookies.refresh_token;

        return res.status(200).cookie('refresh_token', refresh_cookie, {
            'path': '/',
            'domain': 'localhost',
            'httpOnly': true,
            'expires': refreshTokenExpireTime(),
            'sameSite': 'Lax',
            'signed': true
        }).send(data);

    } else {

        return res.status(200).send(data);

    }

};

export default { withRefreshToken };