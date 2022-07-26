window.onload = load();

function load() {
    const url = 'http://localhost:3030/jsonstore/collections/students';

    refreshTable();

    const form = document.getElementById('form');
    form.addEventListener('submit', onSubmit);

    async function onSubmit(event) {
        event.preventDefault();
    
        const formData = new FormData(event.target);

        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            facultyNumber: formData.get('facultyNumber'),
            grade: formData.get('grade')
        };

        resetFormFields();

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        } catch (err) {
            alert(err.message);
        }
    
        refreshTable();

        function resetFormFields() {
            const firstNameField = document.querySelector('[name="firstName"]');
            const lastNameField = document.querySelector('[name="lastName"]');
            const facultyNumberField = document.querySelector('[name="facultyNumber"]');
            const gradeField = document.querySelector('[name="grade"]');

            firstNameField.value = '';
            lastNameField.value = '';
            facultyNumberField.value = '';
            gradeField.value = '';
        }
    }

    async function refreshTable() {
        console.log('refreshed');
    
        const tbodyElement = document.querySelector('#results tbody');
    
        tbodyElement.innerHTML = '';
    
        try {
            const res = await fetch(url);
            const data = await res.json();
            
            for (let student in data) {
                const currFirstName = data[student].firstName;
                const currLastName = data[student].lastName;
                const currFacultyNumber = data[student].facultyNumber;
                const currGrade = data[student].grade;
                
                addToTable(currFirstName, currLastName, currFacultyNumber, currGrade);
            }
        } catch (err) {
            alert(err.message);
        }
        
        function addToTable(firstName, lastName, facultyNumber, grade) {
            // create
            const trElement = document.createElement('tr'); 
            const tdFirstName = document.createElement('td');
            const tdLastName = document.createElement('td');
            const tdFacultyNumber = document.createElement('td');
            const tdGrade = document.createElement('td');
    
            // properties
            tdFirstName.textContent = firstName;
            tdLastName.textContent = lastName;
            tdFacultyNumber.textContent = facultyNumber;
            tdGrade.textContent = grade;
    
            // attach
            tbodyElement.appendChild(trElement);
            trElement.appendChild(tdFirstName);
            trElement.appendChild(tdLastName);
            trElement.appendChild(tdFacultyNumber);
            trElement.appendChild(tdGrade);
        }
    }
}