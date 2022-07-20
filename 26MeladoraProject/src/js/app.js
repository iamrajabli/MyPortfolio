import bar from './modules/bar.js';
import navBg from './modules/navBg.js';
import galereya from './modules/galereya.js';

window.addEventListener('DOMContentLoaded', () => {
    bar('.burger__menu .fa-bars', 'nav ul', 'd-flex', 'rotate-90');
    navBg('nav ul li', '.getToIndex');
    galereya('#galereya .galereya__wrapper', '#galereya .galereya__item', '#galereya .galereya__dot ol', '#galereya .container:first-child');

})