import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/db.module';
import { paymentsProviders } from './payment_methods.provider';
import { PaymentService } from './payment_methods.service';
import { PaymentController } from './payments_methods_controller';

@Module({
    imports: [DatabaseModule],
    providers: [...paymentsProviders, PaymentService],
    controllers: [PaymentController]
})
export class PaymentMethodsModule { }
