import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Column } from 'typeorm';
import { Listing } from '../../listings/entities/listing.entity';
import { User } from '../../users/entities/user.entity';

export enum BookingStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
}

@Entity({ name: 'bookings' })
export class Booking {
    @PrimaryGeneratedColumn('increment', { unsigned: true })
    id: number;

    @ManyToOne(() => Listing, (listing) => listing.bookings, { onDelete: 'CASCADE' })
    listing: Listing;

    @ManyToOne(() => User, (user) => user.bookings, { onDelete: 'CASCADE' })
    user: User;

    @Column({
        type: 'enum',
        enum: BookingStatus,
        default: BookingStatus.PENDING,
    })
    status: BookingStatus;

    @CreateDateColumn({ type: 'timestamp' })
    created_date: Date;
}
