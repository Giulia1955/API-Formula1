import { AppDataSource } from "@shared/typeorm/data-source";
import Pilot from "../typeorm/entities/Pilot"
import AppError from "@shared/errors/AppError";


interface IRequest {
    id: string;
    name: string;
    country: string;
    type: string;
    age: number;
}

export default class UpdatePilotService {
    public async execute({ id, name, country, type, age }: IRequest): Promise<Pilot> {
        const pilotRepository = AppDataSource.getRepository(Pilot);

        const pilot = await pilotRepository.findOneBy({ id });

        if (!pilot) {
            throw new AppError("Pilot not found.");
        }

        const pilotExists = await pilotRepository.findOne({ where: { name } });

        if (pilotExists && pilotExists.id !== pilot.id) {
            throw new AppError("There is already a pilot with this name.");
        }

        pilot.name = name;
        pilot.country = country;
        pilot.type = type;
        pilot.age = age;

        await pilotRepository.save(pilot);

        return pilot;
    } 
}