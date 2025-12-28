import express, { ErrorRequestHandler} from 'express';
import { sequelize } from './infrastructure/models/index.js';
import { addProductsRoute, getProductsRoute, updateProductsRoute, deleteProductsRoute } from './routes/products.routes.js';

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

app.use(express.json());

const globalErrorHandler: ErrorRequestHandler =
  (err, _req, res, _next) => {
    console.error(err);

    res.status(500).json({
      message: 'Internal server error'
    });
  };

getProductsRoute(app);
addProductsRoute(app);
updateProductsRoute(app);
deleteProductsRoute(app);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
