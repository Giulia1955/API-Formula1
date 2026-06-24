import { In, Repository } from "typeorm";
import Team from "../entities/Team";
import { AppDataSource } from "@shared/typeorm/data-source";

interface IFindTeams{
    id: string;
}

export default class TeamRepository {
    private ormRepository: Repository<Team>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(Team);
    }

    /*
    public async find(): Promise<Team[]>{
        return this.ormRepository.find({
            relations: {
                orders_products: true
            }
        });
    }*/

    public async findByName(name: string): Promise<Team | null> {
        const team = await this.ormRepository.findOne({ where: { name } });
        return team || null;
    }

    public async findAllById(teams : IFindTeams[]) : Promise<Team[]>{
        const teamIds = teams.map((t) => t.id);
        const existsTeams = await this.ormRepository.find({
            where: {
                id: In(teamIds)
            }
        });
        return existsTeams;
    }

    public async save(teams: Team[]): Promise<Team[]> {
        return this.ormRepository.save(teams);
    }

}