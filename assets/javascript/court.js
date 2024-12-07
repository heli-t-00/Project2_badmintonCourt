console.log("x");
// Click to change color areas on court function
function setAllAreas() {
  Array.prototype.slice
    .call(document.getElementsByClassName("area"))
    .forEach(
        area=> {
      area.style.background = "blue";
    });
}

// Move on click
function clickOnArea(event,area){
    console.log(`clickOnArea ${event.pageX}, ${event.pageY},${area.id}`)
}