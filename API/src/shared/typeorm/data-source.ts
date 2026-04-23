import Car from "API/src/modules/cars/typeorm/entities/Car";
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
    entities: [Car],
    migrations: [path.join("API", "src", "shared", "typeorm", "migrations", "*.ts")]
});