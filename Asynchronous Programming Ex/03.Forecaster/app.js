function attachEvents() {
    const server = 'http://localhost:3030/jsonstore/forecaster/locations';

    const input = document.getElementById('location');
    const submitButton = document.getElementById('submit');
    const forecastDiv = document.getElementById('forecast');

    const currentDiv = document.getElementById('current');
    const upcomingDiv = document.getElementById('upcoming');

    let weatherSymbols = new Map([
        ['Sunny', '&#x2600'],
        ['Partly sunny', "&#x26C5"],
        ['Overcast', "&#x2601"],
        ['Rain', "&#x2614"],
        ['Degrees', "&#176"]
    ]);

    submitButton.addEventListener('click', onGetWeather);

    async function onGetWeather() {
        forecastDiv.style.display = 'block';

        try {
            const res = await fetch(server);
            const data = await res.json();

            let code = '';
            for (let location of data) {
                if (input.value === location.name) {
                    code = location.code;
                    break;
                }
            }

            // validate
            if (code == '') {
                throw new Error();
            }

            displayConditions(code);
        } catch (err) {
            forecastDiv.textContent = 'Error';
        }

        async function displayConditions(code) {
            const serverCurrentConditions = `http://localhost:3030/jsonstore/forecaster/today/${code}`;
            const serverThreeDayForecast = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;

            try {
                const res = await fetch(serverCurrentConditions);
                const data = await res.json();

                let name = data.name;

                let lowTemp = data.forecast.low;
                let highTemp = data.forecast.high;
                let condition = data.forecast.condition;

                appendToCurrent(name, lowTemp, highTemp, condition);
            } catch (err) {
                forecastDiv.textContent = 'Error';
            }

            try {
                const res = await fetch(serverThreeDayForecast);
                const data = await res.json();

                let name = data.name;

                const forecastInfoDiv = document.createElement('div');
                forecastInfoDiv.classList.add('forecast-info');
                upcomingDiv.append(forecastInfoDiv);

                for (let day of data.forecast) {
                    let lowTemp = day.low;
                    let highTemp = day.high;
                    let condition = day.condition;

                    appendDayToThreeDayForecast(name, lowTemp, highTemp, condition);
                }
            } catch (err) {
                forecastDiv.textContent = 'Error';
            }

            function appendToCurrent(name, lowTemp, highTemp, condition) {
                // create elements
                const forecastsDiv = document.createElement('div');
                const conditionSymbolSpan = document.createElement('span');
                const conditionSpan = document.createElement('span');
                const forecastDataSpanLocation = document.createElement('span');
                const forecastDataSpanDegrees = document.createElement('span');
                const forecastDataSpanCondition = document.createElement('span');

                // edit properties
                forecastsDiv.classList.add('forecasts');

                conditionSymbolSpan.innerHTML = weatherSymbols.get(condition);
                conditionSymbolSpan.classList.add('condition');
                conditionSymbolSpan.classList.add('symbol');

                conditionSpan.classList.add('condition');

                forecastDataSpanLocation.classList.add('forecast-data');
                forecastDataSpanDegrees.classList.add('forecast-data');
                forecastDataSpanCondition.classList.add('forecast-data');

                forecastDataSpanLocation.textContent = name;
                forecastDataSpanDegrees.innerHTML = `${lowTemp}${weatherSymbols.get('Degrees')}/${highTemp}${weatherSymbols.get('Degrees')}`;
                forecastDataSpanCondition.textContent = condition;

                // attach
                currentDiv.appendChild(forecastsDiv);

                forecastsDiv.appendChild(conditionSymbolSpan);
                forecastsDiv.appendChild(conditionSpan);

                conditionSpan.appendChild(forecastDataSpanLocation);
                conditionSpan.appendChild(forecastDataSpanDegrees);
                conditionSpan.appendChild(forecastDataSpanCondition);
            }

            function appendDayToThreeDayForecast(name, lowTemp, highTemp, condition) {
                // create
                const upcomingSpan = document.createElement('span');
                const symbolSpan = document.createElement('span');
                const forecastDataSpanDegrees = document.createElement('span');
                const forecastDataSpanCondition = document.createElement('span');

                // properties
                upcomingSpan.classList.add('upcoming');
                
                symbolSpan.classList.add('symbol');
                symbolSpan.innerHTML = weatherSymbols.get(condition);

                forecastDataSpanDegrees.classList.add('forecast-data');
                forecastDataSpanDegrees.innerHTML = `${lowTemp}${weatherSymbols.get('Degrees')}/${highTemp}${weatherSymbols.get('Degrees')}`;

                forecastDataSpanCondition.classList.add('forecast-data');
                forecastDataSpanCondition.innerHTML = condition;

                // attach
                document.querySelector('.forecast-info').appendChild(upcomingSpan);

                upcomingSpan.appendChild(symbolSpan);
                upcomingSpan.appendChild(forecastDataSpanDegrees);
                upcomingSpan.appendChild(forecastDataSpanCondition);
            }
        }
    }
}

attachEvents();