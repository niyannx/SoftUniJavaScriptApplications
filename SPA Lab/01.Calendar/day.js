import { display } from './base_functions.js';

export function showDayView(currYear, currMonth) {
    const daysToDisplay = document.getElementById(`month-${currYear}-${currMonth}`);

    // display days
    display(daysToDisplay);
}