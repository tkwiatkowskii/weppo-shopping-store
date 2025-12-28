import express, { ErrorRequestHandler} from 'express';
import { sequelize } from './infrastructure/models/index.js';
import bodyParser from 'body-parser';
import { configureSequelizeSessionMiddleware } from './middleware/configureSequelizeSessionMiddleware.js';
import authMiddleware from './middleware/authMiddleware.js';
import productRouter from './routes/products.routes.js'

try {
  await sequelize.authenticate();
  await sequelize.sync({ force: true, logging: console.log });
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
  process.exit(1);
}
const app = express();

const PORT = 3000;

configureSequelizeSessionMiddleware(app, sequelize);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './views');

const globalErrorHandler: ErrorRequestHandler =
  (err, _req, res, _next) => {
    console.error(err);

    res.status(500).json({
      message: 'Internal server error'
    });
  };
  
app.use('/product', productRouter);

app.use(globalErrorHandler);

app.get('/dashboard', authMiddleware, async (_req, res, next) => {
  try {
    res.json("dssd").send();
  } catch (err) {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

