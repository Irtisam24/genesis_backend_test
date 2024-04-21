import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment_methods.service';
import { payment_method } from './payment_methods.enums';

@Controller('payments')
export class PaymentController {
    constructor(private paymentService: PaymentService) { }

    @Post('methods')
    addPaymentMethod(@Body() body: { userId: number, type: payment_method, provider: string, accountNumber: string, expiryDate: string }) {
        return this.paymentService.addPaymentMethod(body.userId, body.type, body.provider, body.accountNumber, body.expiryDate);
    }

}
