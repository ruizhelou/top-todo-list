import "./style.css";
import addIcon from "../icons/add-symbol.svg"
import { ProjectDomElement } from "../todo-project/script.js"

class ProjectContainer {
    #allProjects = []
    
    addProject(project) {
        this.#allProjects.push(project)
    }
    removeProject(projectId) {
        this.#allProjects = this.#allProjects.filter(project => project.id !== projectId);
    }

    get allProjects() {
        return this.#allProjects
    }
}

class ProjectContainerDomElement {
    #allProjects

    constructor() {
        this.#allProjects = new ProjectContainer()
        
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
            const projectDomElement = new ProjectDomElement()
            projectDomElement.appendTo(projectContainer)
            projectContainer.removeChild(addProjectsButton)
            projectContainer.appendChild(addProjectsButton)

            this.#allProjects.addProject(projectDomElement.project)
            projectDomElement.allProjects = this.#allProjects
        })
        projectContainer.appendChild(addProjectsButton)
    }

    get allProjects() {
        return this.#allProjects
    }
}

export { ProjectContainerDomElement }