import ProductSearchParameters from "../models/product.models/ProductSearchParameters.js";
import ProductDto from "../models/product.models/ProductDto.js";
import ProductsSummaryDto from "../models/product.models/ProductsSummaryDto.js";
import getProductsService from "../services/product.services/getProductsService.js";
import createProductService from "../services/product.services/createProductService.js";

export default class ProductController {

  public static async getProducts(
    searchParams: ProductSearchParameters,
  ): Promise<ProductsSummaryDto> {
    
    return getProductsService(searchParams);
  };

  public static addProduct(product: ProductDto): void {
    createProductService(product);
  }
}
