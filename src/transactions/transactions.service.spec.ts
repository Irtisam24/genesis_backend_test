import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transactions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Transaction } from './transactions.entity';
import { Repository } from 'typeorm';

describe('TransactionService', () => {
    let service: TransactionService;
    let mockTransactionRepository: Partial<Repository<Transaction>>;

    beforeEach(async () => {
        mockTransactionRepository = {
            create: jest.fn().mockImplementation(dto => dto),
            save: jest.fn().mockImplementation(transaction => Promise.resolve({ ...transaction, status: 'completed' })),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TransactionService,
                {
                    provide: getRepositoryToken(Transaction),
                    useValue: mockTransactionRepository,
                },
            ],
        }).compile();

        service = module.get<TransactionService>(TransactionService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('processScanToPay', () => {
        it('should process payment successfully', async () => {
            const paymentDto = { userId: 1, paymentMethodId: 2, amount: 100, currency: 'USD' };
            const result = await service.processScanToPay(paymentDto.userId, paymentDto.paymentMethodId, paymentDto.amount, paymentDto.currency);
            expect(mockTransactionRepository.create).toHaveBeenCalledWith(paymentDto);
            expect(mockTransactionRepository.save).toHaveBeenCalled();
            expect(result.status).toEqual('completed');
            expect(result.message).toContain('successfully');
        });
    });
});
