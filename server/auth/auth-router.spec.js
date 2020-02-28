const supertest = require('supertest');
const server = require('../api/server.js')
const db = require('../database/dbConfig.js')
const bcrypt = require('bcryptjs');

beforeEach(async () => {
    // this function executes and clears out the table before each test
    await db('users').truncate();
  });

describe('Auth-Router Endpoints', ()=>{
    let token = '';
    test('POST /api/auth/register', async () =>{
        await db.seed.run()
        const res = await supertest(server)
            .post('/api/auth/register')
            .send({"username": "user2", "password": "password"})
            //does it return the expected auth code?
            console.log('RES INSIDE TEST', res.body || res.error);
            expect(res.status).toBe(201);
            //does it return the expected data format?
            expect(res.type).toMatch(/json/); // or .toBe("application/json")
            //does it return the expected data?
            expect(res.body.id).toBe(2);

        console.log('RES INSIDE TEST', res.body || res.error)
    })

    test('POST /api/auth/login', async () =>{
        await db.seed.run()
        let user = {
            username: 'user',
            password: 'password'
        };
        const res = await supertest(server)
        .post('/api/auth/login')
        .send(user)
        //does it return the expected auth code?
        expect(res.status).toBe(200);
        //does it return the expected data format?
        expect(res.type).toMatch(/json/);
    })

    test('POST /api/auth/login Returns TOKEN', async () =>{
        await db.seed.run();
        let user ={ //found in seeds
            username:'user',
            password: 'password'
        }
        const res = await supertest(server)
        .post('/api/auth/login')
        .send(user)
        //does it return the expected token?
        expect(res.body.token).toHaveLength(187) //token length

    })

    test('GET /api/auth/jokes ', async () =>{
        await db.seed.run();
        let token = ''
        let user = {
            username: 'user',
            password: 'password'
        };
        //logs in to database
        const res = await supertest(server)
        .post('/api/auth/login')
        .send(user)
        //does it return the expected auth code?
        expect(res.status).toBe(200);
        //does it return the expected data format?
        expect(res.type).toMatch(/json/);
        //does it return the expected token?
        expect(res.body.token).toHaveLength(187) //token length
        //sets token to response from server
        token = res.body.token;
        //did the token get grabbed?
        expect(token).toBe(res.body.token);

        //Now send token to check jokes route
        console.log('AUTHORIZATION HEADER FOR JOEKS:', {authorization: token})
        const jokesRes = await supertest(server)
        .get("/api/jokes")
        .set('authorization', token)
        // .send({authorization: token}) //sends authorization token
        
        //does it return the expected auth code?
        expect(jokesRes.status).toBe(200);
        //does it return the expected data format?
        expect(jokesRes.type).toMatch(/json/);
        //does it return the expected data
        expect(jokesRes.body).toHaveLength(20)
        expect(Array.isArray(jokesRes.body)).toBe(true);

    })
})
