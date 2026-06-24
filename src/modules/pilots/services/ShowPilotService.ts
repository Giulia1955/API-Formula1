import AppError from "@shared/errors/AppError";
import Pilot from "../typeorm/entities/Pilot";
import { AppDataSource } from "@shared/typeorm/data-source";

interface IRequest {
    id: string;
}
export default class ShowPilotService {
    public async execute({ id }: IRequest): Promise<Pilot> {
        const pilotRepository = AppDataSource.getRepository(Pilot);

        const pilot = await pilotRepository.findOneBy({id});

        if (!pilot) {
            throw new AppError("Pilot not found.");
        }

        return pilot;
    }

}