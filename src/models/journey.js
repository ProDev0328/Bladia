export default class Journey {
  constructor(item) {
    this.id = item.id;
    this.name = item.name;
    this.company = item.company;
    this.zone = item.zone;
    this.__related_id = item.__related_id;
    this.arrive_code = item.arrive_code;
    this.depart_code = item.depart_code;
  }
}