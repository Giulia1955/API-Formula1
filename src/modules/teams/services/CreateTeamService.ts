import { AppDataSource } from "@shared/typeorm/data-source";
import Team from "../typeorm/entities/Team";
import AppError from "@shared/errors/AppError";

import Pilot from "@modules/pilots/typeorm/entities/Pilot";
import Car from "@modules/cars/typeorm/entities/Car";

interface IRequest {
    name: string;
    country: string;
    chef: string;
    pilot_id?: string;
    car_id?: string;
}

export default class CreateTeamService {
    public async execute({ name, country, chef, pilot_id, car_id }: IRequest): Promise<Team>{
        const teamRepository = AppDataSource.getRepository(Team);

        const teamExists = await teamRepository.findOne({ where: { name } });

        if (teamExists) {
            throw new AppError("Team already exists.");
        }

        let pilot;
        if (pilot_id) {
            const pilotRepository = AppDataSource.getRepository(Pilot);
            pilot = await pilotRepository.findOne({ where: { id: pilot_id } });
            if (!pilot) {
                throw new AppError("Pilot not found.");
            }
        }

        let car;
        if (car_id) {
            const carRepository = AppDataSource.getRepository(Car);
            car = await carRepository.findOne({ where: { id: car_id } });
            if (!car) {
                throw new AppError("Car not found.");
            }
        }

        const teamData: Partial<Team> = {
            name,
            country,
            chef
        };

        if (pilot) {
            teamData.pilot = pilot;
        }

        if (car) {
            teamData.car = car;
        }

        const team = teamRepository.create(teamData);

        await teamRepository.save(team);

        return team;
    } 
}