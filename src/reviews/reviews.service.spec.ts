import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './reviews.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Review } from './reviews.entity';
import { NotFoundException } from '@nestjs/common';

describe('ReviewService', () => {
    let service: ReviewService;
    let mockReviewRepository: { create: any; save: any; findOne: any; };

    beforeEach(async () => {
        mockReviewRepository = {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ReviewService,
                {
                    provide: getRepositoryToken(Review),
                    useValue: mockReviewRepository,
                },
            ],
        }).compile();

        service = module.get<ReviewService>(ReviewService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createReview', () => {
        it('should successfully create and return the review', async () => {
            const reviewData = { booking_id: 1, user_id: 1, rating: 5, comment: 'Great service!' };
            mockReviewRepository.create.mockReturnValue(reviewData);
            mockReviewRepository.save.mockResolvedValue(reviewData);

            const result = await service.createReview(1, 1, 5, 'Great service!');
            expect(mockReviewRepository.create).toHaveBeenCalledWith(reviewData);
            expect(mockReviewRepository.save).toHaveBeenCalledWith(reviewData);
            expect(result).toEqual(reviewData);
        });
    });

    describe('updateReview', () => {
        it('should successfully update a review', async () => {
            const reviewData = { id: 1, booking_id: 1, user_id: 1, rating: 4, comment: 'Good service' };
            const updatedData = { ...reviewData, rating: 5, comment: 'Excellent service!' };
            mockReviewRepository.findOne.mockResolvedValue(reviewData);
            mockReviewRepository.save.mockResolvedValue(updatedData);

            const result = await service.updateReview(1, 5, 'Excellent service!');
            expect(mockReviewRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(mockReviewRepository.save).toHaveBeenCalledWith(updatedData);
            expect(result).toEqual(updatedData);
        });

        it('should throw NotFoundException if the review does not exist', async () => {
            mockReviewRepository.findOne.mockResolvedValue(null);

            await expect(service.updateReview(1, 5, 'Excellent service!'))
                .rejects.toThrow(NotFoundException);
        });
    });
});
