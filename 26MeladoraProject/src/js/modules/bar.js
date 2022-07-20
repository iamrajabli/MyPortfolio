function bar(barMenuSelector, menuSelector, activeClass, rotateClass) {
    const callElem = (selector) => document.querySelector(selector),
        callElems = (selector) => document.querySelectorAll(selector),
        barMenu = callElem(barMenuSelector),
        menu = callElem(menuSelector);


    barMenu.addEventListener('click', () => {
        menu.classList.toggle(activeClass);
        barMenu.style.transition = 'all 200ms linear';
        barMenu.classList.toggle(rotateClass);
    });


    const search = callElem('.search'),
        searchIcon = callElems('.fa-magnifying-glass');

    searchIcon.forEach(item => {
        item.addEventListener('click', () => {
            search.classList.toggle('d-block')
        })
    })

}

export default bar;