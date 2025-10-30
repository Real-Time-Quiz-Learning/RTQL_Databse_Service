import express from 'express';

const router = express.Router();

router.use(express.json());

router.route('/')
    .get((req, res) => {
    })
    .post((req, res) => {
    });

router.route('/:id')
    .get((req, res) => {
    })
    .put((req, res) => {
    })

export default router;
