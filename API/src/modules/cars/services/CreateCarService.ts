import { AppDataSource } from "@shared/typeorm/data-source";
import Car from "../typeorm/entities/Car";
import AppError from "@shared/errors/AppError";

interface IRequest {
    driver: string;
    team: string;
    carNumber: number;
    manufacturer: string;
    championshipPosition: number;
}

export default class CreateCarService {
    public async execute({ driver, team, carNumber, manufacturer, championshipPosition }: IRequest): Promise<Car>{
        const carRepository = AppDataSource.getRepository(Car);

        const carExists = await carRepository.findOne({ where: { driver } });

        if (carExists) {
            throw new AppError("Car already exists.");
        }

        const car = carRepository.create({
            driver, team, carNumber, manufacturer, championshipPosition
        });

        await carRepository.save(car);

        return car;
    } 
}