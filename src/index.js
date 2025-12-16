import "./global-styles.css";
import { ProjectContainerDomElement } from "./project-container/script.js"
import { allProjects, Project, Task, Subtask } from "./dom-tracker.js"

const projectContainerDomElement = new ProjectContainerDomElement()

const log = document.createElement("button")
log.textContent = "log"
log.addEventListener("click", event => {
    const json = JSON.stringify(allProjects)
    console.log(json)
})
document.querySelector("body").appendChild(log)
