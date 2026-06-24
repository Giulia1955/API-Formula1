import { Router } from "express";
import TeamController from "../controllers/TeamController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const teamRouter = Router();
const teamController = new TeamController();

teamRouter.use(isAuthenticated);

teamRouter.get("/", async (req, res, next) => {
    try{
        await teamController.index(req, res, next);
    } catch (error) {
        next(error);
    }
});

teamRouter.get("/:id", (celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
})), async (req, res, next) => {
    try{
        await teamController.show(req, res, next);
    } catch (error) {
        next(error);
    }
});

teamRouter.post("/",
    (celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            country: Joi.string().required(),
            chef: Joi.string().required(),
            pilot_id: Joi.string().uuid().optional(),
            car_id: Joi.string().uuid().optional()
        }
    })), async (req, res, next) => {
    try{
        await teamController.create(req, res, next);
    } catch (error) {
        next(error);
    }
});

teamRouter.put("/:id", celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
        name: Joi.string().required(),
        country: Joi.string().required(),
        chef: Joi.string().required(),
        pilot_id: Joi.string().uuid().optional(),
        car_id: Joi.string().uuid().optional()
    }
}), async (req, res, next) => {
    try{
        await teamController.update(req, res, next);
    } catch (error) {
        next(error);
    }
});

teamRouter.delete("/:id", celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}), async (req, res, next) => {
    try{
        await teamController.delete(req, res, next);
    } catch (error) {
        next(error);
    }
});

export default teamRouter;