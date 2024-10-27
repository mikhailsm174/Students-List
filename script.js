const nameInput = document.getElementById('name');
const rollInput = document.getElementById('roll');
const classInput = document.getElementById('class');
const ageInput = document.getElementById('age');
const submitBtn = document.getElementById('submit_btn');


const arry = [nameInput, rollInput, classInput, ageInput,];

submitBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    let allFilled = true;

    for(let i=0; i<arry.length; i++){
        if(arry[i].value == ''){
            allFilled = false;
            break;
        }
    }

    if(!allFilled){
        alert('Some input missing');
    }
    else{
        const tbody = document.getElementById('tbody');
        let tr = document.createElement('tr')
        arry.forEach ( input => {
            let td = document.createElement('td');
            td.innerHTML = input.value;
            td.classList.add('table_data');
            tr.appendChild(td);

            input.value = '';
        })

        tbody.appendChild(tr);
    }
})