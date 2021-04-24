/* eslint-disable import/prefer-default-export */
import { Request, Response } from 'express';
import { askForCurrency, getCoinData } from '../services/botService';
import curnecies from '../utils/currencies';
import fetchUsername from '../utils/fetchUsername';
import { GET_STARTED_RESPONSE } from '../utils/responses';
import sendMessage from '../utils/sendMessage';

export const getWebhook = (req: Request, res: Response) => {
    // Your verify token. Should be a random string.
    const VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN;

    // Parse the query params
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
};

export const handleMessage = async (sender_psid: string, received_message: any) => {
    if (received_message.quick_reply.payload) {
        if (curnecies.includes(received_message.quick_reply.payload)) {
            const data = await getCoinData(received_message.quick_reply.payload);
            await sendMessage(sender_psid, { text: data });
        }
    }
};

const handlePostback = async (sender_psid: string, postback: any) => {
    const { payload } = postback;
    const username = await fetchUsername(sender_psid);

    switch (payload) {
    case 'GET_STARTED':
        await sendMessage(sender_psid, { text: `Welcome ${username} to Crypto Bot` });
        await sendMessage(sender_psid, GET_STARTED_RESPONSE);
        break;

    case 'GET_COIN_DATA':
        await askForCurrency(sender_psid);
        break;

    case 'GET_COIN_SENTIMENT':
        await sendMessage(sender_psid, { text: 'Getting bitcoin twitter sentiment' });
        break;

    default:
        console.log(`${payload} is not recognized ...`);
    }
};

export const postWebhook = (req: Request, res: Response) => {
    // Parse the request body from the POST
    const { body } = req;

    // Check the webhook event is from a Page subscription
    if (body.object === 'page') {
        // Iterate over each entry - there may be multiple if batched
        body.entry.forEach((entry: any) => {
            // Gets the body of the webhook event
            const webhook_event = entry.messaging[0];
            console.log(webhook_event);

            // Get the sender PSID
            const sender_psid = webhook_event.sender.id;
            console.log(`Sender PSID: ${sender_psid}`);

            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
                console.log(webhook_event.postback);
                handlePostback(sender_psid, webhook_event.postback);
            }
        });

        // Return a '200 OK' response to all events
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
};
