import "./style.css";
import addIcon from "../icons/add-symbol.svg"
import { ProjectDomElement } from "../todo-project/script.js"

class ProjectContainer {
    #projects = []
    
    addProject(project) {
        this.#projects.push(project)
    }
}

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
            projectContainer.removeChild(addProjectsButton)
            const projectDomElement = new ProjectDomElement()
            projectDomElement.appendTo(projectContainer)
            projectContainer.appendChild(addProjectsButton)
        })
        projectContainer.appendChild(addProjectsButton)
    }
}

export { ProjectContainerDomElement }