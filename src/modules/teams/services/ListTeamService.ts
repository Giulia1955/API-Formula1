import { AppDataSource } from "@shared/typeorm/data-source";
import Team from "../typeorm/entities/Team";

export default class ListTeamService {
    public async execute(): Promise<Team[]> {
        const teamRepository = AppDataSource.getRepository(Team);
        return teamRepository.find();
    }
}