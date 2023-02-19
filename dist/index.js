"use strict";
// simple logging function
const logMessage = (message) => {
    console.log(message);
};
// variables to select each HTML element that we will need to access. 
const form = document.querySelector("form");
const input = document.getElementById("todoInput");
const btn = document.getElementById("btn");
const ul = document.querySelector("ul");
// array of ToDo type objects which will contain tasks that are saved to localStorage or null
const todos = showRemainingTasks();
// IF todos contains items, use createNewTask function to render item on page.
todos.forEach(createNewTask);
/**
 * retrieves all items that were previously saved to localStorage object parses the JSON object so that we can access the items in standard JS format.
 *
 * @returns {ToDo Array}
 */
function showRemainingTasks() {
    const allTasks = localStorage.getItem("todos");
    if (allTasks === null)
        return [];
    return JSON.parse(allTasks);
}
/**
 * Simple function to save the localStorage object if a task has been updated, added, or deleted.
 *
 * @returns {void}
 */
function saveTasks() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
/**
 * Form handler function to create a new task and save the information to our localStorage object along with the global todos variable.
 *
 * @param {SubmitEvent} e
 */
function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
        text: input.value,
        completed: false,
    };
    todos.push(newTodo);
    createNewTask(newTodo);
    saveTasks();
    input.value = "";
}
/**
 * Function to create a new task and save the information to our localStorage object along with the global todos variable.
 *
 * Function also renders the information that was typed into the text box on the page.
 *
 * @param {object} task
 *
 * @returns {void}
 */
function createNewTask(task) {
    const newLi = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function () {
        task.completed = checkbox.checked;
        saveTasks();
    });
    newLi.append(task.text);
    newLi.append(checkbox);
    ul.appendChild(newLi);
}
// logic to listen for submit event and use the handleSubmit function from above to execute logic.
form.addEventListener("submit", handleSubmit);
