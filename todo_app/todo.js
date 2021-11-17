// Disclaimer: This task is done with database perspective,and that's why local storage and array is used to store toods. Otherwise this project can be done just adding and removing the elements from the DOM.


// Initialization
const todo_text_field = document.getElementById('todo-text')
const add_todo_btn = document.getElementById('add-todo')
const [todos_container] = document.querySelectorAll('.todos')
const error_msg = document.querySelector('.error-msg')
const input_check = /^[a-zA-Z ._-]+$/

// Storing todos in the local storage
const store_todos = array => {
    localStorage.setItem('todos',JSON.stringify(array))
}

// Getting todos from the local storage
const get_todos = () =>{
    if(localStorage.getItem('todos')){
        return JSON.parse(localStorage.getItem('todos'))
    }else{
        return []
    }
}

// Checking whether a todo exists, and if no it displays the counter message
const is_existing_todos = (array,html_element,html_content) => {
    if(array.length == 0){
        html_element.innerHTML = html_content
    }
}


// Displaying todos on the page
const write_todos_container = (array,container) => {
    container.innerHTML = ''
    array.forEach((element,index) => {
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
write_todos_container(todos_list,todos_container)

// It will check if there is any todo present in the array otherwise it will display the error message
is_existing_todos(todos_list,todos_container,`<div class="no-todo">No todos have been added yet</div>`)




// Input Validation
todo_text_field.addEventListener('keyup',()=>{
    if(!input_check.test(todo_text_field.value)){
        error_msg.innerHTML = 'Invalid input! Only characters are allowed'
        add_todo_btn.setAttribute('disabled',true)
    }else{
        error_msg.innerHTML = ''
        add_todo_btn.removeAttribute('disabled')
    }
})

// Add button event
add_todo_btn.onclick = event =>{
    event.preventDefault()
    if(todo_text_field.value == ''){
        error_msg.innerHTML = 'Invalid input! Only characters are allowed'
    }else{
        todos_list.push(todo_text_field.value)
        store_todos(todos_list)
        write_todos_container(todos_list,todos_container)
    }
    
}

// Todos container click event
todos_container.addEventListener('click', e => {
    if(e.target.tagName === 'I'){

        const removeElementIndex = e.target.parentElement.getAttribute('data-index')
        todos_list = todos_list.filter((todo,index) => index != removeElementIndex)
        store_todos(todos_list)
        write_todos_container(todos_list,todos_container)
        is_existing_todos(todos_list,todos_container,`<div class="no-todo">No todos have been added yet</div>`)

    }else if(e.target.tagName === 'INPUT'){
        if(e.target.checked === true){
            e.target.nextElementSibling.classList.add('line-through')
        }else{
            e.target.nextElementSibling.classList.remove('line-through')
        }
    }
})