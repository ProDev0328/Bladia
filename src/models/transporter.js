export default class Transporter {
  constructor(item) {
    this.id = item.id;
    this.name = item.name;
    this.email = item.email;
    this.phone = item.phone;
    this.address = item.address;
    this.city = item.city;
    this.code_postal = item.code_postal;
    this.comment = item.comment;
    this.website = item.website;
    this.slug = item.slug;
    this.currency = item.currency;
  }
}