import { Router } from "express";
import PilotController from "../controllers/PilotController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";


const pilotRouter = Router();
const pilotController = new PilotController();

pilotRouter.use(isAuthenticated);

pilotRouter.get("/", async (req, res, next) => {
    try{
        await pilotController.index(req, res, next);
    } catch (error) {
        next(error);
    }
});

pilotRouter.get("/:id", (celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
})), async (req, res, next) => {
    try{
        await pilotController.show(req, res, next);
    } catch (error) {
        next(error);
    }
});

pilotRouter.post("/",
    (celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            country: Joi.string().required(),
            type: Joi.string().required(),
            age: Joi.number().required()
        }
    })), async (req, res, next) => {
    try{
        await pilotController.create(req, res, next);
    } catch (error) {
        next(error);
    }
});

pilotRouter.put("/:id", celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
        name: Joi.string().required(),
        country: Joi.string().required(),
        type: Joi.string().required(),
        age: Joi.number().required()
    }
}), async (req, res, next) => {
    try{
        await pilotController.update(req, res, next);
    } catch (error) {
        next(error);
    }
});

pilotRouter.delete("/:id", celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}), async (req, res, next) => {
    try{
        await pilotController.delete(req, res, next);
    } catch (error) {
        next(error);
    }
});

export default pilotRouter;