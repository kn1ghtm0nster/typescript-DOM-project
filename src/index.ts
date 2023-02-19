// simple logging function
const logMessage = (message: string): void => {
    console.log(message);
}

/*
interface object that will be created whenever we add a new todo item for our page.
*/
interface ToDo {
    text: string;
    completed: boolean;
}

// variables to select each HTML element that we will need to access. 
const form = document.querySelector("form")!;
const input = document.getElementById("todoInput")! as HTMLInputElement;
const btn = document.getElementById("btn")! as HTMLButtonElement;
const ul = document.querySelector("ul")!;

// array of ToDo type objects which will contain tasks that are saved to localStorage or null
const todos: ToDo[] = showRemainingTasks();

// IF todos contains items, use createNewTask function to render item on page.
todos.forEach(createNewTask);

/**
 * retrieves all items that were previously saved to localStorage object parses the JSON object so that we can access the items in standard JS format.
 * 
 * @returns {ToDo Array}
 */
function showRemainingTasks(): ToDo[]{
    const allTasks = localStorage.getItem("todos");
    if (allTasks === null) return [];
    return JSON.parse(allTasks);
}

/**
 * Simple function to save the localStorage object if a task has been updated, added, or deleted.
 * 
 * @returns {void}
 */
function saveTasks(): void {
    localStorage.setItem("todos", JSON.stringify(todos));
}

/**
 * Form handler function to create a new task and save the information to our localStorage object along with the global todos variable.
 * 
 * @param {SubmitEvent} e 
 */
function handleSubmit(e: SubmitEvent){
    e.preventDefault();

    const newTodo: ToDo = {
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
function createNewTask(task: ToDo): void {
    const newLi = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", function (){
        task.completed = checkbox.checked;
        saveTasks();
    })

    newLi.append(task.text);
    newLi.append(checkbox);
    ul.appendChild(newLi);

}

// logic to listen for submit event and use the handleSubmit function from above to execute logic.
form.addEventListener("submit", handleSubmit)



