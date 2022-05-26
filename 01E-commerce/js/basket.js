const click1 = document.getElementById('click1')
const click2 = document.getElementById('click2')
const click_login_event = document.querySelector('.click-login-event');
const apply = document.querySelector('.apply-code')

function displayBlock(item) {
    item.style.display = 'block'
}

function displayNone(item) {
    item.style.display = 'none'
}


click1.addEventListener('click', function() {

    if (click_login_event.style.display !== 'block') {
        displayBlock(click_login_event);
    } else {
        displayNone(click_login_event);
    }
})



click2.addEventListener('click', function() {
    if (apply.style.display !== 'block') {
        displayBlock(apply)
    } else {
        displayNone(apply)
    }
})