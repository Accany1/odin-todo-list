import { compareAsc, format, formatDistanceToNowStrict  } from "date-fns";

const todoList = []
const completedList = []

class todo {
    constructor(title, description, dueDate , priority) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
    }
}

class addTodoToList{
    constructor() {
    }

    newTodo = (title, description, dueDate, priority) => {
        const newTodo = new todo(title, description, dueDate, priority)
        todoList.push(newTodo)
    }
}

class addTodoToCompletedList{
    constructor() {
    }

    newTodo = (title, description, dueDate, priority) => {
        const newTodo = new todo(title, description, dueDate, priority)
        completedList.push(newTodo)
    }
}

class displayTodoList{
    constructor() {
    }

    displayTodoList = () => {
        todoList.sort((a, b) => compareAsc(a.dueDate, b.dueDate))

        const container = document.querySelector(".todo-ul")
        container.innerHTML = ""
        for (let item in todoList) {
            //main card li
            const card = document.createElement("li")
            card.classList.add("todo-card")
            //tickbox
            const tickBox = document.createElement("input")
            tickBox.type = "checkbox"
            if (compareAsc(new Date(), todoList[item].dueDate) === 1) {
                tickBox.classList.add("overdue")
            } else {
                tickBox.classList.add(todoList[item].priority)
            }

            const wordsDiv = document.createElement("div")
            wordsDiv.classList.add("words-div")

            //title
            const title = document.createElement("div")
            title.classList.add("title")
            title.textContent = todoList[item].title

            //description
            const description = document.createElement("div")
            description.textContent = todoList[item].description
            description.classList.add("description")

            const date = document.createElement("div")
            if (compareAsc(new Date(), todoList[item].dueDate) === 1) {
                date.textContent = "Overdue"
                date.style.backgroundColor = "#f72585"
            } else {
                date.textContent = formatDistanceToNowStrict(todoList[item].dueDate)
            }
            date.classList.add("date")

            const priority = document.createElement("div")
            priority.textContent = todoList[item].priority
            priority.classList.add("priority")
            

            wordsDiv.appendChild(title)
            wordsDiv.appendChild(description)
            card.appendChild(tickBox)
            card.appendChild(wordsDiv)
            card.appendChild(priority)
            card.appendChild(date)
            container.appendChild(card);

            //remove card if ticked
            tickBox.addEventListener("click", () => {
                if (tickBox.checked) {
                    card.remove()
                    completedList.push(todoList[item])
                }
            })
        }
    }
}

// template todos
const addTodoClass = new addTodoToList()

addTodoClass.newTodo("Clean the kitchen", "Clean the damned thing throughly", new Date(2024, 9, 20), "high")
addTodoClass.newTodo("Do the dishes", "Yes it's my turn", new Date(2024, 9, 22), "medium")
addTodoClass.newTodo("Make the bed", "It's that time of the week again", new Date(2024, 10, 20), "low")
addTodoClass.newTodo("Mop the floor", "all over againnn", new Date(2024, 9, 21), "low")


console.log(todoList)

const displayTodoListClass = new displayTodoList()
displayTodoListClass.displayTodoList()
const todoDialog = document.querySelector("#todo-dialog")

//button show modal
const AddButton = () => {
    const button = document.querySelector(".add-todo")
    
    button.addEventListener("click", () => {
        todoDialog.showModal()
    })
}

export {AddButton}

const priorityInput = document.getElementById("priority")
const titleInput = document.getElementById("title")
const descriptionInput = document.getElementById("description")
const dueDateInput = document.getElementById("due-date")
const cfmBtn = document.getElementById("confirm-btn")
const cancelBtn = document.getElementById("cancel-btn")
const todoForm = document.getElementById("todo-form")

cfmBtn.addEventListener("click", () => {
    if (todoForm.checkValidity()) {
        addTodoClass.newTodo(titleInput.value, descriptionInput.value, dueDateInput.value, priorityInput.value)
        displayTodoListClass.displayTodoList()

        event.preventDefault()
        todoDialog.close()
    }
})

cancelBtn.addEventListener("click", () => {
    event.preventDefault()
    todoDialog.close()
})

