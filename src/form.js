import {AddTodoToStorage, DisplayTodoList} from "./list.js"

const projectsInput = document.getElementById("projects")
const priorityInput = document.getElementById("priority")
const titleInput = document.getElementById("title")
const descriptionInput = document.getElementById("description")
const dueDateInput = document.getElementById("due-date")
const todoDialog = document.querySelector("#todo-dialog")
const cfmBtn = document.getElementById("confirm-btn")
const cancelBtn = document.getElementById("cancel-btn")
const todoForm = document.getElementById("todo-form")

//button show modal
const AddButton = () => {
    const button = document.querySelector(".add-todo")
    
    button.addEventListener("click", () => {
        todoDialog.showModal()
    })
}

const ConfirmButton = () => {
    cfmBtn.addEventListener("click", () => {
        if (todoForm.checkValidity()) {
            AddTodoToStorage(titleInput.value, descriptionInput.value, dueDateInput.value, priorityInput.value, projectsInput.value)
            DisplayTodoList()
            event.preventDefault()
            todoDialog.close()
        }
    })
}

const CancelButton = () => {
    cancelBtn.addEventListener("click", () => {
        event.preventDefault()
        todoDialog.close()
    })
}

export {AddButton,
    ConfirmButton,
    CancelButton
}