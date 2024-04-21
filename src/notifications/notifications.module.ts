import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/db.module';
import { notificationProviders } from './notifications.provider';
import { NotificationService } from './notifications.service';
import { NotificationController } from './notifications.controller';

@Module({
    imports: [DatabaseModule],
    providers: [
        ...notificationProviders,
        NotificationService,
    ],
    controllers: [NotificationController]
})
export class NotificationsModule { }
