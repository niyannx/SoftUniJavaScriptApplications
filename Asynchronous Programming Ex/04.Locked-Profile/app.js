async function lockedProfile() {
    const server = 'http://localhost:3030/jsonstore/advanced/profiles';
    const mainElement = document.getElementById('main');

    function addPerson(email, username, age) {
        function onShow(event) {
            let profileIsLocked = event.target.parentElement.querySelector('input[value="lock"]').checked;

            let hiddenDiv = event.target.parentElement.querySelector('#user1HiddenFields');

            if (!profileIsLocked) {
                if (event.target.textContent === 'Show more') {
                    event.target.textContent = 'Hide it';
                
                    hiddenDiv.style.display = 'inline';
                } else {
                    event.target.textContent = 'Show more';

                    hiddenDiv.style.display = 'none';
                }
            }
        }

        // create
        let profileDiv = document.createElement('div');
        
        let iconImg = document.createElement('img');
        
        let lockLabel = document.createElement('label');
        let lockRadio = document.createElement('input');

        let unlockLabel = document.createElement('label');
        let unlockRadio = document.createElement('input');

        let brElement = document.createElement('br');

        let hrElement1 = document.createElement('hr');

        let usernameLabel = document.createElement('label');
        let usernameInput = document.createElement('input');

        let hiddenFieldsDiv = document.createElement('div');

        let hrElement2 = document.createElement('hr');

        let emailLabel = document.createElement('label');
        let emailInput = document.createElement('input');

        let ageLabel = document.createElement('label');
        let ageInput = document.createElement('input');

        let showMoreButton = document.createElement('button');

        // set properties
        profileDiv.classList.add('profile');

        iconImg.src = './iconProfile2.png';
        iconImg.classList.add('userIcon');

        lockLabel.textContent = 'Lock';
        lockRadio.type = 'radio';
        lockRadio.name = 'user1Locked';
        lockRadio.value = 'lock';
        lockRadio.checked = true;

        unlockLabel.textContent = 'Unlock';
        unlockRadio.type = 'radio';
        unlockRadio.name = 'user1Locked';
        unlockRadio.value = 'unlock';

        usernameLabel.textContent = 'Username';
        usernameInput.type = 'text';
        usernameInput.name = 'user1Username';
        usernameInput.value = username;
        usernameInput.disabled = true;
        usernameInput.readOnly = true;

        hiddenFieldsDiv.id = 'user1HiddenFields';
        hiddenFieldsDiv.style.display = 'none';

        emailLabel.textContent = 'Email:';
        emailInput.type = 'email';
        emailInput.name = 'user1Email';
        emailInput.value = email;
        emailInput.disabled = true;
        emailInput.readOnly = true;

        ageLabel.textContent = 'Age:';
        ageInput.type = 'text';
        ageInput.name = 'user1Age';
        ageInput.value = age;
        ageInput.disabled = true;
        ageInput.readOnly = true;

        showMoreButton.textContent = 'Show more';
        showMoreButton.addEventListener('click', onShow)

        // attach
        mainElement.appendChild(profileDiv);

        profileDiv.appendChild(iconImg);
        
        profileDiv.appendChild(lockLabel);
        profileDiv.appendChild(lockRadio);
        
        profileDiv.appendChild(unlockLabel);
        profileDiv.appendChild(unlockRadio);
        
        profileDiv.appendChild(brElement);
        profileDiv.appendChild(hrElement1);

        profileDiv.appendChild(usernameLabel);
        profileDiv.appendChild(usernameInput);

        profileDiv.appendChild(hiddenFieldsDiv);

        hiddenFieldsDiv.appendChild(hrElement2);

        hiddenFieldsDiv.appendChild(emailLabel);
        hiddenFieldsDiv.appendChild(emailInput);

        hiddenFieldsDiv.appendChild(ageLabel);
        hiddenFieldsDiv.appendChild(ageInput);

        profileDiv.appendChild(showMoreButton);
    }

    try {
        const res = await fetch(server);
        const data = await res.json();

        for (let person in data) {
            let email = data[person].email;
            let username = data[person].username;
            let age = data[person].age;

            addPerson(email, username, age);
        }
    } catch (err) {
        alert(err.message);
    }


    const allRadioButtons = document.querySelectorAll('input[type=radio]');


}