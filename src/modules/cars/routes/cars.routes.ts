import { Router } from 'express';
import CarsController from '../controllers/CarController';
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const carsRouter = Router();
const carsController = new CarsController(); 

carsRouter.use(isAuthenticated);

carsRouter.get('/', async (req, res, next) => {
    try {
    await carsController.index(req, res, next);
    } catch (err) {
    next(err);
    }
});

carsRouter.get("/:id", (celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
})), async (req, res, next) => {
    try{
        await carsController.show(req, res, next);
    } catch (error) {
        next(error);
    }
});

carsRouter.post('/', (celebrate({
    [Segments.BODY]: {
        driver: Joi.string().required(),
        team: Joi.string().required(),
        carNumber: Joi.number().integer().required(),
        manufacturer: Joi.string().required(),
        championshipPosition: Joi.number().positive().min(1).max(22).required()
    }
})), async (req, res, next) => {
    try {
    await carsController.create(req, res, next);
    } catch (err) {
    next(err);
    }
});
carsRouter.put('/:id', (celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
        driver: Joi.string().required(),
        team: Joi.string().required(),
        carNumber: Joi.number().integer().required(),
        manufacturer: Joi.string().required(),
        championshipPosition: Joi.number().positive().min(1).max(22).required()
    }
})), async (req, res, next) => {
    try {
    await carsController.update(req, res, next);
    } catch (err) {
    next(err);
    }
});
carsRouter.delete('/:id', (celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
})), async (req, res, next) => {
    try {
    await carsController.delete(req, res, next);
    } catch (err) {
    next(err);
    }
});
export default carsRouter;