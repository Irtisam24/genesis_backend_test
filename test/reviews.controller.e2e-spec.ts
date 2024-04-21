import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ReviewController (e2e)', () => {
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

    it('/reviews (POST) - create a review', async () => {
        const response = await request(app.getHttpServer())
            .post('/reviews')
            .send({
                bookingId: 1,
                userId: 1,
                rating: 5,
                comment: 'Great service!'
            })
            .expect(201);

        expect(response.body).toEqual({
            id: expect.any(Number),
            booking_id: 1,
            user_id: 1,
            rating: 5,
            comment: 'Great service!',
            created_at: expect.any(String)
        });
    });

    it('/reviews/:reviewId (PATCH) - update a review', async () => {
        const review = await request(app.getHttpServer())
            .post('/reviews')
            .send({
                bookingId: 1,
                userId: 1,
                rating: 4,
                comment: 'Good service.'
            });

        const updatedResponse = await request(app.getHttpServer())
            .patch(`/reviews/${review.body.id}`)
            .send({
                rating: 5,
                comment: 'Excellent service!'
            })
            .expect(200);

        expect(updatedResponse.body).toEqual({
            id: review.body.id,
            booking_id: 1,
            user_id: 1,
            rating: 5,
            comment: 'Excellent service!',
            created_at: expect.any(String)
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
