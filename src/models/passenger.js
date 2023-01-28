export default class PaxModel {
  constructor(item) {
    this.order = item && item.order ? item.order : 1;
    this.type = item && item.type ? item.type : "Adult";
    this.age = item && item.age ? item.age : "+18";
    this.gender = item && item.gender ? item.gender : "Male";
    this.is_resident = item && item.is_resident ? item.is_resident : false;
    this.first_name = item && item.first_name ? item.first_name : "";
    this.last_name = item && item.last_name ? item.last_name : "";
    this.nationality = item && item.nationality ? item.nationality : "";
    this.doc_number = item && item.doc_number ? item.doc_number : "";
    this.doc_type = "Passport";
    this.birth_date = item && item.birth_date ? item.birth_date : "";
  }

  toJson() {
    return JSON.parse(JSON.stringify(this));
  }
}
