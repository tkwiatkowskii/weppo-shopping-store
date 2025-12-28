import { Product } from "../../infrastructure/models/index.js";

export default async function deleteProductService(
  name: string): Promise<number> {
  try {
    const deletedRows = await Product.destroy({
      where: { name }
    });

    if (deletedRows === 0) {
      console.log(`No product found with name "${name}"`);
    } else {
      console.log(`Product "${name}" deleted successfully`);
    }

    return deletedRows;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}