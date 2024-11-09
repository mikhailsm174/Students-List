
const nameInput = document.querySelector("#name");
const rollInput = document.querySelector("#roll");
const classInput = document.querySelector("#class");
const ageInput = document.querySelector("#age");
const studentsfrm = document.querySelector('#studentsfrm');
const studentsTable = document.querySelector('#tbody');
const submitButton = document.querySelector("#submit_btn");

let editIndex = null;

function addRowToTable(student, index) {
    let tr = document.createElement('tr');

    student.forEach(value => {
        let td = document.createElement('td');
        td.innerHTML = value;
        td.classList.add('table_data');
        tr.appendChild(td);
    });

    let editBtn = document.createElement('button');
    editBtn.innerText = 'Edit';
    editBtn.classList.add('editButton');
    editBtn.onclick = () => editStudent(index);

    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.classList.add('deleteButton');
    deleteBtn.onclick = () => {
        let positive = prompt("Please enter 'yes'");
        if (positive === 'yes') {
            deleteStudent(index);
        }
    };

    let actionTd = document.createElement('td');
    actionTd.appendChild(editBtn);
    actionTd.appendChild(deleteBtn);

    tr.appendChild(actionTd);
    studentsTable.appendChild(tr);
}

document.addEventListener('DOMContentLoaded', () => {
    const studentsData = JSON.parse(localStorage.getItem("students")) || [];
    studentsData.forEach((student, index) => addRowToTable(student, index));
});

studentsfrm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validation
    if (nameInput.value.length < 3) {
        alert('Name must be at least 3 characters long');
        return;
    }
    if (!rollInput.value.match(/^\d+$/)) {
        alert('Roll must be a number');
        return;
    }
    if (classInput.value.trim() === '') {
        alert('Class cannot be empty');
        return;
    }
    if (ageInput.value < 1 || ageInput.value > 100) {
        alert('Age must be between 1 and 100');
        return;
    }

    // Data processing
    const student = [nameInput.value, rollInput.value, classInput.value, ageInput.value];
    const studentsData = JSON.parse(localStorage.getItem("students")) || [];

    if (editIndex !== null) {
        studentsData[editIndex] = student;
        editIndex = null;
        submitButton.innerText = "Add";  // Submit button text reset to "Add"
    } else {
        studentsData.push(student);
    }
    
    localStorage.setItem("students", JSON.stringify(studentsData));
    reloadTable();

    studentsfrm.reset();
});

function deleteStudent(index) {
    let studentsData = JSON.parse(localStorage.getItem("students"));
    studentsData.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(studentsData));
    reloadTable();
}

function editStudent(index) {
    const studentsData = JSON.parse(localStorage.getItem("students"));
    const student = studentsData[index];

    nameInput.value = student[0];
    rollInput.value = student[1];
    classInput.value = student[2];
    ageInput.value = student[3];

    editIndex = index;
    submitButton.innerText = "Submit";  // Change submit button text to "Submit" when editing
}

function reloadTable() {
    studentsTable.innerHTML = "";
    const studentsData = JSON.parse(localStorage.getItem("students")) || [];
    studentsData.forEach((student, index) => addRowToTable(student, index));
}
