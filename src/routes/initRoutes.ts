import Router, { Express } from 'express';
import { getWebhook, postWebhook } from '../controllers/chatController';

const router = Router();

const initRoutes = (app: Express) => {
    router.get('/webhook', getWebhook);
    router.post('/webhook', postWebhook);
    return app.use(router);
};

export default initRoutes;
