/* eslint-disable import/prefer-default-export */
import request from 'request';
import curnecies from '../utils/currencies';

export const askForCurrency = (sender_psid: string) => {
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

    request({
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

export const getCoinData = () => { };
