document.addEventListener("DOMContentLoaded", loadSvg);

let customImg = {
  collar: "#ffffff",
  top: "#ffffff",
  sleeveRight: "#ffffff",
  sleeveLeft: "#ffffff",
  rightSide: "#ffffff",
  leftSide: "#ffffff",
  rightSideTop: "#ffffff",
  leftSideTop: "#ffffff",
  pocket: "#ffffff",
};
let currentColor = "";

async function loadSvg() {
  let response = await fetch("jacket-config-01.svg");
  let mySvgData = await response.text();
  document.querySelector(".image").innerHTML = mySvgData;
  init();
}

function init() {
  const url = window.location.href;
  if (localStorage.length != 0) {
    // gets object settings from local storage
    img = JSON.parse(localStorage.getItem("userCreation"));
    applySavedImage(img);
  } else if (url.indexOf("jacket_settings") > -1) {
    // decodes url

    const urlParams = new URLSearchParams(window.location.search);
    const jacketParams = urlParams.get("jacket_settings");
    console.log(jacketParams);
    const jacketObj = JSON.parse(decodeURI(jacketParams));
    img = {};
    for (var key in jacketObj) {
      img[key] = decodeURIComponent(jacketObj[key]);
    }
    console.log(img);
    applySavedImage(img);
  } else {
    console.log("empty storage");
    // sets color to white at the beginning
    document.querySelectorAll("g").forEach((g) => {
      setColor(g, "white");
    });
    selectPart();
  }
  registerButtons();
}
function registerButtons() {
  const saveBtn = document.querySelector(".save");
  const resetBtn = document.querySelector(".reset");
  const shareBtn = document.querySelector(".share");
  saveBtn.addEventListener("click", saveImg);
  resetBtn.addEventListener("click", resetImg);
  shareBtn.addEventListener("click", shareImg);
}
function selectPart() {
  // makes each element of the jacket clickable
  document.querySelectorAll("g").forEach((g) => {
    g.addEventListener("click", (event) => {
      setColor(event.target, currentColor);

      // it stores the color value in the object so it can be reused after reload
      let property = event.target.parentElement.id;

      customImg[property] = currentColor;

      if (g.id === "top") {
        setColor(event.target.parentElement, currentColor);
      }
    });
  });

  // getting color from the squares
  document.querySelectorAll(".color").forEach((element, i) => {
    element.addEventListener("click", (event) => {
      currentColor = event.target.style.backgroundColor;

      console.log(currentColor);
    });
  });
  // creating stoke on each element on hover and remove when mouse is out
  document.querySelectorAll("g").forEach((g) => {
    g.addEventListener("mouseover", createStroke);
    g.addEventListener("mouseout", removeStroke);
  });
}

function setColor(element, colorString) {
  element.style.fill = colorString;
}
function createStroke(e) {
  e.target.parentElement.classList.add("stroke");
  /*   e.target.parentElement.style.fill = currentColor; */
}
function removeStroke(e) {
  e.target.parentElement.classList.remove("stroke");
}

function saveImg() {
  // modal box animations
  document
    .querySelector("#save_confirmation")
    .removeEventListener("animationend", removeAni);
  document.querySelector("#save_confirmation").classList.remove("hide");
  document.querySelector("#save_confirmation").classList.add("fade");
  document
    .querySelector("#save_confirmation .x")
    .addEventListener("click", closeDialog);

  // saves object settings in local storage
  localStorage.setItem("userCreation", JSON.stringify(customImg));
}
function resetImg() {
  // resets settings to default dettings

  currentColor = "#ffffff";
  for (let property in customImg) {
    customImg[property] = currentColor;
  }

  // resets image to default color
  document.querySelectorAll("g path").forEach((g) => {
    setColor(g, "white");
  });

  // removes object from local storage, if any
  if (localStorage.length != 0) {
    window.localStorage.removeItem("userCreation");
  }
  console.log("is reseted");
  console.log(customImg);
}

function shareImg() {
  document
    .querySelector("#share_confirmation")
    .removeEventListener("animationend", removeAni);
  document.querySelector("#share_confirmation").classList.remove("hide");
  document.querySelector("#share_confirmation").classList.add("fade");
  document
    .querySelector("#share_confirmation .x")
    .addEventListener("click", closeDialog);

  // encodes object settings and creates an url which can be shared
  const toSend = {};
  for (var key in customImg) {
    toSend[key] = encodeURIComponent(customImg[key]);
  }
  console.log(
    "http://127.0.0.1:5500/index.html?jacket_settings=" +
      encodeURI(JSON.stringify(toSend))
  );
  /*  document.querySelector("#share_confirmation p span").textContent =
    "http://127.0.0.1:5500/index.html?jacket_settings=" +
    encodeURI(JSON.stringify(toSend)); */
  document
    .querySelector("#share_confirmation p")
    .addEventListener("click", copyLink);

  function copyLink() {
    let link =
      "http://127.0.0.1:5500/index.html?jacket_settings=" +
      encodeURI(JSON.stringify(toSend));
    navigator.clipboard.writeText(link);
    document.querySelector("#share_confirmation p").textContent =
      "Link has been copied!";
  }
}

function closeDialog() {
  document
    .querySelector("#save_confirmation .x")
    .removeEventListener("click", closeDialog);
  document
    .querySelector("#share_confirmation .x")
    .removeEventListener("click", closeDialog);

  document.querySelector("#save_confirmation").classList.remove("fade");
  document.querySelector("#share_confirmation").classList.remove("fade");

  document.querySelector("#save_confirmation").classList.add("leave");
  document.querySelector("#share_confirmation").classList.add("leave");
  document
    .querySelector("#save_confirmation")
    .addEventListener("animationend", removeAni);

  document
    .querySelector("#share_confirmation")
    .addEventListener("animationend", removeAni);
  document.querySelector("#share_confirmation p").textContent =
    "Click to copy the link";
}
function removeAni() {
  document.querySelector("#save_confirmation").classList.add("hide");
  document.querySelector("#share_confirmation").classList.add("hide");
  document.querySelector("#save_confirmation").classList.remove("leave");
  document.querySelector("#share_confirmation").classList.remove("leave");
}
function applySavedImage(img) {
  // aplies image settings from local storage or the link
  customImg = img;
  console.log("after load", customImg);
  const colorProperties = Object.keys(customImg);
  colorProperties.forEach((key) => {
    console.log("what is customimg key", customImg[key]);
    document.querySelectorAll("g").forEach((g) => {
      if (g.id === key) {
        g.style.fill = customImg[key];
      }
    });
  });
  selectPart();
}
