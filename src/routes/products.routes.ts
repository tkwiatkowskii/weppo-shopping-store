import type { Express } from 'express';
import ProductSearchParameters from '../models/product.models/ProductSearchParameters.js';
import { bindQueryParametersToModel, productIsValid } from './route.helpers.js';
import ProductController from '../controllers/ProductController.js';
import { updatedProductIsValid } from './route.helpers.js';
import UpdateProductDto from '../models/product.models/updateProductDto.js';

function getProductsRoute(app: Express) {
  app.get('/get-products', async (req, res, next) => {

  try {
    const productSearchParams = bindQueryParametersToModel<ProductSearchParameters>(
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

      if (!productIsValid(ProductDto)) {
        return res.status(400).json({
          message: 'Missing required product fields'
        });
      }

      const createdProduct = await ProductController.addProduct(ProductDto);

      return res.status(201).json({
        message: 'Product created successfully',
        product: createdProduct
      });
    } catch (err) {
      next(err);
      return;
    }
  });
}

async function updateProductsRoute(app: Express) {
  app.put('/update-product', async (req, res, next) => {
    try {
      const updatedProduct: UpdateProductDto = await req.body;

      if (!updatedProductIsValid(updatedProduct)) {
        return res.status(400).json({
          message: 'Missing required product fields'
        });
      } else {
        const updatedRows = await ProductController
          .updateProduct(updatedProduct);
        return res.status(201).json({
          message: 'Product updated successfully',
          updatedRows: updatedRows
        });
      }
    } catch (err) {
      next(err);
      return;
    }
  });
};

async function deleteProductsRoute(app: Express) {
  app.delete('/delete-product', async (req, res, next) => {
    try {
      const productToBeDeleted = req.query["name"]?.toString();

      if (!productToBeDeleted) {
        return res.status(400).json({
          message: 'Missing required product fields'
        });
      } else {
        const deletedRows = await ProductController.deleteProduct(productToBeDeleted);
        return res.status(201).json({
          message: 'Product deleted successfully',
          deletedRows: deletedRows
        });
      }
    } catch (err) {
      next(err);
      return;
    }
  });
};

export {
  getProductsRoute,
  addProductsRoute,
  updateProductsRoute,
  deleteProductsRoute
}