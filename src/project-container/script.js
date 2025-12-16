import "./style.css";
import addIcon from "../icons/add-symbol.svg"
import { ProjectDomElement } from "../todo-project/script.js"
import { allProjects, Project, Task, Subtask } from "../dom-tracker.js"

class ProjectContainerDomElement {
    #projectContainer;
    #addProjectsButton;

    constructor() {
        const body = document.querySelector("body")

        this.#projectContainer = document.createElement("div")
        this.#projectContainer.classList.add("project-container")
        body.appendChild(this.#projectContainer)

        const addProjectsButtonIcon = document.createElement("img")
        addProjectsButtonIcon.src = addIcon
        addProjectsButtonIcon.alt = "Add project button"
        addProjectsButtonIcon.classList.add("add-project-icon")

        this.#addProjectsButton = document.createElement("button")
        this.#addProjectsButton.classList.add("add-project-btn")
        this.#addProjectsButton.appendChild(addProjectsButtonIcon)
        this.#addProjectsButton.addEventListener("click", event => {
            const project = new Project()
            allProjects.addProject(project)
            const projectDomElement = new ProjectDomElement(project)
            projectDomElement.appendTo(this.#projectContainer)
            this.#projectContainer.removeChild(this.#addProjectsButton)
            this.#projectContainer.appendChild(this.#addProjectsButton)
        })
        this.#projectContainer.appendChild(this.#addProjectsButton)
    }

    loadProjects(existingProjectsJson) {
        const existingProjects = JSON.parse(existingProjectsJson)

        for(let existingProject of existingProjects) {
            const project = new Project()
            allProjects.addProject(project)

            // copy fields from existingProject
            project.id = existingProject.id
            project.title = existingProject.title
            
            // copy fields from existingTask
            for(let existingTask of existingProject.tasks) {
                const task = new Task()
                project.addTask(task)

                task.id = existingTask.id
                task.checked = existingTask.checked
                task.title = existingTask.title
                task.description = existingTask.description
                task.dueDate = existingTask.dueDate
                task.priority = existingTask.priority

                // copy fields from existing subtasks
                for(let existingSubtask of existingTask.subtasks) {
                    const subtask = new Subtask()
                    task.addSubtask(subtask)

                    subtask.id = existingSubtask.id
                    subtask.checked = existingSubtask.checked
                    subtask.textContent = existingSubtask.textContent
                }
            }

            const projectDomElement = new ProjectDomElement(project)
            projectDomElement.appendTo(this.#projectContainer)
            this.#projectContainer.removeChild(this.#addProjectsButton)
            this.#projectContainer.appendChild(this.#addProjectsButton)
        }
    }
}

export { ProjectContainerDomElement }