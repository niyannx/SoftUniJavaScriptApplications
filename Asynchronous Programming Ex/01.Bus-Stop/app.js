function getInfo() {
    const server = 'http://localhost:3030/jsonstore/bus/businfo';
    
    // get html elements
    const idInput = document.getElementById('stopId').value;
    const stopNameDiv = document.getElementById('stopName');
    const bussesList = document.getElementById('buses');
    
    
    // fetch data from server
    fetch(`${server}/${idInput}`)
        .then(res => res.json())
        .then(data => {
            let buses = data.buses;
            let name = data.name;

            // append data to page
            stopNameDiv.textContent = name;
            bussesList.innerHTML = '';

            Object.keys(buses).forEach(bus => {
                let liElement = document.createElement('li');
                liElement.textContent = `Bus ${bus} arrives in ${buses[bus]} minutes`;

                bussesList.appendChild(liElement);
            });
        })
        .catch(stopNameDiv.textContent = 'Error');
}