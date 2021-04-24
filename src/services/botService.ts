/* eslint-disable import/prefer-default-export */
import request from 'request';
import curnecies from '../utils/currencies';

export const askForCurrency = async (sender_psid: string) => {
    const json_body: any = {
        recipient: { id: sender_psid },
        messaging_type: 'RESPONSE',
        message: {
            text: 'Choose a cuurency:',
            quick_replies: [],
        },
    };

    curnecies.map((c: string) => json_body.message.quick_replies.push({
        content_type: 'text',
        title: c,
        payload: c,
    }));

    await request({
        uri: 'https://graph.facebook.com/v6.0/me/messages',
        qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: json_body,
    }, (err) => {
        if (!err) {
            console.log('message sent!');
        } else {
            console.error(`Unable to send message:${err}`);
        }
    });
};

// eslint-disable-next-line max-len
export const getCoinData = async (sender_psid: string, currency: string) => new Promise((resolve) => {
    request({
        uri: `https://api.nomics.com/v1/currencies/ticker?key=${process.env.API_KEY}&ids=BTC&convert=${currency}`,
        method: 'GET',
    }, (err, _, body) => {
        if (err) console.log(err);
        const jsonBody = JSON.parse(body);
        const result = `The price for ${jsonBody[0].name} is ${Math.ceil(jsonBody[0].price)} ${currency}`;
        console.log(sender_psid);
        resolve(result);
    });
});
