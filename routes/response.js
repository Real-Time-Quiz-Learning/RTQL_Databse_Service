import express from 'express';

const router = express.Router();

router.use(express.json());

router.route('/')
    .get(async (req, res) => {
        const db    = req.services.dbService;
        const data  = await db.getResponse();

        res.status(200);
        res.json({
            message: 'Success',
            data: data
        });
    })
    .post(async (req, res) => {
        const newResponse = req.body;
        const db    = req.services.dbService;

        if (!newResponse.qid || !newResponse.rtext || !newResponse.snick) {
            res.status(400);
            res.json({
                message: 'Response requires \'qid\', \'rtext\', and \'snick\''
            });
        } else {
            const resp = await db.addResponse(newResponse);

            res.status(200);
            res.json({
                message: 'Success post for incoming data',
                data: resp
            });
        }
    });

router.route('/:id')
    .get(async (req, res) => {
        const db = req.services.dbService;
        const resp = await db.getResponse(req.params.id);

        if (!resp || resp.length === 0) {
            res.status(400);
            res.json({
                message: `No response found for \'${req.params.id}\'`,
                id: req.params.id
            })
        } else {
            res.status(200)
            res.json({
                message: `Success get for id \'${req.params.id}\'`,
                id: req.params.id,
                data: resp
            });
        }
    });

export default router;
