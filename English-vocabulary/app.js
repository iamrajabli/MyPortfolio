'use strict';

class Screen {
    constructor() {
        this.allWords = ['rush', 'fur', 'such', 'around', 'also', 'stable', 'cottage', 'servant', 'green field', 'garden', 'bush', 'berry bushes', 'artesian well', 'swim / swimming / swam', 'attention', 'dont pay attention to ', 'belong / belonging / belonged', 'whole', 'hunt / hunting / hunted', 'lay / laying / laid', 'proud', 'companion', 'act / acting / acted', 'that is why', 'like a', 'like a aristocrat', 'spoiled', 'this was how', 'thats how', 'strike', 'above all', 'through', 'away', 'nobody', 'known as', 'notice / noticing / noticed', 'just', 'stranger', 'pass / passing / passed', 'between them', 'passed between them', 'tie / tying / tied', 'rope', 'try / tried / trying', 'because of', 'decide / deciding / decided', 'cruel', 'cruelly', 'tightly', 'crate', 'put into', 'jump / jumping / jumped', 'still', 'hope / hoping / hoped', 'loudly', 'laugh / laughing / laughed', 'hold in / holding in /', 'held in', 'anger', 'Buck could not hold in his anger', 'carry / carrying / carried', 'let / letting /let', 'straight', ' bite / bit / bitting', 'strike / striking / struck', 'several', 'ground', 'fall / falling / fell', 'flow / flowing / flowed', 'noise', 'spirit', 'break / breaking / broke', 'same', 'some', 'obey / obeying / obeyed', 'glad', 'doubt / doubting / doubted', 'justice', 'protect / protecting / protected', 'become / becoming / became', 'ship', 'owner', 'cunningly', 'steal / stealing / stole', 'felt / felted / felting', 'stuff', 'stuff / stuffing / stuffed', 'lick / licking / licked', 'taste', 'tast / tasting / tasted', 'put on', 'put out', 'take / took', 'go / went', 'get into / got into', 'say / said', 'during', 'trip', 'look / looked', 'but', 'pull of / pulled off', 'quickly', 'throw / threw ', 'laugh / laughed', 'someone', 'near each other', 'both', 'then', 'together', 'explain', 'because', 'ill', 'better', 'get', 'begin / bega', ' break / brok', 'bring / brough', 'build / buil', 'buy / bough', 'catch / caugh', 'come / cam', 'do / did', 'drink / dran', 'eat / at', 'fall / fel', 'find / foun', 'fly / fle', 'forget / forgo', 'get / got /', 'give / gav', 'go / wen', 'have / had', 'hear / hear', 'know / knew', 'steal', 'tell / told', 'as well', 'haven\'t we?', 'is that clear ?', 'And even worse', 'push', 'hold / held', 'put down', 'pick up', 'touch', 'pull', 'carry', 'turn on', 'give / gave', 'drop', 'break / broke', 'close / shut', 'climb', 'fall over / fell over', 'lie down / lay down', 'walk', 'get on / got on', 'get off / got off', 'letter', 'excited']
        this.word = document.querySelector('p');
        this.az = document.querySelector('.az');
        document.addEventListener('keyup', this.showRandom.bind(this));
        this.allData = new DB();
        this.allData.setDB(this.allWords);
    }

    showRandom(e) {
        console.log(this.allData.data);
        if (e.keyCode == 13 || e.target.className == 'create') {
            let randomInt = Math.floor(Math.random() * this.allData.data.length);
            this.word.textContent = this.allData.data[randomInt];
        }
    }
}

class DB {
    constructor() {
        this.allData = this.getDB();
        this.data;
    }

    getDB() {
        if (localStorage.getItem('Vocabulary') === null) {
            this.data = [];
        } else {
            this.data = JSON.parse(localStorage.getItem('Vocabulary'));
        }
        return this.data;
    }

    setDB(allWords) {
        this.data = allWords;
        localStorage.setItem('Vocabulary', JSON.stringify(this.data));
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new Screen();
})