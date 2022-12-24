const section = document.querySelector('#detailsView .container');
section.style.display = 'none';


export function showDetails(event) {
    event.preventDefault();

    const id = event.target.parentElement.id;

    attachPost(id);

    section.style.display = '';
}


async function attachPost(id) {
    const baseUrl = 'http://localhost:3030/jsonstore/collections/myboard/';
    
    const wall = document.querySelector('.theme-content');

    wall.innerHTML = '';

    try {
        const res = await fetch(`${baseUrl}/posts/${id}`);
        const post = await res.json();

        const title = post.title;
        const username = post.username;
        const dateCreated = post.dateCreated;
        const content = post.content;
        const comments = post.comments;

        let html = `<div class="theme-title">
                        <div class="theme-name-wrapper">
                            <div class="theme-name">
                                <h2>${title}</h2>
                            </div>
                        </div>
                    </div>
        
                    <div class="comment">
                        <div class="header">
                            <img src="./static/profile.png" alt="avatar">
                            <p><span>${username}</span> posted on <time>${dateCreated}</time></p>

                            <p class="post-content">${content}</p>
                        </div>

                        <div id="user-comment">`;

        comments.forEach(comment => {
            html += `<div class="topic-name-wrapper">
                                <div class="topic-name">
                                    <p><strong>${comment.author}</strong> commented on <time>${comment.dateCreated}</time></p>
                                    <div class="post-content">
                                        <p>${comment.content}</p>
                                    </div>
                                </div>
                            </div>`
        });

        html += `</div>
                    </div>
                    
                    <div class="answer-comment">
                        <p><span>currentUser</span> comment:</p>
                        <div class="answer">
                            <form>
                                <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
                                <div>
                                    <label for="username">Username <span class="red">*</span></label>
                                    <input type="text" name="username" id="username">
                                </div>
                                <button>Post</button>
                            </form>
                        </div>
                    </div>`;

        wall.innerHTML += html;
    } catch (err) {
        alert(err.message);
    }

    try {
        const button = document.querySelector('.answer button');

        button.addEventListener('click', async (event) => {
            const author = document.querySelector('.answer #username').value;
            const content = document.querySelector('#comment').value;
            const dateCreated = new Date();

            document.querySelector('.answer #username').value = '';
            document.querySelector('#comment').value = '';

            const getResult = await fetch(`${baseUrl}/posts/${id}/comments`);
            const posts = await getResult.json();

            posts.push({
                author,
                content,
                dateCreated
            });

            const putResult = await fetch(`${baseUrl}/posts/${id}/comments`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    posts
                )
            });

            if (putResult.ok != true) {
                const err = await putResult.json();

                throw new Error(err.message);
            }
        });
    } catch (err) {
        alert(err.message);
    }
}