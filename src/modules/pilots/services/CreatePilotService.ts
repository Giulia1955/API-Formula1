import { AppDataSource } from "@shared/typeorm/data-source";
import Pilot from "../typeorm/entities/Pilot";
import AppError from "@shared/errors/AppError";

interface IRequest {
    name: string;
    country: string;
    type: string;
    age: number;
}

export default class CreatePilotService {
    public async execute({ name, country, type, age }: IRequest): Promise<Pilot>{
        const pilotRepository = AppDataSource.getRepository(Pilot);

        const pilotExists = await pilotRepository.findOne({ where: { name } });

        if (pilotExists) {
            throw new AppError("Pilot already exists.");
        }

        const pilot = pilotRepository.create({
            name,
            country,
            type,
            age
        });

        await pilotRepository.save(pilot);
      
        return pilot;
    } 
}