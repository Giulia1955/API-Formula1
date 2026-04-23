import { NextFunction, Request, Response } from "express";
import ListCarService from "../services/ListCarService";
import ShowCarService from "../services/ShowCarService";
import CreateCarService from "../services/CreateCarService";
import UpdateCarService from "../services/UpdateCarService";
import DeleteCarService from "../services/DeleteCarService";

export default class CarController{
    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const listCar = new ListCarService();
            const cars = await listCar.execute();
            return response.status(200).json(cars);
        }catch (err) {
            next(err);
        }
    }

    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const id = request.params.id as string;
            const showCar = new ShowCarService();
            const car = await showCar.execute({ id });
            return response.status(200).json(car);
        }catch (err) {
            next(err);
        }
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const { driver, team, carNumber, manufacturer, championshipPosition } = request.body;
            const createCar = new CreateCarService();
            const car = await createCar.execute({ driver, team, carNumber, manufacturer, championshipPosition  });
            return response.status(201).json(car);
        }catch (err) {
            next(err);
        }
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const id = request.params.id as string;
            const { driver, team, carNumber, manufacturer, championshipPosition  } = request.body;
            const updateCar = new UpdateCarService();
            const car = await updateCar.execute({ id, driver, team, carNumber, manufacturer, championshipPosition  });
            return response.status(200).json(car);
        }catch (err) {
            next(err);
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const id = request.params.id as string;
            const deleteCar = new DeleteCarService();
            await deleteCar.execute({ id });
            return response.status(204).send();
        }catch (err) {
            next(err);
        }
    }
}