import carsRouter from "@modules/cars/routes/cars.routes";
import pilotRouter from "@modules/pilots/routes/pilot.routes";
import teamRouter from "@modules/teams/routes/team.routes";
import userRouter from "@modules/users/routes/users.routes";
import sessionsRouter from "@modules/sessions/routes/sessions.routes";
import profileRouter from "@modules/users/routes/profile.routes";
import passwordRouter from "@modules/users/routes/password.routes";
import { Router } from "express";

import nodeHttp = require("node:http");

const routes = Router();
routes.use('/cars', carsRouter);
routes.use('/pilots', pilotRouter);
routes.use('/teams', teamRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/password', passwordRouter);

export default routes;