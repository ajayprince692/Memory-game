//! getting and setting elements and colours needed

let boxes = document.querySelector(".boxes");
let colours = [
  "red",
  "violet",
  "pink",
  "orange",
  "olive",
  "chartreuse",
  "chocolate",
  "indigo",
  "crimson",
  "skyblue",
];
let colorlist = [...colours, ...colours];
// console.log(colorlist);
let boxlength = colorlist.length;
// console.log(boxlength);

//! initializing the main elements of game

let revealCount = 0;
let activeBox = null;
let waitingTime = false;

//! function to display boxes in the page

function boxBuild(color) {
  let box = document.createElement("div");
  box.innerText = "flip ➡️";
  box.classList.add("box");
  box.setAttribute("data-color", color);
  box.setAttribute("data-revealed", "false");

  box.addEventListener("click", () => {
    if (waitingTime ) {
      //!waiting time
      return;
    }
    box.style.backgroundColor = color;
    if (!activeBox) {
      //!not a active box (i.e active box initially null)
      activeBox = box;
      return;
    }
    console.log(activeBox);

    //! Logic for matching colour

    let matchingColor = activeBox.getAttribute("data-color");
    if (matchingColor == color) {
        activeBox.setAttribute("data-revealed","true");
        box.setAttribute("data-revealed","true");
      activeBox = null;
      waitingTime = null;
      revealCount += 2;
      if (revealCount == boxlength) {
        alert("Hurrahhh 🥳🍾 YOU WON ⭐refresh to play again");
      }
      return;
    }

    //! changing waitingtime into true and using that for transition

    waitingTime = true;
    setTimeout(() => {
      box.style.backgroundColor = null;
      activeBox.style.backgroundColor = null;
      waitingTime = false;
      activeBox = null;
    }, 1500);
  });

  return box;
}

//! building the boxes of the game

for (let i = 0; i < boxlength; i++) {
  let randomIndex = Math.floor(Math.random() * colorlist.length);
  let color = colorlist[randomIndex];
  let build = boxBuild(color);

  //! Using splice method to avoid extra switch
  colorlist.splice(randomIndex, 1);

  boxes.append(build);

  console.log(color);
}
