import "./global-styles.css";
import { ProjectContainerDomElement } from "./project-container/script.js"
import { allProjects, Project, Task, Subtask } from "./dom-tracker.js"

const projectContainerDomElement = new ProjectContainerDomElement()
if(localStorage.getItem("allProjects") !== null) {
    projectContainerDomElement.loadProjects(localStorage.getItem("allProjects"))
}
