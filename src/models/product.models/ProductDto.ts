export default class ProductDto {
  public name: string;
  public category: string;
  public price: number;
  public stock: number;

  constructor(product: any) {
    this.name = product.name;
    this.category = product.category;
    this.price = Number(product.price);
    this.stock = product.stock;
  }
}