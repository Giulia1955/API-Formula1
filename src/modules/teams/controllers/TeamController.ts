import { NextFunction, Request, Response } from "express";
import ListTeamService from "../services/ListTeamService";
import ShowTeamService from "../services/ShowTeamService";
import CreateTeamService from "../services/CreateTeamService";
import UpdateTeamService from "../services/UpdateTeamService";
import DeleteTeamService from "../services/DeleteTeamService";

export default class TeamController{
    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const listTeam = new ListTeamService();
            const teams = await listTeam.execute();
            return response.status(200).json(teams);
        }catch (err) {
            next(err);
        }
    }

    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const id = request.params.id as string;
            const showTeam = new ShowTeamService();
            const team = await showTeam.execute({ id });
            return response.status(200).json(team);
        }catch (err) {
            next(err);
        }
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const { name, country, chef, pilot_id, car_id } = request.body;
            const createTeam = new CreateTeamService();
            const team = await createTeam.execute({ name, country, chef, pilot_id, car_id });
            return response.status(201).json(team);
        }catch (err) {
            next(err);
        }
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const id = request.params.id as string;
            const { name, country, chef, pilot_id, car_id } = request.body;
            const updateTeam = new UpdateTeamService();
            const team = await updateTeam.execute({ id, name, country, chef, pilot_id, car_id });
            return response.status(200).json(team);
        }catch (err) {
            next(err);
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const id = request.params.id as string;
            const deleteTeam = new DeleteTeamService();
            await deleteTeam.execute({ id });
            return response.status(204).send();
        }catch (err) {
            next(err);
        }
    }
}