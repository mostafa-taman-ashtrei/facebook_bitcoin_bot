import { config } from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import initRoutes from './routes/initRoutes';
import getBitcoinSentiment from './services/sentiment';

config();

(async () => {
    const app = express();
    const port = process.env.PORT || 5000;

    app.use(helmet());
    app.use(express.json());
    app.use(morgan('dev'));

    if (process.env.NODE_ENV === 'production') {
        const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
        app.use(morgan('combined', { stream: accessLogStream }));
    }

    initRoutes(app);
    const sentiment = await getBitcoinSentiment('bitcoin');
    console.log(sentiment);

    app.listen(port, () => console.log(`Server is running on port ${port} ...`));
})();
