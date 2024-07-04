const globalData = {
  currentDisplay: 0,
  previousDisplay: 0,
  //previousDisplay means the previous COMPUTED display, or the display
  //value before the most recent operation was performed on it.
  activeOperation: null,
  //activeOperation will be given a string value when a button with class
  //'operation' is clicked. when the operation is evaluated with '=' button,
  //the activeOperation will be set to null.
};
const displayEl = document.querySelector("#display");

function setDisplayInDom() {
  displayEl.textContent = globalData.currentDisplay;
}
setDisplayInDom();
console.log(typeof globalData.currentDisplay);

function typeNumbersToDisplay(value) {
  if (globalData.currentDisplay === 0) {
    globalData.currentDisplay = parseInt(value);
  } else {
    const globalDataString = globalData.currentDisplay.toString() + value;
    globalData.currentDisplay = parseInt(globalDataString);
    console.log(typeof globalData.currentDisplay);
  }
  setDisplayInDom();
}
function setPreviousDisplay() {
  globalData.previousDisplay = globalData.currentDisplay;
}
function clearCurrentDisplay() {
  globalData.currentDisplay = 0;
  setDisplayInDom();
}
function clearAllDisplay() {
  globalData.currentDisplay = 0;
  globalData.previousDisplay = 0;
  setDisplayInDom();
}
function setActiveOperation(operation) {
  globalData.activeOperation = operation;
}
function evaluate() {
  if (globalData.activeOperation === null) {
    globalData.currentDisplay = globalData.currentDisplay;
    setDisplayInDom();
  } else if (globalData.activeOperation === "multiply") {
    globalData.currentDisplay =
      globalData.previousDisplay * globalData.currentDisplay;
    setDisplayInDom();
  } else if (globalData.activeOperation === "divide") {
    globalData.currentDisplay =
      globalData.previousDisplay / globalData.currentDisplay;
    setDisplayInDom();
  } else if (globalData.activeOperation === "add") {
    globalData.currentDisplay =
      globalData.previousDisplay + globalData.currentDisplay;
    setDisplayInDom();
  } else {
    globalData.currentDisplay =
      globalData.previousDisplay - globalData.currentDisplay;
    setDisplayInDom();
  }
}
// event listeners
document.querySelectorAll(".number").forEach((button) => {
  button.addEventListener("click", (e) => {
    if (globalData.activeOperation !== null && globalData.previousDisplay === 0) {
      setPreviousDisplay();
      globalData.currentDisplay = 0;
      typeNumbersToDisplay(e.target.textContent);
    } else {
      typeNumbersToDisplay(e.target.textContent);
    }
  });
});
document.querySelectorAll(".operation").forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.textContent === "x") {
      evaluate();
      setActiveOperation("multiply");
    } else if (e.target.textContent === "/") {
      evaluate();
      setActiveOperation("divide");
    } else if (e.target.textContent === "+") {
      evaluate();
      setActiveOperation("add");
    } else {
      evaluate();
      setActiveOperation("subtract");
    }
  });
});
document.querySelector("#evaluate").addEventListener("click", () => {
  evaluate();
  globalData.activeOperation = null;
});
