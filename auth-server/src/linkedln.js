require('dotenv').config();
const superagent = require('superagent');
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const tokenServerUrl = 'https://www.linkedin.com/oauth/v2/accessToken';
const API_REQ = process.env.API_REQ;
module.exports = async (req, res, next) => {
    try {
        let code = req.query.code;
        console.log('cooooooooooooooooooode', code);
        let token = await exchangeCodeForToken(code);
        console.log('toooooooooken', token);

        let userInfo = await getUserInfo(token);
        console.log('usssssssssser', userInfo);

        let user = await getUser(userInfo);
        console.log('user', user);
        req.token=token;
        req.user=user;
        next();

    } catch (e) {
        console.log(e.message);
    }

}
async function exchangeCodeForToken(code) {
    try {
        let tokenResponse = await superagent.post(tokenServerUrl).set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                code: code,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                redirect_uri: 'http://localhost:3000/oauth',
                grant_type: 'authorization_code',
            });
        console.log('code', code, 'client_id', CLIENT_ID, 'client_secret', CLIENT_SECRET);
        let accessToken = tokenResponse.body.access_token;
        return accessToken;
    } catch (err) {
        console.log(err.message);
    }
}

async function getUserInfo(token) {
    try {
        let user = await superagent.get('https://api.linkedin.com/v2/me').set(`Authorization`, `Bearer ${token}`);
        return user.body;
    }
    catch (err) { console.log(err) }
}

async function getUser(user) {
    try {
        let userRecord = {
            firstname: user.localizedFirstName,
            lastName: user.lastName.localized.en_US
        };

        return userRecord;


    }
    catch (err) { console.log(err.message) }
}


