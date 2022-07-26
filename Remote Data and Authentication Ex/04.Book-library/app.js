window.onload = load();

function load() {
    const url = 'http://localhost:3030/jsonstore/collections/books';

    // html elements
    const loadAllButton = document.getElementById('loadBooks');
    const tbodyElement = document.querySelector('tbody');
    const formHeader = document.querySelector('h3');
    const titleField = document.querySelector('[name="title"]');
    const authorField = document.querySelector('[name="author"]');
    const submitButton = document.querySelectorAll('button')[1];

    loadAllButton.addEventListener('click', onLoadAllBooks);
    submitButton.addEventListener('click', onSubmit);    

    async function onSubmit() {
        const title = titleField.value;
        const author = authorField.value;

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author,
                title
            })
        });
    }

    async function onLoadAllBooks() {
        tbodyElement.textContent = '';

        try {
            const res = await fetch(url);
            const data = await res.json();

            for (let book in data) {
                const currAuthor = data[book].author;
                const currTitle = data[book].title;
                const bookId = book;

                const rowElement = document.createElement('tr');
                const authorCell = document.createElement('td');
                const titleCell = document.createElement('td');
                const buttonsCell = document.createElement('td');
                const editButton = document.createElement('button');
                const deleteButton = document.createElement('button');

                authorCell.textContent = currAuthor;
                titleCell.textContent = currTitle;
                editButton.textContent = 'Edit';
                editButton.setAttribute('name', bookId);
                editButton.addEventListener('click', onEdit);
                deleteButton.textContent = 'Delete';
                deleteButton.setAttribute('name', bookId);
                deleteButton.addEventListener('click', onDelete);

                tbodyElement.appendChild(rowElement);
                rowElement.appendChild(titleCell);
                rowElement.appendChild(authorCell);
                rowElement.appendChild(buttonsCell);
                buttonsCell.appendChild(editButton);
                buttonsCell.appendChild(deleteButton);
            }

            function onEdit(event) {
                const bookId = event.target.getAttribute('name');
                const editUrl = `${url}/${bookId}`;

                titleField.value = event.target.parentElement.parentElement.querySelectorAll('td')[0].textContent;
                authorField.value = event.target.parentElement.parentElement.querySelectorAll('td')[1].textContent;

                formHeader.textContent = 'Edit FORM';
                submitButton.textContent = 'Save';
                submitButton.addEventListener('click', async () => {
                    const title = titleField.value;
                    const author = authorField.value;
                    
                    try {
                        const res = await fetch(editUrl, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                "author": author,
                                "title": title
                            })
                        });
                    } catch (err) {
                        alert(err.message);
                    }
                });
            }

            async function onDelete(event) {
                const bookId = event.target.getAttribute('name');
                const deleteUrl = `${url}/${bookId}`;
                
                try {
                    const res = await fetch(deleteUrl, {
                        method: 'DELETE'
                    });
                } catch (err) {
                    alert(err.message);
                }
            }
        } catch (err) {
            alert(err.message);
        }
    }
}