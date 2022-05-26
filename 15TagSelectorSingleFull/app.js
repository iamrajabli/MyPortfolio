'use strict';

class ControlOfValue {
    static control(params) {
        if (params == '') {
            return false;
        } else {
            return true
        }
    }
}

class Tag {
    constructor(tagName) {
        this.tagName = tagName;
        this.tagStatus = false;
    }
}

class Screen {
    constructor() {
        this.movie_selector_content = document.querySelector('.movie-selector-content');
        this.movie_selector_content.addEventListener('click', this.selectTag.bind(this));
        this.input = document.querySelector('.movie-add input');
        this.input.addEventListener('keypress', this.createTag.bind(this));
        this.h1 = document.querySelector('h1');
        this.move_selector_header = document.querySelector('.move-selector-header')
        this.data = new LS();
        this.showData();
    }

    selectTag(e) {
        const target = e.target;

        if (target.classList.contains('btn-primary')) {

            // 1. validate => Does the targeted element have a class named 'select'?
            if (target.classList.contains('select')) {
                // If any => Remove the class named 'select' and the first child of the element (select icon)
                // Goal: just clearing the values of the element pressed on it.
                target.classList.remove('select');
                target.children[0].remove();
                this.data.changeStatus(target.textContent, false);

            } else {
                // If not => Remove the other class named 'select' and the first child of the element (select icon)
                const childrenInMovieContent = this.movie_selector_content.children;

                for (let i = 0; i < childrenInMovieContent.length; i++) {
                    if (childrenInMovieContent[i].classList.contains('select')) {
                        childrenInMovieContent[i].classList.remove('select');
                        childrenInMovieContent[i].children[0].remove();
                        this.data.allData.forEach(data => {
                            data.tagStatus = false;
                        })
                    }
                }

                // Add class "select" and new child to targeted element
                const icon = document.createElement('i');
                icon.className = 'fa-regular fa-circle-check';

                target.classList.add('select');
                target.appendChild(icon);
                this.data.changeStatus(target.textContent, true);
            }


        }
    }
    createTag(e) {
        if (e.key == 'Enter') {
            const result = ControlOfValue.control(this.input.value);
            if (result) {
                const data = new Tag(this.input.value);
                this.addTag(data);
                this.data.setLS(data);
                this.input.value = '';

            }
        };
    }

    addTag(data) {
        const tag = document.createElement('a');
        tag.setAttribute('href', '#');
        tag.textContent = data.tagName;
        const icon = document.createElement('i');
        icon.className = 'fa-regular fa-circle-check';

        if (data.tagStatus) {
            tag.className = 'btn btn-primary select';
            tag.appendChild(icon);
        } else {
            tag.className = 'btn btn-primary';
        }

        this.movie_selector_content.appendChild(tag);

    }

    showData() {

        if (this.data.allData.length == 0) {
            this.h1.textContent = 'Add your own movie tags'
        }
        for (let i in this.data.allData) {
            const data = this.data.allData[i];
            this.addTag(data);
        }
    }

}
class LS {
    constructor() {
        this.allData = this.getLS();
    }

    getLS() {
        let dataArr;
        if (localStorage.getItem('data') === null) {
            dataArr = [];
        } else {
            dataArr = JSON.parse(localStorage.getItem('data'));
        }

        return dataArr;
    }

    setLS(data) {

        this.allData.push(data);
        localStorage.setItem('data', JSON.stringify(this.allData));

    }

    changeStatus(dataTextContent, status) {
        this.allData.forEach((data, index) => {
            if (data.tagName == dataTextContent) {
                this.allData[index].tagStatus = status;
            }
        })
        localStorage.setItem('data', JSON.stringify(this.allData));
    }

}

document.addEventListener('DOMContentLoaded', function() {
    new Screen();
})