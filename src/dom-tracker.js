const allProjects = {
    projects: [],
    
    addProject: function(project) {
        this.projects.push(project)
    },
    removeProject: function(projectId) {
        this.projects = this.projects.filter(project => project.id !== projectId);
    },
    findProject: function(projectId) {
        return this.projects.find(project => project.id === projectId)
    },
    removeTask: function(taskId) {
        for(let project of this.projects) {
            for(let task of project.tasks) {
                if(task.id === taskId) {
                    project.removeTask(taskId)
                }
            }
        }
    },
    findTask: function(taskId) {
        for(let project of this.projects) {
            for(let task of project.tasks) {
                if(task.id === taskId) {
                    return task
                }
            }
        }
    }
}

class Project {
    #id
    #title
    #tasks = []

    constructor() {
        this.#id = crypto.randomUUID()
    }

    set id(id) {
        this.#id=id
    }
    get id() {
        return this.#id
    }

    get title() {
        return this.#title
    }
    set title(title) {
        this.#title = title
    }

    get tasks() {
        return this.#tasks
    }
    addTask(task) {
        this.#tasks.push(task)
    }
    removeTask(taskId) {
        this.#tasks = this.#tasks.filter(task => task.id !== taskId);
    }
    findTask(taskId) {
        return this.#tasks.find(task => task.id === taskId);
    }

    toJSON() {
        return {
            id: this.#id,
            title: this.#title,
            tasks: this.#tasks
        };
    }
}

class Task {
    #id
    #checked = false
    #title
    #description
    #dueDate
    #priority
    #subtasks = []

    constructor() {
        this.#id = crypto.randomUUID()
    }

    get id() {
        return this.#id;
    }
    set id(id) {
        this.#id=id
    }

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
    incrementPriority() {
        if(this.#priority === undefined) {
            this.#priority = 'low'
        } else if(this.#priority === 'low') {
            this.#priority = 'mid'
        } else if(this.#priority === 'mid') {
            this.#priority = 'high'
        } else {
            this.#priority = undefined
        }
    }

    get subtasks() {
        return this.#subtasks
    }
    addSubtask(subtask) {
        this.#subtasks.push(subtask)
    }
    removeSubtask(subtaskId) {
        this.#subtasks = this.#subtasks.filter(subtask => subtask.id !== subtaskId)
    }
    findSubtask(subtaskId) {
        return this.#subtasks.find(subtask => subtask.id === subtaskId)
    }

    toJSON() {
        return {
            id: this.#id,
            checked: this.#checked,
            title: this.#title,
            description: this.#description,
            dueDate: this.#dueDate,
            priority: this.#priority,
            subtasks: this.#subtasks
        };
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
    set id(id) {
        this.#id=id
    }

    get checked() {
        return this.#checked
    }
    set checked(checked) {
        this.#checked = checked
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

    toJSON() {
        return {
            id: this.#id,
            checked: this.#checked,
            textContent: this.#textContent,
        };
    }
}

export { allProjects, Project, Task, Subtask }