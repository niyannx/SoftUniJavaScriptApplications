import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { signupView } from './views/signup.js';
import { createView } from './views/create.js';
import { detailsView } from './views/detail.js';
import { editView } from './views/edit.js';
import { logout } from './views/logout.js';
import { updateNav } from './views/util.js';

const html = {
    navBar: document.querySelector('nav'),

    createButton: document.querySelector('#add-movie-button a')

}

const routes = {
    '/': homeView,
    '/login': loginView,
    '/register': signupView,
    '/logout': logout,
    
    '/create': createView,
    // more routes?
};

// add event listeners
html.navBar.addEventListener('click', onNavigation);
html.createButton.addEventListener('click', onNavigation);

function onNavigation(event) {
    if (event.target.tagName === 'A' && event.target.href) {
        event.preventDefault();

        const href = new URL(event.target.href).pathname;

        const view = routes[href];

        if (typeof view == 'function') {
            view();
        }

        updateNav();
    }
}

// start application from home page
homeView();
updateNav();