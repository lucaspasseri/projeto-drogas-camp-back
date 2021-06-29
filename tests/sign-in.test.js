import app from '../src/app.js';
import supertest from 'supertest';

describe("POST /sign-in",() => {
    it("returns 200", async () => {
        const body = {
            email: "l@l.com",
            password: "123"
        };

        const result = await supertest(app).post("/sign-in").send(body);
        const status = result.status;
        expect(result.body).toEqual(body);
    });
});