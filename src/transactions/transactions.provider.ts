import { DataSource } from 'typeorm';
import { Transaction } from './transactions.entity';
import { DATA_SOURCE } from '../constants';

export const transactionProviders = [
    {
        provide: "TRANSACTIONS_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Transaction),
        inject: [DATA_SOURCE],
    },
];