import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm';
import { User } from '../users/users.entity';
import { notification_status } from './notifications.enums';

@Entity({ schema: 'bank_api', name: 'Notifications' })
@Index(["user_id", "status"])
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Index("notifications_user_id_index")
  @Column()
  user_id: number;

  @ManyToOne(() => User, user => user.notifications)
  user: User;

  @Column()
  message: string;

  @Index("notifications_status_index")
  @Column({
    type: 'simple-enum',
    enum: notification_status
  })
  status: notification_status;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  notification_date: Date;
}
