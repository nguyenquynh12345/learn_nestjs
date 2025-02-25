import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'categories' })
export class Category {
    @PrimaryGeneratedColumn('increment', { unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;
}
