export default class UpdateProductDto {
  public name: string;
  public newName: string;
  public newCategory: string;
  public newPrice: number;
  public newStock: number;

  constructor(product: any) {
    this.name = product.name;
    this.newName = product.newName;
    this.newCategory = product.newCategory;
    this.newPrice = Number(product.newPrice);
    this.newStock = product.newStock;
  }
}