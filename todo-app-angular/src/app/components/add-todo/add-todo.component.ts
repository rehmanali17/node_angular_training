import { Component, OnInit } from '@angular/core';
import { ManageTodosService } from 'src/app/services/manage-todos.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  inputTodo: string = ''
  isError: boolean = false
  showError: boolean = false
  errorMessage: string = ''
  inputCheck: RegExp = /^[a-zA-Z ,._-]+$/

  constructor(private todoService:ManageTodosService) { }

  ngOnInit(): void {
  }

  // Handling form submit
  handleSubmit(event:Event){
    event.preventDefault()
    if(this.inputTodo !== ''){
      const length = this.todoService.getTodosLength()
      this.todoService.addTodo({id:length,content:this.inputTodo,isChecked:false})
      this.inputTodo = ''
    }else{
      this.errorMessage = 'Please enter a todo'
      this.isError = true
      this.showError = true
    }
  }

  // Input Validation
  handleInput(event: Event){
    const inputElement = <HTMLInputElement>event.target
    if(!this.inputCheck.test(inputElement.value)){
      this.errorMessage = 'Invalid input! Only alphabets are allowed'
      this.isError = true
      this.showError = true
    }else{
        this.errorMessage = ''
        this.isError = false
        this.showError = false
    }
  }

  hideErrorMessage(){
    this.showError =  false
  }

}
