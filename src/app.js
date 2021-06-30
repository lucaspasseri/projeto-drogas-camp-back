import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { v4 as uuid} from 'uuid';
import connection from './database.js';

import { signInSchema } from './schemas/signInSchema.js';

const app = express();

app.use(express.json());
app.use(cors());

app.post("/sign-in", async (req, res)=> {
    try {

        const validationErrors = signInSchema.validate(req.body).error;

        if(validationErrors) return res.sendStatus(400);

        const {email, password} = req.body;

        const query = await connection.query(
            `SELECT * FROM users
            WHERE email = $1`, [email]);

        if(query.rows.length === 0) return res.sendStatus(400);
        
        const user = query.rows[0];

        if( user && bcrypt.compareSync(password, user.password)){
            const token = uuid();
            
            await connection.query(
                `INSERT INTO sessions ("userId", token)
                VALUES ($1, $2)`, [user.id, token]
            );

            res.send({
                id: user.id,
                name: user.name,
                token: token
            });

        } else {
            res.sendStatus(401);
        }

    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default app;