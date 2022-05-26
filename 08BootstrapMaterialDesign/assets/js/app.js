'use strict';

class Screen {
    constructor() {
        this.commonManagment = document.querySelector('.common__managment');
        this.commonLoadingBar = document.querySelector('.common__loading--bar');
        this.commonAccountTab = document.querySelector('.common__account--tab');
        this.commonPersonalTab = document.querySelector('.common__personal--tab');
        this.commonSocialTab = document.querySelector('.common__social--tab')
        this.commonConfirmTab = document.querySelector('.common__confirm--tab')
        this.tabArr = [this.commonAccountTab, this.commonPersonalTab, this.commonSocialTab, this.commonConfirmTab];
        this.commonControl = document.querySelector('.common__control');
        this.commonAccountTabInput = document.querySelectorAll('.common__account--tab input');

        this.commonControl.addEventListener('click', this.tabControl.bind(this));
        this.commonManagment.addEventListener('click', this.selectTab.bind(this));

        this.i = 0;
        this.j = 25;

    }


    validation(nodeList) {
        let result;
        let arr = [];
        nodeList.forEach(input => {
            if (input.value == '') {
                result = false;
                arr.push(input.nextElementSibling)
            } else {
                input.nextElementSibling.setCSS({ display: 'none' })
            }
        });

        return {
            result: result,
            tag: arr
        };
    }


    hiddenTab() {
        this.tabArr.forEach(tab => {
            tab.setCSS({ display: 'none' })
        })
    }


    selectTab(e) {
        e.preventDefault();

        // account
        if (e.target.id == 'account') {
            this.commonLoadingBar.setCSS({ width: '25%' });
            this.j = 25;
            this.controlActive()
            e.target.classList.add('active');
            this.i = 0;
            this.hiddenTab()
            this.commonAccountTab.setCSS({ display: 'block' })
            this.commonControl.children[1].textContent = 'next'

        }

        // personal
        if (e.target.id == 'personal') {
            this.commonLoadingBar.setCSS({ width: '50%' });
            this.j = 50;
            this.controlActive()
            this.i = 1;
            e.target.classList.add('active')
            this.hiddenTab()
            this.commonPersonalTab.setCSS({ display: 'block' })
            this.commonControl.children[1].textContent = 'next'
        }

        // social
        if (e.target.id == 'social') {
            this.commonLoadingBar.setCSS({ width: '75%' });
            this.j = 75;
            this.controlActive()
            this.i = 2;

            e.target.classList.add('active')
            this.hiddenTab()
            this.commonSocialTab.setCSS({ display: 'block' })
            this.commonControl.children[1].textContent = 'next'
        }

        // confirm
        if (e.target.id == 'confirm') {
            this.commonLoadingBar.setCSS({ width: '100%' });
            this.j = 100;
            this.controlActive()
            this.i = 3;

            e.target.classList.add('active')
            this.hiddenTab()
            this.commonConfirmTab.setCSS({ display: 'block' })
            this.commonControl.children[1].textContent = 'submit'
        }
    }

    controlActive() {
        for (let i = 0; i < this.commonManagment.children.length; i++) {
            if (this.commonManagment.children[i].classList.contains('active')) {
                this.commonManagment.children[i].classList.remove('active')
            }
        }

    }

    tabControl(e) {

        e.preventDefault();
        if (e.target.id == 'previous') {
            this.hiddenTab();
            this.commonControl.children[1].textContent = 'next'
            this.i -= 1;
            this.j -= 25;

            if (this.i < 1) {
                this.i = 0;
            }
            if (this.j <= 0) {
                this.j = 25;
            }
            this.controlActive()
            this.commonManagment.children[this.i].classList.add('active')
            this.tabArr[this.i].setCSS({ display: 'block' });
            this.commonLoadingBar.setCSS({ width: `${this.j}%` });
        }
        if (e.target.id == 'next') {
            let result = this.validation(this.commonAccountTabInput);
            if (result.result) {
                this.hiddenTab();
                this.i += 1;
                this.j += 25;
                if (this.i >= 3) {
                    e.target.textContent = 'submit';
                    this.i = 3;
                }
                if (this.j >= 101) {
                    this.j = 100;
                }
                this.tabArr[this.i].setCSS({ display: 'block' });
                this.controlActive()
                this.commonManagment.children[i].classList.add('active')
                this.commonLoadingBar.setCSS({ width: `${this.j}%` });

            } else {
                result.tag.forEach(item => {
                    item.setCSS({ display: 'inline-block' });

                })
            }

        }
    }

}


HTMLElement.prototype.setCSS = function(obj) {
    for (let i in obj) {
        this.style[i] = obj[i];
    }
}

document.addEventListener('DOMContentLoaded', () => new Screen());