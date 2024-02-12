const numbers = document.querySelectorAll('button[data-type="digit"]');
const operands = document.querySelectorAll('button[data-type="operand"]');
const primaryScreen = document.querySelector(".primary-screen");
const secondaryScreen = document.querySelector(".secondary-screen");

let firstInput = 0;
let secondInput = 0;
let op = "";
let final = false;


const add = (firstNumber, secondNumber) => {
    let result = firstNumber + secondNumber
    return result
}
const subtract = (firstNumber, secondNumber) => {
    return firstNumber - secondNumber
}
const multiply = (firstNumber, secondNumber) => {
    return firstNumber * secondNumber
}
const divide = (firstNumber, secondNumber) => {
    return firstNumber / secondNumber
}

const operation = (firstInput, secondInput, op) => {

    let result = 0
    console.log(op)

    switch(op){
        case "+":
            result = add(firstInput, secondInput)
            break
        case "-":
            result = subtract(firstInput, secondInput)
            break
        case "*":
            result = multiply(firstInput, secondInput)
            break
        case "/":
            result = divide(firstInput, secondInput)
            break
    }

    if(final){
        primaryScreen.innerText = result;
        secondaryScreen.innerText = "";
        firstInput = 0;
        secondInput = 0;
        op = "";
        final = false
        return
    }

    secondaryScreen.innerText = result
    primaryScreen.innerText = ""
    // firstInput = 0;
    // firstInput = parseFloat(secondaryScreen.innerText);
    // console.log(firstInput)
    secondInput = 0;

}

numbers.forEach(num => num.addEventListener("click", (e)=>{

    if(num.innerText==="." && primaryScreen.innerText.includes(".")){
        return
    }

    primaryScreen.innerText = primaryScreen.innerText + num.innerText;

}))

operands.forEach(operand => operand.addEventListener("click", (e)=>{

    if(secondaryScreen.innerText===""){

        // firstInput = parseFloat(primaryScreen.innerText);
        op = operand.innerText;
        secondaryScreen.innerText = primaryScreen.innerText + op;
        primaryScreen.innerText = "" 

    }
    
    else{
        firstInput = parseFloat(secondaryScreen.innerText);
        secondInput = parseFloat(primaryScreen.innerText)
        console.log(firstInput, secondInput)
        operation(firstInput, secondInput, op)
        op = operand.innerText
        secondaryScreen.innerText = secondaryScreen.innerText + operand.innerText
    }
    

}))