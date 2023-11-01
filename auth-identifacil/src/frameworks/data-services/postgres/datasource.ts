import { DataSource } from "typeorm";
import { UserEntity } from "./model/user.model";

export const AppDataSource = new DataSource({
  type:'postgres',
  host:"auth-postgres-srv",
  port: 5432,
  username: 'identifacil',
  password:'clave',
  database:'identifacil-auth',
  synchronize: true,
  entities:[UserEntity]
})