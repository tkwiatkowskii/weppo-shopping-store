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
      return res.redirect('/product/get-products?error=' + result.reason);
    }
    res.redirect('/cart'); 
  } catch (err) {
    next(err);
  }
});

router.get('/', isLoggedInMiddleware, async (req, res, next) => {
  try {
    const items = await getCartProductsService(req);
    const products = items.map(item => new CartProductDto(item.Product, (item as any).quantity));
    res.render('cart', {
      products: products
    });
  } catch (err) {
    next(err);
  }
});

router.get('/', isLoggedInMiddleware, async (req, res, next) => {
  try {
    const items = await getCartProductsService(req);

    const products = items.map(item => new CartProductDto(item.Product, (item as any).quantity));

    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache'); 
   res.render('cart', {
      products: products});
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

    res.redirect('/cart');
  } catch (err) {
    next(err);
  }
});


export default router;
