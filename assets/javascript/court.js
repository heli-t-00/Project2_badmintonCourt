      var play = 0; //Current level of game
      var lastMove = ""; //Last area shuttle was placed in
      let courtType = null;

      function delay(time) {
        //Allow a pause between steps
        return new Promise((resolve) => setTimeout(resolve, time));
      }
      function getAngleInDegrees(x, y) {
        let angle = Math.round(Math.atan2(y, x) * (180 / Math.PI));
        return angle < 0 ? angle + 360 : angle;
      }
      /* Move the shuttle to x,y and set the scale to s*/
      function moveShuttle(x, y, s) {
        let shuttle = document.getElementById("shuttle");
        console.log(
          `Shuttle top=${shuttle.style.top}` +
            ` left=${shuttle.style.left}` +
            ` scale=${shuttle.style.scale}` +
            ` transform=${shuttle.style.transform}`
        );
        let o = shuttle.getBoundingClientRect(); /* old position */
        console.log(`moveShuttle (${o.left},${o.top})`);
        let angle = getAngleInDegrees(x - o.left, y - o.top);
        console.log(`moveShuttle angle=${angle}`);
        /* set the new position */
        shuttle.style.top = `${y - o.height / 4}px`;
        shuttle.style.left = `${x - o.width / 2}px`;
        shuttle.style.transform = `rotate(${
          angle - 90
        }deg)`; /* angle of movement */
        let shuttleImage = document.getElementById("shuttleimage");
        shuttleImage.style.zoom = `${s}%`;
        console.log(
          `Shuttle top=${shuttle.style.top}` +
            ` left=${shuttle.style.left}` +
            ` scale=${shuttle.style.scale}` +
            ` transform=${shuttle.style.transform}`
        );
      }
      function setAreas(ids, colour) {
        ids.forEach((id) => {
          let area = document.getElementById(id);
          if (area) {
            area.style.background = colour;
          }
        });
      }
      function setAllAreas(filter, colour, altcol = "green") {
        Array.prototype.slice
          .call(document.getElementsByClassName("area"))
          .forEach((de) => {
            if (de.id.includes(filter)) de.style.background = colour;
            else de.style.background = altcol;
          });
      }

      // SERVING
      function serve() {
        setGameText("");
        play = 0;
        // Display the serving rules popup
        showPopup(`
        <h2>Serving Rules</h2>
        <p>To serve correctly, stand within the serving area (orange) and aim diagonally across 
        the net into the opponent's serving zone (green). <br> The server and receiver must be stationary during the service action</p>
    `);
        // setting up for double serve
        let fromId = "TMR1";
        let fromIds = [fromId, fromId.replace("1", "2")];
        let toId = "BML1";
        let validAreas = ["BML1", "BML2"];
        // if it is singles serve change the values
        if (courtIsSingles()) {
          fromId = "TML1";
          fromIds = [fromId, fromId.replace("M", "R")];
          toId = "BMR1";
          validAreas = ["BMR1", "BRR1"];
        }
        setAreas(validAreas, "green"); // set the serve destination area to green
        setAreas(fromIds, "orange"); // set the serve from area to orange
        // Get the serve areas by their IDs ************
        let fromArea = document.getElementById(fromId);
        let toArea = document.getElementById(toId);
        if (fromArea && toArea) {
          // Get the center points of the areas********************
          let fromRect = fromArea.getBoundingClientRect();
          let toRect = toArea.getBoundingClientRect();
          let pX = fromRect.left + fromRect.width / 2;
          let pY = fromRect.top + fromRect.height / 2;
          // Move the shuttle from the serve area**************************
          moveShuttle(pX, pY, 1);
          // Delay and then move the shuttle to the target area***************************
          pX = toRect.left + toRect.width / 2;
          pY = toRect.top + toRect.height / 2;
          delay(1000).then(() => moveShuttle(pX, pY, 20));
        }
      }

      // GAME
      function clickOnArea(event, el) {
        // el is the element which is the area that was clicked
        if (play > 0) playGame(event, el);
        else setGameText("");
        console.log(`moveOnClick ${event.pageX},${event.pageY}`);
        moveShuttle(event.pageX, event.pageY, 20);
      }
      function setGameText(t) {
        document.getElementById("nextMove").innerText = t;
      }
      function checkIfValidMove(validChoice, id, successText) {
        console.log(`validMove ${id},${validChoice} => ${successText}`);
        if (validChoice) {
          lastMove = id; //Save the area selected
          play += 1;
          setGameText(successText);
        } else {
          setGameText("You lost the game!");
          play = 0;
        }
      }
      function playGame(event, el) {
        let validMid = null;
        let validRear = null;
        switch (play) {
          case 1:
            checkIfValidMove(
              el.id.indexOf("1") >= 0 && //Element id has a 1 in it so is not a tramline
                el.id.indexOf("F") < 0, //Element id does not have an F in it so is not a front area
              el.id,
              "Select a valid singles service destination area"
            );

            break;
          case 2:
            //Get a valid area by swapping T and B as well as L and R to give the diagonal area
            validMid = `${lastMove[0] == "T" ? "B" : "T"}M${
              lastMove[2] == "L" ? "R" : "L"
            }1`;
            validRear = validMid.replace("M", "R"); //Get the rear area by swapping M for R
            console.log(`Valid areas are ${validMid} & ${validRear}`);
            checkIfValidMove(
              validMid == el.id || validRear == el.id,
              el.id,
              "Select a valid singles rear court return destination area"
            );
            break;
          case 3:
            validMid = `${lastMove[0] == "T" ? "B" : "T"}RR1`;
            validRear = validMid.replace("R1", "L1");
            checkIfValidMove(
              validMid == el.id || validRear == el.id,
              el.id,
              "Yay, you won the game!"
            );
            lastMove = "";
            play = 0;
            break;
          default: // In case we ever get another value
            play = 0;
        }
      }
      // test play function, when clicked, it will check what court type is currently displayed, if single court already displayed no change, if double displayed, togglecourttype to single court
      // court is displayed correctly
      function testPlay() {
        // Popup display rules first*************************
        showPopup(`
        <h2>Play Singles Game</h2>
        <p>Get ready to play a singles game! Focus on your movement, positioning, 
        and strategy to outsmart your opponent.</p>
    `);
        // Delay and then move the shuttle to the target area***************************
        setGameText("Select a valid singles starting service area");
        play = 1;
        if (!courtIsSingles()) {
          toggleCourtType();
        }
        displayCourtType();
      }

      function showCourt() {
        courtType = document.getElementById("courtType");
        let court = document.getElementsByClassName("court")[0];
        court.style.opacity = "100%";
        court.style.transition = "opacity 5s";
        let intro = document.getElementsByClassName("page1")[0];
        intro.style.display = "none";
        let bar = document.getElementsByClassName("bar")[0];
        bar.style.display = "flex";
        // set court scale
        let courtRect = court.getBoundingClientRect();
        let scale =
          (window.innerHeight / (courtRect.top + courtRect.height + 80)) * 100;
        // setting the scale to the calculated percent against window height
        court.style.scale = `${scale}%`;

        let shuttle = document.getElementById("shuttle");
        shuttle.style.display = "block";
        let rect = court.getBoundingClientRect();
        let pX = rect.left + rect.width / 2;
        let pY = rect.top + rect.height / 2;
        moveShuttle(pX, pY, 20);
        // move shuttle to middle of court, dot in the centre
        displayCourtType();
      }

      function courtIsSingles() {
        return courtType.innerText == "Singles";
      }

      //Function to toggle between Singles and Doubles
      function toggleCourtType() {
        setGameText("");
        play=0;
        if (courtType.innerText === "Singles") {
          courtType.innerText = "Doubles";
          showPopup(`
            <h2>Doubles</h2>
            <p>Doubles involves two players per side. The full court is in play during the games, apart from when a serve is taken.<br>
            During a Serve, the zone you serve to is "Short and Fat".</p>
        `);
        } else {
          courtType.innerText = "Singles";
          showPopup(`
            <h2>Singles</h2>
            <p>In Singles, the court dimensions are narrower compared to Doubles.<br>
            "Long and Thin" 
            Players serve diagonally and play within the single sidelines.</p>
        `);
        }
        displayCourtType();
      }
      function displayCourtType() {
        setAllAreas(courtIsSingles() ? "1" : "", "blue", "black");
      }
      // Function to show the popup with specific content
      function showPopup(content) {
        const popup = document.getElementById("popup");
        const popupContent = document.getElementById("popup-content");

        popupContent.innerHTML = content; // Set the content of the popup
        popup.style.display = "flex"; // Show the popup
      }

      // Function to hide the popup
      function hidePopup() {
        const popup = document.getElementById("popup");
        popup.style.display = "none"; // Hide the popup
      }
    
