const state = {
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
  displayEl.textContent = state.currentDisplay;
}
setDisplayInDom();

function typeNumbersToDisplay(value) {
  if (state.currentDisplay === 0) {
    state.currentDisplay = parseInt(value);
  } else {
    const stateString = state.currentDisplay.toString() + value;
    state.currentDisplay = parseInt(stateString);
  }
  setDisplayInDom();
}
function setPreviousDisplay() {
  state.previousDisplay = state.currentDisplay;
}
function clearCurrentDisplay() {
  state.currentDisplay = 0;
  setDisplayInDom();
}
function clearAllDisplay() {
  state.currentDisplay = 0;
  state.previousDisplay = 0;
  setDisplayInDom();
}
function setActiveOperation(operation) {
  state.activeOperation = operation;
}
function changeCurrentDisplaySignage() {
  state.currentDisplay = state.currentDisplay * -1;
  setDisplayInDom();
}
function evaluate() {
  if (state.activeOperation === null) {
    state.currentDisplay = state.currentDisplay;
    setDisplayInDom();
  } else if (state.activeOperation === "multiply") {
    state.currentDisplay = state.previousDisplay * state.currentDisplay;
    setDisplayInDom();
  } else if (state.activeOperation === "divide") {
    state.currentDisplay = state.previousDisplay / state.currentDisplay;
    setDisplayInDom();
  } else if (state.activeOperation === "add") {
    state.currentDisplay = state.previousDisplay + state.currentDisplay;
    setDisplayInDom();
  } else {
    state.currentDisplay = state.previousDisplay - state.currentDisplay;
    setDisplayInDom();
  }
}
// event listeners
document.querySelectorAll(".number").forEach((button) => {
  button.addEventListener("click", (e) => {
    if (state.activeOperation !== null && state.previousDisplay === 0) {
      setPreviousDisplay();
      state.currentDisplay = 0;
      typeNumbersToDisplay(e.target.textContent);
      console.log("running gate 1");
    } else {
      typeNumbersToDisplay(e.target.textContent);
      console.log("running gate 2");
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
  state.activeOperation = null;
});
document.querySelector("#all-clear").addEventListener("click", () => {
  clearAllDisplay();
});
document.querySelector("#clear").addEventListener("click", () => {
  clearCurrentDisplay();
});
document.querySelector("#signage").addEventListener("click", () => {
  changeCurrentDisplaySignage();
});
