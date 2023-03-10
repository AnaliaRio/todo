let form = document.getElementById('form');
let textInput = document.getElementById('textInput');
let dateInput = document.getElementById('dateInput');
let textarea = document.getElementById('textarea');
let msg = document.getElementById('msg');
let tasks = document.getElementById('tasks');
let add = document.getElementById('add');


form.addEventListener('submit', (e)=> {
    e.preventDefault();
    formValidation();
})

let formValidation = () => {
    if(textInput.value === "") {
        console.log("Failure");
        msg.innerHTML = "Task can not be blank";
    } else {
        console.log("Success");
        msg.innerHTML = "";
        acceptData();
        add.setAttribute('data-bs-dismiss', 'modal'); // This is the same attribute that the close button has
        add.click(); // Add a click because the first one just sets the attribute, so the behavior of the attribute starts on the second click

        (()=> {
            add.setAttribute('data-bs-dismiss', ''); // Immediately invoked function expression (IIFE)
        })();
    }
}

let data = [{}];


let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value
    });

    localStorage.setItem("dataKey", JSON.stringify(data));

    console.log(data);
    createTasks();
}

let createTasks = () => {

    tasks.innerHTML = "";

    data.map((x, y) => {
        return (tasks.innerHTML += `
        <div id=${y}>
        <span class="fw-bold">${x.text}</span>
        <span class="small text-secondary">${x.date}</span>
        <p>${x.description}</p>
    
        <span class="options">
            <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
            <i onClick="deleteTask(this), createTasks()" class="fa-solid fa-trash-can"></i>
        </span>
    </div>
        `);
    });
    resetForm();
};

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("dataKey", JSON.stringify(data));
};

let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;

    deleteTask(e);
}

let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};

(() => {
    data = JSON.parse(localStorage.getItem("dataKey")) || [];
    createTasks();
})()