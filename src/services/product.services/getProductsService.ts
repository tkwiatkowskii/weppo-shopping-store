import { Op } from "sequelize";
import ProductSearchParameters from "../../models/product.models/ProductSearchParameters.js";
import { Product } from "../../infrastructure/models/index.js";
import ProductDto from "../../models/product.models/ProductDto.js";
import ProductsSummaryDto from "../../models/product.models/ProductsSummaryDto.js";

export default async function getProductsService(
  searchParams: ProductSearchParameters,
  retries = 1
): Promise<ProductsSummaryDto> {

  const whereClause: any = {};
  if (searchParams.category !== 'any') {
    whereClause.category = { [Op.iLike]: searchParams.category };
  }

  if (searchParams.name !== 'any') {
    whereClause.name = { [Op.iLike]: `%${searchParams.name}%` };
  }

  const querySortOrder = searchParams.sortOrder;
  const querySortType = searchParams.sortType;

 const PAGE_SIZE = (searchParams as any).limit || 12; 

const offset = searchParams.page * PAGE_SIZE;

try {
  const result = await Product.findAndCountAll({
    where: whereClause,
    limit: PAGE_SIZE, 
    offset: offset,
    order: [[`${querySortType}`, `${querySortOrder}`]]
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
      return getProductsService(searchParams, retries - 1);
    }

    throw error;
  };
};