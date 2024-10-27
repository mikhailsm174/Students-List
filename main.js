const nameInput = document.querySelector("#name");
const rollInput = document.querySelector("#roll");
const classInput = document.querySelector("#class");
const ageInput = document.querySelector("#age");
const button = document.querySelector("#submit_btn");

const arry = [nameInput, rollInput, classInput, ageInput];

button.addEventListener('click', (e)=>{
    e.preventDefault();
    allField = true;

    for(let i = 0; i < arry.length; i++){
        if(arry[i].value == ""){
            allField = false;
            break;
        }
    }
    if(!allField){
        alert('Some input missing')
    }
    else{
        const studentsTable = document.querySelector('#tbody');
        let tr = document.createElement('tr');
        arry.forEach(input => {
            let td = document.createElement('td');
            td.innerHTML = input.value;
            td.classList.add('table_data');
            tr.appendChild(td);
            input.value = '';
        });
        studentsTable.appendChild(tr);
    }
})

