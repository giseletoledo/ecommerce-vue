export class Category {
  constructor(
    public id: number,
    public name: string
  ) {}

  toString(): string {
    return this.name
  }
}
