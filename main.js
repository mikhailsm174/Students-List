// const nameInput = document.querySelector("#name");
// const rollInput = document.querySelector("#roll");
// const classInput = document.querySelector("#class");
// const ageInput = document.querySelector("#age");
// const button = document.querySelector("#submit_btn");

// const arry = [nameInput, rollInput, classInput, ageInput];

// button.addEventListener('click', (e)=>{
//     e.preventDefault();
//     allField = true;

//     for(let i = 0; i < arry.length; i++){
//         if(arry[i].value == ""){
//             allField = false;
//             break;
//         }
//     }
//     if(!allField){
//         alert('Some input missing')
//     }
//     else{
//         const studentsTable = document.querySelector('#tbody');
//         let tr = document.createElement('tr');
//         arry.forEach(input => {
//             let td = document.createElement('td');
//             td.innerHTML = input.value;
//             td.classList.add('table_data');
//             tr.appendChild(td);
//             input.value = '';
//         });
//         studentsTable.appendChild(tr);
//     }
// })















// const nameInput = document.querySelector("#name");
// const rollInput = document.querySelector("#roll");
// const classInput = document.querySelector("#class");
// const ageInput = document.querySelector("#age");
// const button = document.querySelector("#submit_btn");

// const arry = [nameInput, rollInput, classInput, ageInput];
// const studentsTable = document.querySelector('#tbody');

// function addRowToTable(student) {
//     let tr = document.createElement('tr');
//     student.forEach(value => {
//         let td = document.createElement('td');
//         td.innerHTML = value;
//         td.classList.add('table_data');
//         tr.appendChild(td);
//     });
//     studentsTable.appendChild(tr);
// }

// document.addEventListener('DOMContentLoaded', () => {
//     const studentsData = JSON.parse(localStorage.getItem("students")) || [];
//     studentsData.forEach(student => addRowToTable(student));
// });

// button.addEventListener('click', (e) => {
//     e.preventDefault();
//     let allFieldsFilled = true;

//     for (let i = 0; i < arry.length; i++) {
//         if (arry[i].value === "") {
//             allFieldsFilled = false;
//             break;
//         }
//     }

//     if (!allFieldsFilled) {
//         alert('Some input is missing');
//     } 
//     else {
//         const student = arry.map(input => input.value);

//         const studentsData = JSON.parse(localStorage.getItem("students")) || [];
//         studentsData.push(student);
//         localStorage.setItem("students", JSON.stringify(studentsData));

//         addRowToTable(student);

//         arry.forEach(input => input.value = '');
//     }
// });



















const nameInput = document.querySelector("#name");
const rollInput = document.querySelector("#roll");
const classInput = document.querySelector("#class");
const ageInput = document.querySelector("#age");
const button = document.querySelector("#submit_btn");

const arry = [nameInput, rollInput, classInput, ageInput];
const studentsTable = document.querySelector('#tbody');

let editIndex = null; // এডিট রো ট্র্যাক করার জন্য ভ্যারিয়েবল

// টেবিলে একটি নতুন রো যোগ করার ফাংশন
function addRowToTable(student, index) {
    let tr = document.createElement('tr');

    // প্রতিটি ডেটা টেবিল সেলে যোগ করা
    student.forEach(value => {
        let td = document.createElement('td');
        td.innerHTML = value;
        td.classList.add('table_data');
        tr.appendChild(td);
    });

    // এডিট এবং ডিলিট বোতাম তৈরি
    let editBtn = document.createElement('button');
    editBtn.innerText = 'Edit';
    editBtn.classList.add('editButton')
    editBtn.onclick = () => editStudent(index);

    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.classList.add('deleteButton')
    deleteBtn.onclick = () => deleteStudent(index);

    let actionTd = document.createElement('td');
    actionTd.appendChild(editBtn);
    actionTd.appendChild(deleteBtn);

    tr.appendChild(actionTd);
    studentsTable.appendChild(tr);
}

// localStorage থেকে ডেটা লোড করা
document.addEventListener('DOMContentLoaded', () => {
    const studentsData = JSON.parse(localStorage.getItem("students")) || [];
    studentsData.forEach((student, index) => addRowToTable(student, index));
});

// ডেটা সংরক্ষণ এবং টেবিলে রো যোগ করা
button.addEventListener('click', (e) => {
    e.preventDefault();
    let allFieldsFilled = true;

    // ফিল্ডগুলো খালি আছে কিনা পরীক্ষা করা
    for (let i = 0; i < arry.length; i++) {
        if (arry[i].value === "") {
            allFieldsFilled = false;
            break;
        }
    }

    if (!allFieldsFilled) {
        alert('Some input missing');
    } else {
        const student = arry.map(input => input.value);
        const studentsData = JSON.parse(localStorage.getItem("students")) || [];

        if (editIndex !== null) {
            // Update mode
            studentsData[editIndex] = student;
            localStorage.setItem("students", JSON.stringify(studentsData));
            editIndex = null;
            button.innerText = "Add"; // Button text reset
        } else {
            // Add mode
            studentsData.push(student);
            localStorage.setItem("students", JSON.stringify(studentsData));
        }

        reloadTable(); // টেবিল রিফ্রেশ
        arry.forEach(input => input.value = ''); // ইনপুট ফিল্ড খালি করা
    }
});

// রো ডিলিট করার ফাংশন
function deleteStudent(index) {
    let studentsData = JSON.parse(localStorage.getItem("students"));
    studentsData.splice(index, 1); // ডেটা মুছে ফেলা
    localStorage.setItem("students", JSON.stringify(studentsData));
    reloadTable(); // টেবিল পুনরায় লোড করা
}

// রো এডিট করার ফাংশন
function editStudent(index) {
    const studentsData = JSON.parse(localStorage.getItem("students"));
    const student = studentsData[index];

    // ইনপুট ফিল্ডে ডেটা সেট করা
    nameInput.value = student[0];
    rollInput.value = student[1];
    classInput.value = student[2];
    ageInput.value = student[3];

    editIndex = index; // এডিট করার জন্য রো ইন্ডেক্স সেট করা
    button.innerText = "Update"; // Button text change
}

// টেবিল পুনরায় লোড করার ফাংশন
function reloadTable() {
    studentsTable.innerHTML = ""; // পুরানো টেবিল ডেটা মুছে ফেলা
    const studentsData = JSON.parse(localStorage.getItem("students")) || [];
    studentsData.forEach((student, index) => addRowToTable(student, index));
}
