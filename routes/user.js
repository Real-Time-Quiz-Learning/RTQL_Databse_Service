import express from 'express';

const router = express.Router();

router.use(express.json());

router.route('/')
    .get(async (req, res) => {
        const db    = req.services.dbService;
        const users = await db.getUser(); 

        res.status(200);
        res.json({
            message: 'Users in the database',
            data: users
        });
    })
    .post(async (req, res) => {
        const db = req.services.dbService;
        const newUser = req.body;

        if (!newUser.fname || !newUser.lname  || !newUser.email) {
            res.status(400);
            res.send({
                message: 'User requires parameter \'fname\', \'lname\', and \'email\''
            });
        } else {
            const dbRes = await db.addUser(newUser);

            console.log(dbRes);

            res.status(200);
            res.json({
                message: 'New user successfully added.'
            });
        }
    });

router.route('/:id')
    .get(async (req, res) => {
    })
    .put(async (req, res) => {
    })
    .delete(async (req, res) => {
    });

export default router;