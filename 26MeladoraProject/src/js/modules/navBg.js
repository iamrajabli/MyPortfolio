export default function navBg(selectorMenuItems, selectorLogoItems) {
    const callElem = (selector) => document.querySelectorAll(selector),
        menuItems = callElem(selectorMenuItems),
        logoItems = callElem(selectorLogoItems);

    showBg();

    menuItems.forEach((item, i) => {

        if (!item.children[0].classList.contains('fa-magnifying-glass')) {

            item.addEventListener('click', () => {
                resetMenuItems()
                setSS(i);
            })

        }
    });

    logoItems.forEach(item => {
        item.addEventListener('click', () => {
            resetMenuItems()
            setSS('')
        })
    })

    function resetMenuItems() {
        menuItems.forEach(item => item.classList.remove('navbg'));
    }

    function doBg(i) {
        if (i !== '' && i) {
            menuItems[i].classList.add('navbg')
        }
    }

    function showBg() {
        let i = getSS();
        if (i !== '' && i) {
            doBg(i);
        }
    }

    function getSS() {
        return sessionStorage.getItem('active');
    }

    function setSS(index) {
        sessionStorage.setItem('active', index);
        doBg(index)
    }


}