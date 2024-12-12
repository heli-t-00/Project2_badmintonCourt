// Changes the background color of areas on the court 
// added if/else conditional selection of area to change color using ID in this case its 'area'
// eg. ALL singles court area has 1 in ID
function setAllAreas(including) {
  Array.prototype.slice
    .call(document.getElementsByClassName("area"))
    .forEach((area) => {
      if (area.id.includes(including)) area.style.background = "blue";
      else area.style.background = "darkred";
    });
}

// Calculates the angle in degrees between the origin (0, 0) and a point (x, y).
// use Math.atan2(y, x) - Computes the angle used by determining x and y
// Converts the angle to degrees by multiplying with (180 / Math.PI).
// Ensures the angle is positive by adding 360 if it's negative.

function getAngleInDegrees(x, y) {
  angle = Math.round(Math.atan2(y, x) * (180 / Math.PI));
  return angle < 0 ? (angle += 360) : angle;
}

/* Moves a shuttle element to a specified (x, y) position on the page. and set the scale to s*/
function moveShuttle(shuttle, x, y) {
  /*Logs the current position and properties of the shuttle. */
  console.log(
    `Shuttle top=${shuttle.style.top}` +
      ` left=${shuttle.style.left}` +
      ` zoom=${shuttle.style.zoom}` +
      ` transform=${shuttle.style.transform}`
  );
  o = shuttle.getBoundingClientRect(); /* gets the old position */
  console.log(`moveShuttle (${o.left},${o.top})`);
  /* set the new position */
  shuttle.style.top = `${y - o.height / 2}px`;
  shuttle.style.left = `${x - o.width / 2}px`;
  // shuttle.style.scale=`${s}%`;
  shuttleImage = document.getElementById("shuttleimage");
  shuttleImage.style.zoom = `${s}%`;
  console.log(
    `Shuttle top=${shuttle.style.top}` +
      ` left=${shuttle.style.left}` +
      ` zoom=${shuttle.style.zoom}` +
      ` transform=${shuttle.style.transform}`
  );
}

// Moves the shuttle when an area on the court is clicked.
function clickOnArea(event, area) {
  console.log(`clickOnArea ${event.pageX}, ${event.pageY},${area.id}`);
  // Logs the click event's coordinates and the clicked area's id
  let shuttle = document.getElementById("shuttle");
  // Finds the shuttle element using getElementById("shuttle").
  if (area && shuttle) {
    moveShuttle(shuttle, event.pageX, event.pageY);
  }
  // Calls moveShuttle with the shuttle element and the click event's pageX and pageY coordinates.
}


// Highlights the singles court areas.
// this function Calls setAllAreas with the string "1" refer to html where i've names the areas with unique id name 
// This highlights all areas with id containing "1" by setting their background to blue, and the rest to red.
function showSinglesCourt() {
  setAllAreas("1");
}
// Highlights the doubles court areas
function showDoublesCourt() {
  setAllAreas("");
}



// Allows court to appear and intro to fade out

function showCourt() {
  court = document.getElementsByClassName("court")[0];
  court.style.opacity = "100%";
  court.style.transition = "opacity 5s";
  intro = document.getElementsByClassName("intro")[0];
  intro.style.display = "none";
  bar = document.getElementsByClassName("bar")[0];
  bar.style.display = "flex";
  shuttle = document.getElementById("shuttle");
  shuttle.style.display = "block";
}

