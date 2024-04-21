import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { User } from '../users/users.entity';
import { payment_method } from './payment_methods.enums';

@Entity({ schema: 'bank_api', name: 'PaymentMethods' })

export class PaymentMethod {
    @PrimaryGeneratedColumn()
    id: number;

    @Index("payment_methods_user_id_index")
    @Column()
    user_id: number;

    @Column({
        type: 'simple-enum',
        enum: payment_method
    })
    method_type: payment_method;

    @Column()
    provider: string;

    @Column()
    account_number: string;

    @Column({ nullable: true })
    expiry_date: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, user => user.paymentMethods)
    user: User;
}
