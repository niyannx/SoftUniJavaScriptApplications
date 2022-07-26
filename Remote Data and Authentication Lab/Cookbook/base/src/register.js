document.querySelector('form').addEventListener('submit', onSubmit);

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');

    try {
        // validation
        if (email == '' || password == '') {
            throw new Error('All fields are required!');
        }

        if (password != rePass) {
            throw new Error('Passwords don\'t match!');
        }

        const res = await fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (res.ok == false)  {
            const error = await res.json();

            throw new Error(error.message);
        }

        const data = await res.json();

        sessionStorage.setItem('accessToken', data.accessToken);

        // redirect to index page
        window.location = 'http://127.0.0.1:5500/Cookbook/base/index.html';
    } catch (err) {
        alert(err.message);
    }

}