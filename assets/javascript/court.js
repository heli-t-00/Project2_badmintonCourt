console.log("x");

function setAllAreas() {
  Array.prototype.slice
    .call(document.getElementsByClassName("area"))
    .forEach(
        area=> {
      area.style.background = "blue";
    });
}
