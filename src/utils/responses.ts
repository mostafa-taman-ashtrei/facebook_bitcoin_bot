/* eslint-disable import/prefer-default-export */
export const GET_STARTED_RESPONSE = {
    attachment: {
        type: 'template',
        payload: {
            template_type: 'generic',
            elements: [{
                title: 'Bitcoin Bot',
                subtitle: 'What would you like to know about bitcoin',
                image_url: 'https://fontmeme.com/images/bitcoin-logo-font.jpg',
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
