import { display } from './base_functions.js';

export function showMonthView(currYear) {
    const monthsToDisplay = document.getElementById(`year-${currYear}`);

    // display month
    display(monthsToDisplay);
}