import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";
import Car from "../typeorm/entities/Car";

interface IRequest {
    id: string;
}
export default class ShowCarService {
    public async execute({ id }: IRequest): Promise<Car> {
        const carRepository = AppDataSource.getRepository(Car);

        const car = await carRepository.findOneBy({id});

        if (!car) {
            throw new AppError("Car not found.");
        }

        return car;
    }

}