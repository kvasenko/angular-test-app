
export class Category {
  constructor (public name: string, public capacity: number, public id?: number) {
    this.name = name;
    this.capacity = capacity;
    this.id = id;
  }
}
