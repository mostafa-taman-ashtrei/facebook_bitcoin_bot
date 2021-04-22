/* eslint-disable import/prefer-default-export */
export const GET_STARTED_RESPONSE = {
    attachment: {
        type: 'template',
        payload: {
            template_type: 'generic',
            elements: [{
                title: 'Crypto Bot',
                subtitle: `
                This is a messanger automated bot for bitcoin, 
                this bot is only for educational purposes 
                and should not be used to make any financial decisions`,
                buttons: [
                    {
                        type: 'postback',
                        title: 'Get bitcoin price',
                        payload: 'GET_COIN_DATA',
                    },
                    {
                        type: 'postback',
                        title: 'Get bitcoin sentiment',
                        payload: 'GET_COIN_SENTIMENT',
                    },
                ],
            }],
        },
    },
};
