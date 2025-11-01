import express from 'express';
import { ServerStrings } from '../strings.js';

const router = express.Router();

router.use(express.json());

router.route('/')
    .get(async (req, res) => {
        const db    = req.services.dbService;
        const rh    = req.services.restHelper;
        const dbRes = await db.getUser(); 

        rh.send(res, dbRes, {
            message: ServerStrings.GET_ALL_USERS
        });
    })
    .post(async (req, res) => {
        const db        = req.services.dbService;
        const rh        = req.services.restHelper;
        const user      = req.body;
        const dbRes     = await db.addUser(user);        // Probably should do something with this

        rh.send(res, dbRes, {
            message: ServerStrings.ADD_NEW_USER
        });
    });

router.route('/:id')
    .get(async (req, res) => {
        const db        = req.services.dbService;
        const rh        = req.services.restHelper;
        const dbRes     = await db.getUser(req.params.id);

        rh.send(res, dbRes, {
            message: ServerStrings.GET_USER_BY_ID
        });
    })
    .put(async (req, res) => {
        const rh = req.services.restHelper;
        const user = req.body;

        if (!req.params.id) {
            rh.send(res, undefined, {
                message: ServerStrings.UPDATE_USER_BY_ID
            }, 400);

        } else {
            const db = req.services.dbService;
            const dbRes = await db.updateUser(req.params.id, user);

            rh.send(res, dbRes, {
                message: ServerStrings.UPDATE_USER_BY_ID
            });
        }
    })
    .delete(async (req, res) => {
        const db = req.services.dbService;
        const rh = req.services.restHelper;
        const dbRes = await db.deleteUser(req.params.id);

        rh.send(res, dbRes, {
            message: ServerStrings.DELETE_USER_BY_ID
        });
    });

export default router;
