import "./style.css";
import incompleteIcon from "../icons/incomplete.svg"
import checkIcon from "../icons/check.svg"
import binIcon from "../icons/bin.svg"
import addIcon from "../icons/add-symbol.svg"
import minusIcon from "../icons/minus-symbol.svg"
import expandUpIcon from "../icons/expand-up.svg"

class TodoItem {
    #checked = false
    #title
    #description
    #dueDate
    #priority
    #subtasks = []

    get checked() {
        return this.#checked
    }

    set checked(checked) {
        this.#checked = checked
    }
    
    get title() {
        return this.#title
    }
    set title(title) {
        this.#title = title
    }

    get description() {
        return this.#description
    }
    set description(description) {
        this.#description = description
    }

    get dueDate() {
        return this.#dueDate
    }
    set dueDate(dueDate) {
        this.#dueDate = dueDate
    }

    get priority() {
        return this.#priority
    }
    set priority(priority) {
        this.#priority = priority
    }

    addSubtask(subtask) {
        this.#subtasks.push(subtask)
    }
    removeSubtask(subtaskId) {
        this.#subtasks.filter(subtask => subtask.id !== subtaskId);
    }
    get subtasksLength() {
        return this.#subtasks.length
    }
}

class Subtask {
    #id
    #checked = false
    #textContent

    constructor() {
        this.#id = crypto.randomUUID()
    }

    get id() {
        return this.#id
    }

    get checked() {
        return this.#checked
    }
    toggleChecked() {
        this.#checked = !this.#checked
    }

    get textContent() {
        return this.#textContent
    }
    set textContent(textContent) {
        this.#textContent = textContent
    }
}

class TodoItemDomElement {
    #todoItem;

    #rootContainer
    #todoItemCard
    #cardDescription
    #dueDateContainer
    #subtasks
    #subtaskFieldset

    #checkButton
    #checkButtonIcon

    #deleteButton

    #collapseButton
    #cardCollapseButtonIcon
    #isCollapsed = false

    constructor() {
        this.#todoItem = new TodoItem();

        this.#rootContainer = document.createElement("div")
        this.#rootContainer.classList.add("container")

        this.#todoItemCard = document.createElement("div")
        this.#todoItemCard.classList.add("todo-item-card")
        this.#rootContainer.appendChild(this.#todoItemCard)

        const cardHeader = document.createElement("div")
        cardHeader.classList.add("card-header")
        this.#todoItemCard.appendChild(cardHeader)

        const headerLeft = document.createElement("div")
        headerLeft.classList.add("header-left")
        cardHeader.appendChild(headerLeft)

        this.#checkButton = document.createElement("button")
        this.#checkButton.classList.add("card-complete-btn")
        this.#checkButton.addEventListener("click", event => {
            this.#todoItem.checked = !this.#todoItem.checked
            if(this.#todoItem.checked) {
                this.checkTodoItem()
            } else {
                this.uncheckTodoItem()
            }
        })
        headerLeft.appendChild(this.#checkButton)

        this.#checkButtonIcon = document.createElement("img")
        this.#checkButtonIcon.classList.add("img-icon")
        this.#checkButtonIcon.src=incompleteIcon
        this.#checkButtonIcon.alt="Complete button"
        this.#checkButton.appendChild(this.#checkButtonIcon)

        const cardTitle = document.createElement("textarea")
        cardTitle.id = "card-title"
        cardTitle.name = "card-title"
        cardTitle.placeholder = "Title..."
        cardTitle.addEventListener("input", event => this.#todoItem.title = event.target.value)
        headerLeft.appendChild(cardTitle)

        const headerRight = document.createElement("div")
        headerRight.classList.add("header-right")
        cardHeader.appendChild(headerRight)

        this.#deleteButton = document.createElement("button")
        this.#deleteButton.classList.add("card-delete-btn")
        this.#deleteButton.addEventListener("click", event => {
            const parentNode = this.#rootContainer.parentNode
            parentNode.removeChild(this.#rootContainer)
        })
        headerRight.appendChild(this.#deleteButton)

        const cardDeleteBtnIcon = document.createElement("img")
        cardDeleteBtnIcon.classList.add("img-icon")
        cardDeleteBtnIcon.src = binIcon
        cardDeleteBtnIcon.alt = "Bin button"
        this.#deleteButton.appendChild(cardDeleteBtnIcon)

        this.#cardDescription = document.createElement("textarea")
        this.#cardDescription.id = "card-description"
        this.#cardDescription.name = "card-description"
        this.#cardDescription.classList.add("card-item")
        this.#cardDescription.placeholder = "Summary..."
        this.#cardDescription.addEventListener("input", event => this.#todoItem.description = event.target.value)
        this.#todoItemCard.appendChild(this.#cardDescription)

        this.#dueDateContainer = document.createElement("div")
        this.#dueDateContainer.classList.add("due-date-container", "card-item")
        this.#todoItemCard.appendChild(this.#dueDateContainer)

        const dueDateLabel = document.createElement("label")
        dueDateLabel.for = "due-date"
        dueDateLabel.textContent = "Due by:"
        this.#dueDateContainer.appendChild(dueDateLabel)

        const dueDateInput = document.createElement("input")
        dueDateInput.id = "due-date"
        dueDateInput.name = "due-date"
        dueDateInput.type = "datetime-local"
        dueDateInput.addEventListener("change", event => this.#todoItem.dueDate = event.target.value)
        this.#dueDateContainer.appendChild(dueDateInput)

        this.#subtasks = document.createElement("div")
        this.#subtasks.classList.add("subtasks", "card-item")
        this.#todoItemCard.appendChild(this.#subtasks)

        this.#subtaskFieldset = document.createElement("fieldset")
        this.#subtasks.appendChild(this.#subtaskFieldset)

        const subtaskHeader = document.createElement("div")
        subtaskHeader.classList.add("subtask-header")
        this.#subtaskFieldset.appendChild(subtaskHeader)

        const legend = document.createElement("legend")
        legend.textContent = "Subtasks"
        subtaskHeader.appendChild(legend)

        const addSubtaskButton = document.createElement("button")
        addSubtaskButton.classList.add("card-add-subtask-btn")
        addSubtaskButton.addEventListener("click", event => this.addSubtask(event))
        subtaskHeader.appendChild(addSubtaskButton)

        const addSubTaskButtonIcon = document.createElement("img")
        addSubTaskButtonIcon.src = addIcon
        addSubTaskButtonIcon.alt = "Add subtask button"
        addSubTaskButtonIcon.classList.add("img-icon")
        addSubtaskButton.appendChild(addSubTaskButtonIcon)

        this.#collapseButton = document.createElement("button")
        this.#collapseButton.classList.add("card-collapse-btn")
        this.#collapseButton.addEventListener("click", event => {
            this.#isCollapsed = !this.#isCollapsed
            if(this.#isCollapsed) {
                this.collapse()
            } else {
                this.expand()
            }
        })
        this.#rootContainer.appendChild(this.#collapseButton)

        this.#cardCollapseButtonIcon = document.createElement("img")
        this.#cardCollapseButtonIcon.src = expandUpIcon
        this.#cardCollapseButtonIcon.alt = "Expand card button"
        this.#cardCollapseButtonIcon.classList.add("img-icon", "rotated")
        this.#collapseButton.appendChild(this.#cardCollapseButtonIcon)
    }

    checkTodoItem() {
        this.#checkButtonIcon.src = checkIcon
        this.#checkButtonIcon.style.backgroundColor = "lightgreen"
    }

    uncheckTodoItem() {
        this.#checkButtonIcon.src = incompleteIcon
        this.#checkButtonIcon.style.backgroundColor = "SkyBlue"
    }

    collapse() {
        this.#todoItemCard.removeChild(this.#cardDescription)
        this.#todoItemCard.removeChild(this.#dueDateContainer)
        this.#todoItemCard.removeChild(this.#subtasks)
        this.#cardCollapseButtonIcon.style.transform = 'rotate(180deg)';
    }

    expand() {
        this.#todoItemCard.appendChild(this.#cardDescription)
        this.#todoItemCard.appendChild(this.#dueDateContainer)
        this.#todoItemCard.appendChild(this.#subtasks)
        this.#cardCollapseButtonIcon.style.transform = 'rotate(0deg)';
    }

    addSubtask(event) {
        const subtask = new Subtask()
        this.#todoItem.addSubtask(subtask)

        const subtaskItem = document.createElement("div")
        subtaskItem.classList.add("subtask-item")
        this.#subtaskFieldset.appendChild(subtaskItem)

        const subtaskItemContainer = document.createElement("div")
        subtaskItemContainer.classList.add("subtask-item-container")
        subtaskItem.appendChild(subtaskItemContainer)

        const subtaskCheckbox = document.createElement("input")
        subtaskCheckbox.type = "checkbox"
        subtaskCheckbox.id = "subtaskCheckbox" + this.#todoItem.subtasksLength
        subtaskCheckbox.name = "subtaskCheckbox" + this.#todoItem.subtasksLength
        subtaskCheckbox.addEventListener("change", event => subtask.toggleChecked())
        subtaskItemContainer.appendChild(subtaskCheckbox)

        const subtaskLabel = document.createElement("label")
        subtaskLabel.setAttribute("for", "subtaskCheckbox" + this.#todoItem.subtasksLength)
        subtaskItemContainer.appendChild(subtaskLabel)

        const subtaskInput = document.createElement("textarea")
        subtaskInput.classList.add("subtask-input")
        subtaskInput.id = "subtaskTextarea" + this.#todoItem.subtasksLength
        subtaskInput.name = "subtaskTextarea" + this.#todoItem.subtasksLength
        subtaskInput.placeholder = "Subtask..."
        subtaskInput.addEventListener("input", event => subtask.textContent = event.target.value)
        subtaskItemContainer.appendChild(subtaskInput)

        const deleteSubtaskButton = document.createElement("button")
        deleteSubtaskButton.classList.add("delete-subtask-btn")
        deleteSubtaskButton.addEventListener("click", event => {
            this.#todoItem.removeSubtask(subtask.id)
            this.#subtaskFieldset.removeChild(subtaskItem)
        })
        subtaskItem.appendChild(deleteSubtaskButton)

        const deleteSubtaskButtonIcon = document.createElement("img")
        deleteSubtaskButtonIcon.alt = "Delete subtask button"
        deleteSubtaskButtonIcon.src = minusIcon
        deleteSubtaskButtonIcon.classList.add("img-icon")
        deleteSubtaskButton.appendChild(deleteSubtaskButtonIcon)
    }

    appendTo(domElement) {
        domElement.appendChild(this.#rootContainer)
    }
}

export { TodoItemDomElement }
