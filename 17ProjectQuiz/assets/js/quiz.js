class Screen {
    constructor() {
        this.DBControl();
        this.SS = new SS();
        this.QuizSS = new QuizSS();
        this.controlSS = this.SS.controlSS();
        this.locationControl();
        this.QuizDB = new QuizDB();
        this.questionDesc = document.querySelector('.question__desc');
        this.questionContent = document.querySelector('.question__content')
        this.questionContent.addEventListener('click', this.select.bind(this));
        this.A = document.getElementById('A');
        this.B = document.getElementById('B');
        this.C = document.getElementById('C');
        this.D = document.getElementById('D');
        this.quizId = document.getElementById('quizId');
        this.showQuiz();
        this.againQuiz = document.getElementById('againQuiz').addEventListener('click', this.againQuiz.bind(this));
        this.questionScore = document.querySelector('.question__score');
        this.totalScore = document.querySelector('.total__score');
    }

    locationControl() {
        if (!this.controlSS) {
            window.location.href = 'login.html';
        }
    }
    DBControl() {
        if (localStorage.getItem('users') == undefined) {
            window.location.href = 'login.html';
        }
        if (localStorage.getItem('users') == []) {
            window.location.href = 'login.html';
        }

        if (localStorage.getItem('users') == null) {
            window.location.href = 'login.html';
        }
    }

    showQuiz() {
        const id = this.QuizSS.currentlyQuiz;
        this.QuizDB.allData.forEach(data => {
            if (data.id == id) {
                this.questionDesc.innerHTML = data.quizDesc;
                this.A.innerHTML = data.A;
                this.B.innerHTML = data.B;
                this.C.innerHTML = data.C;
                this.D.innerHTML = data.D;
                this.quizId.innerHTML = `${data.quizName}: ${data.id}`

            }
        });
    }
    select(e) {
        if (e.target.className == "question__answer") {
            const answer = e.target.children[1].innerHTML;
            const option = e.target.children[0].innerHTML;

            this.QuizDB.allData.forEach(data => {
                if (data.id == this.QuizSS.currentlyQuiz) {
                    if (data.correctAnswer == option) {
                        e.target.classList.add('successfuly');
                        this.totalScore.innerHTML = '50';
                    } else {
                        e.target.classList.add('error');
                        this.totalScore.innerHTML = '0';
                    }
                }
            });

            for (let i = 0; i < this.questionContent.children.length; i++) {
                this.questionContent.children[i].classList.add('nonEvent');
            }
            this.questionScore.style.top = '50%'

        }
    }

    againQuiz(e) {
        e.preventDefault();
        for (let i = 0; i < this.questionContent.children.length; i++) {
            this.questionContent.children[i].classList.remove('nonEvent');
            this.questionContent.children[i].classList.remove('successfuly');
            this.questionContent.children[i].classList.remove('error');
            this.questionScore.style.top = '-50%'
        }
    }
}
class QuizDB {
    constructor() {
        this.allData = this.getQuizDB();
    }

    getQuizDB() {
        let arr = JSON.parse(localStorage.getItem('quizzes'));
        return arr;
    }


}
class UserDB {
    constructor() {
        this.allData = this.getUserDB();
    }

    getUserDB() {
        let arr = JSON.parse(localStorage.getItem('users'));
        return arr;
    }

}

class SS {
    constructor() {
        this.currentlyUser = this.getSS();
        this.allUser = new UserDB();
    }

    getSS() {
        let obj;
        if (sessionStorage.getItem('user') !== null) {
            obj = JSON.parse(sessionStorage.getItem('user'));
        } else {
            obj = {};
        }
        return obj;
    }

    controlSS() {
        let result = false;
        this.allUser.allData.forEach(user => {
            if (user.username == this.currentlyUser.username) {
                result = true;
            }
        });
        return result
    }
}

class QuizSS {
    constructor() {
        this.currentlyQuiz = this.getSS();
    }

    getSS() {
        const quizId = sessionStorage.getItem('quizId')
        return quizId;
    }

    setSS() {
        const id = window.location.href.slice(window.location.href.indexOf('=') + 1);
        sessionStorage.setItem('quizId', id)
    }
}

document.addEventListener('DOMContentLoaded', new Screen());