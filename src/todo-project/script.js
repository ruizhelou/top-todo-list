import "./style.css";
import binIcon from "../icons/bin.svg"
import addIcon from "../icons/add-symbol.svg"
import { TaskDomElement } from "../todo-item/script.js"

class Project {
    #allProjects

    #id
    #title
    #tasks = []

    constructor() {
        this.#id = crypto.randomUUID();
    }

    get allProjects() {
        return this.#allProjects
    }
    set allProjects(allProjects) {
        this.#allProjects = allProjects
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
    removeTask(taskId) {
        this.#tasks = this.#tasks.filter(task => task.id !== taskId);
    }
}

class ProjectDomElement {
    #project

    #rootContainer
    #projectBody

    constructor() {
        this.#project = new Project()

        this.#rootContainer = document.createElement("div")
        this.#rootContainer.classList.add("project")

        const projectHeader = document.createElement("div")
        projectHeader.classList.add("project-header")
        this.#rootContainer.appendChild(projectHeader)

        const projectTitle = document.createElement("textarea")
        projectTitle.name = "project-title"
        projectTitle.id = "project-title"
        projectTitle.placeholder = "Project title..."
        projectTitle.addEventListener("input", event => this.project.title = event.target.value)
        projectHeader.appendChild(projectTitle)

        const deleteButton = document.createElement("button")
        deleteButton.classList.add("delete-btn")
        deleteButton.addEventListener("click", event => {
            const parentNode = this.#rootContainer.parentNode
            parentNode.removeChild(this.#rootContainer)

            this.#project.allProjects.removeProject(this.#project.id)
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

            this.#project.addTask(taskDomElement.task)
            taskDomElement.task.project = this.#project
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

    get project() {
        return this.#project
    }

    set allProjects(allProjects) {
        this.#project.allProjects = allProjects
    }
}

export { ProjectDomElement }
