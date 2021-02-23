import render from "./spa/spa";
// import calendar from "./calendar/calendar";
// import detailPopup from "./detail/detail_popup";
// import addDetaillist from "./add-detail-list/add-detail-list";

// calendar();
// detailPopup();
// addDetaillist();

window.addEventListener("DOMContentLoaded", render);
window.addEventListener("hashchange", render);
