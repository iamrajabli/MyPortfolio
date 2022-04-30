class Screen {
    constructor() {
        if (confirm('You are fast?')) {
            this.speed = prompt('How fast are you? [choose max 100, min 1000]');
            if (this.speed == '') {
                this.speed = 1000;
            }

            this.container = document.querySelector('.container');
            this.containerText = document.querySelector('.container h3');
            this.container.addEventListener('click', this.gameEnd.bind(this));
            this.result = document.querySelector('.result');
            this.button = document.querySelector('button')
            this.button.addEventListener('click', this.newGame.bind(this));
            this.hour = document.querySelector('.hour');
            this.minute = document.querySelector('.minute');
            this.second = document.querySelector('.second');
            this.intervalStatus = this.interval(this.speed);
        } else {
            this.fat = document.querySelector('.fat');
            this.fat.style.display = 'block';
        }


    }

    randomLocation() {
        let randomTop = Math.floor(Math.random() * 500);
        let randomLeft = Math.floor(Math.random() * 1170);
        let R = Math.floor(Math.random() * 255);
        let G = Math.floor(Math.random() * 255);
        let B = Math.floor(Math.random() * 255);
        let textRandom = Math.floor(Math.random() * 6);
        const containerTextArr = ['come on baby', 'catch me!', 'loser!', 'hahahah', 'You can not!', 'only this?'];
        this.container.style.top = `${randomTop}px`;
        this.container.style.left = `${randomLeft}px`;
        this.container.style.backgroundColor = `rgba(${R}, ${G}, ${B})`;
        this.containerText.textContent = containerTextArr[textRandom]
    }

    gameEnd() {
        clearInterval(this.intervalStatus.intervalCircle);
        clearInterval(this.intervalStatus.intervalTime)
        this.result.style.top = '50%';
    }

    newGame() {
        location.reload();
    }

    interval(speed) {
        // interval for show circle
        let intervalCircle = setInterval(function() {
            this.randomLocation();
        }.bind(this), speed);

        // inerval for time
        let s = 0;
        let m = 0;
        let intervalTime = setInterval(function() {
            this.second.textContent = s++;
            if (s == 60) {
                s = 0;
                this.minute.textContent = m += 1;
            }
        }.bind(this), 1000);

        // return for clear interval
        return {
            intervalCircle: intervalCircle,
            intervalTime: intervalTime
        };
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new Screen();
})