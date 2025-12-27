export default class ProductDto {
  public id: number;
  public name: string;
  public category: string;
  public price: number;
  public stock: number;

  constructor(product: any) {
    this.id = product.id;
    this.name = product.name;
    this.category = product.category;
    this.price = Number(product.price);
    this.stock = product.stock;
  }
}