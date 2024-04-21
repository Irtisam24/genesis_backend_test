import { Controller, Post, Body } from '@nestjs/common';
import { TransactionService } from './transactions.service';

@Controller('transactions')
export class TransactionController {
    constructor(private transactionService: TransactionService) { }

    @Post('scan-to-pay')
    scanToPay(@Body() body: { userId: number, paymentMethodId: number, amount: number, currency: string }) {
        return this.transactionService.processScanToPay(body.userId, body.paymentMethodId, body.amount, body.currency);
    }
}
