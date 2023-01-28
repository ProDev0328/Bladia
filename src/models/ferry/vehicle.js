export default class Vehicle {
  constructor(item) {
    this.brand_id = item.brand_id;
    this.brand_name = item.brand_name;
    this.code = item.code;
    this.id = item._id;
    this.length = item.length;
    this.model = item.model;
    this.prefer = item.prefer;
    this.status = item.status;
    this.type = item.type;
    this.vehicle_id = item.vehicle_id;
  }
  
  toJson() {
    return JSON.parse(JSON.stringify(this));
  }
}