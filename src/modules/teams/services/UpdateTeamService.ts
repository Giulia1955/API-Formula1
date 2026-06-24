import { AppDataSource } from "@shared/typeorm/data-source";
import Team from "../typeorm/entities/Team";
import AppError from "@shared/errors/AppError";

import Pilot from "@modules/pilots/typeorm/entities/Pilot";
import Car from "@modules/cars/typeorm/entities/Car";

interface IRequest {
    id: string;
    name: string;
    country: string;
    chef: string;
    pilot_id?: string;
    car_id?: string;
}

export default class UpdateTeamService {
    public async execute({ id, name, country, chef, pilot_id, car_id }: IRequest): Promise<Team>{
        const teamRepository = AppDataSource.getRepository(Team);

        const team = await teamRepository.findOneBy({id});

        if (!team) {
            throw new AppError("Team not found.");
        }

        const teamExists = await teamRepository.findOne({ where: { name } });

        if (teamExists && teamExists.id !== team.id) {
            throw new AppError("There is already a team with this name.");
        }

        team.name = name;
        team.country = country;
        team.chef = chef;

        if (pilot_id) {
            const pilotRepository = AppDataSource.getRepository(Pilot);
            const pilot = await pilotRepository.findOne({ where: { id: pilot_id } });
            if (!pilot) {
                throw new AppError("Pilot not found.");
            }
            team.pilot = pilot;
        }

        if (car_id) {
            const carRepository = AppDataSource.getRepository(Car);
            const car = await carRepository.findOne({ where: { id: car_id } });
            if (!car) {
                throw new AppError("Car not found.");
            }
            team.car = car;
        }

        await teamRepository.save(team);

        return team;
    } 
}