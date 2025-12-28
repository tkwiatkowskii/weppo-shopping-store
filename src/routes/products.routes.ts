import { Router, type Request, type Response, type NextFunction } from 'express';
import ProductSearchParameters from '../models/product.models/ProductSearchParameters.js';
import {
  bindQueryParametersToModel,
  productIsValid,
  updatedProductIsValid
} from './route.helpers.js';
import ProductController from '../controllers/ProductController.js';
import UpdateProductDto from '../models/product.models/UpdateProductDto.js';

const router = Router();

router.get('/get-products', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productSearchParams = bindQueryParametersToModel<ProductSearchParameters>(
      req,
      new ProductSearchParameters()
    );

    const data = await ProductController.getProducts(productSearchParams);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/add-product', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const productDto = req.body;

    if (!productIsValid(productDto)) {
      res.status(400).json({
        message: 'Missing required product fields'
      });
    }

    const createdProduct = await ProductController.addProduct(productDto);

    res.status(201).json({
      message: 'Product created successfully',
      product: createdProduct
    });
  } catch (err) {
    next(err);
  }
});

router.put('/update-product', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updatedProduct: UpdateProductDto = req.body;

    if (!updatedProductIsValid(updatedProduct)) {
      res.status(400).json({
        message: 'Missing required product fields'
      });
    }

    const updatedRows = await ProductController.updateProduct(updatedProduct);

    res.status(200).json({
      message: 'Product updated successfully',
      updatedRows
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/delete-product', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const productToBeDeleted = req.query["name"]?.toString();

    if (!productToBeDeleted) {
      res.status(400).json({
        message: 'Missing required product fields'
      });
    }

    const deletedRows = await ProductController.deleteProduct(productToBeDeleted!);

    res.status(200).json({
      message: 'Product deleted successfully',
      deletedRows
    });
  } catch (err) {
    next(err);
  }
});

export default router;
