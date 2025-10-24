document.addEventListener("DOMContentLoaded", function () {
  const todoinput = document.getElementById("todoinput");
  const addtodobutton = document.getElementById("addtodobtn");
  const todolist = document.getElementById("todolist");

  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  function rendertodos() {
    todolist.innerHTML = '';
    todos.forEach((todo, index) => {
      const listitem = document.createElement('li');
      listitem.className = 'list-group-item d-flex justify-content-between align-items-center';

      if (todo.completed) {
        listitem.classList.add('completed');
      }

      listitem.textContent = todo.text;

      const delbtn = document.createElement('button');
      delbtn.className = 'btn btn-danger btn-sm';
      delbtn.textContent = 'delete';
      delbtn.addEventListener('click', () => {
        deletetodo(index);
      });

      listitem.appendChild(delbtn);
      listitem.addEventListener('click', () => {
        toggletodocomplete(index);
      });
      todolist.appendChild(listitem);
    });
  }

  function deletetodo(index) {
    todos.splice(index, 1);
    savetodos();
    rendertodos();
  }

  function toggletodocomplete(index) {
    todos[index].completed = !todos[index].completed;
    savetodos();
    rendertodos();
  }

  function addtodo() {
    const tasktext = todoinput.value.trim();
    if (tasktext === "") return;
    todos.push({ text: tasktext, completed: false });
    todoinput.value = "";
    savetodos();
    rendertodos();
  }

  function savetodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  addtodobutton.addEventListener("click", addtodo);

  todoinput.addEventListener('keypress', (Event) => {
    if (Event.key === 'Enter') {
      addtodo();
    }
  });

  rendertodos();
});
