import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.css']
})
export class KeypadComponent implements OnInit {
  constructor() { }
  @Output() handleInputChange = new EventEmitter<string>()
  @Output() resetInput = new EventEmitter()
  @Output() computeResult = new EventEmitter()
  keypadBtns = [
    [
      { innerText: '1', className:'input-btn' },
      { innerText: '2', className:'input-btn' },
      { innerText: '3', className:'input-btn' },
      { innerText: '+', className:'operator-btn' },
    ],
    [
      { innerText: '4', className:'input-btn' },
      { innerText: '5', className:'input-btn' },
      { innerText: '6', className:'input-btn' },
      { innerText: '-', className:'operator-btn' },
    ],
    [
      { innerText: '7', className:'input-btn' },
      { innerText: '8', className:'input-btn' },
      { innerText: '9', className:'input-btn' },
      { innerText: '*', className:'operator-btn' },
    ],
    [
      { innerText: 'C', className:'clear-btn' },
      { innerText: '0', className:'input-btn' },
      { innerText: '=', className:'result-btn' },
      { innerText: '/', className:'operator-btn' },
    ],
  ]
  ngOnInit(): void {
  }

  handleBtnClick(input:string){
    if(input === 'C'){
      this.resetInput.emit()
    }else if(input === '='){
      this.computeResult.emit()
    }else{
      this.handleInputChange.emit(input)
    }
  }


}
