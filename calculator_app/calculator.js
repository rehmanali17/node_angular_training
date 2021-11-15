// Initialization
const btns = document.querySelectorAll('.btn')
const input_btns = document.querySelectorAll('.input-btn')
const operators = document.querySelectorAll('.operators')
let calculation_container = document.getElementById('calculation-container')
const result_btn = document.getElementById('result-btn')
const clear_btn = document.getElementById('clear-btn')
let output_result = document.getElementById('output-result')
let operator_types = ['+','-','*','/']

// Calculator functions 
const add = (op1, op2) => {
    return op1 + op2
}
const substract = (op1, op2) => {
    return op1 - op2
}
const multiply = (op1, op2) => {
    return op1 * op2
}
const divide = (op1, op2) => {
    return op1 / op2
}

let operator_functions = {
    '+': add,
    '-': substract,
    '*': multiply,
    '/': divide
}

// Click Effect
const click_effect = element =>{
    element.classList.add('click-effect')
    setTimeout(()=>{
        element.classList.remove('click-effect')
    },250)
}

// Add Click Effect
btns.forEach(btn => {
    btn.addEventListener('click',()=>{
        click_effect(btn)
    })
})

// Input data event
input_btns.forEach(btn => {
    btn.addEventListener('click',()=>{
        calculation_container.innerHTML += btn.innerHTML
    })
})

// Operators event
operators.forEach(operator => {
    operator.addEventListener('click',()=>{
        calculation_container.innerHTML += operator.innerHTML
    })
})

// Clear the result 
clear_btn.addEventListener('click',()=>{
    output_result.innerHTML = ""
    calculation_container.innerHTML  = ""
})

// Compute the result
result_btn.addEventListener('click',()=>{
    let result_field = calculation_container.innerHTML
    let operands = []
    let operators = []
    let index = 0
    for (let i = 0; i < result_field.length; i++) {
        if(operator_types.includes(result_field[i])){
            index = index + 1
            operators.push(result_field[i])
        }else{
            if(operands[index] == undefined){
                operands[index] = ''
            }
            operands[index] += result_field[i]
        }
    }
    console.log(operands)
    console.log(operators)
    let result = 0;       // Store Temporary Result
    operators.forEach((op,i) => {
        if( i == 0){
            result = operator_functions[op](parseInt(operands[i+1]),parseInt(operands[1]))
        }else{
            result = operator_functions[op](result,parseInt(operands[i+1]))
        }
    })
    output_result.innerHTML = result
})

