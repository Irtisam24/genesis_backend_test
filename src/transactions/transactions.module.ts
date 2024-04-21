import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/db.module';
import { transactionProviders } from './transactions.provider';
import { TransactionService } from './transactions.service';
import { TransactionController } from './transactions.controller';

@Module({
    imports: [DatabaseModule],
    providers: [...transactionProviders, TransactionService],
    controllers: [TransactionController]
})
export class TransactionsModule { }
