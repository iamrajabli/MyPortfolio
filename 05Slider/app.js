'use strict';
class Screen {
    constructor() {
        this.control = document.querySelector('.control');
        this.control.addEventListener('click', this.arrowLeftandRight.bind(this));
        this.slider = document.querySelector('.slider');
        this.sliderArr = [
            '1.jpg',
            '2.jpg',
            '3.jpg',
            '4.jpg',
            '5.jpg',
            '6.jpg'
        ];
        this.slider_item = this.createTags();
        this.i = 0;

    }

    createTags() {
        for (let i = 0; i < this.sliderArr.length; i++) {
            const img = document.createElement('img');
            const div = document.createElement('div');
            div.className = 'slider-item';
            img.setAttribute('src', `img/${this.sliderArr[i]}`);
            div.appendChild(img);
            this.slider.appendChild(div)
        }

        const slider_item = document.querySelectorAll('.slider-item');
        return slider_item;
    }

    arrowLeftandRight(e) {
        if (e.target.classList.contains('fa-chevron-left')) {

            this.i += 700;
            this.showSlider(this.i)


        } else if (e.target.classList.contains('fa-chevron-right')) {

            this.i -= 700;
            this.showSlider(this.i)

        }
    }

    showSlider(index) {
        this.i = index;
        if (index > 0) {
            this.i = (-this.sliderArr.length + 1) * 700;
        }
        if (this.i < (-this.sliderArr.length + 1) * 700) {
            this.i = 0;
        }

        this.slider_item.forEach(element => {
            element.style.transform = `translate(${this.i}px)`;
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new Screen;
})