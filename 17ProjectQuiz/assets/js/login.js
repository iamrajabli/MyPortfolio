class Login {
    constructor(username, password) {
        this.username = username;
        this.password = password
    }
}

class Screen {
    constructor() {
        this.username = document.getElementById('username');
        this.password = document.getElementById('password');
        this.signIn = document.getElementById('signIn');
        this.signIn.addEventListener('click', this.prepare.bind(this));
        this.errorBlock = document.querySelector('.error__block');
        this.successBlock = document.querySelector('.success__block');
        this.redirectSecond = document.getElementById('redirectSecond');
        this.UserDB = new UserDB();
        this.SS = new SS();
    }

    prepare(e) {
        e.preventDefault();
        const loginUser = new Login(this.username.value, this.password.value)


        if (loginUser.username == '') {
            this.required(this.username, 'inline-block')
        } else {
            this.required(this.username, 'none')
        }
        if (loginUser.password == '') {
            this.required(this.password, 'inline-block')
            return;
        } else {
            this.required(this.password, 'none')
        }


        this.login(loginUser);
    }

    login(loginUser) {
        const result = this.UserDB.loginUserDB(loginUser);
        if (result) {
            this.SS.setSS({
                username: loginUser.username,
                status: true
            })
            this.resetInput();
            this.statusMessage(this.successBlock, true);
        } else {
            this.statusMessage(this.errorBlock);
        }

    }

    resetInput() {
        this.username.value = '';
        this.password.value = '';
    }

    required(input, display) {
        input.parentElement.children[0].children[1].style.display = display
    }

    statusMessage(block, status = "") {
        block.style.display = 'block'
        setTimeout(() => {
            block.style.display = 'none'
        }, 3000);

        if (status) {
            let i = 2;
            setInterval(() => {
                this.redirectSecond.innerHTML = `${i}sn...`;
                i--;
                if (i == 0) {
                    document.location.href = 'index.html'
                }
            }, 1000)
        }

        if (this.successBlock.style.display == 'block') {
            this.errorBlock.style.display = 'none'
        }
        if (this.errorBlock.style.display == 'block') {
            this.successBlock.style.display = 'none'
        }

    }


}
class UserDB {
    constructor() {
        this.allData = this.getUserDB();
    }

    getUserDB() {
        let arr;
        if (localStorage.getItem('users') === null) {
            arr = []
        } else {
            arr = JSON.parse(localStorage.getItem('users'));
        }
        return arr;
    }

    loginUserDB(loginUser) {
        let result = false;
        this.allData.forEach(data => {
            if (data.username == loginUser.username && data.password == loginUser.password) {
                result = true;
            }
        });
        return result;
    }

}

class SS {
    constructor() {
        this.currentlyUser = this.getSS();
    }

    getSS() {
        let obj;
        if (sessionStorage.getItem('user') !== null) {
            obj = JSON.parse(sessionStorage.getItem('user'));
        }
        return obj;
    }

    setSS(user) {
        this.currentlyUser = user;
        sessionStorage.setItem('user', JSON.stringify(this.currentlyUser));
    }
}

document.addEventListener('DOMContentLoaded', new Screen());