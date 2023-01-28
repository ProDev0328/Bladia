export const DIRECTION_OUTWARD = "outward";
export const DIRECTION_RETURN = "return";
export const LANGS = [
  { key: "en", name: "English" },
  { key: "fr", name: "Français" },
  { key: "de", name: "Deutschland" },
  { key: "nl", name: "Netherlandian" },
  { key: "es", name: "Español" },
  { key: "it", name: "Italian" },
];
export const DEFAULT_LANGUAGE = "fr";

export const CURRENCIES = [
  { key: "eur", symbol: "€" },
  { key: "usd", symbol: "$" },
  { key: "gbp", symbol: "£" },
];

export const COOKIE_EXPIRATION_TIME = 1800; //1800s

//auth
export const SET_LOGGED_IN = "setLoggedIn";
export const GET_LOGGED_IN = "getLoggedIn";
export const LOG_IN = "logIn";
export const LOG_OUT = "logOut";
export const UPDATE_USER = "updateUser";
export const INIT_CONFIG = "initConfig";
export const INIT_BANNER = "initBanner";
export const SET_CONFIG = "setConfig";
export const GET_CONFIG = "getConfig";
export const SET_BANNER = "setBanner";
export const SET_USERINFO = "setUserInfo";
export const GET_USERINFO = "getUserInfo";

//social login
export const SOCIAL_LOG_IN = "socialLogIn";

//localStorage
export const STORAGE_CONFIG = "config";
export const STORAGE_BANNER = "banner";
export const STORAGE_VEHICLE = "vehicles";
export const STORAGE_JOURNEY = "journey";
export const STORAGE_TRANSPORTER = "transporter";

//Journey list
export const INIT_JOURNEY = "initJourney";
export const FETCH_JOURNEY = "fetchJourney";
export const SET_JOURNEY = "setJourney";
export const GET_JOURNEY = "getJourney";
export const GET_BASE_JOURNEYS = "getBaseJourneys";
export const GET_JOURNEY_GROUPS = "getJourneyGroups";
export const SEARCH_JOURNEY = "searchJourney";
export const CHANGE_SCREEN = "changeScreen";
export const GET_SCREEN = "getScreen";
export const GET_SELECTEDITEM = "getSelectedItem";
export const GET_RELATEDITEMS = "getRelatedItems";

//Transport list
export const GET_TRANSPORTER = "getTransporter";
export const INIT_TRANSPORTER = "initTransporter";
export const GET_BASE_TRANSPORTER = "getBaseTransporters";
export const SET_TRANSPORTER = "setTransporter";
export const SEARCH_TRANSPORTER = "searchTransporter";
export const GET_TRANSPORTER_SELECTEDITEM = "getTransporterSelectedItem";
export const GET_TRANSPORTER_RELATEDITEMS = "getTransporterRelatedItems";
export const GET_TRANSPORTER__SCREEN = "getTransporterScreen";
export const TRANSPORTER_CHANGE_SCREEN = "transporterChangeScreen";

/*
export const FETCH_JOURNEY = "fetchJourney";


export const GET_JOURNEY_GROUPS = "getJourneyGroups";




*/

// VEHICLE
export const INIT_VEHICLE = "initVehicle";
export const FETCH_VEHICLE = "fetchVehicle";
export const SET_VEHICLE = "setVehicle";
export const GET_VEHICLE = "getVehicle";
export const SEARCH_VEHICLE = "searchVehicle";
export const GET_SCREEN_VEH = "getScreenVeh";
export const GET_SELECTEDITEM_VEH = "getSelectedItemVeh";
export const GET_SELECTED_VEHICLE = "getSelectedVehicle";

export const SET_SELECTED_CODE = "setSelectedCode";
export const SET_SELECTED_MODEL = "setSelectedModel";
export const SET_SELECTED_BRAND = "setSelectedBrand";
export const SET_SELECTED_LENGTH = "setSelectedLength";
export const SET_SELECTED_HEIGHT = "setSelectedHeight";
export const SET_SELECTED_TYPE = "setSelectedType";

export const GET_SELECTED_CODE = "getSelectedCode";
export const GET_SELECTED_MODEL = "getSelectedModel";
export const GET_SELECTED_BRAND = "getSelectedBrand";
export const GET_SELECTED_LENGTH = "getSelectedLength";
export const GET_SELECTED_HEIGHT = "getSelectedHeight";
export const GET_SELECTED_TYPE = "getSelectedType";

//Search
export const GET_SEARCH_JOURNEY = "getSearchJourney";
export const SET_JOURNEY_DIRECTION = "setJourneyDirection";
export const GET_JOURNEY_DIRECTION = "getJourneyDirection";
export const GET_OUT_JOURNEY_ID = "getOutJourneyId";
export const FETCH_SELECTED_JOURNEY = "fetchSelectedJourney";
export const SET_SELECTED_JOURNEY = "setSelectedJourney";
export const GET_SELECTED_JOURNEY = "getSelectedJourney";
export const GET_OUT_VALID_DATES = "getOutValidDates";
export const GET_RET_VALID_DATES = "getRetValidDates";
export const SET_OUT_AT = "setOutAt";
export const GET_OUT_AT = "getOutAt";
export const GET_OUTJOURNEYS = "getOutJourneys";
export const SET_RET_AT = "setRetAt";
export const GET_RET_AT = "getRetAt";
export const GET_RETJOURNEYS = "getRetJourneys";
export const GET_OUT_TIME = "getOutTime";
export const SET_OUT_TIME = "setOutTime";
export const GET_RET_TIME = "getRetTime";
export const SET_RET_TIME = "setRetTime";
export const SET_PASSENGER = "setPassenger";
export const SET_ADULT_TOTAL = "setAdultCount";
export const GET_ADULT_TOTAL = "getAdultCount";
export const SET_CHILDREN_TOTAL = "setChildrenCount";
export const GET_CHILDREN_TOTAL = "getChildrenCount";
export const SET_PETS = "setPets";
export const GET_PETS = "getPets";
export const SET_SELECTED_VEHICLE_TYPE = "setSelectedVehicleType";
export const GET_SELECTED_VEHICLE_TYPE = "getSelectedVehicleType";
export const GET_VEHICLE_BRANDS = "getVehicleBrands";
export const GET_FILTERED_VEHICLE_BRANDS = "getFilteredVehicleBrands";
export const SET_VEHICLE_BRANDS = "setVehicleBrands";
export const FETCH_VEHICLE_BRANDS = "fetchVehicleBrands";
export const SET_SELECTED_VEHICLE_BRAND = "setSelectedVehicleBrand";
export const GET_SELECTED_VEHICLE_BRAND = "getSelectedVehicleBrand";
export const GET_MODELS = "getModels";
export const SET_SELECTED_VEHICLE = "setSelectedVehicle";
export const SET_VEHICLE_IDENTIFICATION = "setVehicleIdentification";
export const GET_VEHICLE_IDENTIFICATION = "getVehicleIdentification";
export const GET_SELECTED_PASSENGERS = "getSelectedPassengers";
export const SET_PASSENGER_DETAIL = "setPassengerDetail";
export const SET_SERVICES = "setServices";
export const GET_SERVICES = "getServices";
export const SET_MEAL = "setMeal";
export const GET_MEAL = "getMeal";
export const GET_MEAL_QUANTITY = "getMealQuantity";
export const SET_MEAL_QUANTITY = "setMealQuantity";
export const SET_CONTACT_INFO = "setContactInfo";
export const GET_CONTACT_INFO = "getContactInfo";
export const FETCH_SEARCHED_RESPOSNE = "fetchSearchedResponse";
export const SET_SEARCHED_RESPONSE = "setSearchedData";
export const GET_SEARCHED_RESPONSE = "getSearchedData";
export const SET_SEARCHED_ERRORS = "setSearchedErrors";
export const GET_SEARCHED_ERRORS = "getSearchedErrors";
export const SET_RESULT_TOTAL_COST = "setResultTotalCost";
export const GET_RESULT_TOTAL_COST = "getResultTotalCost";
export const SET_BOOKING_RESULT = "setBookingResult";
export const GET_BOOKING_RESULT = "getBookingResult";
export const GET_USER_BOOKINGS = "getUserBookings";
export const SET_USER_BOOKINGS = "setUserBookings";
export const FETCH_USER_BOOKINGS = "fetchUserBookings";
export const GET_LOAD_BOOKINGS_STATUS = "loadUserBookingStatus";
export const SET_DURATION = "setduration";
export const SET_TARIFFS = "settariffs";
export const SET_STOPS = "setstops";
export const SET_ID = "setid";
export const SET_PARTNER = "setpartner";
export const SET_PLACES = "setplaces";
export const SET_LOGO = "setlogo";
export const SET_DISTRIBUTOR = "setdistributor";
export const REMOVE_SEARCHED_RESPONSE = "removeSearchedResponse";

// search final
export const GET_SEARCHED_RESULT = "getSearchedResult";
export const SET_SEARCHED_STATUS = "setSearchedStatus";
export const SET_SEARCHED_STATUSES = "setSearchedStatuses";
export const GET_SEARCHED_STATUS = "getSearchedStatus";
export const GET_SEARCHED_STATUSES = "getSearchedStatuses";

//result
export const SET_DEPARTURE_AT = "setDepartureAt";
export const GET_DEPARTURE_AT = "getDepartureAt";
export const SET_RETURN_AT = "setReturnAt";
export const GET_RETURN_AT = "getReturnAt";
export const SET_INSTALLATION = "setInstallation";
export const GET_INSTALLATION = "getInsallation";

//i18n
export const SET_LANGUAGE = "setLanguage";
export const GET_LANGUAGE = "getLanguage";

// currencies
export const SET_CURRENCY = "setCurrency";
export const GET_CURRENCY = "getCurrency";

export const SET_INSTALLATION_RETURN = "setInsttaltionReturn";
export const GET_INSTALLATION_RETURN = "getInsttaltionReturn";
