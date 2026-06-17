import { AppDataSource } from "@shared/typeorm/data-source";
import { Repository } from "typeorm";
import Car from "../entities/Car";

export default class CarRepository{
    private ormRepository: Repository<Car>;
    constructor() {
    this.ormRepository = AppDataSource.getRepository(Car);
    }
    public async findByName(driver: string): Promise<Car| null> {
    const car = await this.ormRepository.findOne({
    where: { driver },
    });
    return car;
    }
}
 