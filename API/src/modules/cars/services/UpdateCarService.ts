import { AppDataSource } from "@shared/typeorm/data-source";
import Car from "../typeorm/entities/Car";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string,
    driver: string;
    team: string;
    carNumber: number;
    manufacturer: string;
    championshipPosition: number;
}

export default class UpdateCarService {
    public async execute({ id, driver, team, carNumber, manufacturer, championshipPosition}: IRequest): Promise<Car>{
        const carRepository = AppDataSource.getRepository(Car);

        const car = await carRepository.findOneBy({id});

        if (!car) {
            throw new AppError("Car not found.");
        }

        const carExists = await carRepository.findOne({ where: { driver } });

        if (carExists && carExists.id !== car.id) {
            throw new AppError("There is already a car with this name.");
        }

        car.driver = driver
        car.team = team
        car.carNumber = carNumber
        car.manufacturer = manufacturer
        car.championshipPosition = championshipPosition

        await carRepository.save(car);

        return car;
    } 
}