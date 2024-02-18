const numbers = document.querySelectorAll('div[data-type="digit"]');
const operands = document.querySelectorAll('div[data-type="operand"]');
const equals = document.querySelector('div[data-type="final"]');
const clear = document.querySelectorAll('div[data-type="delete"]')
const primaryScreen = document.querySelector(".primary-screen");
const secondaryScreen = document.querySelector(".secondary-screen");

let firstInput;
let secondInput;
let op = "";
let final = false;
let duration = "300";

const displayHandle = content => {

    const opSymbols = ["+", "-", "*", "/"]

    if(opSymbols.includes(content) && primaryScreen.innerText !== ""){

        if(secondaryScreen.innerText===""){

            op = content;
            firstInput = parseFloat(primaryScreen.innerText)
            secondaryScreen.innerText = primaryScreen.innerText + " " + content;
            primaryScreen.innerText = "" 
    
        }
        
        else{

            firstInput = parseFloat(secondaryScreen.innerText);
            secondInput = parseFloat(primaryScreen.innerText)
            operation(firstInput, secondInput, op)
            op = content
            secondaryScreen.innerText = secondaryScreen.innerText +" "+op
        }
        return
    }
    
    if(content==="." && primaryScreen.innerText.includes(".")){
                return
        }
    if(!isNaN(parseInt(content)) || content==="."){
        primaryScreen.innerText = primaryScreen.innerText + content;
    }

}

const buttonGlow = cont => {

    document.querySelector(`div[data-in='${cont}']`).classList.toggle("toggle")
    setTimeout(() => {document.querySelector(`div[data-in='${cont}']`).classList.toggle("toggle")}, `${duration}`)

}

// --------- ADDITION --------------------
const add = (firstNumber, secondNumber) => {
    let result = firstNumber + secondNumber
    return result
}

// --------- SUBTRACTION --------------------
const subtract = (firstNumber, secondNumber) => {
    return firstNumber - secondNumber
}

// --------- MULTIPLICATION --------------------
const multiply = (firstNumber, secondNumber) => {
    return firstNumber * secondNumber
}

// --------- DIVISION --------------------
const divide = (firstNumber, secondNumber) => {
    return firstNumber / secondNumber
}

// --------- OPERATION FXN --------------------
const operation = (firstInput, secondInput, op) => {

    let result = 0

    switch(op){
        case "+":
            result = Math.round((add(firstInput, secondInput) + Number.EPSILON)*100)/100
            break
        case "-":
            result = Math.round((subtract(firstInput, secondInput) + Number.EPSILON)*100)/100
            break
        case "*":
            result = Math.round((multiply(firstInput, secondInput) + Number.EPSILON)*100)/100
            break
        case "/":
            result = Math.round((divide(firstInput, secondInput) + Number.EPSILON)*100)/100
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

        secondaryScreen.innerText = result;
        primaryScreen.innerText = ""
        secondInput = 0;

}

// --------- NUMBER divS --------------------
numbers.forEach(num => num.addEventListener("click", (e)=>{

    buttonGlow(e.target.innerText)
    displayHandle(e.target.innerText)

})
)

// --------- OPERAND BUTTONS --------------------
operands.forEach(operand => operand.addEventListener("click", (e)=>{

    document.querySelector(`div[data-in='${e.target.innerText}']`).classList.toggle("toggle")
    setTimeout(() => {document.querySelector(`div[data-in='${e.target.innerText}']`).classList.toggle("toggle")}, `${duration}`)
    displayHandle(e.target.innerText)

}
))

// --------- EQUAL BUTTON --------------------
equals.addEventListener("click", () => {
    if(secondaryScreen.innerText != "" && op && firstInput && primaryScreen.innerText != ""){
        
        equals.classList.toggle("toggle");
        setTimeout(() => {equals.classList.toggle("toggle")}, `${duration}`)
        
        final = true;
        firstInput = parseFloat(secondaryScreen.innerText)
        secondInput = parseFloat(primaryScreen.innerText)
        operation(firstInput, secondInput, op)
    }

    else{
        return
    }
    
})

// --------- CLEAR BUTTON --------------------
clear.forEach(x=> x.addEventListener("click", ()=>{
    if(x.innerText === "AC"){
        buttonGlow("AC");
        primaryScreen.innerText = "";
        secondaryScreen.innerText = "";
        firstInput = 0
        secondInput = 0
        return
    }
    buttonGlow("DE");
    primaryScreen.innerText = primaryScreen.innerText.slice(0,-1)
}))

// --------- KEYBOARD --------------------
document.body.addEventListener("keydown", (e)=>{
    if(e.key === "Enter" || e.key === "="){

        if(secondaryScreen.innerText != "" && op && firstInput && primaryScreen.innerText != ""){
            
            equals.classList.toggle("toggle");
            setTimeout(() => {equals.classList.toggle("toggle")}, `${duration}`)
            
            final = true
            firstInput = parseFloat(secondaryScreen.innerText)
            secondInput = parseFloat(primaryScreen.innerText)
            operation(firstInput, secondInput, op)
            
            return
        }

        else{return}
    }

    else if(e.key === "Backspace"){

        buttonGlow("DE")
        primaryScreen.innerText = primaryScreen.innerText.slice(0,-1)

    }

    else{

        buttonGlow(e.key)
        displayHandle(e.key)

    }
})