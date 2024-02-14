const numbers = document.querySelectorAll('button[data-type="digit"]');
const operands = document.querySelectorAll('button[data-type="operand"]');
const equals = document.querySelector('button[data-type="final"]');
const clear = document.querySelectorAll('button[data-type="delete"]')
const primaryScreen = document.querySelector(".primary-screen");
const secondaryScreen = document.querySelector(".secondary-screen");

let firstInput;
let secondInput;
let op = "";
let final = false;


const displayHandle = content => {

    const opSymbols = ["+", "-", "*", "/"]

    if(opSymbols.includes(content) && primaryScreen.innerText !== ""){

        if(secondaryScreen.innerText===""){

            // firstInput = parseFloat(primaryScreen.innerText);
            op = content;
            firstInput = parseFloat(primaryScreen.innerText)
            secondaryScreen.innerText = primaryScreen.innerText + " " + content;
            primaryScreen.innerText = "" 
    
        }
        
        else{
            firstInput = parseFloat(secondaryScreen.innerText);
            secondInput = parseFloat(primaryScreen.innerText)
            console.log(firstInput, secondInput)
            operation(firstInput, secondInput, op)
            op = content
            secondaryScreen.innerText = secondaryScreen.innerText +" "+op
            // primaryScreen.innerText = ""
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
    // console.log(op)

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
        console.log(result)
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
        // firstInput = result;
        secondInput = 0;

}

// --------- NUMBER BUTTONS --------------------
numbers.forEach(num => num.addEventListener("click", (e)=>{
    
    document.querySelector(`button[data-in='${e.target.innerText}']`).classList.toggle("toggle")
    setTimeout(() => {document.querySelector(`button[data-in='${e.target.innerText}']`).classList.toggle("toggle")}, "500")
    
    displayHandle(e.target.innerText)

})
)

// numbers.forEach(num => num.addEventListener("click", ()=>{

//     if(num.innerText==="." && primaryScreen.innerText.includes(".")){
//         return
//     }

//     primaryScreen.innerText = primaryScreen.innerText + num.innerText;

// }))


// --------- OPERAND BUTTONS --------------------
operands.forEach(operand => operand.addEventListener("click", (e)=>{

    document.querySelector(`button[data-in='${e.target.innerText}']`).classList.toggle("toggle")
    setTimeout(() => {document.querySelector(`button[data-in='${e.target.innerText}']`).classList.toggle("toggle")}, "500")
    displayHandle(e.target.innerText)

}
    
// {

//     if(secondaryScreen.innerText===""){

//         // firstInput = parseFloat(primaryScreen.innerText);
//         op = operand.innerText;
//         secondaryScreen.innerText = primaryScreen.innerText + op;
//         primaryScreen.innerText = "" 

//     }
    
//     else{
//         firstInput = parseFloat(secondaryScreen.innerText);
//         secondInput = parseFloat(primaryScreen.innerText)
//         console.log(firstInput, secondInput)
//         operation(firstInput, secondInput, op)
//         op = operand.innerText
//         secondaryScreen.innerText = secondaryScreen.innerText + operand.innerText
//     }
    
// }
))

// --------- EQUAL BUTTON --------------------
equals.addEventListener("click", () => {
    if(secondaryScreen.innerText != "" && op && firstInput && primaryScreen.innerText != ""){
        
        equals.classList.toggle("toggle");
        setTimeout(() => {equals.classList.toggle("toggle")}, "500")
        
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
        x.classList.toggle("toggle");
        setTimeout(() => {x.classList.toggle("toggle")}, "500")
        primaryScreen.innerText = "";
        secondaryScreen.innerText = "";
        firstInput = 0
        secondInput = 0
        return
    }
    x.classList.toggle("toggle");
    setTimeout(() => {x.classList.toggle("toggle")}, "500")
    primaryScreen.innerText = primaryScreen.innerText.slice(0,-1)
}))

// --------- KEYBOARD --------------------
document.body.addEventListener("keydown", (e)=>{
    console.log(e.key)
    if(e.key === "Enter"){
        if(secondaryScreen.innerText != "" && op && firstInput && primaryScreen.innerText != ""){
            
            equals.classList.toggle("toggle");
            setTimeout(() => {equals.classList.toggle("toggle")}, "500")
            
            final = true
            firstInput = parseFloat(secondaryScreen.innerText)
            secondInput = parseFloat(primaryScreen.innerText)
            operation(firstInput, secondInput, op)
            
            return
        }
        else{return}
    }
    else if(e.key === "Backspace"){
        document.querySelector("button[data-in='DE']").classList.toggle("toggle")
        setTimeout(() => {document.querySelector("button[data-in='DE']").classList.toggle("toggle")}, "500")
        primaryScreen.innerText = primaryScreen.innerText.slice(0,-1)
    }
    else{

        document.querySelector(`button[data-in='${e.key}']`).classList.toggle("toggle")
        setTimeout(() => {document.querySelector(`button[data-in='${e.key}']`).classList.toggle("toggle")}, "500")
        displayHandle(e.key)

    }
})