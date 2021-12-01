import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.css']
})
export class KeypadComponent implements OnInit {
  constructor() { }
  @Output() inputChanged = new EventEmitter()
  @Output() clearInput = new EventEmitter()
  @Output() computeResult = new EventEmitter()
  keypadBtnsList = [
    [
      { text: '1', class:'input-btn' },
      { text: '2', class:'input-btn' },
      { text: '3', class:'input-btn' },
      { text: '+', class:'operator-btn' },
    ],
    [
      { text: '4', class:'input-btn' },
      { text: '5', class:'input-btn' },
      { text: '6', class:'input-btn' },
      { text: '-', class:'operator-btn' },
    ],
    ,
    [
      { text: '7', class:'input-btn' },
      { text: '8', class:'input-btn' },
      { text: '9', class:'input-btn' },
      { text: '*', class:'operator-btn' },
    ],
    [
      { text: 'C', class:'clear-btn' },
      { text: '0', class:'input-btn' },
      { text: '=', class:'result-btn' },
      { text: '/', class:'operator-btn' },
    ],
  ]
  ngOnInit(): void {
  }

  inputBtnClicked(event:Event){
    const htmlElement = <HTMLElement>event.target
    // console.log(htmlElement.classList.contains('btn'))
    if(htmlElement.classList.contains('btn')){
      this.inputChanged.emit(htmlElement.innerText)
    }  
  }

  clearBtnClicked(){
    this.clearInput.emit()
  }

  resultBtnClicked(){
    this.computeResult.emit()
  }

}
