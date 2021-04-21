import { config } from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

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

    app.get('/', (_, res) => res.json({ msg: 'hello world!' }));

    app.listen(port, () => console.log(`Server is running on port ${port} ...`));
})();
