import ProductSearchParameters from "../models/product.models/ProductSearchParameters.js";
import ProductDto from "../models/product.models/ProductDto.js";
import ProductsSummaryDto from "../models/product.models/ProductsSummaryDto.js";
import getProductsService from "../services/product.services/getProductsService.js";
import createProductService from "../services/product.services/createProductService.js";
import UpdateProductDto from "../models/product.models/updateProductDto.js";
import updateProductService from "../services/product.services/updateProductService.js";
import deleteProductService from "../services/product.services/deleteProductService.js";

export default class ProductController {

  public static async getProducts(
    searchParams: ProductSearchParameters,
  ): Promise<ProductsSummaryDto> {
    
    return getProductsService(searchParams);
  };

  public static addProduct(product: ProductDto): Promise<ProductDto> {
    return createProductService(product);
  }

  public static updateProduct(product: UpdateProductDto): Promise<number> {
    return updateProductService(product);
  }

  public static deleteProduct(product: string): Promise<number> {
    return deleteProductService(product);
  }
}
