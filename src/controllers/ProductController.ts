import ProductSearchParameters from "../models/product.models/ProductSearchParameters.js";
import { Product } from "../infrastructure/models/index.js";
import ProductDto from "../models/product.models/ProductDto.js";
import ProductsSummaryDto from "../models/product.models/ProductsSummaryDto.js";
import getProductsService from "../services/product.services/getProductsService.js";


export default class ProductController {

  public static async getProducts(
    searchParams: ProductSearchParameters,
  ): Promise<ProductsSummaryDto> {
    
    return getProductsService(searchParams);
  };

  public static AddProduct(product: ProductDto): void {
    createProductService(product);
  }
}
