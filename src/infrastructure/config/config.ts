import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  'postgres',
  'postgres',
  'postgres',
  {
    host: 'db',
    port: 5432,
    dialect: 'postgres',
    logging: false,
    retry: {
      max: 5
    },
    dialectOptions: {
      connectTimeout: 10000
    }
  }
);
export default sequelize;
