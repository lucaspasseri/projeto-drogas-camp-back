import supertest from "supertest";

import connection from "../src/database.js";
import app from "../src/app.js";

    
afterAll( () => {
    connection.end();
})

describe('POST /sales', () => {
    it('returns 200 for valid params', async () =>{
        const body = {
            name: "teste da silva", 
            email: "teste@test.com.br", 
            password:"test123", 
            confirmPassword:"test123"
        };

        const products = [
            {
                productId: 1,
                price: 3500,
                name: 'pack de coca-cola',
                image: 'https://pics.drugstore.com/prodimg/416805/220.jpg',
                description: 'lata 350ml',
                quantity: 10
            }
        ]

        await supertest(app).post('/sign-up').send(body);
        await supertest(app).post('/sign-in').send({email:body.email,password:body.password});
        const result = await supertest(app).post('/sales').send({products, totals: 35000});

        expect(result.status).toEqual(200)
    })

})