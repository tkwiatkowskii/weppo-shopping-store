import { Router, type Request, type Response, type NextFunction } from 'express';
import ProductSearchParameters from '../models/product.models/ProductSearchParameters.js';
import {
  bindQueryParametersToModel,
  productIsValid,
  updatedProductIsValid,
  validateQueryParameterIdReturnParsedId
} from './route.helpers.js';
import UpdateProductDto from '../models/product.models/UpdateProductDto.js';
import getProductsService from '../services/product.services/getProductsService.js';
import createProductsService from '../services/product.services/createProductService.js';
import updateProductService from '../services/product.services/updateProductService.js';
import deleteProductService from '../services/product.services/deleteProductService.js';
import isAdminMiddleware from '../middleware/isAdminMiddleware.js';
import isLoggedInMiddleware from '../middleware/isLoggedInMiddleware.js';
import { Result } from '../types/result.js';

const router = Router();

router.get('/get-products', isLoggedInMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productSearchParams = bindQueryParametersToModel<ProductSearchParameters>(
      req,
      new ProductSearchParameters()
    );

    const data = await getProductsService(productSearchParams);
    res.status(200).json({
      data: data
    });
  } catch (err) {
    next(err);
  }
});

router.post('/add-product', isAdminMiddleware, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const productDto = req.body;

    if (!productIsValid(productDto)) {
      res.status(400).json({
        message: 'Missing required product fields'
      });
    }

    const createdProduct = await createProductsService(productDto);

    res.status(201).json({
      message: 'Product created successfully',
      product: createdProduct
    });
  } catch (err) {
    next(err);
  }
});

router.put('/update-product', isAdminMiddleware, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updatedProduct: UpdateProductDto = req.body;

    if (!updatedProductIsValid(updatedProduct)) {
      res.status(400).json({
        message: 'Missing required product fields'
      });
    }

    const updatedRowsResult: Result<number> = await updateProductService(updatedProduct);

    if(!updatedRowsResult.success) {
      res.status(404).json({
        message: updatedRowsResult.reason
      });
      return;
    }

    const updatedRows = updatedRowsResult.value;

    res.status(200).json({
      message: 'Product updated successfully',
      numberOfUpdatedRows: updatedRows
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/delete-product', isAdminMiddleware, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const productIdResult: Result<number> = validateQueryParameterIdReturnParsedId(req, res);

    if(!productIdResult.success) {
      res.status(400).json({
        message: productIdResult.reason
      });
      return;
    }
    
    const productId = Number(productIdResult.value); 

    const deletedRowsResult: Result<number> = await deleteProductService(productId);

    if(!deletedRowsResult.success) {
      res.status(404).json({
        message: deletedRowsResult.reason
      });
      return;
    }

    const deletedRows = deletedRowsResult.value;

    res.status(200).json({
      message: 'Product deleted successfully',
      numberOfDeletedRows: deletedRows
    });
  } catch (err) {
    next(err);
  }
});

export default router;
