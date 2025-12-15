import "./global-styles.css";
import { TodoItemDomElement } from "./todo-item/script.js"
import { TodoProjectDomElement } from "./todo-project/script.js"

const project = new TodoProjectDomElement()
project.appendTo(document.querySelector(".projects-container"))
project.addTask(new TodoItemDomElement().rootContainer)
project.addTask(new TodoItemDomElement().rootContainer)
