import { DataSource } from 'typeorm';
import { Review } from './reviews.entity';
import { DATA_SOURCE } from '../constants';

export const reviewProviders = [
    {
        provide: "REVIEWS_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Review),
        inject: [DATA_SOURCE],
    },
];