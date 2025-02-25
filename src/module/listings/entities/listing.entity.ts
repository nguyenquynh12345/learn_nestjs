import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Image } from '../../images/entities/image.entity';
import { User } from '../../users/entities/user.entity';
import { Review } from '../../reviews/entities/review.entity';
import { Favorite } from '../../favorites/entities/favorite.entity';
import { Booking } from '../../bookings/entities/booking.entity';
import { Category } from 'src/module/categories/entities/category.entity';
import { Location } from 'src/module/locations/entities/location.entity';

@Entity({ name: 'listings' })
export class Listing {
    @PrimaryGeneratedColumn('increment', { unsigned: true })
    id: number;

    @ManyToOne(() => User, (user) => user.listings, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'varchar', length: 255, nullable: false })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    address: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    area: number;

    @Column({ type: 'tinyint', default: 1 })
    available: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_date: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_date: Date;

    @OneToMany(() => Image, (image) => image.listing, { cascade: true })
    images: Image[];

    @OneToMany(() => Review, (review) => review.listing, { cascade: true })
    reviews: Review[];

    @OneToMany(() => Favorite, (favorite) => favorite.listing, { cascade: true })
    favorites: Favorite[];

    @OneToMany(() => Booking, (booking) => booking.listing, { cascade: true })
    bookings: Booking[];

    @ManyToOne(() => Location, { nullable: false })
    @JoinColumn({ name: 'location_id' })
    location: Location;

    @ManyToOne(() => Category, { nullable: false })
    @JoinColumn({ name: 'category_id' })

    category: Category;
    @Column({ type: 'boolean', default: false })
    isApproved: boolean;
}

