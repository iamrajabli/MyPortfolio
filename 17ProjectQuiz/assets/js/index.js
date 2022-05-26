class Quiz {
    constructor(quizName, quizDesc, A, B, C, D, correctAnswer) {
        this.username = new SS().currentlyUser.username;
        this.id = new Date().getTime().toString().slice(6, 13);
        this.date = Quiz.quizDate();
        this.quizName = quizName;
        this.quizDesc = quizDesc;
        this.A = A;
        this.B = B;
        this.C = C;
        this.D = D;
        this.correctAnswer = correctAnswer;

    }

    static quizDate() {
        const date = new Date().getTime();
        const current = new Date(date)
        return current.toLocaleString();
    }

}


class Screen {
    constructor() {
        this.DBControl();
        this.SS = new SS();
        this.controlSS = this.SS.controlSS();
        this.locationControl();
        this.quizCreate = document.getElementById('quizCreate');
        this.addQuiz = document.getElementById('addQuiz');
        this.addQuiz.addEventListener('click', this.openClose.bind(this));
        this.createOrUpdateBtn = document.getElementById('createOrUpdateBtn');
        this.createOrUpdateBtn.addEventListener('click', this.prepare.bind(this));
        this.quizName = document.getElementById('quizName');
        this.quizDesc = document.getElementById('quizDesc');
        this.A = document.getElementById('A');
        this.B = document.getElementById('B');
        this.C = document.getElementById('C');
        this.D = document.getElementById('D');
        this.correctAnswer = document.getElementById('correctAnswer');
        this.QuizDB = new QuizDB();
        this.quizList = document.getElementById('quizList');
        this.quizList.addEventListener('click', this.quizManagment.bind(this))
        this.succesBlock = document.querySelector('.success__block');
        this.updateStatus = null;
        this.logOut = document.getElementById('logOut');
        this.logOut.addEventListener('click', this.exit);
        this.QuizSS = new QuizSS();
        this.noQuiz = document.querySelector('.no__quiz');
        this.showQuizzes();

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

    exit(e) {
        e.preventDefault();
        sessionStorage.clear();
        window.location.href = 'login.html';
    }

    openClose(e) {
        e.preventDefault();
        if (this.quizCreate.style.display !== 'block') {
            this.quizCreate.style.display = 'block';
            this.addQuiz.classList.add('close');
            this.addQuiz.innerHTML = 'Hide';
        } else {
            this.quizCreate.style.display = 'none';
            this.addQuiz.classList.remove('close');
            this.addQuiz.innerHTML = '+ Create a quiz';
        }
    }

    prepare(e) {
        e.preventDefault();
        const quiz = new Quiz(this.quizName.value, this.quizDesc.value, this.A.value, this.B.value, this.C.value, this.D.value, this.correctAnswer.value);
        let result;


        for (let i in quiz) {
            if (i !== 'username' && i !== 'id' && i !== 'date' && i !== 'correctAnswer') {
                const inputs = document.getElementById(i);
                if (quiz[i] !== '') {
                    result = this.required(inputs, 'none');
                } else {
                    result = this.required(inputs, 'inline-block');
                }

            }
        }


        if (this.updateStatus !== null) {
            quiz.id = this.updateStatus.children[0].innerHTML
        }

        if (result) {
            this.createOrUpdate(quiz);
        }

    }

    createOrUpdate(quizObj) {
        if (!this.updateStatus) {
            this.QuizDB.setQuizDB(quizObj);
            const quizContent = document.createElement('div');
            quizContent.className = 'quiz__content';
            quizContent.innerHTML = `
            <div class="quiz__info">
            <span>${quizObj.id}</span>
            <div class="quiz__date">
                <span><i class="fa-regular fa-clock"></i>${quizObj.date}</span>
            </div>
            <span>${quizObj.quizName}</span>
            </div>
            <div class="quiz__managment">
                <a href="quiz.html" class="btn btn-general">Start</a>
                <i class="fa-solid fa-pen"></i>
                <i class="fa-solid fa-trash"></i>
            </div>
            `;
            this.quizList.style.display = 'block';
            this.quizList.appendChild(quizContent);
            this.statusMessage(this.succesBlock);
            this.noQuiz.style.display = 'none'
        } else {
            this.QuizDB.updateQuizDB(quizObj);
            this.updateStatus.children[2].innerHTML = quizObj.quizName;
            this.updateStatus = null;
            this.quizCreate.style.display = 'none';
            this.addQuiz.innerHTML = '+ Create a quiz';
            this.addQuiz.classList.remove('close');
            this.createOrUpdateBtn.innerHTML = 'Create';
            this.createOrUpdateBtn.classList.remove('close')
        }
        this.resetInput();

    }

    quizManagment(e) {
        e.preventDefault();
        if (e.target.classList.contains('fa-pen')) {

            this.quizCreate.style.display = 'block';
            this.addQuiz.classList.add('close');
            this.addQuiz.innerHTML = 'Hide';
            this.createOrUpdateBtn.innerHTML = 'Update';
            this.createOrUpdateBtn.classList.add('close')

            const quizId = e.target.parentElement.parentElement.children[0].children[0].innerHTML;
            this.QuizDB.allData.forEach(quiz => {
                if (quiz.id == quizId) {
                    this.quizName.value = quiz.quizName;
                    this.quizDesc.value = quiz.quizDesc;
                    this.A.value = quiz.A;
                    this.B.value = quiz.B;
                    this.C.value = quiz.C;
                    this.D.value = quiz.D;
                }
            });

            this.updateStatus = e.target.parentElement.parentElement.children[0]

        }

        if (e.target.classList.contains('fa-trash')) {
            const quizContent = e.target.parentElement.parentElement;
            const quizId = e.target.parentElement.parentElement.children[0].children[0].innerHTML;
            quizContent.remove();
            this.QuizDB.deleteFromDB(quizId);
            if (this.quizList.children[2] == undefined) {
                this.noQuiz.style.display = 'flex'
            } else {
                this.noQuiz.style.display = 'none'
            }
        }

        if (e.target.classList.contains('btn-general')) {
            const quizId = e.target.parentElement.parentElement.children[0].children[0].innerHTML;
            console.log('sa');
            document.location.href = 'quiz.html';
            this.QuizSS.setSS(quizId)
        }
    }

    required(input, display) {
        let result = false;
        input.parentElement.children[0].children[1].style.display = display;
        if (display == 'none') {
            result = true;
        }
        return result
    }

    showQuizzes() {


        this.QuizDB.allData.forEach(quiz => {

            if (quiz.username == this.SS.currentlyUser.username) {

                if (quiz == null || quiz == [] || quiz == undefined) {
                    this.noQuiz.style.display = 'flex';
                } else {
                    this.noQuiz.style.display = 'none';
                }

                const quizContent = document.createElement('div');
                quizContent.className = 'quiz__content';
                quizContent.innerHTML = `
                <div class="quiz__info">
                <span>${quiz.id}</span>
                <div class="quiz__date">
                    <span><i class="fa-regular fa-clock"></i>${quiz.date}</span>
                </div>
                <span>${quiz.quizName}</span>
                </div>
                <div class="quiz__managment">
                    <a href="quiz.html" class="btn btn-general">Start</a>
                    <i class="fa-solid fa-pen"></i>
                    <i class="fa-solid fa-trash"></i>
                </div>
                `;
                this.quizList.appendChild(quizContent);
            }
        })
    }

    statusMessage(block) {
        block.style.display = 'block'
        setTimeout(() => {
            block.style.display = 'none'
        }, 3000);

    }

    resetInput() {
        this.quizName.value = '';
        this.quizDesc.value = '';
        this.A.value = '';
        this.B.value = '';
        this.C.value = '';
        this.D.value = '';
    }
}

class QuizDB {
    constructor() {
        this.allData = this.getQuizDB();
    }

    getQuizDB() {
        let arr;
        if (localStorage.getItem('quizzes') === null) {
            arr = []
        } else {
            arr = JSON.parse(localStorage.getItem('quizzes'));
        }
        return arr;
    }

    setQuizDB(quizObj) {
        this.allData.push(quizObj);
        localStorage.setItem('quizzes', JSON.stringify(this.allData));
    }

    deleteFromDB(quizId) {
        this.allData.forEach((data, index) => {
            if (data.id == quizId) {
                this.allData.splice(index, 1);
            }
        });
        localStorage.setItem('quizzes', JSON.stringify(this.allData));
    }

    updateQuizDB(quizObj) {
        this.allData.forEach((data, index) => {

            if (data.id == quizObj.id) {
                this.allData[index] = quizObj;
            }
        });
        localStorage.setItem('quizzes', JSON.stringify(this.allData));
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

    setSS(quizId) {
        sessionStorage.setItem('quizId', quizId)
    }
}

document.addEventListener('DOMContentLoaded', new Screen());