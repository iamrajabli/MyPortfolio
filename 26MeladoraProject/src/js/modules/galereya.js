export default function galereya(wrapperSelector, sliesSelector, dotsSelector, containerSelector) {
    const wrapper = document.querySelector(wrapperSelector),
        slides = document.querySelectorAll(sliesSelector),
        dot = document.querySelector(dotsSelector),
        container = document.querySelector(containerSelector);

    let width = container ? container.offsetWidth : null,
        offset = 0;

    if (wrapper) {
        wrapper.style.width = slides.length * width + 'px';
    }

    slides.forEach((item, i) => {
        const li = document.createElement('li');

        li.setAttribute('data-slide', (i - 1) + 1);

        if (i === 0) {
            li.classList.add('active');
        }

        dot.appendChild(li);

        li.addEventListener('click', e => {
            offset = e.target.getAttribute('data-slide') * width;
            showActive(i)
            showGalery(offset);
        })
    })

    window.addEventListener('resize', () => {
        width = container ? container.offsetWidth : null;
        if (wrapper) {
            wrapper.style.width = slides.length * width + 'px';
        }
        offset = 0;
        showGalery(offset);
    })

    function showGalery(offset) {
        if (wrapper) {
            wrapper.style.transform = `translateX(-${offset}px)`;
        }
    }

    function showActive(id) {
        const active = document.querySelectorAll('.galereya__dot ol li');
        active.forEach(item => item.classList.remove('active'));

        active[id].classList.add('active');
    }
}