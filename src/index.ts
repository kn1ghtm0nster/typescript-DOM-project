// simple logging function
const logMessage = (message: string): void => {
    console.log(message);
}
const input = document.getElementById("todo")! as HTMLInputElement;
const btn = document.getElementById("btn")!;

btn.addEventListener("click", function(){
    alert(input.value);
    input.value = "";
})


