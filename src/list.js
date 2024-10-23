import { compareAsc, format, formatDistanceToNowStrict  } from "date-fns";

const projectsInput = document.getElementById("projects")
const priorityInput = document.getElementById("priority")
const titleInput = document.getElementById("title")
const descriptionInput = document.getElementById("description")
const dueDateInput = document.getElementById("due-date")
const cfmBtn = document.getElementById("confirm-btn")
const cancelBtn = document.getElementById("cancel-btn")
const todoForm = document.getElementById("todo-form")

class todo {
    constructor(title, description, dueDate , priority, projects) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.projects = projects
    }
}

class ReturnTodo{
    constructor() {
    }

    newTodo = (title, description, dueDate, priority, projects) => {
        const newTodo = new todo(title, description, dueDate, priority, projects)
        return newTodo
    }
}

const AddTodoToStorage = (title, description, dueDate, priority, projects) => {
    const returnClass = new ReturnTodo()
    const newObj = returnClass.newTodo(title, description, dueDate, priority, projects)
    let oldObj = JSON.parse(localStorage.getItem("todo"))
    oldObj.push(newObj)
    localStorage.setItem("todo",JSON.stringify(oldObj))
}

const DisplayTodoList = (type) => {
    let todoList = JSON.parse(localStorage.getItem("todo"))
    todoList.sort((a, b) => compareAsc(a.dueDate, b.dueDate))
    todoList = todoList.map((item,index) => ({ ...item, id:index+1}))

    let newList = []

    if (type === "work"){
        newList = todoList.filter((item) => item.projects === "work")
    } else if (type === "home") {
        newList = todoList.filter((item) => item.projects === "home")
    } else {
        newList = todoList
        
    }
    

    const container = document.querySelector(".todo-ul")
    container.innerHTML = ""
    for (let item in newList) {
        //main card li
        const card = document.createElement("li")
        card.classList.add("todo-card")
        //tickbox
        const tickBox = document.createElement("input")
        tickBox.type = "checkbox"
        if (compareAsc(new Date(), newList[item].dueDate) === 1) {
            tickBox.classList.add("overdue")
        } else {
            tickBox.classList.add(newList[item].priority)
        }

        const wordsDiv = document.createElement("div")
        wordsDiv.classList.add("words-div")

        //title
        const title = document.createElement("div")
        title.classList.add("title")
        title.textContent = newList[item].title

        //description
        const description = document.createElement("div")
        description.textContent = newList[item].description
        description.classList.add("description")

        const projects = document.createElement("div")
        projects.classList.add("projects")
        projects.textContent = newList[item].projects

        const date = document.createElement("div")
        if (compareAsc(new Date(), newList[item].dueDate) === 1) {
            date.textContent = "Overdue"
            date.style.backgroundColor = "#f72585"
        } else {
            date.textContent = formatDistanceToNowStrict(newList[item].dueDate)
        }
        date.classList.add("date")

        const priority = document.createElement("div")
        priority.textContent = newList[item].priority
        priority.classList.add("priority")
        

        wordsDiv.appendChild(title)
        wordsDiv.appendChild(description)
        card.appendChild(tickBox)
        card.appendChild(wordsDiv)
        card.appendChild(projects)
        card.appendChild(priority)
        card.appendChild(date)
        container.appendChild(card);

        //remove card if ticked
        tickBox.addEventListener("click", () => {
            if (tickBox.checked) {
                card.remove()
                todoList = todoList.filter((n) => n !== todoList[item])
                console.log(todoList)
                localStorage.setItem("todo",JSON.stringify(todoList))
            }
        })
    }
}

// template todos
// const returnClass = new ReturnTodo()
// const starter = [returnClass.newTodo("Clean the kitchen", "Clean the damned thing throughly", new Date(2024, 9, 20), "high", "home"),
//     returnClass.newTodo("Do the dishes", "Yes it's my turn", new Date(2024, 9, 22), "medium", "work"),
//     returnClass.newTodo("Make the bed", "It's that time of the week again", new Date(2024, 10, 20), "low", "work"),
//     returnClass.newTodo("Mop the floor", "all over againnn", new Date(2024, 9, 21), "low", "home")]

// console.log(starter)
// localStorage.setItem("todo",JSON.stringify(starter))

DisplayTodoList('all')
const todoDialog = document.querySelector("#todo-dialog")

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

const homeBtn = document.getElementById("home-filter")

const HomeButton = () => {
    homeBtn.addEventListener("click", () => {
        DisplayTodoList("home")
    })
}

const allBtn = document.getElementById("all-filter")

const AllButton = () => {
    allBtn.addEventListener("click", () => {
        DisplayTodoList("all")
    })
}

const workBtn = document.getElementById("work-filter")

const WorkButton = () => {
    workBtn.addEventListener("click", () => {
        DisplayTodoList("work")
    })
}

export {AddButton,
     ConfirmButton,
     CancelButton,
     HomeButton,
     AllButton,
     WorkButton
    }
