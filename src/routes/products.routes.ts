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
import { Result } from '../types/result.js';
import getAllUsersForAdminService from '../services/userInformation.services/getAllUsersForAdminService.js';
import getAllOrdersService from '../services/userInformation.services/getAllOrdersService.js';



const router = Router();

router.get('/get-products', async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const queryPage = req.query['page'];
    const pageInput = parseInt(queryPage as string);
    const validPage = isNaN(pageInput) ? 0 : pageInput;

    const productSearchParams = bindQueryParametersToModel<ProductSearchParameters>(
      req,
      new ProductSearchParameters()
    );
    productSearchParams['page'] = validPage;
    const data = await getProductsService(productSearchParams);

    res.render('index', {
      data: data,
      query: req.query,
      errorMessage: null,
      session: req.session
    });
  } catch (err: any) {
    console.error("!!! BŁĄD KRYTYCZNY W TRASIE !!!", err);
    res.status(500).send("Wystąpił błąd: " + err.message);
  }
});

router.post('/add-product', isAdminMiddleware, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const productDto = req.body;

    if (!productIsValid(productDto)) {
      res.status(400).json({
        message: 'Missing required product fields'
      });
      return;
    }

   await createProductsService(productDto);

    
    res.redirect('/product/admin');
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

router.get('/admin', isAdminMiddleware, async (req, res, next) => {
  try {
    const queryPage = req.query['page'];
    const pageInput = parseInt(queryPage as string);
    const validPage = isNaN(pageInput) ? 0 : pageInput;

    const defaultParams = {
      category: 'any',
      name: 'any',
      page: validPage,
      limit: 100,
      sortOrder: 'ASC',
      sortType: 'id',
    };

    const productsSummary = await getProductsService(defaultParams as any); 
    
    const status = req.query['status'] as string | undefined;
    const users = await getAllUsersForAdminService();
    const orders = await getAllOrdersService(status);

    console.log("Admin Panel: Rendering with", productsSummary.products.length, "products");

    res.render('admin', { 
      products: productsSummary.products,
      users: users, 
      orders: orders,
    });
  } catch (err) {
    console.error("Błąd w trasie admina:", err);
    next(err);
  }
});
export default router;
