const taskInput = document.getElementById("task-input");
const addBtn = document.querySelector(".add-btn");
const taskList = document.querySelector(".task-items");
const clearAll = document.querySelector(".clear-tasks");
const searchInput = document.querySelector("#search");
const sortSelect = document.getElementById("sort-tasks");


addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // get the value from the input filed trim
  const taskText = taskInput.value.trim();
  // check id the value of the input is not empty
  if (taskInput.value !== "") {
    // create li
    const newLi = document.createElement("li");
    newLi.className = "task";
    newLi.style.margin = ".5rem 0rem";


    // create an input field
    const task = document.createElement("input");
    task.disabled = true;
    task.type = "text";
    task.className = "taskDisabled";
    // make the value of the input to be our text
    task.value = taskText;
    // create a button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerText = "Delete";


    // create an edit button
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.innerText = "Edit";


    //create complete button
    const completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.innerText = "Complete";


    // append the input text
    newLi.appendChild(task);
    newLi.appendChild(deleteBtn);
    newLi.appendChild(editBtn);
    newLi.appendChild(completeBtn);
    taskList.appendChild(newLi);


    taskInput.value = "";
  } else {
    const err = document.querySelector(".err");
    // err.style.background = "blue";
    err.style.display = "block";
    setTimeout(() => {
      err.style.display = "none";
    }, 2000);
  }
});


taskList.addEventListener("click", (e) => {
  //  get the paren of the button
  // check if the target is the delete button
  if (e.target.classList.contains("delete-btn")) {
    // remove the parent
    e.target.parentElement.remove();
    sortTasks();
  }
});
// edit
taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    console.log(e.target.parentElement);
    const input = e.target.parentElement.querySelector('input[type="text"]');
    input.disabled = !input.disabled;
    if (!input.disabled) {
      input.focus();
    }
  }




if (e.target.classList.contains("complete-btn")) {
  const task = e.target.parentElement.querySelector(".taskDisabled");
  task.classList.toggle("completed");
  e.target.innerText = task.classList.contains("completed") ? "Undo" : "Complete";
}
});


clearAll.addEventListener("click", function (e) {
  e.preventDefault();
  taskList.innerHTML = "";
});


// Add an event listener to the search input field
searchInput.addEventListener("keyup", (e) => {
  e.preventDefault();
  let searchedWord = e.target.value.toLowerCase();


  const taskItems = document.querySelectorAll(".task");
  taskItems.forEach((taskItem) => {
    let taskText = taskItem.querySelector(".taskDisabled").value.toLowerCase();


    if (taskText.indexOf(searchedWord) !== -1) {
      taskItem.style.display = "block";
    } else {
      taskItem.style.display = "none";
    }
  });
});


// Sorting function
sortSelect.addEventListener("change", () => {
  sortTasks();
});


function sortTasks() {
  const taskItems = Array.from(taskList.children);
  const sortOrder = sortSelect.value;


  taskItems.sort((a, b) => {
    const taskA = a.querySelector(".taskDisabled").value.toLowerCase();
    const taskB = b.querySelector(".taskDisabled").value.toLowerCase();


    if (sortOrder === "asc") {
      return taskA.localeCompare(taskB);
    } else {
      return taskB.localeCompare(taskA);
    }
  });


  taskList.innerHTML = "";
  taskItems.forEach((item) => taskList.appendChild(item));
}






document.addEventListener("DOMContentLoaded", () => {
  const sortTasksSelect = document.getElementById("sort-tasks");
  const taskItemsList = document.querySelector(".task-items");


  // Function to display tasks
  function displayTasks(filteredTasks) {
    taskItemsList.innerHTML = "";
    filteredTasks.forEach((task, index) => {
      const li = document.createElement("li");


      // Add a checkbox to mark task as completed/pending
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => toggleTaskStatus(index));


      li.appendChild(checkbox);
      li.appendChild(document.createTextNode(task.task));
      taskItemsList.appendChild(li);
    });
  }


  // Function to sort tasks based on selection
  function sortTasks() {
    const sortOption = sortTasksSelect.value;


    let filteredTasks;
    if (sortOption === "asc") {
      filteredTasks = tasks.filter(task => task.completed); // Show completed tasks
    } else if (sortOption === "des") {
      filteredTasks = tasks.filter(task => !task.completed); // Show pending tasks
    }


    displayTasks(filteredTasks);
  }


  // Toggle the completion status of a task
  function toggleTaskStatus(index) {
    tasks[index].completed = !tasks[index].completed;
    sortTasks(); // Update the task list after changing the status
  }


  // Event listener for sorting
  sortTasksSelect.addEventListener("change", sortTasks);


  // Initially display all tasks (or you can choose to display only pending/completed)
  displayTasks(tasks);
});  
sortSelect.addEventListener("change", () => {
  sortTasks();
});


function sortTasks() {
  const taskItems = Array.from(taskList.children);
  const sortOrder = sortSelect.value;


  taskItems.forEach((task) => {
    const taskInput = task.querySelector(".taskDisabled");
   
    // For completed tasks
    if (sortOrder === "asc" && taskInput.classList.contains("completed")) {
      task.style.display = "flex"; // Show completed tasks
    }
    // For pending tasks
    else if (sortOrder === "des" && !taskInput.classList.contains("completed")) {
      task.style.display = "flex"; // Show pending tasks
    }
    // Hide other tasks
    else {
      task.style.display = "none";
    }
  });
}       
