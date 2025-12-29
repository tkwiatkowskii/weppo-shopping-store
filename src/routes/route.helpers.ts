import type { Request, Response } from "express";

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
    product.id &&
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
  res: Response): number | null {
  const idParam = req.query['id'];

  if (!idParam || Array.isArray(idParam)) {
    res.status(400).json({
      message: 'Missing or invalid product id'
    });
    return null;
  }

  const productId = parseInt(idParam as string, 10);

  if (isNaN(productId)) {
    res.status(400).json({
      message: 'Product id must be a number'
    });
    return null;
  }

  return productId;
}