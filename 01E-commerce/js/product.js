let slider_product = [{
    image: 'img/slider/5.jpg'
},
{
    image: 'img/slider/6.jpg'
},
{
    image: 'img/slider/7.jpg'
},
{
    image: 'img/slider/8.jpg'
},
{
    image: 'img/slider/9.jpg'
},
]
let left_arrow = document.querySelector('#product_left_arrow');
let right_arrow = document.querySelector('#product_right_arrow');
let slider_img = document.querySelector('#slider_img');

let index = 0;
let slider_product_count = slider_product.length;
eventListeners()

function showSlider(index) {
    
    slider_img.setAttribute('src', slider_product[index].image)

}

function eventListeners() {
    
    // left arrow event 
    left_arrow.addEventListener('click',function(){
        index--;
        switch(true) {
            case index < 0:
                index = slider_product_count - 1;               
                break;
        }
        showSlider(index);
        console.log(index);
    });

    right_arrow.addEventListener('click', function(){
        index++;
        switch(true) {
            case index >= slider_product_count:
                index = 0;               
                break;
        }
        showSlider(index);
        console.log(index);
    })
}