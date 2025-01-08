import { Sequelize } from "sequelize";

const db = new Sequelize('task_manager','root','',{
host: 'localhost',
dialect: 'mysql'

});

export default db;