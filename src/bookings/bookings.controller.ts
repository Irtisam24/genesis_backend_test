import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BookingService } from './bookings.service';
import { Booking } from './bookings.entity';
import { BOOKINGS_CONTROLLER_PATH } from '../constants';

@Controller(BOOKINGS_CONTROLLER_PATH)
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    @Get(':bookingId')
    getBookingById(@Param('bookingId', ParseIntPipe) bookingId: number): Promise<Booking> {
        return this.bookingService.getBookingById(bookingId);
    }
}
