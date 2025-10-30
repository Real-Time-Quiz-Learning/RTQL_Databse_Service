import process  from 'process';
import express  from 'express';
import cors     from 'cors';
import fs       from 'fs/promises';

import { DbService } from './services/dbService.js';

import QuestionRouter from './routes/question.js';
import ResponseRouter from './routes/response.js';
import UserRouter from './routes/user.js';

/**
 * TODO
 * - Resource group for users
 * - Resource group for responses
 * - Resource group for questions
 * 
 * 
 */

class Server {
    constructor() {
        // App Properties
        this.port = process.env.PORT;

        this.corsOptions    = {
            optionSuccessStatus: 204,
            origin:     '*',
            methods:    'GET,PUT,POST,PATCH,DELTE,OPTIONS'
        };

        // Services
        this.app                = express();
        this.jsonParser         = express.json();
        this.urlEncodedParser   = express.urlencoded();
        this.dbService          = new DbService(
            null,
            process.env.MSQL_HOST,
            process.env.MSQL_DB,
            process.env.MSQL_USER,
            process.env.MSQL_PASSWORD
        );

        this.exposedServices = Object.freeze({
            dbService: this.dbService
        });
        this.exposeServiceMiddleware = this.exposeServices.bind(this);
    }

    exposeServices(req, res, next) {
        req.services = this.exposedServices;
        next();
    }

    start() {
        this.app.use(this.exposeServiceMiddleware);

        this.app.use('/question', QuestionRouter);
        this.app.use('/response', ResponseRouter);
        this.app.use('/user', UserRouter);
        
        this.app.use((err, req, res, next) => {
            console.log(err);

            const statusCode = err.statusCode || 500;

            res.status(statusCode);
            res.json({
                status: 'Error',
                message: err.message || 'Database is in big bad error state'
            });
        });

        this.app.get('/secret', async (req, res) => {
            const filePath = `${process.cwd()}/important/learning.png`;

            res.status(267);
            res.sendFile(filePath);
        });

        this.app.listen(this.port, () => {
            console.log(`Server listening on port: ${this.port}`);
        });
    }
}

new Server().start();
