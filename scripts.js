


function operate(num1, num2, operand) {
    switch (operand) {
        case "+":
            return num1 + num2;
            break;
        case "-":
            return num1 - num2;
            break;
        case "*":
            if ((num1*num2).toString().length < 11) {
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
            else {
            return (num1 / num2).toFixed(9);
            }
            break;
    }
}


function updateUi(e) {
    num1 = displayNum.textContent;
    const bucket = document.createElement("div");
    bucket.textContent = `${displayNum.textContent} ${e.target.innerText}`;
    bucket.classList.add("bucket")
    display.prepend(bucket);
    displayNum.textContent = "0";
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


let num1 = 0;
let operand = "";


const display = document.querySelector(".show");
const displayNum = document.createElement("div");
displayNum.textContent = "0";
displayNum.classList.add("dispNum");
display.appendChild(displayNum);


const numbers = document.querySelectorAll(".button.number");
numbers.forEach((elem) => {
    elem.addEventListener("click", (e) => {
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
    clearBucket();
});


const del = document.querySelector(".button.del");
del.addEventListener("click", () => {
    if (displayNum.textContent.length === 1 || (displayNum.textContent.length === 2 && displayNum.textContent[0] === "-")) {
        displayNum.textContent = "0";
    }
    else {
        displayNum.textContent = displayNum.textContent.slice(0, -1); 
    }
})


const plusmin = document.querySelector(".button.plusmin");
plusmin.addEventListener("click", () => {
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
    if (!displayNum.textContent.includes(".")) {
        updateDisplayText(displayNum.textContent+".")
    }
})


const operandHandler = document.querySelectorAll(".button.operand");
operandHandler.forEach((elem) => elem.addEventListener("click", (e) => {
    updateUi(e);
    operand = e.target.innerText;
}));


const equals = document.querySelector(".button.equals");
equals.addEventListener("click", () => {
    clearBucket();
    updateDisplayText(operate(parseFloat(num1), parseFloat(displayNum.textContent), operand).toString());
})