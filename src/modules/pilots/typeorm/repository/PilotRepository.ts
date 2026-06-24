import { In, Repository } from "typeorm";
import Pilot from "../entities/Pilot";
import { AppDataSource } from "@shared/typeorm/data-source";


interface IFindPilots {
    id: string;
}

export default class PilotRepository {
    private ormRepository: Repository<Pilot>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(Pilot);
    }

    /*
    public async find(): Promise<Pilot[]>{
        return this.ormRepository.find({
            relations: {
                orders_products: true
            }
        });
    }*/

    public async findByName(name: string): Promise<Pilot | null> {
        const pilot = await this.ormRepository.findOne({ where: { name } });
        return pilot || null;
    }

    public async findAllById(pilots : IFindPilots[]) : Promise<Pilot[]>{
        const pilotIds = pilots.map((p) => p.id);
        const existsPilots = await this.ormRepository.find({
            where: {
                id: In(pilotIds)
            }
        });
        return existsPilots;
    }

    public async save(pilots: Pilot[]): Promise<Pilot[]> {
        return this.ormRepository.save(pilots);
    }

}