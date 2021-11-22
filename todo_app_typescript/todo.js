// Disclaimer: This task is done with database perspective,and that's why local storage and array is used to store toods. Otherwise this project can be done just adding and removing the elements from the DOM.
// Initialization
var todo_text_field = document.getElementById('todo-text');
var add_todo_btn = document.getElementById('add-todo');
var todos_container = document.querySelector('.todos');
var error_msg = document.querySelector('.error-msg');
var input_check = /^[a-zA-Z ._-]+$/;
// Storing todos in the local storage
var store_todos = function (array) {
    localStorage.setItem('todos', JSON.stringify(array));
};
// Getting todos from the local storage
var get_todos = function () {
    if (localStorage.getItem('todos')) {
        return JSON.parse(localStorage.getItem('todos'));
    }
    else {
        return [];
    }
};
// Checking whether a todo exists, and if no it displays the counter message
var is_existing_todos = function (array, html_element, html_content) {
    if (array.length == 0) {
        html_element.innerHTML = html_content;
    }
};
// Displaying todos on the page
var write_todos_container = function (array, container) {
    container.innerHTML = '';
    array.forEach(function (element, index) {
        container.innerHTML += "\n        <div class='todo' data-index=".concat(index, ">\n            <input type=\"checkbox\" class=\"todo-check\" id=\"todo-check\" />\n            <p class=\"todo-content\">").concat(element, "</p>\n            <i class=\"fas fa-trash todo-delete\"></i>\n        </div>\n        ");
    });
};
// Getting todos and initializing the todos list array
var todos_list = get_todos();
// Displaying the todos obtained from the local storage
write_todos_container(todos_list, todos_container);
// It will check if there is any todo present in the array otherwise it will display the error message
is_existing_todos(todos_list, todos_container, "<div class=\"no-todo\">No todos have been added yet</div>");
// Input Validation
todo_text_field.addEventListener('keyup', function () {
    if (!input_check.test(todo_text_field.value)) {
        error_msg.innerHTML = 'Invalid input! Only characters are allowed';
        error_msg.classList.remove('d-none');
        add_todo_btn.setAttribute('disabled', 'true');
    }
    else {
        error_msg.innerHTML = '';
        error_msg.classList.add('d-none');
        add_todo_btn.removeAttribute('disabled');
    }
});
// Add button event
add_todo_btn.onclick = function (event) {
    event.preventDefault();
    if (todo_text_field.value === '') {
        error_msg.innerHTML = 'Please enter some text first';
        error_msg.classList.remove('d-none');
    }
    else {
        todos_list.push(todo_text_field.value);
        store_todos(todos_list);
        write_todos_container(todos_list, todos_container);
        todo_text_field.value = '';
    }
};
// Todos container click event
todos_container.addEventListener('click', function (e) {
    var _a, _b, _c;
    var targetElement = e.target;
    if (targetElement.tagName === 'I') {
        var removeElementIndex_1 = (_a = targetElement.parentElement) === null || _a === void 0 ? void 0 : _a.getAttribute('data-index');
        todos_list = todos_list.filter(function (todo, index) { return index != removeElementIndex_1; });
        store_todos(todos_list);
        write_todos_container(todos_list, todos_container);
        is_existing_todos(todos_list, todos_container, "<div class=\"no-todo\">No todos have been added yet</div>");
    }
    else if (targetElement.tagName === 'INPUT') {
        var checkBoxElement = targetElement;
        if (checkBoxElement.checked === true) {
            (_b = targetElement.nextElementSibling) === null || _b === void 0 ? void 0 : _b.classList.add('line-through');
        }
        else {
            (_c = targetElement.nextElementSibling) === null || _c === void 0 ? void 0 : _c.classList.remove('line-through');
        }
    }
});
