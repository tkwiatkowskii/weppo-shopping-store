import { Product } from '../../infrastructure/models/index.js';
import ProductDto from '../../models/product.models/ProductDto.js';

export default async function createProductsService(
  product: ProductDto
): Promise<ProductDto> {
  try {
    const createdRow = await Product.create({
      name: product.name,
      category: product.category,
      stock: product.stock,
      price: product.price,
    });

    return new ProductDto(createdRow);
  } catch (error) {
    console.error("Couldn't add the element into the database");
    throw error;
  }
}
