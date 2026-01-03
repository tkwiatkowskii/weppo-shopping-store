import express from 'express';
import isLoggedInMiddleware from '../middleware/isLoggedInMiddleware.js';
import addToCartService from '../services/cart.services/addToCartService.js';
import getCartProductsService from '../services/cart.services/getCartProductsService.js';
import CartProductDto from '../models/product.models/CartProductDto.js';
import reduceCartItemQuantityService from '../services/cart.services/reduceCartItemQuantityService.js';
import placeOrderService from '../services/cart.services/placeOrderService.js';
import { Result } from '../types/result.js';

const router = express.Router();

router.post('/add-to-cart', isLoggedInMiddleware, async (req, res, next) => {
  try {
    const result: Result<[number, number, number]> = await addToCartService(req, res);
    if (!result.success) {
      if (result.reason === 'Invalid productId') {
        res.status(404).json({
          message: result.reason
        })
      }
      else {
        res.status(400).json({
          message: result.reason
        })
      }
      return;
    }

    if(result.value === undefined) {
      console.log("Typescript idk");
      return;
    }
    
    const [productQuantity, productId, lineTotal] = result.value;
    res.status(200).json({
      productQuantity: productQuantity,
      productId: productId,
      lineTotal: lineTotal
    })
  } catch (err) {
    next(err);
  }
});

router.get('/', isLoggedInMiddleware, async (req, res, next) => {
  try {
    const items = await getCartProductsService(req);

    const products = items.map(item => new CartProductDto(item.Product, (item as any).quantity));

    res.status(200).json({
      products: products
    });
  } catch (err) {
    next(err);
  }
});

router.put('/place-order', isLoggedInMiddleware, async (req, res, next) => {
  try {
    const result: Result<number> = await placeOrderService(req);

    if (!result.success) {
      if (result.reason === 'No open order to place' ) {
        res.status(404).json({
          message: result.reason
        });
        return;
      } else {
        res.status(400).json({
          message: result.reason
        });
        return;
      }
    }

    return res.json({
      numberOfDifferentProductsBought: result.value
    });
  } catch (err) {
    next(err);
    return;
  }
});

router.post('/remove', isLoggedInMiddleware, async (req, res, next) => {
  try {
    const result: Result<number> = await reduceCartItemQuantityService(req, res);

    if (!result.success) {
      res.status(400).json({
        message: result.reason
      });
      return;
    }

    res.status(200).json({
      newQuantity: result.value
    });
  } catch (err) {
    next(err);
  }
});


export default router;
