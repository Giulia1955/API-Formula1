import { NextFunction, Request, Response } from "express";
import ListPilotService from "../services/ListPilotService";
import ShowPilotService from "../services/ShowPilotService";
import CreatePilotService from "../services/CreatePilotService";
import UpdatePilotService from "../services/UpdatePilotService";
import DeletePilotService from "../services/DeletePilotService";


export default class PilotController{
    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const listPilot = new ListPilotService();
            const pilots = await listPilot.execute();
            return response.status(200).json(pilots);
        }catch (err) {
            next(err);
        }
    }

    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const id = request.params.id as string;
            const showPilot = new ShowPilotService();
            const pilot = await showPilot.execute({ id });
            return response.status(200).json(pilot);
        }catch (err) {
            next(err);
        }
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const { name, country, type, age } = request.body;
            const createPilot = new CreatePilotService();
            const pilot = await createPilot.execute({ name, country,type, age});

            return response.status(201).json(pilot);
        }catch (err) {
            next(err);
        }
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const id = request.params.id as string;
            const { name, country, type, age } = request.body;
            const updatePilot = new UpdatePilotService();
            const pilot = await updatePilot.execute({ id, name, country, type, age });
            return response.status(200).json(pilot);
        }catch (err) {
            next(err);
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const id = request.params.id as string;
            const deletePilot = new DeletePilotService();
            await deletePilot.execute({ id });
            return response.status(204).send();
        }catch (err) {
            next(err);
        }
    }
}