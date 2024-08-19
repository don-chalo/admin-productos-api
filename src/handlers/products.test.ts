import request from "supertest";

import server from "../server";

describe('POST /api/products', () => {
    it('should display validation errors', async () => {
        const response = await request(server)
            .post('/api/products')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body).not.toHaveProperty('data');
    });
    it('should display that price is greather than 0', async () => {
        const response = await request(server)
            .post('/api/products')
            .send({
                name: 'Product 1',
                price: 0
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body).not.toHaveProperty('data');
    });
    it('should create a new product', async () => {
        const response = await request(server)
            .post('/api/products')
            .send({
                name: 'Product 1',
                price: 10,
                availability: true
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data');
        expect(response.body).not.toHaveProperty('errors');
    });
});

describe('GET /api/products', () => {
    it('should check if /api/products url exitsts', async () => {
        const response = await request(server).get('/api/products');
        expect(response.status).not.toBe(404);
    });
    it('GET a JSON response with products', async () => {
        const response = await request(server).get('/api/products');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveLength(1);
        expect(response.body.data).not.toHaveProperty('errors');
    });
});

describe('GET /api/products/:id', () => {
    it('Should return a 404 response for a non-existent product', async () => {
        const response = await request(server).get('/api/products/999');
        expect(response.status).toBe(404);
        expect(response.body).not.toHaveProperty('data');
    });
    it('should check a valid ID in the URL', async () => {
        const response = await request(server).get('/api/products/abc');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body).not.toHaveProperty('data');
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors[0].msg).toEqual('ID no válido');
    });
    it('get a JSON response for a single product', async () => {
        const response = await request(server).get('/api/products/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).not.toHaveProperty('errors');
    });
});

describe('PUT /api/products/:id', () => {
    it('should return a 404 response for a non-existent product', async () => {
        const response = await request(server).put('/api/products/999')
            .send({ name:'Product 1', price: 10, availability: true});
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body).not.toHaveProperty('data');
    });
    it('should check a valid ID in the URL', async () => {
        const response = await request(server).put('/api/products/abc');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body).not.toHaveProperty('data');
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors[0].msg).toEqual('ID no válido');
    });
    it('should update a product', async () => {
        const response = await request(server).put('/api/products/1')
            .send({
                name: 'Product 1',
                price: 10,
                availability: true
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body).not.toHaveProperty('errors');
    });
});

describe('PATCH /api/products/:id', () => {
    it('should return a 404 response for a non-existent product', async () => {
        const response = await request(server).patch('/api/products/999')
            .send({ name:'Product 1', price: 10, availability: true});
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body).not.toHaveProperty('data');
    });
    it('should check a valid ID in the URL', async () => {
        const response = await request(server).patch('/api/products/abc');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body).not.toHaveProperty('data');
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors[0].msg).toEqual('ID no válido');
    });
    it('should update a product', async () => {
        const response = await request(server).patch('/api/products/1')
            .send({
                name: 'Product 1',
                price: 10,
                availability: true
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body).not.toHaveProperty('errors');
    });
});

describe('DELETE /api/products/:id', () => {
    it('should return a 404 response for a non-existent product', async () => {
        const response = await request(server).delete('/api/products/999');
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body).not.toHaveProperty('data');
    });
    it('should check a valid ID in the URL', async () => {
        const response = await request(server).delete('/api/products/abc');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body).not.toHaveProperty('data');
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors[0].msg).toEqual('ID no válido');
    });
    it('should delete a product', async () => {
        const response = await request(server).delete('/api/products/1');
        expect(response.status).toBe(200);
        expect(response.body).not.toHaveProperty('errors');
    });
});
