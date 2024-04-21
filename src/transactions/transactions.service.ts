import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Transaction } from './transactions.entity';  // Assuming this entity is already defined
import { transaction_status } from './transactions.enums';

@Injectable()
export class TransactionService {
    constructor(
        @Inject("TRANSACTIONS_REPOSITORY")
        private transactionRepository: Repository<Transaction>
    ) { }

    async processScanToPay(userId: number, paymentMethodId: number, amount: number, currency: string): Promise<{ status: string, message: string }> {
        // @TODO integrate stripe here
        const transaction = this.transactionRepository.create({
            user_id: userId, payment_method_id: paymentMethodId, amount, currency, status: transaction_status.pending
        });

        // Simulating qr code scan here
        transaction.status = transaction_status.completed;
        await this.transactionRepository.save(transaction);

        return { status: transaction.status, message: `Payment of ${amount} ${currency} processed successfully.` };
    }
}
