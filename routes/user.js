import express from 'express';
import { ServerStrings } from '../strings.js';

const router = express.Router();

router.use(express.json());

router.route('/')
    .get(async (req, res) => {
        const db    = req.services.dbService;
        const users = await db.getUser(); 

        res.status(200);
        res.json({
            message: 'Successfully got all users in the database.',
            data: users
        });
    })
    .post(async (req, res) => {
        const db = req.services.dbService;
        const newUser = req.body;

        if (!newUser.fname || !newUser.lname  || !newUser.email || !newUser.pass) {
            res.status(400);
            res.send({
                message: ServerStrings.DB_MISSING_PARAMS('user'),
                missingParams: db.expectedUser
            });
        } else {
            const dbRes = await db.addUser(newUser);        // Probably should do something with this
            res.status(200);
            res.json({
                message: ServerStrings.DB_QUERY_SUCCESS,
                data: dbRes
            });
        }
    });

router.route('/:id')
    .get(async (req, res) => {
        const db    = req.services.dbService;
        const user  = await db.getUser(req.params.id);
        
        if (!user || user.length === 0) {
            res.status(400);
            res.json({
                message: `No user could be found for id \'${req.params.id}\'`
            });

        } else {
            res.status(200);
            res.json({
                message: `Successfully found user for id \'${req.params.id}\'`,
                data: user
            });
        }
    })
    .put(async (req, res) => {
        if (!req.params.id) {
            res.status(400);
            res.json({
                message: ServerStrings.DB_MISSING_ID,
                id: req.params.id
            });
        } else if (!userData) {
            res.status(400);
            res.json({
                message: ServerStrings.DB_NOTHING_UPDATE,
                id: req.params.id
            });
        } else {
            console.log(userData);

            const resp = await db.updateUser(req.params.id, userData);
            
            res.status(200);
            res.json({
                message: ServerStrings.DB_UPDATE_SUCCESS,
                id: req.params.id,
                data: resp
            });
        }
    })
    .delete(async (req, res) => {
        const db = req.services.dbService;
        const resp = db.deleteUser(req.params.id);

        res.status(200);
        res.json({
            message: `Successfully deleted user with id \'${req.params.id}\'`,
            data: resp
        });
    });

export default router;
