export default class CartProductDto {
  public id: number
  public name: string;
  public category: string;
  public price: number;
  public stock: number;
  public quantity: number;

  constructor(product: any, quantity: number) {
    this.id = product.id
    this.name = product.name;
    this.category = product.category;
    this.price = Number(product.price);
    this.stock = product.stock;
    this.quantity = quantity;
  }
}