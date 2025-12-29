export default class UpdateProductDto {
  public id: number;
  public newName: string;
  public newCategory: string;
  public newPrice: number;
  public newStock: number;

  constructor(product: any) {
    this.id = product.id;
    this.newName = product.newName;
    this.newCategory = product.newCategory;
    this.newPrice = Number(product.newPrice);
    this.newStock = product.newStock;
  }
}