import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ default: null })
  uuid: string;

  @Column({ default: null })
  shortUuid: string;

  @Column({ default: null })
  firstName: string;

  @Column({ default: null })
  lastName: string; 

  @Column({ default: false })
  isActive: boolean;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  passwordSalt: string;

  @Column({ default: null })
  primaryPhone: string;

  @CreateDateColumn({
    name: 'created_date',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;

  @UpdateDateColumn({
    name: 'modified_date',
    type: 'timestamptz',
    nullable: true,
  })
  modifiedDate: Date;
}
