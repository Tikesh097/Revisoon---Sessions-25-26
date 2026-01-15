const tasks = [
  { id: 1, text: 'Complete project proposal' },
  { id: 2, text: 'Review code submissions' },
  { id: 3, text: 'Update documentation' },
  { id: 4, text: 'Team meeting' }
];

const list = document.getElementById("task-list");
let draggedItem = null;


function renderTasks() {
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;
    li.draggable = true;
    li.dataset.id = task.id;

    addDragEvents(li);
    list.appendChild(li);
  });
}

function addDragEvents(item) {

  // When drag starts
  item.addEventListener("dragstart", () => {
    draggedItem = item;
    item.classList.add("dragging");
  });

  //drag ends
  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
    draggedItem = null;
  });

  //allowdrop
  item.addEventListener("dragover", (e) => {
    e.preventDefault();
    item.classList.add("over");
  });

  //leavingadrop
  item.addEventListener("dragleave", () => {
    item.classList.remove("over");
  });

  //itemisdropped
  item.addEventListener("drop", (e) => {
    e.preventDefault();
    item.classList.remove("over");

    if (draggedItem && draggedItem !== item) {
      reorderItems(draggedItem, item);
    }
  });
}


function reorderItems(dragged, target) {
  const draggedId = Number(dragged.dataset.id);
  const targetId = Number(target.dataset.id);

  const draggedIndex = tasks.findIndex(t => t.id === draggedId);
  const targetIndex = tasks.findIndex(t => t.id === targetId);

  //Remove dragged item
  const [removedItem] = tasks.splice(draggedIndex, 1);

  //Insert at new position
  tasks.splice(targetIndex, 0, removedItem);

  renderTasks();
}


renderTasks();
