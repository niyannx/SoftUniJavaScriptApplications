function attachEvents() {
    // html elements
    const messagesTextArea = document.getElementById('messages');
    const authorField = document.querySelector('[name="author"]');
    const contentField = document.querySelector('[name="content"]')
    const sendButton = document.getElementById('submit');
    const refreshButton = document.getElementById('refresh');

    const url = 'http://localhost:3030/jsonstore/messenger';

    sendButton.addEventListener('click', onSend)
    refreshButton.addEventListener('click', onRefresh)

    async function onSend(event) {
        event.preventDefault();

        const content = contentField.value;
        const author = authorField.value;

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    author,
                    content
                })
            });

            const data = await res.json();
        
            console.log(data);
        } catch (err) {
            alert(err.message);
        }

        contentField.value = '';
        authorField.value = '';
    }

    async function onRefresh(event) {
        messagesTextArea.value = '';

        try {
            const res = await fetch(url);
            const data = await res.json();

            for (let message in data) {
                const currAuthor = data[message].author;
                const currContent = data[message].content;
                
                messagesTextArea.value += `${currAuthor}: ${currContent}\n`;
            }

        } catch (err) {
            alert(err.message);
        }
    }
}

attachEvents();