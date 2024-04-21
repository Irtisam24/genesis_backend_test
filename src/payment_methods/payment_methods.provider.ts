import { DataSource } from 'typeorm';
import { PaymentMethod } from './payment_methods.entity';
import { DATA_SOURCE } from '../constants';

export const paymentsProviders = [
    {
        provide: "PAYMENT_METHODS_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(PaymentMethod),
        inject: [DATA_SOURCE],
    },
];