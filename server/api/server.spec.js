const supertest = require('supertest');
const server = require('./server.js');

describe('Server Online & Listening', () =>{
    test('Base Route /', async () =>{
        const res = await supertest(server).get('/')
        //does it return the expected auth code?
        expect(res.status).toBe(200);
        //does it return the expected data format?
        expect(res.type).toMatch(/json/); // or .toBe("application/json")
        //does it return the expected data?
        expect(res.body.api).toBe("online");
      
    })
})