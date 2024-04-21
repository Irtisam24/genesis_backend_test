import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/db.module';
import { BookingService } from './bookings.service';
import { BookingController } from './bookings.controller';
import { bookingsProviders } from './bookings.provider';

@Module({
    imports: [DatabaseModule],
    providers: [
        ...bookingsProviders,
        BookingService,
    ],
    controllers: [BookingController]
})
export class BookingsModule { }
