'use strict';
class Control {
    static controlInputs(selector, radius) {
        let htmlTagsArr = ['html', 'body', 'div', 'span', 'applet', 'object', 'iframe', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'blockquote', 'pre,a', 'abbr', 'acronym', 'address', 'big', 'cite', 'code', 'del', 'dfn', 'em', 'img', 'ins', 'kbd', 'q', 's', 'samp', 'small', 'strike', 'strong', 'sub', 'sup', 'tt', 'var', 'b', 'u', 'i', 'center', 'dl', 'dt', 'dd', 'ol', 'ul', 'li', 'fieldset', 'form', 'label', 'legend', 'table', 'caption', 'tbody', 'tfoot', 'thead', 'tr', 'th', 'td', 'article', 'menu', 'nav', 'output', 'ruby', 'section', 'summary', 'time', 'mark', 'audio', 'video'];
        if (radius > 80) {
            return {
                status: false,
                message: 'radius 80 den boyuk ola bilmez!'
            }
        }
        for (let i = 0; i < htmlTagsArr.length; i++) {
            if (selector == htmlTagsArr[i]) {
                return {
                    status: true,
                }
            }
        }
        return {
            status: false,
            message: 'sadece html element!'
        }
    }
}
class CreateCircle {
    constructor(_selector, _radius, _backgroundColor) {
        this._selector = _selector;
        this._radius = _radius;
        this._backgroundColor = _backgroundColor;
    }
}
class Screen {
    constructor() {
        this._selector = document.getElementById('_selector');
        this._radius = document.getElementById('_radius');
        this._backgroundColor = document.getElementById('_backgroundColor');
        this._form = document.querySelector('form');
        this._form.addEventListener('submit', this.prepare.bind(this));
        this._infoDiv = document.querySelector('form div');
    }
    info(status, message) {
        this._infoDiv.textContent = message;

        if (status) {
            this._infoDiv.classList = 'info success';
        } else {
            this._infoDiv.classList = 'info error';
        }
    }
    prepare(e) {
        e.preventDefault();
        const circleData = new CreateCircle(this._selector.value, this._radius.value, this._backgroundColor.value);
        this.result = Control.controlInputs(circleData._selector, circleData._radius);
        console.log(this.result);
        if (this.result.status) {
            this.info(true, 'success')
            this.create(circleData);
        } else {
            this.info(false, this.result.message)
        }
    }
    create(circleData) {
        this._form.style.top = "5%";
        this._form.style.left = "5%";
        this._form.style.transform = "translate(0, 0)";

        if (document.querySelector('.container')) {
            document.querySelector('.container').remove();
        }

        this.container = document.createElement(`${circleData._selector}`);
        this.circle = document.createElement('div');
        this.childCircle = document.createElement('div');

        this.circle.style.borderRadius = `${circleData._radius}%`;
        this.circle.style.backgroundColor = circleData._backgroundColor;
        this.childCircle.style.borderRadius = `${circleData._radius}%`;

        this.container.className = 'container';
        this.circle.className = 'circle';
        this.childCircle.className = 'childCircle';

        this.circle.appendChild(this.childCircle);
        this.container.appendChild(this.circle);
        document.querySelector('body').appendChild(this.container);

        if (confirm('Daire elave etmek isteyirsen?')) {
            this.moreCircle(circleData);
        } else {
            this.resetInput();
        }

    }

    moreCircle(circleData) {
        let count = prompt('nece dene?');
        for (let i = 0; i < count; i++) {
            let children = document.querySelectorAll('.childCircle');
            const childCircle = document.createElement('div');
            childCircle.className = 'childCircle';
            childCircle.style.borderRadius = `${circleData._radius}%`;
            children[i].appendChild(childCircle);
        }
        this.resetInput();
    }

    resetInput() {
        this._selector.value = '';
        this._radius.value = '';
        this._backgroundColor.value = '';
    }
}
document.addEventListener('DOMContentLoaded', function() {
    new Screen();
})

// Sample
// function createCircle(_selector, countChild, _radius, _backgroundColor) {
//     const container = document.createElement(`${_selector}`);
//     const circle = document.createElement('div');
//     const childCircle = document.createElement('div');
//     container.className = 'container';
//     circle.className = 'circle';
//     childCircle.className = 'childCircle';

//     circle.style.borderRadius = `${_radius}%`;
//     circle.style.backgroundColor = _backgroundColor;


//     circle.appendChild(childCircle);
//     container.appendChild(circle);
//     document.querySelector('body').appendChild(container);

//     for (let i = 0; i < countChild; i++) {
//         let children = document.querySelectorAll('.childCircle');
//         const childCircle = document.createElement('div');
//         childCircle.className = 'childCircle';
//         childCircle.style.borderRadius = `${_radius}%`;
//         children[i].appendChild(childCircle);
//     }
// }