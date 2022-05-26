class SignUp {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

}


class Screen {
    constructor() {
        this.signItemSpan = document.querySelectorAll('.sign__item>span');
        this.username = document.getElementById('username');
        this.password = document.getElementById('password');
        this.signUp = document.getElementById('signUp');
        this.signUp.addEventListener('click', this.prepare.bind(this))
        this.required = document.querySelectorAll('.required');
        this.successBlock = document.querySelector('.success__block');
        this.redirectSecond = document.getElementById('redirectSecond');
        this.UserDB = new UserDB();
    }

    prepare(e) {
        e.preventDefault();
        const registerUser = new SignUp(this.username.value, this.password.value);

        if (registerUser.username == '') {
            required(this.username, 'inline-block')
        } else {
            required(this.username, 'none')
        }
        if (registerUser.password == '') {
            required(this.password, 'inline-block')
            return;
        } else {
            required(this.password, 'none')
        }

        function required(input, display) {
            input.parentElement.children[0].children[1].style.display = display
        }

        this.register(registerUser);
        this.statusMessage(this.successBlock);
        this.resetInput();
    }

    required(input, display) {
        input.parentElement.children[0].children[1].style.display = display
    }

    register(registerUser) {
        this.UserDB.setUserDB(registerUser);
    }

    resetInput() {
        this.username.value = '';
        this.password.value = '';
    }

    statusMessage(block) {
        block.style.display = 'block'
        setTimeout(() => {
            block.style.display = 'none'
        }, 3000)

        let i = 2;
        setInterval(() => {
            this.redirectSecond.innerHTML = `${i}sn...`;
            i--;
            if (i == 0) {
                document.location.href = 'login.html'
            }
        }, 1000)
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

    setUserDB(registerUser) {
        this.allData.push(registerUser);
        localStorage.setItem('users', JSON.stringify(this.allData));
    }
}

document.addEventListener('DOMContentLoaded', new Screen());