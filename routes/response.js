import express from 'express';

const router = express.Router();

router.use(express.json());

router
    .route('/')
    .get((req, res) => {
        console.log(req.services.dbService);

        res.json({
            message: 'Success',
            data: []
        });
    })
    .post((req, res) => {
        const data = req.body;
        
        console.log(data);

        res.json({
            message: 'Success post for incoming data'
        })
    });

router
    .route('/:id')
    .get((req, res) => {
        res.json({
            message: `Success get for id ${req.params.id}`,
            user: req.user,
            data: []
        })
    })
    .put((req, res) => {
        res.json({
            message: `Success put for id ${req.params.id}`,
            user: req.user,
            data: []
        });
    })
    .delete((req, res) => {
        res.json({
            message: 'Something is being deleted.',
            user: req.user
        });
    });

router
    .param('id', (req, res, next, id) => {
        req.user = 'Sally';
        next(); 
    });

export default router;
