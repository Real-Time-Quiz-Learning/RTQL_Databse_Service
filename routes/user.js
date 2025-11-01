import express from 'express';
import { ServerStrings } from '../strings.js';

const router = express.Router();

router.use(express.json());

router.route('/')
    .get(async (req, res) => {
        try {
            const db    = req.services.dbService;
            const users = await db.getUser(); 

            res.status(200);
            res.json({
                message: 'Successfully got all users in the database.',
                data: users
            });
        } catch (err) {
            res.status(500);
            res.json({
                message: ServerStrings.DB_QUERY_FAILED,
                error: err.message
            });
        }
    })
    .post(async (req, res) => {
        try {
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

        } catch (err) {
            res.status(500);
            res.json({
                message: 'Database query failed.'
            })
        }
    });

router.route('/:id')
    .get(async (req, res) => {
        try {
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
        } catch (err) {
            res.status(500);
            res.json({
                message: req.services.strings.dbQueryFailed;
            })
        }
    })
    .put(async (req, res) => {
        try {
            const db        = req.services.dbService;
            const userData  = req.body;

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
        } catch (err) {
            res.status(500);
            res.json({
                message: ServerStrings.DB_QUERY_FAILED,
                error: err.message
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
