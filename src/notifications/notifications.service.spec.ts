import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notifications.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Notification } from './notifications.entity';
import { NotFoundException } from '@nestjs/common';
import { notification_status } from './notifications.enums';

describe('NotificationService', () => {
    let service: NotificationService;
    let mockNotificationRepository: { save: any; findOne: any; };

    beforeEach(async () => {
        mockNotificationRepository = {
            findOne: jest.fn(),
            save: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                NotificationService,
                {
                    provide: getRepositoryToken(Notification),
                    useValue: mockNotificationRepository,
                },
            ],
        }).compile();

        service = module.get<NotificationService>(NotificationService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('sendNotification', () => {
        it('should successfully save a notification', async () => {
            const notificationData = { userId: 1, message: "Hello, test!" };
            mockNotificationRepository.save.mockResolvedValue(notificationData);

            const result = await service.sendNotification(notificationData.userId, notificationData.message);
            expect(result).toEqual(notificationData);
            expect(mockNotificationRepository.save).toHaveBeenCalledWith(notificationData);
        });
    });

    describe('updateNotificationStatus', () => {
        it('should update the status of a notification', async () => {
            const notificationId = 1;
            const status = notification_status.read;
            const notification = { id: notificationId, userId: 1, message: "Test Message", status: notification_status.unread };
            mockNotificationRepository.findOne.mockResolvedValue(notification);
            mockNotificationRepository.save.mockImplementation((notification: Notification) => Promise.resolve({ ...notification, status }));

            const updatedNotification = await service.updateNotificationStatus(notificationId, status);
            expect(updatedNotification.status).toBe(status);
            expect(mockNotificationRepository.save).toHaveBeenCalled();
        });

        it('should throw an error if notification not found', async () => {
            const notificationId = 1;
            mockNotificationRepository.findOne.mockResolvedValue(null);

            await expect(service.updateNotificationStatus(notificationId, notification_status.read))
                .rejects.toThrow(NotFoundException);
        });
    });
});
