let first_number = "0";
let second_number = "";
let operator = "";
let result;
let displaying = "first";
// let operatorActive;

const body = document.querySelector("body");
const nums = document.querySelector(".numbers");
const ops = document.querySelector(".operators");
const display = document.querySelector(".display");



function updateDisplay(){
    switch(displaying){
        case "first":
            display.textContent = first_number;
            break;
        case "second":
            display.textContent = second_number;
            break;
        case "result":
            display.textContent = result;
            break;
    }
}

updateDisplay();

body.addEventListener("click", (event)=>{
    let target = event.target;
    if(target.tagName === "BUTTON") {

        // if button clicked is a number
        if (target.classList.contains("number")) {

            // if operator button is active, update second_number
            if(operator) {
                displaying = "second";

                // preventing unecessary leading zeros
                second_number === "0" ? second_number = event.target.textContent :
                                        second_number += event.target.textContent;
                console.log(second_number);
            }

            // when first nummber is the result of the previous computation, replace it with new first_number
            else if (typeof(first_number) === "number") {
                displaying = "first";
                first_number = event.target.textContent;
                console.log(first_number);
            }

            // operator button isn't active, update first_number
            else {
                displaying = "first";

                // preventing unecessary leading zeros
                first_number === "0" ? first_number = event.target.textContent : 
                                       first_number += event.target.textContent;
                console.log(first_number);
            }
        }

        // if button clicked is an operator button
        else if (target.classList.contains("operator")) {

            // if operator is active and first_number and second_number
            // are both filled in
            if (operator && first_number !== "" && second_number !== "") {

                // operate result with previous operator
                result = operate(+first_number, operator, +second_number);

                // set first_number to be the result and update operator to
                // be the new operator
                first_number = result;
                second_number = "";
                operator = event.target.textContent;
                displaying = "result";
                console.log(result);
                console.log(operator)
            }
            
            // if first_number is not empty activate operator
            else if (first_number !== ""){
                operator = event.target.textContent;
                console.log(operator)
            }
        }

        // if user clicked on "="
        else if (target.textContent === "=") {

            // only operate if first_number, operator, and second_number are active and not empty
            if(first_number !== "" && operator && second_number !== "") {
                result = operate(+first_number, operator, +second_number)

                // set first_number to be the result in case user wants
                // to chain operations
                first_number = result;
                second_number = "";
                operator = "";
                displaying = "result"
                console.log(result);
            }
        }
        // if user clicked "ac"
        else if (target.id === "ac") {
            // reset everything
            first_number = "0";
            second_number = "";
            operator = "";
            result = 0;
            displaying = "first";
            console.log("RESETTING")
        }
        // if user clicked "."
        else if (target.id === "decimal") {
            // if first_number is displaying, only insert a "." if resulting
            // expression is a valid number
            if(displaying === "first") {
                if(!isNaN(first_number + ".")){
                    first_number += ".";
                    console.log(first_number);
                }
            }
            else if (displaying === "second") {
            // if second_number is displaying, only insert a "." if resulting
            // expression is a valid number
                if(!isNaN(second_number + ".")){
                    second_number += ".";
                    console.log(second_number)
                }
            }
            if (displaying === "result") {
                // if the result is displaying, insert "." if valid and set
                // display result
                if(!isNaN(first_number + ".")){
                    first_number += ".";
                    console.log(first_number);
                    displaying = "first";
                    result = 0;
                }
            }
        }
        updateDisplay();
    }
})

// creating number buttons
for(let i = 0; i < 11; i++) {
    if(i === 10){
        let button = document.createElement("button");
        button.id = "decimal"
        button.textContent = ".";
        nums.appendChild(button);
    }
    else{
        let button = document.createElement("button");
        button.classList.add("number");
        if(i+1 === 10) {
            button.textContent = "0";
        }
        else{
            button.textContent = (i + 1).toString();
        }
        nums.appendChild(button);
    }
}

// creating operator buttons
for(let i = 0; i < 4; i++){
    let op = document.createElement("button");
    op.classList.add("operator");
    op.classList.add("button");
    switch(i){
        case 0:
            op.textContent = "+";
            break;
        case 1:
            op.textContent = "-";
            break;
        case 2:
            op.textContent = "*";
            break;
        case 3:
            op.textContent = "/";
            break;
    }

    ops.appendChild(op);

}

// operate button "="
let equals_button = document.createElement("button");
equals_button.textContent = "=";
equals_button.classList.add("button");
ops.appendChild(equals_button);






// operator functions
function operate(a, operator, b){
    switch(operator){
        case "+":
            return add(a, b);
        case "*":
            return mul(a, b);
        case "-":
            return sub(a, b);
        case "/":
            return div(a, b);
    }
}

// Operation functions
function add(a, b){
    return a + b;
}

function sub(a, b){
    return a - b;
}

function mul(a, b) {
    return a * b;
}

function div(a, b) {
    return a / b;
}


