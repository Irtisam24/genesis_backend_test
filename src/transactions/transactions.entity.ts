import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index, CreateDateColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { PaymentMethod } from '../payment_methods/payment_methods.entity';
import { transaction_status } from './transactions.enums';

@Entity({ schema: 'bank_api', name: 'Transactions' })
@Index(["user_id", "status"])
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Index("transactions_user_id_index")
    @Column()
    user_id: number;

    @Index("transactions_payment_method_id_index")
    @Column()
    payment_method_id: number;

    @Column('decimal')
    amount: number;

    @Column()
    currency: string;

    @Column({ nullable: true })
    qrCode: string;

    @Index("transactions_status_index")
    @Column({
        type: 'simple-enum',
        enum: transaction_status
    })
    status: transaction_status;

    @Index("transactions_transaction_date_index")
    @CreateDateColumn()
    transaction_date: Date;

    @ManyToOne(() => User, user => user.transactions)
    user: User;

    @ManyToOne(() => PaymentMethod)
    paymentMethod: PaymentMethod;
}
