import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('NotificationController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/notifications (POST)', () => {
        return request(app.getHttpServer())
            .post('/notifications')
            .send({ userId: 1, message: "Hello, test!" })
            .expect(201)

    });

    afterAll(async () => {
        await app.close();
    });
});
