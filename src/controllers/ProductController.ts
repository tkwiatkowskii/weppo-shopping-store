import { Op } from "sequelize";
import ProductSearchParameters from "../models/product.models/ProductSearchParameters.js";
import { Product } from "../infrastructure/models/index.js";
import ProductDto from "../models/product.models/ProductDto.js";
import ProductsSummaryDto from "../models/product.models/ProductsSummaryDto.js";

export default class ProductController {

  public static async getProducts(
    searchParams: ProductSearchParameters,
    retries = 1
  ): Promise<ProductsSummaryDto> {

    const whereClause: any = {};
    if (searchParams.category !== 'ANY') {
      whereClause.category = searchParams.category;
    }

    if (searchParams.searchFilter !== 'ANY') {
      whereClause.name = { [Op.like]: `%${searchParams.searchFilter}%` };
    }

    const PAGE_SIZE = 10;
    const offset = searchParams.page * PAGE_SIZE;

    try {
      const result = await Product.findAndCountAll({
        where: whereClause,
        limit: PAGE_SIZE,
        offset: offset,
        order: [['name', 'ASC']]
      });

      const productDtos = result.rows.map(row => new ProductDto(row));

      const summary = new ProductsSummaryDto();
      summary.totalItems = result.count;
      summary.currentPage = searchParams.page;
      summary.totalPages = Math.ceil(result.count / PAGE_SIZE);
      summary.products = productDtos;

      return summary;

    } catch (error) {
      console.error('Error fetching products:', error);

      if (retries > 0) {
        console.log(`Retrying query... attempts left: ${retries}`);
        await new Promise(resolve => setTimeout(resolve, 200));
        return this.getProducts(searchParams, retries - 1);
      }

      throw error;
    }
  }
}
