import { Controller, Post, Get, Param, Body, HttpException, HttpStatus, Patch } from '@nestjs/common';
import { NotificationService } from './notifications.service';
import { NOTIFICATIONS_CONTROLLER_PATH } from '../constants';
import { notification_status } from './notifications.enums';

@Controller(NOTIFICATIONS_CONTROLLER_PATH)
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @Post()
    async sendNotification(@Body() body: { userId: number; message: string }) {
        try {
            return await this.notificationService.sendNotification(body.userId, body.message);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':userId')
    async getNotifications(@Param('userId') userId: number) {
        try {
            return await this.notificationService.getNotificationsForUser(userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch(':notificationId/status')
    async updateNotificationStatus(@Param('notificationId') notificationId: number, @Body() body: { status: notification_status }) {
        try {
            return await this.notificationService.updateNotificationStatus(notificationId, body.status);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
