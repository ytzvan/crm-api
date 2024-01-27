import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ default: '' })
  uuid: string;

  @Column({ default: '' })
  shortUuid: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: false })
  isActive: boolean;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  passwordSalt: string;

  @Column()
  primaryPhone: string;
}
