'use strict';

class Screen {
    constructor() {
        this.minute = document.getElementById('minute');
        this.second = document.getElementById('second');
        this.pomodoroPeriod = document.getElementById('pomodoroPeriod');
        this.minuteInterval = document.getElementById('minuteInterval');
        this.secondInterval = document.getElementById('secondInterval');

        this.pomodoro__timer = document.querySelector('.pomodoro__timer');
        this.pomodoro__managment = document.querySelector('.pomodoro__work .pomodoro__managment')
        this.pomodoro__managment.addEventListener('click', this.selectBtn.bind(this));
        this.btnStart = document.querySelector('.pomodoro__rest .btn-start').addEventListener('click', this.startRepeat.bind(this));
        this.interval = null;
        this.intervalRest = null;
        this.pausedSecond = 0;
        this.pausedMinute = 0;
        this.audio = new Audio('./assets/sound/sound.mp3');
        this.period = 0;
    }
    sound(status) {
        if (!status) {
            this.audio.currentTime = 0;
            this.audio.pause();

        } else {
            this.audio.currentTime = 0;
            this.audio.play();


        }
    }

    startRepeat() {
        document.querySelector('.pomodoro__work').style.transform = 'translate(0)'
        document.querySelector('.pomodoro__rest').style.transform = 'translate(0,120%)'
        this.pomodoroStart()
        this.sound(false);

    }
    selectBtn(e) {
        const trgt = e.target;
        e.preventDefault();
        if (trgt.classList.contains('btn-start')) {
            this.pomodoroStart();
        }
        if (trgt.classList.contains('btn-pause')) {
            this.pomodoroPause('start');
        }
        if (trgt.classList.contains('btn-reset')) {
            this.pomodoroReset('start');
        }
        if (trgt.classList.contains('btn-rest')) {
            this.pomodoroRest();
        }
    }

    pomodoroRest() {
        document.querySelector('.pomodoro__work').style.transform = 'translate(0,-120%)'
        document.querySelector('.pomodoro__rest').style.transform = 'translate(0,-120%)'
        this.pomodoroPause('start');
        this.pomodoro5min();
        this.pomodoroReset('start');
        this.period += 1;
        this.pomodoroPeriod.textContent = `[${this.period}]`;

        document.querySelectorAll('.pomodoro__work .btn').forEach(btn => {
            btn.style.display = 'block'
        });

        document.querySelector('.pomodoro__work .btn-rest').remove();
    }

    pomodoro5min() {
        let secondInterval = 0;
        let minuteInterval = 0;

        this.intervalRest = setInterval(() => {

            if (secondInterval < 9) {
                secondInterval++
                this.secondInterval.textContent = `0${secondInterval}`
            } else {
                secondInterval++
                this.secondInterval.textContent = secondInterval
            }
            if (secondInterval > 59) {
                secondInterval = 0;
                this.secondInterval.textContent = `0${secondInterval}`;

                minuteInterval++;
                this.minuteInterval.textContent = `0${minuteInterval}`
            }

            if (minuteInterval > 4) {
                this.minuteInterval.textContent = `0${minuteInterval}`
                this.pomodoroPause('rest');
                this.sound(true);

            }

        }, 1)
    }

    pomodoroReset(thatPomodoro) {
        clearInterval(this.interval);


        if (thatPomodoro == 'start') {
            this.minute.textContent = '00';
            this.second.textContent = '00';
            this.pausedMinute = 0
            this.pausedSecond = 0
            this.period = 0;
            this.pomodoroPeriod.textContent = `[${this.period}]`;
        }
    }

    pomodoroPause(thatPomodoro) {
        this.sound(false);

        if (thatPomodoro == 'start') {
            clearInterval(this.interval);
            this.pausedMinute = this.minute.textContent
            this.pausedSecond = this.second.textContent

        } else if (thatPomodoro == 'rest') {
            clearInterval(this.intervalRest);
        }
    }

    pomodoroStart() {
        let second = parseInt(this.pausedSecond);
        let minute = parseInt(this.pausedMinute);
        this.interval = setInterval(() => {
            if (second < 9) {
                second++
                this.second.textContent = `0${second}`
            } else {
                second++
                this.second.textContent = second
            }
            if (second > 59) {
                second = 0;
                this.second.textContent = `0${second}`;

                minute++;
                this.minute.textContent = `0${minute}`
            }

            if (minute < 10) {
                this.minute.textContent = `0${minute}`
            } else if (minute == 25) {
                document.querySelectorAll('.pomodoro__work .btn').forEach(btn => {
                    btn.style.display = 'none'
                });

                const btnRest = document.createElement('a');
                btnRest.setAttribute('href', '#');
                btnRest.innerHTML = 'Rest';
                btnRest.className = 'btn btn-rest';
                this.pomodoro__managment.appendChild(btnRest)
                this.pomodoroPause('start')
                this.sound(true)
                this.minute.textContent = minute;
            } else if (minute > 9) {
                this.minute.textContent = minute;
            }


        }, 1000);

    }
}

document.addEventListener('DOMContentLoaded', () => new Screen)