import express, { ErrorRequestHandler} from 'express';
import { sequelize } from './infrastructure/models/index.js';
import bodyParser from 'body-parser';
import { configureSequelizeSessionMiddleware } from './middleware/configureSequelizeSessionMiddleware.js';
import productRouter from './routes/products.routes.js'
import authRouter from './routes/auth.routes.js'
import cartRouter from './routes/cart.routes.js'
import userInformationRouter from './routes/userInformation.routes.js'
import seedProducts from './infrastructure/seeders/seedProduct.js';
import seedAdmin from './infrastructure/seeders/seedAdmin.js';

try {
  await sequelize.authenticate();
  await sequelize.sync({
    // force: true, 
    logging: console.log 
  });
  seedProducts();
  seedAdmin();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to perform basic operations on database:', error);
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
app.use('/', authRouter);
app.use('/cart', cartRouter);
app.use('/admin', userInformationRouter);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

