import { Listing } from 'src/module/listings/entities/listing.entity';
import { User } from 'src/module/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

@Entity({ name: 'reviews' })
export class Review {
    @PrimaryGeneratedColumn('increment', { unsigned: true })
    id: number;

    @ManyToOne(() => Listing, (listing) => listing.reviews, { onDelete: 'CASCADE' })
    listing: Listing;

    @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
    user: User;

    @Column({ type: 'int', nullable: false })
    rating: number;

    @Column({ type: 'text', nullable: true })
    comment: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_date: Date;
}
