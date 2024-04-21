import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/db.module';
import { ReviewService } from './reviews.service';
import { ReviewController } from './reviews.controller';
import { reviewProviders } from './reviews.provider';

@Module({
    imports: [DatabaseModule],
    providers: [...reviewProviders, ReviewService],
    controllers: [ReviewController]
})
export class ReviewsModule { }
