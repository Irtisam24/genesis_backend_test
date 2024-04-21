import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('PaymentController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/payments/methods (POST)', async () => {
        const expiryDate = new Date().toISOString();
        await request(app.getHttpServer())
            .post('/payments/methods')
            .send({
                userId: 1,
                type: 'card',
                provider: 'Visa',
                accountNumber: '123456789012',
                expiryDate: expiryDate
            })
            .expect(201)
            .then(response => {
                expect(response.body).toEqual({
                    id: expect.any(Number),
                    user_id: 1,
                    method_type: 'card',
                    provider: 'Visa',
                    account_number: '123456789012',
                    expiry_date: expiryDate
                });
            });
    });

    afterEach(async () => {
        await app.close();
    });
});