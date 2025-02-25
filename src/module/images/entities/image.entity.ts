import { Listing } from 'src/module/listings/entities/listing.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'images' })
export class Image {
    @PrimaryGeneratedColumn('increment', { unsigned: true })
    id: number;

    @Column({ type: 'text', nullable: false })
    url: string;

    @ManyToOne(() => Listing, (listing) => listing.images, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'listing_id' })
    listing: Listing;
}
