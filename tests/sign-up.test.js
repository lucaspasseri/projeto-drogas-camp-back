import supertest from "supertest";

import connection from "../src/database.js";
import app from "../src/app.js";

beforeEach( async () => {
    await connection.query('DELETE FROM users')  
})
    
afterAll( () => {
    connection.end();
})

describe('POST /sign-up', () => {
    it('returns 201 for valid params', async () =>{
        const body = {
            name: "teste da silva", 
            email: "teste@test.com.br", 
            password:"test123", 
            confirmPassword:"test123"
        };

        const result = await supertest(app).post('/sign-up').send(body);
        expect(result.status).toEqual(201)
    })

    it('return status 400 for invalid params', async () => {
        const body = {
            name: "teste da silva", 
            email: "teste", 
            password:"abcd12",
            repeatPassword:"abcd1"
        }

        const result = await supertest(app).post('/sign-up').send(body);
        expect(result.status).toEqual(400)
    })

    it('return status 409 for duplicated params', async () => {
        const body = {
            name: "teste da silva", 
            email: "teste@test.com.br", 
            password:"test123", 
            confirmPassword:"test123"
        };

        await supertest(app).post('/sign-up').send(body);
        const result = await supertest(app).post('/sign-up').send(body);

        expect(result.status).toEqual(409)
    })
})