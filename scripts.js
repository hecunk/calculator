let state = "normal";


function operate(num1, num2, operand) {
    switch (operand) {
        case "+":
            if ((num1+num2).toString().length < 12) {
                return num1 + num2;
            }
            else {
                return Number.parseFloat(num1 + num2).toExponential(3);
            }
            break;
        case "-":
                return num1 - num2;
            break;
        case "*":
            if ((num1*num2).toString().length < 12) {
                return num1 * num2;
            }
            else {
                return Number.parseFloat(num1 * num2).toExponential(3);
            }
            break;
        case "/":
            if ((num1/num2).toString().length < 12) {
                return num1 / num2;
            }
            else if (((num1 / num2).toFixed(9)).toString().length < 12){
                return Number.parseFloat(num1 / num2).toFixed(9);
            }
            else {
                return Number.parseFloat(num1 / num2).toExponential(3);
            }
            break;
    }
}


function updateUi(e) {
    state = "afterOperand"
    const bucket = document.createElement("div");
    bucket.textContent = `${displayNum.textContent} ${e.target.innerText}`;
    bucket.classList.add("bucket");
    display.prepend(bucket);
    displayNum.textContent = "0";
}


function checkState() {
    if (state === "afterEqual") {
        displayNum.textContent = "0";
        state = "normal";
    }
}


function updateDisplayText(text) {
    if (text.length < 12) {
        displayNum.textContent = text;
    }
}


function clearBucket() {
    const bucket = document.querySelector(".bucket");
    display.removeChild(bucket);
}


let prevOperand = "";
let currOperand = "";


const display = document.querySelector(".show");
const displayNum = document.createElement("div");
displayNum.textContent = "0";
displayNum.classList.add("dispNum");
display.appendChild(displayNum);


const numbers = document.querySelectorAll(".button.number");
numbers.forEach((elem) => {
    elem.addEventListener("click", (e) => {
        checkState(state);
        if (displayNum.textContent == "0") {
            displayNum.textContent = e.target.innerText;
        }
        else {
        updateDisplayText(displayNum.textContent + e.target.innerText)
        }
    });
})


const clear = document.querySelector(".button.clear");
clear.addEventListener("click", () => {
    displayNum.textContent = "0";
    state = false;
    clearBucket();
});


const del = document.querySelector(".button.del");
del.addEventListener("click", () => {
    checkState(state);
    if (displayNum.textContent.length === 1 || (displayNum.textContent.length === 2 && displayNum.textContent[0] === "-")) {
        displayNum.textContent = "0";
    }
    else {
        displayNum.textContent = displayNum.textContent.slice(0, -1); 
    }
})


const plusmin = document.querySelector(".button.plusmin");
plusmin.addEventListener("click", () => {
    checkState(state);
    if (displayNum.textContent !== "0") {
        if (displayNum.textContent[0] === "-") {
            displayNum.textContent = displayNum.textContent.substring(1);
        }
        else {
            displayNum.textContent = "-" + displayNum.textContent;
        }
    }
})


const dot = document.querySelector(".button.dot");
dot.addEventListener("click", () => {
    checkState(state);
    if (!displayNum.textContent.includes(".")) {
        updateDisplayText(displayNum.textContent+".")
    }
})


const operandHandler = document.querySelectorAll(".button.operand");
operandHandler.forEach((elem) => elem.addEventListener("click", (e) => {
    prevOperand = currOperand;
    currOperand = e.target.innerText;
    if (state === "afterOperand") {
        const bucket = document.querySelector(".bucket");
        bucket.textContent = `${operate(parseFloat(bucket.textContent.split(" ")[0]), parseFloat(displayNum.textContent), prevOperand).toString()} ${currOperand}`;
        displayNum.textContent = "0";
    }
    else {
        updateUi(e);
    }
}));


const equals = document.querySelector(".button.equals");
equals.addEventListener("click", () => {
    state = "afterEqual";
    const bucket = document.querySelector(".bucket");
    updateDisplayText(operate(parseFloat(bucket.textContent.split(" ")[0]), parseFloat(displayNum.textContent), currOperand).toString());
    clearBucket();
})