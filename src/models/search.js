import PetsModel from "./pet";
import PaxModel from "./passenger";
import { DEFAULT_LANGUAGE } from "../store/data/types";

export default class Ferry {
  constructor(item) {
    this.created_at = item && item.created_at ? item.created_at : new Date();
    this.direction = item && item.direction ? item.direction : "return";
    this.language = DEFAULT_LANGUAGE;
    this.request =
      item && item.request
        ? item.request
        : [
            {
              out_at: null,
              out_is_open: false,
              ret_at: null,
              ret_is_open: false,
              journey_id: null,
              depart_code: null,
              arrive_code: null,
              company: null,
            },
          ];
    this.passengers =
      item && item.passengers ? item.passengers : [new PaxModel({}).toJson()];
    this.pets = item && item.pets ? item.pets : new PetsModel().toJson();
    this.vehicles = item && item.vehicles ? item.vehicles : [];
  }

  toJson() {
    return JSON.parse(JSON.stringify(this));
  }

  getDirection() {
    return this.direction;
  }

  getCreatedAt() {
    return this.created_at;
  }

  getOutAt() {
    return this.request[0].out_at;
  }

  getRetAt() {
    return this.request[0].ret_at;
  }

  getJourneyId() {
    return this.request[0].journey_id;
  }

  getPassengers() {
    return this.passengers;
  }

  getVehicles() {
    return this.vehicles;
  }

  getRoof() {
    return this.roof;
  }

  getPets() {
    return this.pets;
  }

  setDirection(val) {
    this.direction = val;
  }

  setJourneyId(val) {
    this.request[0].journey_id = val;
  }

  setArriveCode(val) {
    this.request[0].arrive_code = val;
  }

  setDepartCode(val) {
    this.request[0].depart_code = val;
  }

  setCompany(val) {
    this.request[0].company = val;
  }

  setCreatedAt(val) {
    this.created_at = val;
  }

  setOutAt(val) {
    this.request[0].out_at = val;
  }

  setRetAt(val) {
    this.request[0].ret_at = val;
  }

  setPassengers(val) {
    this.passengers = val;
  }

  setVehicles(val) {
    this.vehicles = val;
  }

  setVehicles(val) {
    this.duration = val;
  }

  setPets(val) {
    this.pets = val;
  }

  setOutIsOpen(val) {
    this.request[0].out_is_open = val;
  }

  setRetIsOpen(val) {
    this.request[0].ret_is_open = val;
  }

  setContact(val) {
    this.request[0].contact = val;
  }

  setServices(val) {
    this.services = val;
  }

  setResponse(val) {
    this.response = val;
  }
}
