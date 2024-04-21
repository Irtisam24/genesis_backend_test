import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Index } from 'typeorm';
import { PaymentMethod } from "../payment_methods/payment_methods.entity";
import { Booking } from '../bookings/bookings.entity';
import { Transaction } from '../transactions/transactions.entity';
import { Notification } from '../notifications/notifications.entity';

@Entity({ schema: 'bank_api', name: 'Users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Index("users_username_index")
    @Column({ unique: true })
    username: string;

    @Column()
    full_name: string;

    @Index("users_email_index")
    @Column({ unique: true })
    email: string;

    @Column()
    pass: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => PaymentMethod, paymentMethod => paymentMethod.user)
    paymentMethods: PaymentMethod[];

    @OneToMany(() => Booking, booking => booking.user)
    bookings: Booking[];

    @OneToMany(() => Transaction, transaction => transaction.user)
    transactions: Transaction[];

    @OneToMany(() => Notification, notifications => notifications.user)
    notifications: Notification[];

}
