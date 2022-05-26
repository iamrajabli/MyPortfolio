'use strict';

class NewTask {
    constructor(taskContent) {
        this.taskContent = taskContent;
    }
}

class Control {
    static controlTask(task) {
        if (task == '') {
            return false
        } else {
            return true
        }
    }
}

class Screen {
    constructor() {
        this.containerNewTask = document.getElementById('container-new-task');
        this.txtSearchTask = document.getElementById('txt-search-task').addEventListener('keyup', this.searchTask.bind(this));
        this.txtAddTask = document.getElementById('txt-add-task');
        this.btnAddTask = document.getElementById('btn-add-task');
        this.btnAddTask.addEventListener('click', this.addTask.bind(this));
        this.txtSearchTask = document.getElementById('txt-search-task');
        this.taskList = document.querySelector('#container-task-list .task-list');
        this.taskListCompleted = document.querySelector('#container-completed-task-list .task-list');
        this.taskListCompleted.addEventListener('click', this.removeTask.bind(this))
        this.taskList.addEventListener('click', this.completeTask.bind(this));
        this.btnAllComplete = document.getElementById('btn-all-tasks-complete');
        this.btnAllComplete.addEventListener('click', this.completeAll.bind(this));
        this.btnAllRemove = document.getElementById('btn-all-tasks-remove');
        this.btnAllRemove.addEventListener('click', this.removeAll.bind(this));
        this.allTasks = new LS();
        this.showTasks();
    }

    addTask() {
        const newTaskObj = new NewTask(this.txtAddTask.value.trim());
        const result = Control.controlTask(newTaskObj.taskContent);
        if (result) {
            this.taskUI(newTaskObj.taskContent, 'fa-circle-check', this.taskList);
            this.allTasks.setLS(newTaskObj.taskContent, this.allTasks.tasks, 'tasks');
            const infoSuccess = document.querySelector('#container-new-task .info-success');
            if (infoSuccess == null) {
                this.statusInfo('info-success', 'Successfuly added!', '1500', this.containerNewTask);
            }
            this.txtAddTask.value = '';

            this.btnAllComplete.style.display = 'block';
            const info = document.querySelector('#container-task-list .task-list .info-danger');
            if (info !== null) {
                info.remove();
            }
        }
    }

    completeTask(e) {
        if (e.target.classList.contains('fa-circle-check')) {
            const task = e.target.parentElement.parentElement; // for removing
            const taskText = task.children[0].innerText; // for adding
            this.allTasks.setLS(taskText, this.allTasks.completedTasks, 'completedTasks') // add to completedTasks ls
            this.allTasks.removeLS(taskText, this.allTasks.tasks, 'tasks') // remove from tasks ls
            this.taskUI(taskText, 'fa-trash-can', this.taskListCompleted) // add to taskUI
            task.remove();


            const info = document.querySelector('#container-completed-task-list .task-list .info-danger');
            if (info !== null) {
                info.remove();
                this.btnAllRemove.style.display = 'block';
            }
            if (this.allTasks.tasks.length == 0) {
                this.btnAllComplete.style.display = 'none';
                this.statusInfo('info-danger', 'No saved tasks!', '', this.taskList);
            }


        }
    }
    searchTask(e) {
        const searchText = e.target.value.toLowerCase();
        const tasks = document.querySelectorAll('#container-task-list .task-list .task');

        tasks.forEach(task => {
            if (task.innerText.indexOf(searchText) == -1) {
                task.style.display = 'none';
                this.btnAllComplete.style.display = 'none';
            } else {
                task.style.display = 'flex';
                this.btnAllComplete.style.display = 'block';
            }
        })
    }
    removeTask(e) {
        if (e.target.classList.contains('fa-trash-can')) {
            const task = e.target.parentElement.parentElement; // for removing
            const taskText = task.children[0].innerText; // for removing from ls
            this.allTasks.removeLS(taskText, this.allTasks.completedTasks, 'completedTasks') // remove from tasks ls
            task.remove();

            if (this.allTasks.completedTasks.length == 0) {
                this.btnAllRemove.style.display = 'none';
                this.statusInfo('info-danger', 'No completed tasks!', '', this.taskListCompleted);
            }
        }
    }

    taskUI(taskContent, iconClass, ref) {
        const task = document.createElement('div');
        task.className = 'task';
        task.innerHTML = `
            <div class="task-text">${taskContent}</div>
            <div class="task-icon">
                <i class="fa-solid ${iconClass}"></i>
            </div>
        `;
        ref.insertBefore(task, ref.children[0]);
    }

    completeAll() {
        const tasks = document.querySelectorAll('#container-task-list .task-list .task');
        tasks.forEach(task => {
            this.allTasks.removeLS(task.innerText, this.allTasks.tasks, 'tasks');
            this.allTasks.setLS(task.innerText, this.allTasks.completedTasks, 'completedTasks');
            this.taskUI(task.innerText, 'fa-trash-can', this.taskListCompleted);
            task.remove();

            this.btnAllComplete.style.display = 'none';
        });

        const infoCompleted = document.querySelector('#container-completed-task-list .task-list .info-danger');
        if (infoCompleted !== null) {
            infoCompleted.remove();
            this.btnAllRemove.style.display = 'block';
        }

        const info = document.querySelector('#container-task-list .task-list .info-danger');
        if (info == null) {
            this.statusInfo('info-danger', 'No saved tasks!', '', this.taskList);
        }
    }

    removeAll() {
        const tasks = document.querySelectorAll('#container-completed-task-list .task-list .task');
        tasks.forEach(task => {
            this.allTasks.removeLS(task.innerText, this.allTasks.tasks, 'completedTasks');
            task.remove();
        });

        this.btnAllRemove.style.display = 'none';
        const info = document.querySelector('#container-content-task-list .task-list .info-danger');
        if (info == null) {
            this.statusInfo('info-danger', 'No completed tasks!', '', this.taskListCompleted);
        }
    }
    showTasks() {
        for (let i in this.allTasks.tasks) {
            this.taskUI(this.allTasks.tasks[i], 'fa-circle-check', this.taskList)
        }

        for (let i in this.allTasks.completedTasks) {
            this.taskUI(this.allTasks.completedTasks[i], 'fa-trash-can', this.taskListCompleted)
        }
        if (this.allTasks.tasks.length == 0) {
            this.btnAllComplete.style.display = 'none';
            this.statusInfo('info-danger', 'No saved tasks!', '', this.taskList);
        }
        if (this.allTasks.completedTasks.length == 0) {
            this.btnAllRemove.style.display = 'none';
            this.statusInfo('info-danger', 'No completed tasks!', '', this.taskListCompleted);
        }

    }

    statusInfo(infoClass, infoMessage, infoTimeOut = "", infoRef) {
        const info = document.createElement('div');
        info.className = `info ${infoClass}`;
        info.innerHTML = `
        <div class="info-icon">
        <i class="fa-solid fa-circle-info"></i>
        </div>
        <div class="info-text">${infoMessage}</div>
        `
        if (infoTimeOut !== "") {
            setTimeout(() => {
                info.remove();
            }, infoTimeOut)
        }

        infoRef.appendChild(info)
    }
}

class LS {
    constructor() {
        this.tasks = this.getTasksLS();
        this.completedTasks = this.getCompletedTasksLS();
    }

    getTasksLS() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks
    }

    getCompletedTasksLS() {
        let completedTasks;
        if (localStorage.getItem('completedTasks') === null) {
            completedTasks = [];
        } else {
            completedTasks = JSON.parse(localStorage.getItem('completedTasks'));
        }
        return completedTasks
    }

    setLS(taskContent, ref, ls) {
        ref.push(taskContent);
        localStorage.setItem(ls, JSON.stringify(ref));
    }
    removeLS(taskContent, ref, ls) {
        ref.forEach((task, index) => {
            if (task == taskContent) {
                ref.splice(index, 1);
            }
        });
        localStorage.setItem(ls, JSON.stringify(ref));
    }
}


document.addEventListener('DOMContentLoaded', () => { new Screen });