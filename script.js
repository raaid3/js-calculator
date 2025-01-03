let first_number = "";
let second_number = "";
let operator = "";
let result = 0;
// let operatorActive;

const body = document.querySelector("body");
const nums = document.querySelector(".numbers");
const ops = document.querySelector(".operators");

body.addEventListener("click", (event)=>{
    let target = event.target;
    if (target.classList.contains("number")) {
        if(operator) {
            second_number += event.target.textContent;
            console.log(second_number);
        }
        else if (typeof(first_number) === "number") {
            first_number = event.target.textContent;
            console.log(first_number);
        }
        else {
            first_number += event.target.textContent;
            console.log(first_number);
        }
    }
    else if (target.classList.contains("operator")) {
        if (operator && first_number && second_number) {
            result = operate(+first_number, operator, +second_number);
            first_number = result;
            second_number = "";
            operator = event.target.textContent;
        }
        else {
            operator = event.target.textContent;
            console.log(operator)
        }
    }
    else if (target.textContent = "=") {
        if(first_number && operator && second_number) {
            result = operate(+first_number, operator, +second_number)
            first_number = result;
            second_number = "";
            operator = "";
            console.log(result);
        }
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
        button.textContent = i.toString();
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

let equals_button = document.createElement("button");
equals_button.textContent = "=";
equals_button.classList.add("button");
ops.appendChild(equals_button);


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
        default:
            return "oopsies";
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


