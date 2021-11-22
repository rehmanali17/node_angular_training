// Initialization
// Here TypeScript Inference is used. TypeScript will infer the types itself
var btns = document.querySelectorAll('.btn');
var input_btns = document.querySelectorAll('.input-btn');
var operators = document.querySelectorAll('.operators');
var calculation_container = document.getElementById('calculation-container');
var result_btn = document.getElementById('result-btn');
var clear_btn = document.getElementById('clear-btn');
var output_result = document.getElementById('output-result');
var operator_types = /^[+-\/*]$/;
// Validation functions
var validateInput = function (result_field, operator_types) {
    var inputLength = result_field.length;
    var isValid = true;
    if (operator_types.test(result_field[0])) {
        isValid = false;
    }
    else if (operator_types.test(result_field[inputLength - 1])) {
        isValid = false;
    }
    else {
        for (var i = 1; i < inputLength - 1; i++) {
            if (operator_types.test(result_field[i]) && operator_types.test(result_field[i + 1])) {
                isValid = false;
            }
        }
    }
    return isValid;
};
// Click Effect
var click_effect = function (element) {
    element.classList.add('click-effect');
    setTimeout(function () {
        element.classList.remove('click-effect');
    }, 250);
};
// Add Click Effect
btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        click_effect(btn);
    });
});
// Input data event
input_btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        calculation_container.innerHTML += btn.innerHTML;
    });
});
// Operators event
operators.forEach(function (operator) {
    operator.addEventListener('click', function () {
        calculation_container.innerHTML += operator.innerHTML;
    });
});
// Clear the result 
clear_btn.addEventListener('click', function () {
    output_result.innerHTML = "";
    calculation_container.innerHTML = "";
});
// Compute the result
result_btn.addEventListener('click', function () {
    var result_field = calculation_container.innerHTML;
    var isValid = validateInput(result_field, operator_types);
    var result;
    if (isValid) {
        result = eval(result_field);
    }
    else {
        result = 'Invalid Input';
    }
    output_result.innerHTML = result;
});
