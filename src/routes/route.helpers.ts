import type { Request, Response } from "express";
import { Result } from "../types/result.js";

export function bindQueryParametersToModel<T>
  (req: any, model: T) {

  for (const key in model) {
    if (req.query[key]) {
      model[key] = req.query[key];
    }
  }

  return model;
}

export function productIsValid(product: any): boolean {
  return product && 
    product.name && 
    product.category && 
    product.price !== null && 
    product.stock !== null;
}

export function updatedProductIsValid(product: any): boolean {
  return product && 
    product.id && 
    product.newName &&
    product.newCategory && 
    product.newPrice !== null && 
    product.newStock !== null;
}

export function validateQueryParameterIdReturnParsedId(
  req: Request,
  _res: Response): Result<number> {
  const idParam = req.query['id'];

  if (!idParam || Array.isArray(idParam)) {
    const result: Result = {
      success: false,
      reason: 'Missing or invalid product id'
    }

    return result;
  }

  const productId = parseInt(idParam as string, 10);

  if (isNaN(productId)) {
    const result: Result = {
      success: false,
      reason: 'Product id must be a number'
    }

    return result;
  }

  const result: Result<number> = {
    success: true,
    value: productId
  }
  return result;
}