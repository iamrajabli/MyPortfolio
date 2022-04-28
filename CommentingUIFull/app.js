'use strict';
class Comment {
    constructor(comment) {
        this.id = new Date().getTime();
        this.comment = comment;
        this.currentDate = Comment.month();
    }

    static month() {
        const date = new Date().getTime();
        const current = new Date(date)
        return current.toLocaleString();
    }
}

class Control {
    static controlOfData(data) {
        if (data == '') {
            return false;
        } else {
            return true;
        }
    }
}

class Screen {
    constructor() {
        this.form = document.querySelector('.write-comment form');
        this.form.addEventListener('submit', this.prepare.bind(this));
        this.input = document.querySelector('.write-comment input');
        this.all_comments_content = document.querySelector('.all-comments-content');
        this.all_comments_content.addEventListener('click', this.removeComment.bind(this));
        this.countOfComment = document.getElementById('countComment');
        this.enter = document.getElementById('enter');
        this.enter.addEventListener('click', this.prepare.bind(this));
        this.commentLS = new LS();
        this.showComments();
    }

    prepare(e) {
        e.preventDefault();
        const commentObj = new Comment(this.input.value);
        const resultOfData = Control.controlOfData(commentObj.comment);

        if (resultOfData) {

            this.createAndAdd(commentObj);
            this.commentLS.setLS(commentObj);
            console.log(commentObj);
        }
    }

    createAndAdd(commentObj) {
        const div = document.createElement('div');
        div.className = 'all-comments-content-item';

        div.innerHTML = `
        <div class="all-comments-content-item-pp">
        <img src="img/1.jpg" alt="">
        </div>

        <div class="all-comments-content-details">
            <div class="all-comments-content-details-header">
                <h3>Hikmat Rajabli</h3>
                <span>${commentObj.currentDate} </span>
                <span class="hidden">${commentObj.id}</span>
            </div>
            <div class="all-comments-content-details-comment">
                <span>${commentObj.comment}</span>
            </div>
        </div>
        `
        this.all_comments_content.insertBefore(div, this.all_comments_content.children[0]);
        // this.all_comments_content.appendChild(div);
        this.input.value = '';
        let i = parseInt(this.countOfComment.textContent);
        this.countOfComment.textContent = i += 1;
    }

    showComments(status) {
        this.commentLS.allData.forEach(data => {
            this.createAndAdd(data, status);
        });
        this.countOfComment.textContent = this.commentLS.allData.length;
    }

    removeComment(e) {
        if (e.target.className == 'all-comments-content-item') {
            e.target.remove();
            this.countOfComment.textContent = this.commentLS.allData.length - 1;
            let id = e.target.children[1].children[0].children[2].textContent;
            this.commentLS.removeLS(id);
        }
    }
}
class LS {
    constructor() {
        this.allData = this.getLS();
    }

    getLS() {
        let dataArr;
        if (localStorage.getItem('commentData') === null) {
            dataArr = [];
        } else {
            dataArr = JSON.parse(localStorage.getItem('commentData'));
        }
        return dataArr;
    }

    setLS(commentObj) {
        this.allData.push(commentObj);
        localStorage.setItem('commentData', JSON.stringify(this.allData));
    }

    removeLS(id) {
        this.allData.forEach((data, index) => {
            if (data.id == id) {
                this.allData.splice(index, 1);
            }
        });
        localStorage.setItem('commentData', JSON.stringify(this.allData));
    }

}

document.addEventListener('DOMContentLoaded', () => { new Screen });