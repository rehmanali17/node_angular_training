import { Component, OnInit } from '@angular/core';
import { ManageTodosService } from 'src/app/services/manage-todos.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  todo = ''
  isError = false
  showError = false
  errorMessage = ''
  emptyInputMessage = 'Please enter a todo'
  invalidInputMessage = 'Invalid input! Only alphabets are allowed'
  inputFormat = /^[a-zA-Z ,._-]+$/

  constructor(private todoService:ManageTodosService) { }

  ngOnInit(): void {
  }

  // Handling form submit
  handleFormSubmit(event: Event){
    event.preventDefault()
    if(this.todo === ''){
      this.errorMessage = this.emptyInputMessage
      this.isError = true
      this.showError = true
    }else{
      const length = this.todoService.getTodosLength()
      this.todoService.addTodo({id:length,body:this.todo,isChecked:false})
      this.todo = ''
    }
  }

  // Input Validation
  handleInputChange(event: KeyboardEvent){
    if(event.key === 'Enter' && this.isError === false){
      this.handleFormSubmit(event as Event)
    }else {
      if(this.todo !== '' && !this.inputFormat.test(this.todo)){
        this.errorMessage = this.invalidInputMessage
        this.isError = true
        this.showError = true
      }else{
        this.isError = false
        this.showError = false
      }
    }
  }

  // Hide Error Message
  hideErrorMessage(){
    this.showError =  false
  }

}
