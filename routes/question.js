import express from 'express';

const router = express.Router();

router.use(express.json());

router.route('/')
    .get(async (req, res) => {
        const db = req.services.dbService;
        const questions = await db.getQuestion();

        res.status(200);
        res.json({
            message: 'Successfully retrieved all questions',
            data: questions
        });
    })
    .post(async (req, res) => {
        const db = req.services.dbService;
        const newQuestion = req.body;

        if (!newQuestion.pid || !newQuestion.qtext  || !newQuestion.qtime) {
            res.status(400);
            res.json({
                message: 'Question requires \'pid\', \'qtext\', and \'qtime\' parameters'
            });
        } else {
            const resp = await db.addQuestion(newQuestion);

            res.status(200);
            res.json({
                message: 'Successfully added new question',
                data: resp
            });
        }
    });

router.route('/:id')
    .get(async (req, res) => {
        const db = req.services.dbService;
        const questions = await db.getQuestion(req.params.id);

        if (!questions || questions.length === 0) {
            res.status(400);
            res.json({
                message: `Could not find quesion for id \'${req.params.id}\'`,
                id: req.params.id
            });
        } else {
            res.status(200);
            res.json({
                message: `Found question for id ${req.params.id}`,
                id: req.params.id,
                data: questions
            });
        }
    })
    .put(async (req, res) => {
        const db = req.services.dbService;
        const question = req.body;

        if (!question) {
            res.status(400);
            res.json({
                message: 'There is no question to update'
            });
        } else {
            console.log(question);

            const resp = await db.updateQuestion(req.params.id, question);

            console.log(resp);

            res.status(200);
            res.json({
                message: 'Successfully update question',
                id: req.params.id,
                data: resp
            });
        }
    });

export default router;
