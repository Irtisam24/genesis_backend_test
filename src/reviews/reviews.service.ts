import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Review } from './reviews.entity';

@Injectable()
export class ReviewService {
    constructor(
        @Inject("REVIEWS_REPOSITORY")
        private reviewRepository: Repository<Review>
    ) { }

    async createReview(bookingId: number, userId: number, rating: number, comment: string): Promise<Review> {
        const review = this.reviewRepository.create({
            booking_id: bookingId,
            user_id: userId,
            rating,
            comment,
            created_at: new Date()
        });
        return this.reviewRepository.save(review);
    }

    async updateReview(reviewId: number, rating: number, comment: string): Promise<Review> {
        const review = await this.reviewRepository.findOne({
            where: { id: reviewId }
        });

        if (!review) {
            throw new NotFoundException(`Review with ID ${reviewId} not found`);
        }

        review.rating = rating;
        review.comment = comment;
        return this.reviewRepository.save(review);
    }
}
