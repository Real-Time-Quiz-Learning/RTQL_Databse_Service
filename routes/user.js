import express from 'express';

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
                message: 'User requires parameter \'fname\', \'lname\', \'email\', and \'pass\''
            });
        } else {
            const dbRes = await db.addUser(newUser);        // Probably should do something with this
            res.status(200);
            res.json({
                message: 'New user successfully added.'
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
                user: user
            });
        }
    })
    .put(async (req, res) => {
        const db        = req.services.dbService;
        const userData  = req.body;

        if (!userData) {
            res.status(400);
            res.json({
                message: 'Nothing to update'
            });
        } else {
            console.log(userData);

            const resp = await db.updateUser(req.params.id, userData);
            
            res.status(200);
            res.json({
                message: 'Successfully updated user details',
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
