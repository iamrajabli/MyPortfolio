const movieCardTemplate = document.createElement('template');
movieCardTemplate.innerHTML = `
<style>
    @import url('./components/movieCard/movieCard.css');
</style>

<div class="movie-container">
    <div class="image-container">
         <img/>
    </div>
    <div class="info">
        <h3></h3>
        <p><slot/></p>
        <div class="action_container">
            <i class="isFavourite fa fa-heart"></i>
            <a target="_blank" class="button">IMDb</a>
        </div>
    </div>  
</div>

`

class MovieCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(movieCardTemplate.content.cloneNode(true));


        setTimeout(() => {
            this.shadowRoot.querySelector('h3').innerHTML = this.getAttribute('title');
            this.shadowRoot.querySelector('img').setAttribute('src', this.getAttribute('poster'));
            this.shadowRoot.querySelector('a').setAttribute('href', `https://www.imdb.com/title/${this.getAttribute('imdbID')}`);
            if (this.getAttribute('isFavourite') == 'true') {
                this.shadowRoot.querySelector('.isFavourite').classList.add('is_favourite');
            }
        }, 100)
    }
    favToggle() {
        this.shadowRoot.querySelector('.isFavourite').classList.toggle('is_favourite');

    }
    connectedCallback() {
        this.shadowRoot.querySelector('.isFavourite').addEventListener('click', () => this.favToggle())
    }
    disconnectedCallback() {
        this.shadowRoot.querySelector('.isFavourite').removeEventListener('click', () => this.favToggle())
    }
}

window.customElements.define('movie-card', MovieCard)