import "./global-styles.css";
import { ProjectContainerDomElement } from "./project-container/script.js"
import { allProjects, Project, Task, Subtask } from "./dom-tracker.js"

const projectContainerDomElement = new ProjectContainerDomElement()
projectContainerDomElement.loadProjects(`[{"id":"5cb49d03-6b11-46b7-98d4-7e9727ee2796","title":"project","tasks":[{"id":"6f0d518c-a979-42f8-82b3-f5b776ee2470","checked":true,"title":"test title","description":"sumarysfsdfsd","dueDate":"2025-12-16T20:09","subtasks":[{"id":"3928c149-0681-4cdf-8d77-c3adeb8503d5","checked":false},{"id":"cb04ed3d-3433-46f7-bddf-340888b932cb","checked":true,"textContent":"test"}]}]},{"id":"35d477b4-fa95-40d8-adcf-eb0e9537489b","tasks":[]}]`)

const log = document.createElement("button")
log.textContent = "log"
log.addEventListener("click", event => {
    const json = JSON.stringify(allProjects.projects)
    console.log(json)
    // const obj = JSON.parse(json)
    // console.log(obj)
    // console.log(allProjects.projects)


    // localStorage.setItem("user", "myval");
    // console.log(localStorage.getItem("user"))
})
document.querySelector("body").appendChild(log)
