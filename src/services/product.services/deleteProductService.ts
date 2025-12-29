import { Product } from "../../infrastructure/models/index.js";

export default async function deleteProductService(
  id: number): Promise<number> {
  try {
    const deletedRows = await Product.destroy({
      where: { id } 
    });

    if (deletedRows === 0) {
      console.log(`No product found with id ${id}`);
    } else {
      console.log(`Product with id ${id} deleted successfully`);
    }

    return deletedRows;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}