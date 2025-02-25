import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Listing } from '../../listings/entities/listing.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'favorites' })
export class Favorite {
    @PrimaryGeneratedColumn('increment', { unsigned: true })
    id: number;

    @ManyToOne(() => Listing, (listing) => listing.favorites, { onDelete: 'CASCADE' })
    listing: Listing;

    @ManyToOne(() => User, (user) => user.favorites, { onDelete: 'CASCADE' })
    user: User;

    @CreateDateColumn({ type: 'timestamp' })
    created_date: Date;
}
