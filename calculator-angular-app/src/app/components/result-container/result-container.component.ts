import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-result-container',
  templateUrl: './result-container.component.html',
  styleUrls: ['./result-container.component.css']
})
export class ResultContainerComponent implements OnInit {
  @Input() inputData = ''
  @Input() resultData = ''
  constructor() { }

  ngOnInit(): void {
  }

}
