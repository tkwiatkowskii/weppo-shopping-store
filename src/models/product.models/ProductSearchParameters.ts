export default class ProductSearchParameters {
  public category: string = "any";
  public name: string = "any";
  public page: number = 0;
  public limit: number = 12;
  public sortType: sortParameters = "name";
  public sortOrder: sortOrder = "asc"
}

type sortParameters = "name" | "price";
type sortOrder = "asc" | "desc";
