document.querySelector('form').addEventListener('submit', onSubmit);

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('password');

    try {
        if (email == '' || password == '') {
            throw new Error('All fields are required!');
        }

        const res = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (res.ok == false) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const data = await res.json();

        sessionStorage.setItem('accessToken', data.accessToken);

        window.location = 'http://127.0.0.1:5500/Cookbook/base/index.html';
    } catch (err) {
        alert(err.message)
    }
}