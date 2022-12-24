import { showDetails } from './detail.js';

const section = document.querySelector('#homeView .container');
section.style.display = 'none';

export function showHome(event) {
    event && event.preventDefault();

    attachPosts();

    section.style.display = '';
}



async function attachPosts() {
    const baseUrl = 'http://localhost:3030/jsonstore/collections/myboard/'
    
    const wall = document.querySelector('.topic-title');

    wall.innerHTML = '';

    try {
        const res = await fetch(`${baseUrl}/posts`);
        const posts = await res.json();

        for (let post in posts) {
            const title = posts[post].title;
            const username = posts[post].username;
            const dateCreated = posts[post].dateCreated;
            const id = posts[post]._id;

            let html = '<div class="topic-container">';
                html += '<div class="topic-name-wrapper">';
                    html += '<div class="topic-name">';
                        html += `<a href="#" class="normal" id="${id}">`;
                            html += `<h2>${title}</h2>`;
                        html += '</a>';
                        html += '<div class="columns">';
                            html += '<div>';
                                html += `<p>Date: <time>${dateCreated}</time></p>`;
                                html += '<div class="nick-name">';
                                    html += `<p>Username: <span>${username}</span></p>`;
                                html += '</div>';
                            html += '</div>';
                        html += '</div>';
                    html += '</div>';
                html += '</div>';
            html += '</div>';

            wall.innerHTML += html;

            const collectionPosts = Array.from(document.querySelectorAll('.topic-name-wrapper h2'));

            collectionPosts.forEach((post) => {
                post.addEventListener('click', showDetails);
            });
        }
    } catch (err) {
        alert(err.message);
    }

}