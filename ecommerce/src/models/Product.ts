import { Category } from './Category'

export class Product {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public category: Category
  ) {}

  get formattedPrice(): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(this.price)
  }
}
