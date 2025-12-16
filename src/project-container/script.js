import "./style.css";
import addIcon from "../icons/add-symbol.svg"
import { ProjectDomElement } from "../todo-project/script.js"
import { allProjects, Project, Task, Subtask } from "../dom-tracker.js"

class ProjectContainerDomElement {
    constructor() {
        const body = document.querySelector("body")

        const projectContainer = document.createElement("div")
        projectContainer.classList.add("project-container")
        body.appendChild(projectContainer)

        const addProjectsButtonIcon = document.createElement("img")
        addProjectsButtonIcon.src = addIcon
        addProjectsButtonIcon.alt = "Add project button"
        addProjectsButtonIcon.classList.add("add-project-icon")

        const addProjectsButton = document.createElement("button")
        addProjectsButton.classList.add("add-project-btn")
        addProjectsButton.appendChild(addProjectsButtonIcon)
        addProjectsButton.addEventListener("click", event => {
            const project = new Project()
            allProjects.addProject(project)
            const projectDomElement = new ProjectDomElement(project)
            projectDomElement.appendTo(projectContainer)
            projectContainer.removeChild(addProjectsButton)
            projectContainer.appendChild(addProjectsButton)
        })
        projectContainer.appendChild(addProjectsButton)
    }
}

export { ProjectContainerDomElement }