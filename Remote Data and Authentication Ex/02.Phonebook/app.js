function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/phonebook';

    // html elements
    const phonebookList = document.getElementById('phonebook');
    const personField = document.getElementById('person');
    const phoneField = document.getElementById('phone');
    const loadButton = document.getElementById('btnLoad');
    const createButton = document.getElementById('btnCreate');

    loadButton.addEventListener('click', onLoad);
    createButton.addEventListener('click', onCreate);

    async function onLoad() {
        // clear phonebook
        phonebookList.innerHTML = '';

        try {
            const res = await fetch(url);
            const data = await res.json();

            for (const datum in data) {
                const id = data[datum]._id;
                const person = data[datum].person;
                const phone = data[datum].phone;

                attachToPhoneBook(id, person, phone);
            }
        } catch (err) {
            alert(err.messsage);
        }

        function attachToPhoneBook(id, person, phone) {
            // create elements
            const liElement = document.createElement('li');
            const deleteButton = document.createElement('button');

            // properties
            liElement.textContent = `${person}: ${phone}`;
            deleteButton.setAttribute('phonebookId', id);
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', onDelete);

            phonebookList.appendChild(liElement);
            liElement.appendChild(deleteButton);

            async function onDelete(event) {
                let phonebookId = event.target.getAttribute('phonebookId');

                const deleteUrl = `${url}/${phonebookId}`;

                try {
                    const res = await fetch(deleteUrl, {
                        method: 'DELETE'
                    });
                } catch(err) {
                    alert(err.messsage);
                }

                onLoad();
            }
        }
    }

    async function onCreate() {
        const person = personField.value;
        const phone = phoneField.value;

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    person,
                    phone
                })
            });
        } catch (err) {
            alert(err.message);
        }

        personField.value = '';
        phoneField.value = '';
    }
}

attachEvents();