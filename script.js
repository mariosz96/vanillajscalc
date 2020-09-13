let numButtons = document.getElementsByClassName("calc-num");
let opButtons = document.getElementsByClassName("calc-operator");
let clrBtn = document.getElementById("calc-clear");
let backspace = document.getElementById("calc-bcsp");
let displayNum = document.getElementById("numDisplay");
let allButtons = document.getElementsByClassName("calc-btn");
let decimal = document.getElementById("calc-decimal");
let hDisplay = document.getElementById("historyDisplay");
let historyValue = document.getElementById("calc-history");

let valDisplay = "0";
let history = "0";
let store = "";
let evalArray = [];
let lastButtonPressedWasEquals = false;

if (typeof String.prototype.trim === "undefined") {
  String.prototype.trim = function () {
    return String(this).replace(/^\s+|\s+$/g, "");
  };
}

function calculation(array) {
  finalString = math.eval(array.join(" ").trim());

  return finalString;
}

function updateDisplay(e) {
  if (lastButtonPressedWasEquals === true) {
    valDisplay = "";
    lastButtonPressedWasEquals = false;
  }

  let btnText = e.target.innerText;

  if (valDisplay === "0") {
    valDisplay = "";
  }

  valDisplay += btnText;

  if (valDisplay.length > 9) {
    valDisplay = valDisplay.slice(0, 10);
  }

  displayNum.value = valDisplay;
}

function performOperation(e) {
  let operator = e.target.innerText;

  switch (operator) {
    case "+":
      store = valDisplay;
      evalArray.push(store, "+");
      history = evalArray.join(" ");
      hDisplay.value = history;
      valDisplay = "0";
      displayNum.value = valDisplay;
      break;

    case "-":
      store = valDisplay;
      evalArray.push(store, "-");
      history = evalArray.join(" ");
      hDisplay.value = history;
      valDisplay = "0";
      displayNum.value = valDisplay;
      break;

    case "⨯":
      store = valDisplay;
      evalArray.push(store, "*");
      history = evalArray.join(" ");
      hDisplay.value = history;
      valDisplay = "0";
      displayNum.value = valDisplay;
      break;

    case "÷":
      store = valDisplay;
      evalArray.push(store, "/");
      history = evalArray.join(" ");
      hDisplay.value = history;
      valDisplay = "0";
      displayNum.value = valDisplay;
      break;

    case "=":
      evalArray.push(valDisplay);
      valDisplay = calculation(evalArray);
      // historyValue.innerText = `${evalArray.join(" ")} = ${valDisplay}`;
      displayNum.value = valDisplay;
      hDisplay.value = displayNum.value;
      evalArray = [];
      lastButtonPressedWasEquals = true;
      break;
  }
}

for (let i = 0; i < numButtons.length; i++) {
  numButtons[i].addEventListener("click", updateDisplay);
}

for (let i = 0; i < opButtons.length; i++) {
  opButtons[i].addEventListener("click", performOperation);
}

clrBtn.addEventListener("click", () => {
  valDisplay = "0";
  store = "0";
  evalArray = [];
  displayNum.value = "0";
  hDisplay.value = "0";
});

backspace.addEventListener("click", () => {
  valDisplay = valDisplay.toString().slice(0, valDisplay.length - 1);
  displayNum.value = valDisplay;
  if (valDisplay === "") {
    displayNum.value = "0";
  }
});

decimal.addEventListener("click", () => {
  if (!valDisplay.includes(".")) {
    valDisplay += ".";
  }
});
