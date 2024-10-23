import { DisplayTodoList } from "./list"

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

export {
    HomeButton,
    AllButton,
    WorkButton
}