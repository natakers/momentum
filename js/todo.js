const inputTask = document.getElementById("new-task");
const unfinishedTasks = document.getElementById("unfinished-tasks");
const finishedTasks = document.getElementById("finished-tasks");

const addButton = document.getElementById("add");
addButton.onclick = addTask;

export let data = load();

function createNewElement(task, finished) {
  let listItem = document.createElement("li");
  let checkbox = document.createElement("button");
  if (finished) {
    checkbox.className = "material-icons checkbox";
    checkbox.innerHTML = "<i class='material-icons'>check_box</i>";
  } else {
    checkbox.className = "material-icons checkbox";
    checkbox.innerHTML =
      "<i class='material-icons'>check_box_outline_blank</i>";
  }
  let label = document.createElement("label");
  label.innerText = task;
  let input = document.createElement("input");
  input.type = "text";
  let editButton = document.createElement("button");
  editButton.className = "material-icons edit";
  editButton.innerHTML = "<i class='material-icons'>edit</i>";
  let deleteButton = document.createElement("button");
  deleteButton.className = "material-icons delete";
  deleteButton.innerHTML = "<i class='material-icons'>delete</i>";
  let box = document.createElement("div");
  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(input);
  box.appendChild(deleteButton);
  box.appendChild(editButton);
  listItem.appendChild(box);
  listItem.classList.add("deal");
  return listItem;
}

function addTask() {
  if (inputTask.value) {
    let listItem = createNewElement(inputTask.value, false);
    unfinishedTasks.appendChild(listItem);
    bindTaskEvents(listItem, finishTask);
    inputTask.value = "";
  }
  save();
}

export function deleteTask() {
  let listItem = this.parentNode.parentNode;
  console.log(listItem);
  let ul = listItem.parentNode;
  ul.removeChild(listItem);
  save();
}

function editTask() {
  let editButton = this;
  let listItem = this.parentNode.parentNode;
  console.log(listItem);
  console.log(editButton);
  let label = listItem.querySelector("label");
  let input = listItem.querySelector("input[type=text]");
  let containsClass = listItem.classList.contains("editMode");
  if (containsClass) {
    label.innerText = input.value;
    editButton.className = "material-icons edit";
    editButton.innerHTML = "<i class='material-icons'>edit</i>";
    save();
  } else {
    input.value = label.innerText;
    editButton.className = "material-icons save";
    editButton.innerHTML = "<i class='material-icons'>save</i>";
  }
  listItem.classList.toggle("editMode");
}

function finishTask() {
  let listItem = this.parentNode;
  let checkbox = listItem.querySelector("button.checkbox");
  checkbox.className = "material-icons checkbox";
  checkbox.innerHTML = "<i class='material-icons'>check_box</i>";
  finishedTasks.appendChild(listItem);
  bindTaskEvents(listItem, unfinishTask);
  save();
}

function unfinishTask() {
  let listItem = this.parentNode.parentNode;
  let checkbox = listItem.querySelector("button.checkbox");
  checkbox.className = "material-icons checkbox";
  checkbox.innerHTML = "<i class='material-icons'>check_box_outline_blank</i>";
  unfinishedTasks.appendChild(listItem);
  bindTaskEvents(listItem, finishTask);
  save();
}

function bindTaskEvents(listItem, checkboxEvent) {
  let box = listItem.querySelector("div");
  let checkbox = listItem.querySelector("button.checkbox");
  let editButton = box.querySelector("button.edit");
  let deleteButton = box.querySelector("button.delete");
  checkbox.onclick = checkboxEvent;
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
}

function save() {
  let unfinishedTasksArr = [];
  for (let i = 0; i < unfinishedTasks.children.length; i++) {
    unfinishedTasksArr.push(
      unfinishedTasks.children[i].getElementsByTagName("label")[0].innerText
    );
  }
  let finishedTasksArr = [];
  for (let i = 0; i < finishedTasks.children.length; i++) {
    finishedTasksArr.push(
      finishedTasks.children[i].getElementsByTagName("label")[0].innerText
    );
  }
  localStorage.removeItem("todo");
  localStorage.setItem(
    "todo",
    JSON.stringify({
      unfinishedTasks: unfinishedTasksArr,
      finishedTasks: finishedTasksArr,
    })
  );
}

function load() {
  return JSON.parse(localStorage.getItem("todo"));
}

if (data && data.unfinishedTasks.length > 0 ) {
  for (let i = 0; i < data.unfinishedTasks.length; i++) {
    let listItem = createNewElement(data.unfinishedTasks[i], false);
    unfinishedTasks.appendChild(listItem);
    bindTaskEvents(listItem, finishTask);
  }
}

if (data && data.finishedTasks.length > 0 ) {
for (let i = 0; i < data.finishedTasks.length; i++) {
  let listItem = createNewElement(data.finishedTasks[i], true);
  finishedTasks.appendChild(listItem);
  bindTaskEvents(listItem, unfinishTask);
}
}
