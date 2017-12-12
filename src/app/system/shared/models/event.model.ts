
export class WFMEvent {
  constructor (
    public type: string,
    public amount: number,
    public category: number,
    public date: string,
    public description: string,
    public id?: string,
    public catName?: string
  ) {
    this.type = type;
    this.amount = amount;
    this.category = category;
    this.date = date;
    this.description = description;
    this.id = id;
    this.catName = catName;
  }
}
