import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaymentMethod } from './payment_methods.entity';
import { payment_method } from './payment_methods.enums';

@Injectable()
export class PaymentService {
    constructor(
        @Inject("PAYMENT_METHODS_REPOSITORY")
        private paymentMethodRepository: Repository<PaymentMethod>
    ) { }

    async addPaymentMethod(userId: number, type: payment_method, provider: string, accountNumber: string, expiryDate: string): Promise<Partial<PaymentMethod>> {
        const paymentMethod = this.paymentMethodRepository.create({ user_id: userId, method_type: type, provider, account_number: accountNumber, expiry_date: expiryDate });
        const result = await this.paymentMethodRepository.save(paymentMethod);
        return {
            id: result.id,
            user_id: userId,
            method_type: type,
            provider: provider,
            account_number: accountNumber,
            expiry_date: expiryDate
        }
    }

}
