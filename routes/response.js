import express from 'express';

const router = express.Router();

router.use(express.json());

router.route('/')
    .get(async (req, res) => {
        const db    = req.services.dbService;
        const data  = await db.getResponse();

        res.json({
            message: 'Success',
            data: data
        });
    })
    .post((req, res) => {
        const data  = req.body;
        const db    = req.services.dbService;

        console.log(data);

        res.json({
            message: 'Success post for incoming data'
        })
    });

router.route('/:id')
    .get((req, res) => {
        console.log(req.response);

        res.json({
            message: `Success get for id ${req.params.id}`,
            user: req.user,
            data: []
        })
    })
    .put((req, res) => {
        console.log(req.response);

        res.json({
            message: `Success put for id ${req.params.id}`,
            user: req.user,
            data: []
        });
    });

router
    .param('id', async (req, res, next, id) => {
        req.response = await req.services.dbService.getResponse(id);
        next(); 
    });

export default router;
