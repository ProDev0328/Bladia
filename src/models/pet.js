export default class PetsModel {
  constructor(item) {
    this.dogs = item && item.dogs ? item.dogs : 0;
    this.dogs30 = item && item.dogs30 ? item.dogs30 : 0;
    this.cats = item && item.cats ? item.cats : 0;
  }

  toJson() {
    return JSON.parse(JSON.stringify(this));
  }
}
