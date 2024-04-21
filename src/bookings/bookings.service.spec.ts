import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './bookings.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Booking } from './bookings.entity';
import { NotFoundException } from '@nestjs/common';

describe('BookingService', () => {
  let service: BookingService;
  let mockBookingRepository: { findOne: any; };

  beforeEach(async () => {
    // Mock repository
    mockBookingRepository = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        {
          provide: getRepositoryToken(Booking),
          useValue: mockBookingRepository,
        },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getBookingById', () => {
    it('should return booking details successfully', async () => {
      const bookingId = 1;
      const mockBooking = { id: bookingId, serviceDescription: 'Test Service', bookingDate: new Date() };
      mockBookingRepository.findOne.mockResolvedValue(mockBooking);

      const result = await service.getBookingById(bookingId);
      expect(result).toEqual(mockBooking);
      expect(mockBookingRepository.findOne).toHaveBeenCalledWith({
        where: { id: bookingId },
        relations: ['user'],
      });
    });

    it('should throw NotFoundException if booking is not found', async () => {
      const bookingId = 1;
      mockBookingRepository.findOne.mockResolvedValue(null);

      await expect(service.getBookingById(bookingId)).rejects.toThrow(NotFoundException);
    });
  });
});
