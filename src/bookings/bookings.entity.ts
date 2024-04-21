import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index, OneToMany } from 'typeorm';
import { User } from '../users/users.entity';
import { booking_status } from './bookings.enums';
import { Review } from '../reviews/reviews.entity';

@Entity({ schema: 'bank_api', name: 'Bookings' })
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Index("bookings_user_id_index")
    @Column()
    user_id: number;

    @Column()
    service_description: string;

    @Index("bookings_status_index")
    @Column({
        type: 'simple-enum',
        enum: booking_status
    })
    status: booking_status;

    @Column('decimal')
    total_cost: number;

    @Column()
    currency: string;

    @Index("bookings_booked_date_index")
    @Column({ default: () => "CURRENT_TIMESTAMP" })
    booked_date: Date;

    @Index("bookings_completed_data_index")
    @Column({ nullable: true })
    completed_date: Date;


    @ManyToOne(() => User, user => user.bookings)
    user: User;

    @OneToMany(() => Review, review => review.booking)
    reviews: Review[];
}