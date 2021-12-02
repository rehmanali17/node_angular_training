import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() innerText = ''
  @Input() className = ''
  @Output() handleBtnClick = new EventEmitter<string>()
  
  constructor() {}

  ngOnInit(): void {
  }

  btnClicked(event: Event){
    const htmlElement = <HTMLElement>event.target
    this.handleBtnClick.emit(htmlElement.innerText)
  }

}
