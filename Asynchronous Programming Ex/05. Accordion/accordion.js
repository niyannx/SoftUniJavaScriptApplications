async function solution() {

    const serverTitles = 'http://localhost:3030/jsonstore/advanced/articles/list';
    const serverDetails = 'http://localhost:3030/jsonstore/advanced/articles/details';

    const mainSection = document.getElementById('main');

    try {
        const res = await fetch(serverTitles);
        const data = await res.json();

        for (let article of data) {
            addArticle(article);
        }
    } catch (err) {
        alert(err.message);
    }

    async function addArticle(article) {
        // extract data
        let id = article._id;
        let title = article.title;
        let details = '';

        try {
            const res = await fetch(`${serverDetails}/${id}`);
            const data = await res.json();

            details = data.content;
        } catch (err) {
            alert(err.message);
        }

        // create elements
        const accordionDiv = document.createElement('div');
        const headDiv = document.createElement('div');
        const extraDiv = document.createElement('div');
        const titleSpan = document.createElement('span');
        const showMoreButton = document.createElement('button');
        const detailsParagraph = document.createElement('p');

        // set properties
        accordionDiv.classList.add('accordion');

        headDiv.classList.add('head');
        extraDiv.classList.add('extra');
        
        titleSpan.textContent = title;

        showMoreButton.classList.add('button');
        showMoreButton.id = id;
        showMoreButton.textContent = 'More';
        showMoreButton.addEventListener('click', onClickAccordion);

        detailsParagraph.textContent = details;

        // attach
        mainSection.appendChild(accordionDiv);

        accordionDiv.appendChild(headDiv);
        accordionDiv.appendChild(extraDiv);

        headDiv.appendChild(titleSpan);
        headDiv.appendChild(showMoreButton);

        extraDiv.appendChild(detailsParagraph);

        function onClickAccordion(event) {
            // change button text
            event.target.textContent === 'More' ? event.target.textContent = 'Less': event.target.textContent = "More";

            // show or hide extra info
            let moreInfo = event.target.parentElement.parentElement.querySelector('.extra');

            moreInfo.style.display === 'inline' ? moreInfo.style.display = 'none' : moreInfo.style.display = 'inline';
        }
    }
}

solution();