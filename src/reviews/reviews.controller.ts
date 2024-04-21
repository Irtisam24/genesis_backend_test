import { Controller, Post, Body, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { ReviewService } from './reviews.service';

@Controller('reviews')
export class ReviewController {
    constructor(private reviewService: ReviewService) { }

    @Post()
    createReview(@Body() body: { bookingId: number, userId: number, rating: number, comment: string }) {
        return this.reviewService.createReview(body.bookingId, body.userId, body.rating, body.comment);
    }

    @Patch(':reviewId')
    updateReview(
        @Param('reviewId', ParseIntPipe) reviewId: number,
        @Body() body: { rating: number, comment: string }
    ) {
        return this.reviewService.updateReview(reviewId, body.rating, body.comment);
    }
}
