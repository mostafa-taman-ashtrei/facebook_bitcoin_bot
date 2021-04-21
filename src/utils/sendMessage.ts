import request from 'request';

const sendMessage = (sender_psid: string, data: any) => {
    const request_body = {
        recipient: {
            id: sender_psid,
        },
        message: data,
    };

    request({
        uri: 'https://graph.facebook.com/v6.0/me/messages',
        qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: request_body,
    }, (err) => {
        if (!err) {
            console.log('message sent!');
        } else {
            console.error(`Unable to send message:${err}`);
        }
    });
};

export default sendMessage;
