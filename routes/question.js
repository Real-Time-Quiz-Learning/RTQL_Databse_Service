import express from 'express';
import { ServerStrings } from '../strings.js';

const router = express.Router();

router.use(express.json());

router.route('/')
    .get(async (req, res) => {
        const db = req.services.dbService;
        const rh = req.services.restHelper;
        const dbRes = await db.getQuestion();

        rh.send(res, dbRes, {
            message: ServerStrings.GET_ALL_QUESTION
        });
    })
    .post(async (req, res) => {
        const db = req.services.dbService;
        const rh = req.services.restHelper;
        const question = req.body;
        const dbRes = await db.addQuestion(question);

        rh.send(res, dbRes, {
            message: ServerStrings.ADD_NEW_QUESTION
        });
    });

router.route('/:id')
    .get(async (req, res) => {
        const db = req.services.dbService;
        const rh = req.services.restHelper;
        const dbRes = await db.getQuestion(req.params.id);

        rh.send(res, dbRes, {
            message: ServerStrings.GET_QUESTION_BY_ID
        });
    })
    .put(async (req, res) => {
        const db = req.services.dbService;
        const rh = req.services.restHelper;
        const question = req.body;
        const dbRes = await db.updateQuestion(req.params.id, question);

        rh.send(res, dbRes, {
            message: ServerStrings.UPDATE_QUESTION_BY_ID,
            id: req.params.id
        })
    });

export default router;
