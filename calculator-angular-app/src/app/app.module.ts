import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalculatorContainerComponent } from './components/calculator-container/calculator-container.component';
import { ResultContainerComponent } from './components/result-container/result-container.component';
import { InputContainerComponent } from './components/input-container/input-container.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorContainerComponent,
    ResultContainerComponent,
    InputContainerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
