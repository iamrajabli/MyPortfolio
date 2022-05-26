var slider = [{
        text_1: "Sale Offer This Week",
        span_1: ' -20% off',
        product_name: "Chamcham Galaxy S9 | S9+",
        span_2: '$1209.00',
        image: "1.jpg",
        btn: 'shopping now'
    },
    {
        text_1: "Sale Offer off This Week",
        span_1: ' -10% off',
        product_name: "Phantom 4 Pro+ Obsidian",
        span_2: '$1849.00',
        image: "2.jpg",
        btn: 'shopping now'
    }, {
        text_1: "Sale Offer This Week",
        span_1: ' Black Friday',
        product_name: "Work Desk Surface Studio 2018",
        span_2: '$824.00',
        image: "3.jpg",
        btn: 'shopping now'
    },

]

var index = 0; // index'in baslangic deyeri

var sliderCount = slider.length; // sliderin uzunlugu (sayi)

var settingsAutoSlider = { // settingsAutoSlider yaradildi - random aktiv passiv etmek ve kecid muddetini tenzilemek ucun
    random: true,
    duration: 2000
}

var slider_center = document.querySelector('#slider_center');
var product_name = document.querySelector('#product_name');
var text_1 = document.querySelector('#text_1');
var span_1 = document.querySelector('#text_1 span');
var span_2 = document.querySelector('#text_2 span');
var btn_shopping = document.querySelector('#btn_shopping');

var left_arrow = document.querySelector('.left-arrow');
var right_arrow = document.querySelector('.right-arrow');
var arrows = document.querySelectorAll('#slider_center');

// event listeners
eventListeners()
init();

// showslider func
function showSlider(i) {
    index = i;

    slider_center.style.backgroundImage = `url(img/slider/${slider[index].image})`;
    product_name.textContent = slider[index].product_name;
    text_1.textContent = slider[index].text_1;
    span_1.textContent = slider[index].span_1;
    span_2.textContent = slider[index].span_2;
    text_1.appendChild(span_1);
    btn_shopping.textContent = slider[index].btn;
}

// init func created - auto slider ucun
function init() {

    autoSlider = setInterval(function() { // autoSlider - setInterval'in butun deyerlerini atmaq ucun deyisken yaradildi.
        var prev; // yeni deyisken yaradildi
        if (settingsAutoSlider.random) {
            do {
                prev = index; // yeni deyisken indexin baslangic deyerine sahib oldu
                index = Math.floor(Math.random() * sliderCount); //random basladi

            } while (index == prev); // dongu basladi - dongu basladiqdan sonra sherti kontrol etdi - indexin son deyeri previn [previn deyeri indexin evvelki deyeridir] deyerine beraberdirse yeni random reqem yaratdi.
            showSlider(index);
            console.log(index)
        }
    }, settingsAutoSlider.duration);
}

// eventListeners created - butun eventler ucun
function eventListeners() {

    // arrows mousenter ve mouseleave
    arrows.forEach(function(arrows) {
        arrows.addEventListener('mouseenter', function() {
            clearInterval(autoSlider)
        });
        arrows.addEventListener('mouseleave', function() {
            init();
        })
    })


    // left arrow click event
    left_arrow.addEventListener('click', function(event) {
        event.preventDefault();
        index--;
        if (index < 0) { // index eger 0 dan kicik olarsa slider sayindan baslasin
            index = sliderCount - 1;


        }
        showSlider(index);
        console.log(index);
    });

    // right arrow click event
    right_arrow.addEventListener('click', function(event) {
        event.preventDefault();
        index++;

        if (index >= sliderCount) { //index eger slider sayindan boyuk olarsa 0 olsun
            index = 0;

        }
        console.log(index);
        showSlider(index);

    })
}