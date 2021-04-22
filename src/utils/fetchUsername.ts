import request from 'request';

const fetchUsername = async (sender_psid: string) => {
    const uri = `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${process.env.PAGE_ACCESS_TOKEN}`;

    request({
        uri,
        method: 'GET',
    }, (err, _, body) => {
        if (!err) {
            const jsonBody = JSON.parse(body);
            const username = `${jsonBody.first_name} ${jsonBody.last_name}`;
            console.log(username);
        } else {
            throw new Error(err);
        }
    });
};

export default fetchUsername;
