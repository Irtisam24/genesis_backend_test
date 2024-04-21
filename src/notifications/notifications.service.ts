import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Notification } from './notifications.entity';
import { NOTIFICATION_REPOSITORY } from '../constants';
import { notification_status } from './notifications.enums';

@Injectable()
export class NotificationService {
    constructor(
        @Inject(NOTIFICATION_REPOSITORY)
        private notificationRepository: Repository<Notification>,
    ) { }

    async sendNotification(userId: number, message: string): Promise<Notification> {
        try {
            const notification = this.notificationRepository.create({
                user_id: userId,
                message,
                status: notification_status.unread,
                notification_date: new Date()
            });
            return await this.notificationRepository.save(notification);
        } catch (error) {
            throw new HttpException('Failed to send notification', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getNotificationsForUser(userId: number): Promise<Notification[]> {
        try {
            return await this.notificationRepository.find({
                where: { user_id: userId }
            });
        } catch (error) {
            throw new HttpException('Failed to retrieve notifications: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateNotificationStatus(notificationId: number, status: notification_status): Promise<Notification> {
        try {
            const notification = await this.notificationRepository.findOneBy({ id: notificationId });
            if (!notification) {
                throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
            }
            notification.status = status;
            return await this.notificationRepository.save(notification);
        } catch (error) {
            throw new HttpException('Failed to update notification status: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
