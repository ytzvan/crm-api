import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Products {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  category: string; // can be changed to relation to one-to-many

  @Column()
  price: number;

  @Column()
  comments: string;
}
