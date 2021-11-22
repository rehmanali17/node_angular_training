// Disclaimer: This task is done with database perspective,and that's why local storage and array is used to store toods. Otherwise this project can be done just adding and removing the elements from the DOM.


// Initialization
const todo_text_field = <HTMLInputElement>document.getElementById('todo-text')
const add_todo_btn = document.getElementById('add-todo')!
const todos_container = document.querySelector('.todos')!
const error_msg = document.querySelector('.error-msg')!
const input_check = /^[a-zA-Z ._-]+$/

// Storing todos in the local storage
const store_todos = (array:string[]) => {
    localStorage.setItem('todos',JSON.stringify(array))
}

// Getting todos from the local storage
const get_todos = () =>{
    if(localStorage.getItem('todos')){
        return <string[]>JSON.parse(localStorage.getItem('todos')!)
    }else{
        return <string[]>[]
    }
}

// Checking whether a todo exists, and if no it displays the counter message
const is_existing_todos = (array:string[],html_element:HTMLElement,html_content:string) => {
    if(array.length == 0){
        html_element.innerHTML = html_content
    }
}


// Displaying todos on the page
const write_todos_container = (array:string[],container:HTMLElement) => {
    container.innerHTML = ''
    array.forEach((element:string,index:number) => {
        container.innerHTML += `
        <div class='todo' data-index=${index}>
            <input type="checkbox" class="todo-check" id="todo-check" />
            <p class="todo-content">${element}</p>
            <i class="fas fa-trash todo-delete"></i>
        </div>
        `
    })
}

// Getting todos and initializing the todos list array
let todos_list = get_todos()

// Displaying the todos obtained from the local storage
write_todos_container(todos_list,todos_container as HTMLElement)

// It will check if there is any todo present in the array otherwise it will display the error message
is_existing_todos(todos_list,todos_container as HTMLElement,`<div class="no-todo">No todos have been added yet</div>`)




// Input Validation
todo_text_field.addEventListener('keyup',()=>{
    if(!input_check.test(todo_text_field.value)){
        error_msg.innerHTML = 'Invalid input! Only characters are allowed'
        error_msg.classList.remove('d-none')
        add_todo_btn.setAttribute('disabled','true')
    }else{
        error_msg.innerHTML = ''
        error_msg.classList.add('d-none')
        add_todo_btn.removeAttribute('disabled')
    }
})

// Add button event
add_todo_btn.onclick = event =>{
    event.preventDefault()
    if(todo_text_field.value === ''){
        error_msg.innerHTML = 'Please enter some text first'
        error_msg.classList.remove('d-none')
    }else{
        todos_list.push(todo_text_field.value)
        store_todos(todos_list)
        write_todos_container(todos_list,todos_container as HTMLElement)
        todo_text_field.value = ''
    }
    
}

// Todos container click event
todos_container.addEventListener('click',e => {
    const targetElement = e.target as HTMLElement
    if(targetElement.tagName === 'I'){
        const removeElementIndex = <unknown>targetElement.parentElement?.getAttribute('data-index')
        todos_list = todos_list.filter((todo:string,index:number) => index != removeElementIndex)
        store_todos(todos_list)
        write_todos_container(todos_list,todos_container as HTMLElement)
        is_existing_todos(todos_list,todos_container as HTMLElement,`<div class="no-todo">No todos have been added yet</div>`)
    }else if(targetElement.tagName === 'INPUT'){
        const checkBoxElement = targetElement as HTMLInputElement
        if(checkBoxElement.checked === true){
            targetElement.nextElementSibling?.classList.add('line-through')
        }else{
            targetElement.nextElementSibling?.classList.remove('line-through')
        }
    }
})