import "./global-styles.css";
import { TodoProjectDomElement } from "./todo-project/script.js"

const project = new TodoProjectDomElement()
project.appendTo(document.querySelector(".projects-container"))

