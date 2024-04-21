import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from '../src/transactions/transactions.module';
import { Transaction } from '../src/transactions/transactions.entity'
import { transactionProviders } from '../src/transactions/transactions.provider';
import { DatabaseModule } from '../src/db/db.module';
import { AppModule } from '../src/app.module';

describe('TransactionController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/transactions/scan-to-pay (POST)', async () => {
        const transactionData = {
            userId: 1,
            paymentMethodId: 1,
            amount: 100.00,
            currency: 'USD'
        };

        await request(app.getHttpServer())
            .post('/transactions/scan-to-pay')
            .send(transactionData)
            .expect(201)
            .then(response => {
                expect(response.body).toEqual({
                    status: 'completed',
                    message: `Payment of ${transactionData.amount} ${transactionData.currency} processed successfully.`
                });
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
