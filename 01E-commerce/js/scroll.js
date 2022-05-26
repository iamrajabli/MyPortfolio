const arrow_up = document.getElementById('arrow-up');
const navbar = document.getElementById('navbar-menu');
event_listeners()

function event_listeners() {
    window.addEventListener('scroll', function() { // yuxari cek butonu yuxaridan 350 px dusdukte gorunmesi ucun
        const scroll = window.scrollY;
        if (scroll > 350) {
            arrow_up.style.display = 'block'
        } else {
            arrow_up.style.display = 'none'
        }
    })


    arrow_up.addEventListener('click', function() { // butona basanda en yuxari getmek ucun
        window.scrollTo(0, 0)
    })

    window.addEventListener('scroll', function() { // navbarin 500pikselden sonra sticky olmasi ucun
        if (window.scrollY > 500) {
            navbar.style.position = 'sticky';
            navbar.style.top = '0px';
        } else if (window.scrollY > 200) {
            navbar.style.backgroundColor = 'rgba(254, 215, 0, .8)';

        } else if (window.scrollY < 200) {
            navbar.style.backgroundColor = '#fed700';

        }
    })
}