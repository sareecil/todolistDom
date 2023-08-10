const todoAdd = document.querySelector(".todoAdd");
const tasks = document.querySelector(".tasks");
const todoForm = document.querySelector(".todoForm");

function addTodo(e) {
    e.preventDefault();
    // console.log(todoAdd.value);

    if(todoAdd.value === "") {
        alert("boş bir todo ekleyemezsin");
        return
    }
    tasks.innerHTML +=`<li>
    <div class="view">
    <input class="toggle" type="checkbox">
    <label class="todoLabel">${todoAdd.value}</label>
    <button class="destroy">X</button>
    <input class="edit" value="${todoAdd.value}">
    </div>
    </li>`;
    todoAdd.value = "";

    bindClickActions();
}
   
todoForm.addEventListener("submit", addTodo)

for (const filter of document.querySelectorAll(".filters input")) {
    filter.addEventListener("click", function() {
        tasks.classList.value = "tasks " + this.value;
    });
}


function completedTodo() {
    this.parentElement.parentElement.classList.toggle('completed');
}

function removeTodo() {
    this.parentElement.parentElement.remove();
}

function showTodoEdit() {
    this.classList.add('editing');
    // this.style.display="none"
    // this.nextElementSibling.nextElementSibling.style.display="inline"
    const currValue = this.nextElementSibling.nextElementSibling.value;
    this.nextElementSibling.value = '';
    this.nextElementSibling.value = currValue;
    this.nextElementSibling.focus();
}

function showTodoEdit2(element) {
    element.parentElement.parentElement.classList.add('edit'); 
    element.nextElementSibling.nextElementSibling.style.display="inline" 

}

function editTodo(e) {
    if(e.key === 'Enter') {
        this.previousElementSibling.previousElementSibling.innerHTML = this.value;
        this.parentElement.classList.remove('editing');
    }
}


tasks.addEventListener('dblclick', delegateDblClick);
function delegateDblClick(e) {
    const targetEl = e.target;
    if(targetEl.classList.contains('todoLabel')) {
        showTodoEdit2(targetEl);
    }
    
}

function bindClickActions() {
    // const tasks = document.querySelectorAll(".task");

    // for(const task of tasks) {
    //     task.addEventListener("click", () => {
    //         task.classList.toggle("completed")
    //     })
    // }

    for (const btn of document.querySelectorAll('.destroy')) {
        btn.addEventListener('click', removeTodo);
    }

    for (const btn of document.querySelectorAll('label')) {
        btn.addEventListener('click', completedTodo);
    }

    document.querySelectorAll("label").forEach(x => x.addEventListener('dblclick', showTodoEdit));

    document.querySelectorAll('.edit').forEach(x => x.addEventListener('keydown', editTodo));

}
bindClickActions()