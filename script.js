function showSectionZero() {
  const element = document.getElementById("ExploreSolar");
  const sectionZero = document.getElementById("sectionZero");
  const sectionOne = document.getElementById("sectionOne");
  sectionOne.classList.remove("Show");
  sectionOne.classList.remove("noTransition");
  setTimeout(() => {
    sectionOne.classList.add("HideDown");
  }, 1000);
  setTimeout(() => {
    element.classList.remove("Hide");
    sectionZero.classList.add("Show");
    sectionZero.classList.remove("Dexists");
    sectionZero.classList.remove("Hide");
    sectionZero.classList.remove("HideDown");
    sectionZero.classList.remove("HideUp");
    sectionOne.classList.add("Dexists");
  }, 750);
}
function showSectionOne() {
  const element = document.getElementById("ExploreSolar");
  const sectionZero = document.getElementById("sectionZero");
  const sectionOne = document.getElementById("sectionOne");
  element.classList.add("Hide");
  sectionZero.classList.remove("Show");
  sectionZero.classList.remove("noTransition");
  setTimeout(() => {
    sectionZero.classList.add("HideUp");
  }, 1500);
  setTimeout(() => {
    sectionZero.classList.add("Dexists");
    sectionOne.classList.add("Show");
    sectionOne.classList.remove("Hide");
    sectionOne.classList.remove("HideUp");
    sectionOne.classList.remove("HideDown");
    sectionOne.classList.remove("Dexists");
  }, 1000);
}
function from3ToUp(hide1name, showname, isForward) {
  const hide1 = document.getElementById(hide1name);
  const show = document.getElementById(showname);
  hide1.classList.remove("Show");
  hide1.classList.remove("noTransition");
  setTimeout(() => {
    hide1.classList.add(isForward ? "HideUp" : "HideDown");
  }, 1000);
  setTimeout(() => {
    show.classList.add("Show");
    show.classList.remove("Hide");
    show.classList.remove("HideDown");
    show.classList.remove("HideUp");
    show.classList.remove("Dexists");
    hide1.classList.add("Dexists");
  }, 1250);
}
function goBack(hide1name) {
  const hide1 = document.getElementById(hide1name);
  hide1.classList.remove("Show");
  hide1.classList.remove("noTransition");
  setTimeout(() => {
    hide1.classList.add("HideUp");
  }, 500);
  setTimeout(() => {
    hide1.classList.add("Dexists");
  }, 1500);
  showSectionZero();
}
window.addEventListener("DOMContentLoaded", () => {
  const sectionZero = document.getElementById("sectionZero");
  sectionZero.style.top = "0px";
  sectionZero.style.y = "0px";
});
