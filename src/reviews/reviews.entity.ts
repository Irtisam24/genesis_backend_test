import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index, CreateDateColumn } from 'typeorm';
import { Booking } from '../bookings/bookings.entity';

@Entity({ schema: 'bank_api', name: 'Reviews' })
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Index("reviews_booking_id_index")
  @Column()
  booking_id: number;

  @ManyToOne(() => Booking, booking => booking.reviews)
  booking: Booking;

  @Column()
  user_id: number;

  @Column('decimal')
  rating: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  created_at: Date;
}
