// Initialization
// Here TypeScript Inference is used. TypeScript will infer the types itself
const btns = document.querySelectorAll('.btn')!
const input_btns = document.querySelectorAll('.input-btn')!
const operators = document.querySelectorAll('.operators')!
const calculation_container = document.getElementById('calculation-container')!
const result_btn = document.getElementById('result-btn')!
const clear_btn = document.getElementById('clear-btn')!
const output_result = document.getElementById('output-result')!
const operator_types = /^[+-\/*]$/


// Validation functions
const validateInput = (result_field:string,operator_types:RegExp) => {
    const inputLength = result_field.length
    let isValid = true
    if(operator_types.test(result_field[0])){
        isValid = false
    }else if(operator_types.test(result_field[inputLength-1])){
        isValid = false
    }else{
        for (let i = 1; i < inputLength - 1; i++) {
            if(operator_types.test(result_field[i]) && operator_types.test(result_field[i+1])){
                isValid = false
            }
        }
    }
    return isValid
}

// Click Effect
const click_effect = (element: HTMLButtonElement) =>{
    element.classList.add('click-effect')
    setTimeout(()=>{
        element.classList.remove('click-effect')
    },250)
}

// Add Click Effect
btns.forEach( btn => {
    btn.addEventListener('click',()=>{
        click_effect(btn as HTMLButtonElement)
    })
})

// Input data event
input_btns.forEach((btn: Element) => {
    btn.addEventListener('click',()=>{
        calculation_container.innerHTML += btn.innerHTML
    })
})

// Operators event
operators.forEach((operator:Element) => {
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
    const isValid = validateInput(result_field,operator_types)
    let result:string;
    if(isValid){
        result = eval(result_field)
    }else{
        result = 'Invalid Input'
    }
    output_result.innerHTML = result
})

