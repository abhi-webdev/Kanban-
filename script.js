// let draggedCard = null
let rightClickedCard = null
function addTask(columnId) {
    const input = document.getElementById(`${columnId}-input`)
    const taskText = input.value.trim()

    if (taskText === "") {
        return;
    }

    const taskDate = new Date().toLocaleString()
    const taskElement = createTaskElement(taskText, taskDate);

    document.getElementById(`${columnId}-tasks`).appendChild(taskElement)

    updateTasksCount(columnId)
    input.value = ""
}

function createTaskElement(taskText, taskDate) {
    const element = document.createElement("div")
    element.innerHTML = `<span>${taskText}</span><br><smal class="time">${taskDate}</small>`
    element.classList.add("card")
    // element.setAttribute("draggable", true)
    element.draggable = true
    element.addEventListener("dragstart", dragStart)
    element.addEventListener("dragend", dragEnd)
    element.addEventListener("contextmenu", function (event) {
        event.preventDefault()
        rightClickedCard = this
        showContentMenu(event.pageX, event.pageY)
    })
    return element
}

function dragStart() {
    this.classList.add("dragging");
    draggedCard = this;
}

function dragEnd() {
    this.classList.remove("dragging");
    // draggedCard = null;
    ["todo", "doing", "done"].forEach((columnId)=>{
        updateTasksCount(columnId)
    })
}

const columns = document.querySelectorAll(".column .tasks")
columns.forEach((column) => {
    column.addEventListener("dragover", dragOver);
})

function dragOver(event) {
    event.preventDefault();
    const draggedCard = document.querySelector(".dragging")
    this.appendChild(draggedCard);
}

const contextmenu = document.querySelector(".context-menu")
function showContentMenu(x, y) {
    contextmenu.style.left = `${x}px`;
    contextmenu.style.top = `${y}px`;
    contextmenu.style.display = "block";

}

document.addEventListener("click", () => {
    contextmenu.style.display = "none"
})

function editTask() {
    if (rightClickedCard != null) {
        const newTaskText = prompt("Edit task - ", rightClickedCard.textContent)
        if (newTaskText !== "") {
            rightClickedCard.textContent = newTaskText
        }
    }
}

function deleteTask(){
    if(rightClickedCard !== null){
        const columnID = rightClickedCard.parentElement.id.replace("-tasks","")
        // console.log(columnID);
        
        rightClickedCard.remove()
        
        updateTasksCount(columnID)
    }
    
}

function updateTasksCount(columnId) {
    const count = document.querySelectorAll(`#${columnId}-tasks .card`).length
    document.getElementById(`${columnId}-count`).textContent = count
}