import request from 'request';

const fetchUsername = async (sender_psid: string) => new Promise((resolve, reject) => {
    const uri = `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${process.env.PAGE_ACCESS_TOKEN}`;
    request({
        uri,
        method: 'GET',
    }, (err, _, body) => {
        if (!err) {
            const jsonBody = JSON.parse(body);
            const username = `${jsonBody.last_name} ${jsonBody.first_name}`;
            resolve(username);
        } else {
            reject();
            throw new Error(err);
        }
    });
});

export default fetchUsername;
