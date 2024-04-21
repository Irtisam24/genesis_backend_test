import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('BookingController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/bookings/:id (GET)', () => {
        const id = 1
        return request(app.getHttpServer())
            .get(`/bookings/${id}`)
            .expect(404)
            .expect({
                "message": `Booking with ID ${id} not found`, "error": "Not Found", "statusCode": 404
            });
    });

    afterEach(async () => {
        await app.close();
    });
});
