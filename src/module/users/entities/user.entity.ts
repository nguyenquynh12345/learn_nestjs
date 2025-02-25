import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Listing } from 'src/module/listings/entities/listing.entity';
import { Review } from 'src/module/reviews/entities/review.entity';
import { Favorite } from 'src/module/favorites/entities/favorite.entity';
import { Booking } from 'src/module/bookings/entities/booking.entity';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('increment', { unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;

    @Column({ type: 'varchar', length: 15, nullable: true })
    phone: string;

    @Column({ type: 'enum', enum: ['owner', 'renter'], nullable: false })
    role: 'owner' | 'renter';

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_date: Date;

    @OneToMany(() => Listing, (listing) => listing.user)
    listings: Listing[];

    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[];

    @OneToMany(() => Favorite, (favorite) => favorite.user)
    favorites: Favorite[];

    @OneToMany(() => Booking, (booking) => booking.user)
    bookings: Booking[];
}
