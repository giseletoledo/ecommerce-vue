import type { Category } from "./category.model";

export class Product {

  constructor(
    public id: number,
    public name: string,
    public img: string,
    public price: number,
    public category: Category,
    public discount?: number
  ) { }
  priceWithDiscountApplied(): number {
    return this.price * (1 - (this.discount || 0));
  };

  get formattedPrice(): string {
    return this.priceWithDiscountApplied().toFixed(2);
  }
}
