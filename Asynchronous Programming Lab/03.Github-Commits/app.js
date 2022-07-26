async function loadCommits() {
    const result = document.getElementById('commits');

    const username = document.getElementById('username').value;
    const repository = document.getElementById('repo').value;

    try {
		const res = await fetch(`https://api.github.com/repos/${username}/${repository}/commits`);

        if (res.ok == false) {
            throw new Error(`${res.status} ${res.statusText}`);
        }
        
		const data = await res.json();
		
        // display data (commits)
		result.innerHTML = '';

        for (let { commit } of data) {
			result.innerHTML += `<li>
				${commit.author.name}: ${commit.message}
			</li>`;
		}
	} catch (err) {
		list.innerHTML = `Error: ${err.message}`;
	}
}