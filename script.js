"use strict";

//The model of all badges
const badges = {
  alien: false,
  egg: false,
  rose: false,
  starwars: false,
  yoda: false,
};

document.addEventListener("DOMContentLoaded", start);

async function start() {
  let response = await fetch("jacket-config-01.svg");
  let mySvgData = await response.text();
  document.querySelector(".image").innerHTML = mySvgData;

  //click on badges

  document.querySelectorAll(".badge").forEach((badge) => {
    badge.addEventListener("click", clickBadge);
  });

  init();
}
function clickBadge(event) {
  const target = event.currentTarget;
  const badge = target.dataset.badge;
  console.log("current badge", badge);

  if (badges[badge] === false) {
    badges[badge] = true;
  } else {
    badges[badge] = false;
  }

  if (badges[badge]) {
    console.log(`Badge ${badge} is turned on!`);
    document.querySelector(`[data-badge=${badge}]`).classList.remove("hide");
    document.querySelector("#selected").cloneNode(createBadgeElement(badge));
  } else {
    console.log(`${badge} is turned off!`);
    document.querySelector(`[data-badge=${badge}]`).classList.add("hide");
    removeElement(badge);
  }
}
function createBadgeElement(badge) {
  // const li = document.createElement("li");
  // li.dataset.badge = badge;
  const selected = document.querySelector("#selected");

  const img = document.createElement("img");
  img.id = `${badge}`;
  img.src = `badges/small_${badge}.png`;

  selected.append(img);

  return selected;
}
function removeElement(badge) {
  const element = document.getElementById(`${badge}`);
  console.log(element);
  element.remove();
}

function init() {
  let currentColor = "";

  function setColor(element, colorString) {
    element.style.fill = colorString;
  }

  document.querySelectorAll("g").forEach((g) => {
    g.addEventListener("click", (event) => {
      setColor(event.target, currentColor);
      console.log(event.target);
      if (g.id === "top") {
        setColor(event.target.parentElement, currentColor);
      }
    });
  });
  document.querySelectorAll("g").forEach((g) => {
    setColor(g, "white");
  });

  /*   document.querySelector("#sleeve-right").addEventListener("click", (event) => {
    console.log("kfjkdsjfksdzjfz");
    setColor(event.target, currentColor);
    console.log(event.target);
  }); */

  document.querySelectorAll(".color").forEach((element, i) => {
    /*         element.style.backgroundColor = `hsl(${i * 90}, 100%, 67%)`; */
    element.addEventListener("click", (event) => {
      currentColor = event.target.style.backgroundColor;
      console.log(currentColor);
    });
  });

  document.querySelectorAll("g").forEach((g) => {
    g.addEventListener("mouseover", createStroke);
    g.addEventListener("mouseout", removeStroke);
    console.log(g);
  });

  function createStroke(e) {
    e.target.parentElement.classList.add("stroke");
  }
  function removeStroke(e) {
    e.target.parentElement.classList.remove("stroke");
  }
}
