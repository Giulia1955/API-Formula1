import Car from "@modules/cars/typeorm/entities/Car";
import Pilot from "@modules/pilots/typeorm/entities/Pilot";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('teams')
export default class Team {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    country: string;
    @Column()
    chef: string;
    @ManyToOne(
        () => Pilot,
        pilot => pilot.teams
    )
    @JoinColumn({ name: 'pilot_id' })
    pilot: Pilot;
    @ManyToOne(
        () => Car,
        car => car.teams
    )
    @JoinColumn({ name: 'car_id' })
    car: Car;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn() 
    updated_at: Date;  
}