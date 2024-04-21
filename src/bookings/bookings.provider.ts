import { DataSource } from 'typeorm';
import { Booking } from './bookings.entity';
import { DATA_SOURCE } from '../constants';

export const bookingsProviders = [
    {
        provide: "BOOKINGS_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Booking),
        inject: [DATA_SOURCE],
    },
];