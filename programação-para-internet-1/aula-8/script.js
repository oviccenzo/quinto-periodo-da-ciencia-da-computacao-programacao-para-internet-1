function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if(taskText == ""){
        alert("Digite uma nova tarefa!");
        return;
    }

    const list = document.getElementById("todoList");
    const li = document.createElement("li");
    li.className = "todo-item";
    li.innerHTML = `
    <span class="taskText">
    ${taskText}    
    </span>
    <span>
    <button class="done-btn" onclick="doneTask(this)">Feito!</button>
    <button class="delete-btn" onclick="deleteTask(this)">Excluir</button>
    </span>`;

    list.appendChild(li);
    input.value = "";
}

function deleteTask(button){
    const li = button.parentElement.parentElement;
    li.remove();
}

function doneTask(button){
    const texto = button.parentElement.previousElementSibling;
    texto.classList.toggle("done");
    texto.classList.toggle("done-btn-a");
}