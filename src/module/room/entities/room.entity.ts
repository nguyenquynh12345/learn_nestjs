import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('rooms') // Trỏ đến bảng 'rooms' trong database
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  capacity: number;

  @Column()
  imageUrl: string;

  @Column()
  roomType: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({
    type: 'enum',
    enum: ['available', 'unavailable'],
    default: 'available',
  })
  status: 'available' | 'unavailable';

  @CreateDateColumn()
  created_at: Date;
}
