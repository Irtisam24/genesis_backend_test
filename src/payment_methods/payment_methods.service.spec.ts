import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment_methods.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaymentMethod } from './payment_methods.entity';
import { Repository } from 'typeorm';
import { payment_method } from './payment_methods.enums';

describe('PaymentService', () => {
    let service: PaymentService;
    let mockPaymentMethodRepository: Partial<Repository<PaymentMethod>>;

    beforeEach(async () => {
        mockPaymentMethodRepository = {
            create: jest.fn().mockImplementation(dto => dto),
            save: jest.fn().mockImplementation(paymentMethod => Promise.resolve(paymentMethod)),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaymentService,
                {
                    provide: getRepositoryToken(PaymentMethod),
                    useValue: mockPaymentMethodRepository,
                },
            ],
        }).compile();

        service = module.get<PaymentService>(PaymentService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('addPaymentMethod', () => {
        it('should successfully add a payment method', async () => {
            const dto = { userId: 1, type: payment_method.card, provider: 'Visa', accountNumber: '123456789012', expiryDate: '12/25' };
            const result = await service.addPaymentMethod(dto.userId, dto.type, dto.provider, dto.accountNumber, dto.expiryDate);

            expect(mockPaymentMethodRepository.create).toHaveBeenCalledWith(dto);
            expect(mockPaymentMethodRepository.save).toHaveBeenCalledWith(dto);
            expect(result).toEqual(dto);
        });
    });
});
