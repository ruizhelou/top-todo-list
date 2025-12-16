import "./style.css";
import binIcon from "../icons/bin.svg"
import addIcon from "../icons/add-symbol.svg"
import { TaskDomElement } from "../todo-item/script.js"
import { allProjects, Project, Task, Subtask } from "../dom-tracker.js"

class ProjectDomElement {
    #project

    #rootContainer
    #projectBody

    constructor(project) {
        this.#project = project

        this.#rootContainer = document.createElement("div")
        this.#rootContainer.classList.add("project")

        const projectHeader = document.createElement("div")
        projectHeader.classList.add("project-header")
        this.#rootContainer.appendChild(projectHeader)

        const projectTitle = document.createElement("textarea")
        projectTitle.name = "project-title"
        projectTitle.id = "project-title"
        if(project.title === undefined) {
            projectTitle.placeholder = "Project title..."
        } else {
            projectTitle.value = project.title
        }
        projectTitle.addEventListener("input", event => this.project.title = event.target.value)
        projectHeader.appendChild(projectTitle)

        const deleteButton = document.createElement("button")
        deleteButton.classList.add("delete-btn")
        deleteButton.addEventListener("click", event => {
            const parentNode = this.#rootContainer.parentNode
            parentNode.removeChild(this.#rootContainer)
            allProjects.removeProject(project.id)
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
            const task = new Task()
            project.addTask(task)
            const taskDomElement = new TaskDomElement(task)
            taskDomElement.appendTo(this.#projectBody)
        })
        for(let existingTask of project.tasks) {
            const taskDomElement = new TaskDomElement(existingTask)
            taskDomElement.appendTo(this.#projectBody)
            console.log(existingTask)
        }
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
