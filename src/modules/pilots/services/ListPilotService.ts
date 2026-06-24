import { AppDataSource } from "@shared/typeorm/data-source";
import Pilot from "../typeorm/entities/Pilot";


export default class ListPilotService {
    public async execute(): Promise<Pilot[]> {
        const pilotRepository = AppDataSource.getRepository(Pilot);
        return pilotRepository.find();
    }
}