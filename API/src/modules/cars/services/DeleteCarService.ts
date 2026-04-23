import { AppDataSource } from "@shared/typeorm/data-source";
import Car from "../typeorm/entities/Car";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string
}

export default class DeleteCarService {
    public async execute({ id }: IRequest): Promise<void> {
        const carRepository = AppDataSource.getRepository(Car);

        const car = await carRepository.findOneBy({id});

        if (!car) {
            throw new AppError("Product not found.");
        }

        await carRepository.remove(car);

    }

}