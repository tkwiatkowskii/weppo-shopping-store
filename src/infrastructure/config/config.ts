import { Sequelize } from 'sequelize';

function getEnv(name: string): string {
  const value = process.env[name];
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

const DB_NAME = getEnv('DB_NAME');
const DB_USER = getEnv('DB_USER');
const DB_PASSWORD = getEnv('DB_PASSWORD');
const DB_HOST = getEnv('DB_HOST');

const DB_PORT: number = Number(process.env['DB_PORT']) || 5432;
const DB_LOGGING: boolean = process.env['DB_LOGGING'] === 'true';
const DB_RETRY_MAX: number = Number(process.env['DB_RETRY_MAX']) || 5;
const DB_CONNECT_TIMEOUT: number =
  Number(process.env['DB_CONNECT_TIMEOUT']) || 10000;

const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    logging: DB_LOGGING ? console.log : false,
    retry: { max: DB_RETRY_MAX },
    dialectOptions: {
      connectTimeout: DB_CONNECT_TIMEOUT
    }
  }
);

export default sequelize;
