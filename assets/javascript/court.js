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

function getAngleInDegrees(x, y) {
  angle = Math.round(Math.atan2(y, x) * (180 / Math.PI));
  return angle < 0 ? (angle += 360) : angle;
}

/* Move the shuttle to x,y and set the scale to s*/
function moveShuttle(shuttle, x, y) {
  console.log(
    `Shuttle top=${shuttle.style.top}` +
      ` left=${shuttle.style.left}` +
      ` zoom=${shuttle.style.zoom}` +
      ` transform=${shuttle.style.transform}`
  );
  o = shuttle.getBoundingClientRect(); /* old position */
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

// Move on click
function clickOnArea(event, area) {
  console.log(`clickOnArea ${event.pageX}, ${event.pageY},${area.id}`);
  let shuttle = document.getElementById("shuttle");
  if (area && shuttle) {
    moveShuttle(shuttle, event.pageX, event.pageY);
  }
}

function showSinglesCourt() {
  setAllAreas("1");
}
function showDoublesCourt() {
  setAllAreas("");
}

// W3 school Animation CODE
function myMove() {
  let id = null;
  const elem = document.getElementById("animate");
  let pos = 0;
  clearInterval(id);
  id = setInterval(frame, 5);
  function frame() {
    if (pos == 350) {
      clearInterval(id);
    } else {
      pos++;
      elem.style.top = pos + "px";
      elem.style.left = pos + "px";
    }
  }
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

//  TRY to write a fade in fade out function using jQuery
// function fn1(){
//   $(".court").fadeToggle();
// }

// Shuttle Moving on court - to check
// function moveOnClick(event, el) {
//   let shuttle = document.getElementsByClassName("shuttle")[0];
//   if (el && shuttle) {
//     let bcr = el.getBoundingClientRect();
//     let ibcr = shuttle.getBoundingClientRect();
//     moveShuttle(shuttle, event.clientX - 25, event.clientY - 25, 0, 30);
//     shuttle.style.transitionProperty = "all";
//     shuttle.style.transitionDuration = "1s";
//   }
// }

// const shuttle = document.getElementById("shuttle");

// // Move the shuttle to the center of clicked area
// document.querySelectorAll(".area").forEach((area) => {
//   area.addEventListener("click", function () {
//     const rect = this.getBoundingClientRect();
//     shuttle.style.top = `${
//       rect.top + window.scrollY + rect.height / 2 - shuttle.offsetHeight / 2
//     }px`;
//     shuttle.style.left = `${
//       rect.left + window.scrollX + rect.width / 2 - shuttle.offsetWidth / 2
//     }px`;
//   });
// });

// // Set initial shuttle position
// const initialArea = document.querySelector(".area");
// const rect = initialArea.getBoundingClientRect();
// shuttle.style.position = "absolute";
// shuttle.style.top = `${
//   rect.top + window.scrollY + rect.height / 2 - shuttle.offsetHeight / 2
// }px`;
// shuttle.style.left = `${
//   rect.left + window.scrollX + rect.width / 2 - shuttle.offsetWidth / 2
// }px`;
