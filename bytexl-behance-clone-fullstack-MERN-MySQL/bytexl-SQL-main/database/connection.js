import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();

const database = process.env.DATABASE;
const user = process.env.USER;
const password = process.env.PASSWORD;

const sequelize = new Sequelize(database, user, password, {
    host: "localhost",
    dialect: "mysql",
});

try {
    await sequelize.authenticate();
    console.log("Connected to MySQL!");
} catch (error) {
    console.error("Unable to connect to MySQL:", error);
}

export default sequelize;
