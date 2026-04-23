import { AppDataSource } from "@shared/typeorm/data-source";
import Car from "../typeorm/entities/Car";

export default class ListCarService {
    public async execute(): Promise<Car[]> {
        const carRepository = AppDataSource.getRepository(Car);
        return carRepository.find();
    }
}