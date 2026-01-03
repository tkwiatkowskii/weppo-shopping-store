import UpdateProductDto from "../../models/product.models/UpdateProductDto.js";
import { Product } from "../../infrastructure/models/index.js";
import { Result } from "../../types/result.js";

export default async function updateProductService(
  product: UpdateProductDto
): Promise<Result<number>> {
  try {
    const [updatedRows] = await Product.update(
      {
        name: product.newName,
        category: product.newCategory,
        price: product.newPrice,
        stock: product.newStock
      },
      {
        where: { id: product.id } 
      });

    let result: Result<number>;

    if (updatedRows === 0) {
      result = {
        reason: `No product found with id "${product.id}"`,
        success: false
      }
    } else {
      result = {
        success: true,
        value: updatedRows
      }
    }

    return result;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}