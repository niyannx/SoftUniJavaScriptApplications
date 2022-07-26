async function loadRepos() {
   try {
      const promise = await fetch('https://swapi.dev/api/people/10');

      const data = await promise.json();

      document.getElementById('res').textContent = JSON.stringify(data, null, 2);
   } catch (err) {
      alert(err.message);
   }
}