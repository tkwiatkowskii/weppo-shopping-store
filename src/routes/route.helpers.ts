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
    product.name && 
    product.newName &&
    product.newCategory && 
    product.newPrice !== null && 
    product.newStock !== null;
}