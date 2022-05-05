'use strict';

class Screen {
    constructor() {
        this.selectType = document.querySelector('.select-type').addEventListener('click', this.selectTab.bind(this));
        this.selectTypeBtns = document.querySelectorAll('.select-type a');
        this.tab = document.querySelectorAll('.tab');
        this.productType = document.querySelectorAll('.product-type');
        this.productType.forEach(productType => {
            productType.addEventListener('click', this.selectProduct.bind(this));
        });
        this.productTypeItem = document.querySelectorAll('.product-type-item');
        this.btns = document.querySelectorAll('.product-type-item a');
    }

    selectProduct(e) {
        e.preventDefault();


        if (e.target.classList.contains('btn')) {
            this.btns.forEach(btn => {
                if (btn.classList.contains('btn-active')) {
                    btn.classList.remove('btn-active')
                }
            })
            this.productTypeItem.forEach(item => {
                if (item.classList.contains('active')) {
                    item.classList.remove('active')
                }
            });

            e.target.classList.add('btn-active')
            e.target.parentElement.classList.add('active')

        }
    }

    selectTab(e) {
        e.preventDefault();
        this.selectTypeBtns.forEach(btn => {
            if (btn.classList.contains('btn-active')) {
                btn.classList.remove('btn-active')
            }
        })
        if (e.target.textContent == 'Monthly') {
            e.target.classList.toggle('btn-active');
            this.tab[0].style.transform = 'scale(1)';
            this.tab[1].style.transform = 'scale(0)';
        }
        if (e.target.textContent == 'Annulay') {
            e.target.classList.toggle('btn-active');
            this.tab[0].style.transform = 'scale(0)';
            this.tab[1].style.transform = 'scale(1)';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Screen();
})