import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator-container',
  templateUrl: './calculator-container.component.html',
  styleUrls: ['./calculator-container.component.css']
})
export class CalculatorContainerComponent implements OnInit {
  inputString:string = ''
  resultString:string = ''
  operator_types:RegExp = /^[+-\/*]$/
 
  constructor() { }

  ngOnInit(): void {
  }

  // Validation functions
  validateInput(input:string,operator_types:RegExp) {
  const inputLength = input.length
  let isValid = true
  if(operator_types.test(input[0])){
      isValid = false
  }else if(operator_types.test(input[inputLength-1])){
      isValid = false
  }else{
      for (let i = 1; i < inputLength - 1; i++) {
          if(operator_types.test(input[i]) && operator_types.test(input[i+1])){
              isValid = false
          }
      }
  }
  return isValid
}

  inputChanged(input:string){
    this.inputString += input
  }

  clearInput(){
    this.inputString = ''
    this.resultString = ''
  }

  computeResult(){
    const isValid = this.validateInput(this.inputString,this.operator_types)
    let result:string;
    if(isValid){
        result = eval(this.inputString)
    }else{
        result = 'Invalid Input'
    }
    this.resultString = result
  }

}
