/*

Global arrays. There ought to be a 1:1 relationship of each index of your todos
and each index of your isDone.

For example, isDone[3] would hold the "done-ness" information for todos[3].

*/

let todos = [];
let isDone = [];

// When the html finishes loading, launch `init`.
window.onload = init;

// Set up all event listeners.
function init() {
    // When they click the add todo button, run `addTodo`.
    document.querySelector('#add-todo')
        .addEventListener('click', addTodo);
        
    // When they click the clear done todos button, run `clearDoneTodos`.
    document.querySelector('#clear-done-todos')
        .addEventListener('click', clearDoneTodos);
    
    // When they click the clear all todos button, run `clearAllTodos`.
    document.querySelector('#clear-all-todos')
        .addEventListener('click', clearAllTodos);
    
    showTime();
    // countdown();
}

function addTodo(event) {
    // Stop page from reloading on button click.
    event.preventDefault();

    // Get new todo's text from the new todo input field.
    const todoUserInput = document.querySelector('#new-todo').value;

    // Put the todo and its "done-ness" in their respective arrays.
    if(todoUserInput !== '' && todos.includes(todoUserInput) === false) {
        todos.push(todoUserInput);
        isDone.push(false); 
    
    // Create a new html element and put our new todo's text in there.
    const newLi = document.createElement('li');
    newLi.innerText = todoUserInput;
    
    // Add an event listener on the newly created html element to launch
    // `toggleDone` when it's clicked.
    
    newLi.addEventListener('click', toggleDone);
    
    // Put our new element on the list part of our page!
    const addingToOl = document.querySelector('#todo-list');
    addingToOl.appendChild(newLi);
    document.querySelector('#error-message').innerText = '';
    }else if(todoUserInput === '') {
        document.querySelector('#error-message').innerText = '';
    }else if(todos.includes(todoUserInput) === true) {
        document.querySelector('#error-message').innerText = "Please check to make sure todo list doesn't already have the item you are trying to enter.";
    }
    // Clear the input field of all text.
    document.querySelector('#new-todo').value = '';
}


function clearAllTodos(event) {
    // Stop page from reloading on button click.
    event.preventDefault();
    
    // Remove all todos from BOTH arrays.
    while(todos.length > 0) {
        todos.pop();
    }
    while(isDone.length > 0) {
        isDone.pop();
    }
    
    // Remove all todos from the html.
    // You'll have to write that function too, but we'll call it here:
    removeAllChildrenOfOl();
}

function clearDoneTodos(event) {
    // Stop page from reloading on button click.
    event.preventDefault();
    /*
        Find which todos need to be removed and remove them from BOTH arrays.
        If you did it right when making them, you should be able to check the
        `isDone` array to figure out which ones are, in fact, done. Remember
        that there is a 1:1 relationship between `todos` indices and `isDone`
        indices!

        One way to do this is to build up a new array. Give that a try first!

    */
    while(isDone.includes(true)) {
        const index = isDone.indexOf(true);
        todos.splice(index, 1);
        isDone.splice(index, 1);
    }
    /*
        Now remove the done todos from the html.

        Although it's not technically efficient as there is a slight time cost
        to rendering new elements on a web page, you might think not of removing
        certain todos but making a new set of lis to replace what we have. You
        may even already have some code to clear the whole list!

        You could do it the harder but more html efficient way instead, though.

        Your call.
    */
    removeAllChildrenOfOl();
    for(let i = 0; i < todos.length; i++) {
    const newLi = document.createElement('li');
    newLi.innerText = todos[i];
    const appendElement = document.querySelector('#todo-list');
    appendElement.appendChild(newLi);
    newLi.addEventListener('click', toggleDone);
    }

}

function toggleDone(event) {
    // No need to run `event.preventDefault` here; that default behavior only
    // applies to buttons.
    
    // Grab the HTML element that was clicked.
    // If you don't know, the event parameter has what you need... somewhere.
    const elementInnerText = event.target;

    // Find the index of the array that this todo resides in. There are a couple
    // ways to do this, and I'm sure you'll figure one out!
    const index = todos.indexOf(elementInnerText.innerText);

    // *IF* it's not done yet, apply strikethrough. Otherwise, take that
    // strikethrough away!
    // Toggle the "done-ness" of the same todo, using the isDone array.
    
    isDone[index] = !isDone[index];
    elementInnerText.style.textDecoration = !isDone[index] ? 'none' : "line-through";
    
}

function removeAllChildrenOfOl() {
    // Grab the ol.
    const removeAll = document.querySelector('#todo-list');
    // Remove all its children.
    // The way I like to do that is to continue to remove children as long as
    // there are some to remove.
    // Look at the methods `.hasChildNodes` and `removeChild`.
    // There are other ways too, though. Feel free to poke around.
    while(removeAll.hasChildNodes()) {
        removeAll.removeChild(removeAll.firstChild);
    }

}

function showTime(){
    let date = new Date();
    let h = date.getHours(); // 0 - 23
    let m = date.getMinutes(); // 0 - 59
    let s = date.getSeconds(); // 0 - 59
    let session = "AM";
    
    if(h === 0){
        h = 12;
    }
    
    if(h >= 12){
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    const time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("my-clock-display").innerText = time;
    document.getElementById("my-clock-display").textContent = time;
    
    setTimeout(showTime, 1000);
    
}

// function countdown () {
//     let timeLeft = 30;
//     let elem = document.getElementById('some_div');

//     let timerId = setInterval(countdown, 1000);

//     function countdown() {
//         if (timeLeft == 0) {
//         clearTimeout(timerId);
//         doSomething();
//         } else {
//         elem.innerHTML = timeLeft + ' sec';
//         timeLeft--;
//         }
//     }
// }