import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('locations')
export class Location {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ nullable: true })
    parent_id?: number;
}
