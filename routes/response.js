import express from 'express';
import { ServerStrings } from '../strings.js';

const router = express.Router();

router.use(express.json());

router.route('/')
    .get(async (req, res) => {
        const db    = req.services.dbService;
        const rh    = req.services.restHelper;
        const dbRes = await db.getResponse();

        rh.send(res, dbRes, {
            message: ServerStrings.GET_ALL_RESPONSE
        });
    })
    .post(async (req, res) => {
        const db        = req.services.dbService;
        const rh        = req.services.restHelper; 
        const response  = req.body;
        const dbRes     = await db.addResponse(response);

        rh.send(res, dbRes, {
            message: ServerStrings.ADD_NEW_RESPONSE
        });
    });

router.route('/:id')
    .get(async (req, res) => {
        const db = req.services.dbService;
        const rh = req.services.restHelper;
        const dbRes = await db.getResponse(req.params.id);

        rh.send(res, dbRes, {
            message: ServerStrings.GET_RESPONSE_BY_ID,
            id: req.params.id
        });
    });

export default router;
