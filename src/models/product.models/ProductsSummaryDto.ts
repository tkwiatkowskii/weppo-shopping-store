import ProductDto from "./ProductDto.js";

export default class ProductsSummaryDto {
  public totalItems: number = 0;
  public currentPage: number = 0;
  public totalPages: number = 0
  public products: ProductDto[] = [];
}

