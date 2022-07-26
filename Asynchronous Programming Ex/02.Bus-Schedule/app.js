function solve() {
    const server = 'http://localhost:3030/jsonstore/bus/schedule';

    // get all HTML elements
    const departButton = document.querySelector('#depart');
    const arriveButton = document.querySelector('#arrive');
    const infoSpan = document.querySelector('.info');

    let busStop = {
        next: 'depot'
    };

    function depart() {
        departButton.disabled = true;
        arriveButton.disabled = false;

        let url = `${server}/${busStop.next}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                busStop = Object.assign({}, data);

                infoSpan.textContent = `Next stop ${busStop.name}`;
            })
            .catch(err => {
                infoSpan.textContent = 'Error: ' + err.message;

                departButton.disabled = false;
                arriveButton.disabled = false;
            });
    }

    function arrive() {
        departButton.disabled = false;
        arriveButton.disabled = true;

        infoSpan.textContent = `Arriving at ${busStop.name}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();