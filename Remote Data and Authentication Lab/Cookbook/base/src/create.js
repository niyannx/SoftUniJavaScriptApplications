document.querySelector('form').addEventListener('submit', onSubmit);

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const name = formData.get('name').trim();
    const img = formData.get('img').trim();
    const ingredients = formData.get('ingredients').trim().split('\n');
    const steps = formData.get('steps').trim().split('\n');
    
    const recipe = {
        name,
        img,
        ingredients,
        steps
    };

    const token = sessionStorage.getItem('accessToken');

    try {
        if (token == null) {
            alert('You are not permitted to access this page.');
            window.location = 'http://127.0.0.1:5500/Cookbook/base/login.html';
            
            return;
        }

        const res = await fetch('http://localhost:3030/data/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(recipe)
        });

        if (res.ok == false) {
            const err = await res.json();
            throw new Error(err.message);
        }

        
        
        window.location = 'http://127.0.0.1:5500/Cookbook/base/index.html';

    } catch (err) {
        alert(err.message);
    }

}