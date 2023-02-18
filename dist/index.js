"use strict";
// simple logging function
const logMessage = (message) => {
    console.log(message);
};
const input = document.getElementById("todo");
const btn = document.getElementById("btn");
btn.addEventListener("click", function () {
    alert(input.value);
    input.value = "";
});
