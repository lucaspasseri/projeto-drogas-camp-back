import app from '../src/app.js';
import supertest from 'supertest';
import connection from '../src/database.js';
import { expect } from '@jest/globals';

beforeEach(async () => {
    await connection.query(`DELETE FROM sessions`);
});


describe("POST /sign-in",() => {

    it("returns 400 when no body is sended.", async () => {
        
        const result = await supertest(app).post("/sign-in");
        expect(result.status).toEqual(400);
    });

    it("returns 400 when a empty body is sended.", async () => {

        const body = {};
        const result = await supertest(app).post("/sign-in").send(body);
        expect(result.status).toEqual(400);
    });

    it("returns 400 when a body with incorrect key is sended.", async() => {

        const body = {
            wrongKey: "person@p.com",
            password: "password"
        };

        const result = await supertest(app).post("/sign-in").send(body);

        expect(result.status).toEqual(400);

    });

    it("returns 400 when a body with incorrect value is sended.", async() => {

        const body = {
            email: "person@p.com",
            password: 12345
        };
        const result = await supertest(app).post("/sign-in").send(body);
        expect(result.status).toEqual(400);
    });

    it("returns 400 when invalid email is sended.", async() => {

        const body = {
            email: "person@p.com",
            password: "123"
        };
        const result = await supertest(app).post("/sign-in").send(body);
        expect(result.status).toEqual(400);
    });

    it("returns 401 when valid email and a wrong password are sended.", async() => {

        const body = {
            email: "l@l.com",
            password: "wrongPassword"
        };
        const result = await supertest(app).post("/sign-in").send(body);
        expect(result.status).toEqual(401);
    });

    it(`returns 200 when valid email and password are sended.
        And creates a session.`, async() => {

        const body = {
            email: "l@l.com",
            password: "123123"
        };
        const login = await supertest(app).post("/sign-in").send(body);
        expect(login.status).toEqual(200);

        const sessions = await connection.query("SELECT * FROM sessions");

        expect(sessions.rows.length).toEqual(1);
    });
});

afterAll(() => {
    connection.end();
});