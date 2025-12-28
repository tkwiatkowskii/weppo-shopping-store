import type { Express } from 'express';
import ProductSearchParameters from '../models/product.models/ProductSearchParameters.js';
import { BindQueryParametersToModel } from './route.helpers.js';
import ProductController from '../controllers/ProductController.js';

function getProductsRoute(app: Express) {
  app.get('/get-products', async (req, res, next) => {

  try {
    const productSearchParams = BindQueryParametersToModel<ProductSearchParameters>(
      req,
      new ProductSearchParameters()
    );

    const data = await ProductController.getProducts(productSearchParams);

    res.json(data);
  } catch (err) {
    next(err); 
    return;
  }
  });
};

function addProductsRoute(app: Express) {
  app.post('/add-product', async (req, res, next) => {
    try {
      const ProductDto = await req.body;

      if (
        !ProductDto.name || 
        !ProductDto.category || 
        ProductDto.price == null || 
        ProductDto.stock == null) {
        return res.status(400).json({
          message: 'Missing required product fields'
        });
      }

      ProductController.addProduct(ProductDto);

      return res.status(201).json({
        message: 'Product created successfully'
      });
    } catch (err) {
      next(err);
      return;
    }
  });
}

async function updateProductsRoute(app: Express) {
  app.put('/updateProducts', (_req, _res) => {

  });
};

async function deleteProductsRoute(app: Express) {
  app.delete('/deleteProducts', (_req, _res) => {

  });
};

export {
  getProductsRoute,
  addProductsRoute,
  updateProductsRoute,
  deleteProductsRoute
}