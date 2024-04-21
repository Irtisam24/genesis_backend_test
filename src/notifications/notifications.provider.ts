import { DataSource } from 'typeorm';
import { Notification } from './notifications.entity';
import { DATA_SOURCE, NOTIFICATION_REPOSITORY } from '../constants';

export const notificationProviders = [
    {
        provide: NOTIFICATION_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Notification),
        inject: [DATA_SOURCE],
    },
];