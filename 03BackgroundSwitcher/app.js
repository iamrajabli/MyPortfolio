'use strict';

class Screen {
    constructor() {
        this.switcher = document.querySelector('.switcher')
        this.switcher.addEventListener('click', this.turnOnAndOff.bind(this));
        this.turn = document.querySelector('.turn');
        this.light = document.querySelector('.light');
        this.dark = document.querySelector('.dark');
    }

    turnOn() {
        this.turn.classList.remove('turnOff');
        this.switcher.style.backgroundColor = '#87B0FF'
        document.querySelector('body').style.backgroundColor = '#d2e5ff'
        this.light.style.color = 'black'
        this.dark.style.color = 'rgb(134, 134, 134)';

    }

    turnOff() {
        this.turn.classList.add('turnOff');
        this.switcher.style.backgroundColor = '#292e3b';
        document.querySelector('body').style.backgroundColor = '#4B546B'
        this.dark.style.color = 'white'
        this.light.style.color = 'rgb(134, 134, 134)'

    }
    turnOnAndOff() {
        if (this.turn.classList.contains('turnOff')) {
            this.turnOn();

        } else {
            this.turnOff();

        }
    }
}




document.addEventListener('DOMContentLoaded', () => {
    new Screen();
})