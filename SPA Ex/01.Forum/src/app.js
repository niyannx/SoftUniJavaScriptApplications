import { showHome } from './home.js';

window.showHome = showHome;

const html = {
    titleField: document.getElementById('topicName'),
    usernameField: document.getElementById('username'),
    postField: document.getElementById('postText'),

    postButton: document.querySelector('.new-topic-buttons .public'),
    cancelButton: document.querySelector('.new-topic-buttons .cancel'),

    homeLink: document.getElementById('homeLink')
};

const baseUrl = 'http://localhost:3030/jsonstore/collections/myboard/';

// add event listeners
html.cancelButton.addEventListener('click', clearInputFields);

html.postButton.addEventListener('click', onPostNewTopic);

html.homeLink.addEventListener('click', showHome);


// functions
async function onPostNewTopic(event) {
    event.preventDefault();

    const title = html.titleField.value;
    const username = html.usernameField.value;
    const content = html.postField.value;

    if (title && username && content) {
        try {
            const res = await fetch(`${baseUrl}/posts`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    username,
                    content,
                    dateCreated: new Date(),
                    comments: []
                })
            });

            if (res.ok != true) {
                const err = await res.json();

                throw new Error(err.message);
            }

            showHome();

        } catch (err) {
            alert(err.message);
        }

        clearInputFields();
    } else {
        alert('Please fill out all necessary fields.');
    }
}

function clearInputFields(event) {
    // if there is an event => event.preventDefault()
    event && event.preventDefault();

    html.titleField.value = '';
    html.usernameField.value = '';
    html.postField.value = '';
}