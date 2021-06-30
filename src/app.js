import express from 'express';
import cors from 'cors';
import bcrypt, { hashSync } from 'bcrypt';
import { v4 as uuid} from 'uuid';
import connection from './database.js';


import { signUpSchema } from './schemas/signUpSchema.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res)=> {
    res.sendStatus(200);
});










































app.post('/sign-up', async (req,res) =>{
    const validationErrors = signUpSchema.validate(req.body).error;
    if(validationErrors) return res.sendStatus(400);

    const {name, email, password} = req.body;
    const createdDate = new Date;

    try {
        const checkEmail = await connection.query(`
            SELECT * FROM users 
            WHERE email = $1`,[email])

        const emailAlreadyRegistered = checkEmail.rows.length > 0
        if(emailAlreadyRegistered) return res.sendStatus(409)

        const hashedPassword = bcrypt.hashSync(password,10)

        await connection.query(`
            INSERT INTO users (name, email, password, created_at)
            VALUES ($1, $2, $3, $4)`,[name, email, hashedPassword, createdDate])

        res.sendStatus(201)

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

export default app;

