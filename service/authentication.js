require('dotenv').config();

const got = require('got');

const oAuthClient = got.extend({
    prefixUrl: 'https://031b28219372.ngrok.io/users/' , 
    headers: {
        'user-agent': 'forest-admin',
        'content-type' : 'application/json',
    },
    responseType: 'json',
});

const getToken =  (username) => {

        return oAuthClient.post('get-token', {
            json: {
                clientId : 'dashboard-admin',
                grantType: 'client_credentials',
                forestAdminUsername: username,
            },
        }).then((response) => {
            console.log('TOKEN : ' + JSON.stringify(response.body) );
            return { accessToken : response.body.data };
    
        }).catch((error) => {
            throw error;
        });
    
};

module.exports = {
    getToken,
};
