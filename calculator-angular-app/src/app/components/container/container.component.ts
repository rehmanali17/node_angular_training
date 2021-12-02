import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  input = ''
  result = ''
  operators = /^[+-\/*]$/
 
  constructor() { }

  ngOnInit(): void {
  }

  // Validation functions
  validateInput(input:string,operators:RegExp) {
    const inputLength = input.length
    let isValid = true
    if(operators.test(input[0])){
        isValid = false
    }else if(operators.test(input[inputLength-1])){
        isValid = false
    }else{
        for (let i = 1; i < inputLength - 1; i++) {
            if(operators.test(input[i]) && operators.test(input[i+1])){
                isValid = false
            }
        }
    }
    return isValid
  }

  handleInputChange(input:string){
    this.input += input
  }

  resetInput(){
    this.input = ''
    this.result = ''
  }

  computeResult(){
    const isValid = this.validateInput(this.input,this.operators)
    let result = '';
    if(isValid){
        result = eval(this.input)
    }else{
        result = 'Invalid Input'
    }
    this.result = result
  }

}
