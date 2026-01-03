import { Product } from "../../infrastructure/models/index.js";
import { Result } from "../../types/result.js";

export default async function deleteProductService(
  id: number
): Promise<Result<number>> {
  try {
    const deletedRows = await Product.destroy({
      where: { id } 
    });

    let result: Result<number>;

    if (deletedRows === 0) {
      result = {
        success: false,
        reason: `No product found with id ${id}`
      };
    } else {
      result = {
        success: true,
        value: deletedRows
      }
    }

    return result;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}