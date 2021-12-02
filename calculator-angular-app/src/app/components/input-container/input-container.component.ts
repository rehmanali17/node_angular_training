import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.css']
})
export class InputContainerComponent implements OnInit {
  constructor() { }
  @Output() inputChanged = new EventEmitter()
  @Output() clearInput = new EventEmitter()
  @Output() computeResult = new EventEmitter()
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
