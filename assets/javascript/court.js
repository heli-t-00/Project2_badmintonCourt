
// Click to change color of areas on court function
// added if/else conditional selection of area to change color using ID
// eg. ALL singles court area has 1 in ID
function setAllAreas(including) {
  Array.prototype.slice
    .call(document.getElementsByClassName("area"))
    .forEach((area) => {
      if (area.id.includes(including)) area.style.background = "blue";
      else area.style.background = "red";
    });
}

// Move on click
function clickOnArea(event, area) {
  console.log(`clickOnArea ${event.pageX}, ${event.pageY},${area.id}`);
}

function showSinglesCourt() {
  setAllAreas("1");
}
function showDoublesCourt() {
  setAllAreas("");
}

function fn1(){
  $(".court").fadeToggle();
}

// Shuttle Moving on court
shuttle = document.getElementById('shuttle');
 function moveShuttle