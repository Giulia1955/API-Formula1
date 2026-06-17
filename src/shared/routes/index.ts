import carsRouter from "@modules/cars/routes/cars.routes";
import { Router } from "express";
import nodeHttp = require("node:http");

const routes = Router();
routes.use('/cars', carsRouter);

export default routes;