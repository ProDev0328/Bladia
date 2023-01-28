export default class VehicleBrand {
  
  constructor(item) {
    this.id = item.id;
    this.name = item.name;
    this.prefer = item.prefer;
    this.status = item.status;
    this.logo = item.logo;
  }
  
  toJson() {
    return JSON.parse(JSON.stringify(this));
  }
}