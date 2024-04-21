import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Booking } from './bookings.entity';

@Injectable()
export class BookingService {
    constructor(
        @Inject("BOOKINGS_REPOSITORY")
        private bookingRepository: Repository<Booking>,
    ) { }

    async getBookingById(bookingId: number): Promise<Booking> {
        const booking = await this.bookingRepository.findOne({
            where: { id: bookingId },
            relations: ['user'],
        });

        if (!booking) {
            throw new NotFoundException(`Booking with ID ${bookingId} not found`);
        }

        return booking;
    }
}
