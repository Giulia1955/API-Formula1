import Team from "@modules/teams/typeorm/entities/Team";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('pilots')
export default class Pilot {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    country: string
    @Column()
    type: string;
    @Column('int')
    age: number;
    @OneToMany(
        () => Team,
        team => team.pilot
    )
    teams: Team[];
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}