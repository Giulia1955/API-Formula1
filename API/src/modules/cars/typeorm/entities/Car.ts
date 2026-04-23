import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('cars') 
export default class Car {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    driver: string;
    @Column()
    team: string;
    @Column('int')
    carNumber: number;
    @Column()
    manufacturer: string;
    @Column('int')
    championshipPosition: number;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn() 
    updated_at: Date;  
}