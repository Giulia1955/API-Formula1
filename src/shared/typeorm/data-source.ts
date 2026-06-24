import Car from "../../modules/cars/typeorm/entities/Car";
import User from "../../modules/users/typeorm/entities/User";
import UserTokens from "../../modules/users/typeorm/entities/UserTokens";
import Pilot from "../../modules/pilots/typeorm/entities/Pilot";
import Team from "../../modules/teams/typeorm/entities/Team";
import path from "path";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "docker",
    database: "apiformula1",
    synchronize: false,
    entities: [Car, User, UserTokens, Pilot, Team],
    migrations: [path.join(__dirname, "migrations", "*.{ts,js}")]
});