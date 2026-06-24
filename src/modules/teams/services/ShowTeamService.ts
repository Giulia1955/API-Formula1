import AppError from "@shared/errors/AppError";
import Team from "../typeorm/entities/Team";
import { AppDataSource } from "@shared/typeorm/data-source";

interface IRequest {
    id: string;
}
export default class ShowTeamService {
    public async execute({ id }: IRequest): Promise<Team> {
        const teamRepository = AppDataSource.getRepository(Team);

        const team = await teamRepository.findOneBy({id});

        if (!team) {
            throw new AppError("Team not found.");
        }

        return team;
    }

}