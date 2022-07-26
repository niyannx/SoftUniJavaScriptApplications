async function loadRepos() {
	const username = document.getElementById('username').value;
	const list = document.getElementById('repos');

	try {
		const res = await fetch(`https://api.github.com/users/${username}/repos`);

		const data = await res.json();
		
		displayRepos(data)
	} catch (err) {
		list.innerHTML = `${err.message}`;
	}

	function displayRepos(data) {
		list.innerHTML = '';

		for (let repo of data) {
			list.innerHTML += `<li>
				<a href="${repo.html_url}">
					${repo.full_name}
				</a>
			</li>`;
		}
	}
}