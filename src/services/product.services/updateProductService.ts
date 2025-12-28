import UpdateProductDto from "../../models/product.models/updateProductDto.js";
import { Product } from "../../infrastructure/models/index.js";

export default async function updateProductService(
  product: UpdateProductDto): Promise<number> {
  try {
    const [updatedRows] = await Product.update(
      {
        name: product.newName,
        category: product.newCategory,
        price: product.newPrice,
        stock: product.newStock
      },
      {
        where: { name: product.name } 
      });

    if (updatedRows === 0) {
      console.log(`No product found with name "${product.name}"`);
    } else {
      console.log(`Product "${product.name}" updated successfully`);
    }

    return updatedRows;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}