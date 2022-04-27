const form = document.querySelector("#todo-form");
const list = document.querySelector("#todo-list");

//fetching the data from the todo.json
function updateTodoList() {
  list.innerHTML = "";

  fetch("http://localhost:3000/todos")
    .then((res) => res.json())
    .then((data) => {
      //Update the Page
      data.forEach((todos) => {
        const li = document.createElement("li");
        li.innerText = todos.title;
        if (todos.completed) {
          li.className = "completed";
        }
        list.append(li);
      });
    });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  //Get data from the input field
  const title = event.target[0].value;
  
  event.target.reset()

  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: title, completed: false }),
  };

  fetch(`http://localhost:3000/todos`, opts)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // update the page with the new item
      //   const li = document.createElement("li");
      //   li.innerText = data.title;
      //   list.append(li);
      updateTodoList();
    });
});

updateTodoList();
