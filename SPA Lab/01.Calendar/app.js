import { showYearView } from './year.js';
import { showMonthView } from './month.js';
import { showDayView } from './day.js';

import { hide } from './base_functions.js';


window.onload = () => {
    let currYear = 0;
    let currMonth = 0;

    const monthNumberEquivalents = new Map([
        ['Jan', 1],
        ['Feb', 2],
        ['Mar', 3],
        ['Apr', 4],
        ['May', 5],
        ['Jun', 6],
        ['Jul', 7],
        ['Aug', 8],
        ['Sept', 9],
        ['Oct', 10],
        ['Nov', 11],
        ['Dec', 12]
    ]);

    const html = {
        allSections: Array.from(document.getElementsByTagName('section')),

        // all 'forwards' buttons
        individualSelectableYears: Array.from(document.getElementById('years').querySelectorAll('.day')),
        individualSelectableMonths: Array.from(document.querySelectorAll('.monthCalendar .day')),

        // all 'back' buttons
        allCaptionsInMonth: Array.from(document.querySelectorAll('.monthCalendar caption')),
        allCaptionsInDay: Array.from(document.querySelectorAll('.daysCalendar caption'))
    }

    html.allSections.forEach(hide);

    showYearView();

    // EVENT LISTENERS ---------------------------------------------------------------------------------

    // going forwards 
    html.individualSelectableYears.forEach((year) => {
        year.addEventListener('click', (event) => {
            currYear = event.target.querySelector('.date').textContent;

            html.allSections.forEach(hide);
            
            showMonthView(currYear);
        });
    });

    html.individualSelectableMonths.forEach((month) => {
        month.addEventListener('click', (event) => {
            currMonth = monthNumberEquivalents.get(event.target.querySelector('.date').textContent);

            html.allSections.forEach(hide);

            showDayView(currYear, currMonth);
        });
    })


    // going back
    html.allCaptionsInMonth.forEach((caption) => {
        caption.addEventListener('click', () => {
            currYear = 0;

            html.allSections.forEach(hide);

            showYearView();
        });
    });

    html.allCaptionsInDay.forEach((caption) => {
        caption.addEventListener('click', () => {
            currMonth = 0;

            html.allSections.forEach(hide);

            showMonthView(currYear);
        });
    });

};