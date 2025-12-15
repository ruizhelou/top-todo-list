import "./style.css";
import binIcon from "../icons/bin.svg"
import addIcon from "../icons/add-symbol.svg"
import { TaskDomElement } from "../todo-item/script.js"

class Project {
    #id
    #title
    #tasks = []

    constructor() {
        this.#id = crypto.randomUUID();
    }

    get id() {
        return this.#id
    }

    get title() {
        return this.#title
    }
    set title(title) {
        this.#title = title
    }

    addTask(task) {
        this.#tasks.push(task)
    }
}

class ProjectDomElement {
    #todoProject
    #rootContainer
    #projectBody

    constructor() {
        this.#todoProject = new Project()

        this.#rootContainer = document.createElement("div")
        this.#rootContainer.classList.add("project")

        const projectHeader = document.createElement("div")
        projectHeader.classList.add("project-header")
        this.#rootContainer.appendChild(projectHeader)

        const projectTitle = document.createElement("textarea")
        projectTitle.name = "project-title"
        projectTitle.id = "project-title"
        projectTitle.placeholder = "Project title..."
        projectTitle.addEventListener("input", event => this.#todoProject.title = event.target.value)
        projectHeader.appendChild(projectTitle)

        const deleteButton = document.createElement("button")
        deleteButton.classList.add("delete-btn")
        deleteButton.addEventListener("click", event => {
            const parentNode = this.#rootContainer.parentNode
            parentNode.removeChild(this.#rootContainer)
        })
        projectHeader.appendChild(deleteButton)

        const deleteButtonIcon = document.createElement("img")
        deleteButtonIcon.classList.add("img-icon")
        deleteButtonIcon.alt = "Bin button"
        deleteButtonIcon.src = binIcon
        deleteButton.appendChild(deleteButtonIcon)

        this.#projectBody = document.createElement("div")
        this.#projectBody.classList.add("project-body")
        this.#rootContainer.appendChild(this.#projectBody)

        const projectFooter = document.createElement("div")
        projectFooter.classList.add("project-footer")
        this.#rootContainer.appendChild(projectFooter)

        const addTodoItemButton = document.createElement("button")
        addTodoItemButton.classList.add("add-todo-item-btn")
        addTodoItemButton.addEventListener("click", event => {
            const taskDomElement = new TaskDomElement()
            taskDomElement.appendTo(this.#projectBody)
            this.#todoProject.addTask(taskDomElement.todoItem)
        })
        projectFooter.appendChild(addTodoItemButton)

        const addTodoItemButtonIcon = document.createElement("img")
        addTodoItemButtonIcon.classList.add("add-todo-item-icon")
        addTodoItemButtonIcon.alt = "Add todo item icon"
        addTodoItemButtonIcon.src = addIcon
        addTodoItemButton.appendChild(addTodoItemButtonIcon)
    }

    appendTo(domElement) {
        domElement.appendChild(this.#rootContainer)
    }
}

export { ProjectDomElement }
