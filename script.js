document.addEventListener("DOMContentLoaded", start);

async function start() {
  let response = await fetch("jacket-config-01.svg");
  let mySvgData = await response.text();
  document.querySelector(".image").innerHTML = mySvgData;
  init();
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
