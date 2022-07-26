async function loadAllRecipes() {
    const serverAllRecipes = 'http://localhost:3030/jsonstore/cookbook/recipes';

    const recipeAndId = new Map();
    const idAndExpanded = new Map();

    try {
        const res = await fetch(serverAllRecipes);
        const data = await res.json();

        for (let recipe in data) {
            let idRecipe = data[recipe]._id;
            let name = data[recipe].name;
            let imgSrc = data[recipe].img;

            recipeAndId.set(name, idRecipe);
            idAndExpanded.set(idRecipe, false);

            // create
            const mainSection = document.querySelector('main');
            let previewArticle = document.createElement('article');
            let titleDiv = document.createElement('div');
            let titleTag = document.createElement('h2');
            let smallDiv = document.createElement('div');
            let imgTag = document.createElement('img');

            // set properties
            previewArticle.classList.add('preview');
            previewArticle.addEventListener('click', expandRecipe)
            
            titleDiv.classList.add('title');
            titleTag.textContent = name;
            
            smallDiv.classList.add('small');
            imgTag.src = imgSrc;

            // attach
            mainSection.appendChild(previewArticle);
            
            previewArticle.appendChild(titleDiv);
            previewArticle.appendChild(smallDiv);
            
            titleDiv.appendChild(titleTag);
            smallDiv.appendChild(imgTag);



            async function expandRecipe(event) {
                const serverDetails = 'http://localhost:3030/jsonstore/cookbook/details';

                let recipeName = '';
                let articleTag;
                let toggledTagName = event.target.tagName.toLowerCase();

                if (toggledTagName !== 'article') {
                    if (toggledTagName === 'h2' || toggledTagName === 'div') {
                        articleTag = event.target.parentElement;
                    } else if (toggledTagName === 'img') {
                        articleTag = event.target.parentElement.parentElement;
                    }
                } else {
                    articleTag = event.target;
                }
                
                recipeName = articleTag.querySelector('h2').textContent;
                

                let id = recipeAndId.get(recipeName);

                if (idAndExpanded.get(id)) {
                    let allExpandedArticles =  Array.from(document.querySelectorAll("article:not([class])"));

                    for (let article of allExpandedArticles) {
                        if (article.querySelector('h2').textContent == recipeName) {
                            article.parentElement.removeChild(article);

                            break;
                        }
                    }

                    idAndExpanded.set(id, false);

                    return;
                } else {
                    idAndExpanded.set(id, true);
                }

                try {
                    const res = await fetch(serverDetails);
                    const data = await res.json();

                    let recipe = data[id];

                    // create elements
                    const articleElement = document.createElement('article');
                    
                    const titleElement = document.createElement('h2');
                    const bandDiv = document.createElement('div');
                    
                    const thumbDiv = document.createElement('div');
                    const imgElement = document.createElement('img');
                    
                    const ingredientsDiv = document.createElement('div');
                    const ingredientsH3 = document.createElement('h3');
                    const ingredientsList = document.createElement('ul');

                    const descriptionDiv = document.createElement('div')
                    const preparationH3 = document.createElement('h3');

                    // add properties
                    titleElement.textContent = recipe.name;

                    bandDiv.classList.add('band');
                    thumbDiv.classList.add('thumb');
                    ingredientsDiv.classList.add('ingredients');
                    descriptionDiv.classList.add('description')

                    imgElement.src = recipe.img;

                    ingredientsH3.textContent = 'Ingredients:';
                    preparationH3.textContent = 'Preparation:';

                    // attach
                    mainSection.appendChild(articleElement);

                    articleElement.appendChild(titleElement);
                    articleElement.appendChild(bandDiv);
                    articleElement.appendChild(descriptionDiv);

                    bandDiv.appendChild(thumbDiv);
                    bandDiv.appendChild(ingredientsDiv);

                    thumbDiv.appendChild(imgElement);

                    ingredientsDiv.appendChild(ingredientsH3);
                    for (let ingredient of recipe.ingredients) {
                        let ingredientLi = document.createElement('li');
                        ingredientLi.textContent = ingredient;

                        ingredientsDiv.appendChild(ingredientLi);
                    }

                    descriptionDiv.appendChild(preparationH3);
                    for (let step of recipe.steps) {
                        let stepLi = document.createElement('p');
                        stepLi.textContent = step;

                        descriptionDiv.appendChild(stepLi);
                    }
                } catch (err) {
                    alert(err.message);
                }
            }
        }
    } catch (err) {
        alert(err.message);
    }
}

loadAllRecipes();