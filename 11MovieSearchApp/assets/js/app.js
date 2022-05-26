class Screen {
    constructor() {
        this.search_text = document.querySelector('.search_text');
        this.search_text.addEventListener('keydown', this.search.bind(this));
    }

    search(event) {
        if (event.key == 'Enter') {
            this.searchMovie(this.search_text.value)
        }
    }

    async searchMovie(value) {
        const request = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=f114420d&s=${value}`);
        const data = await request.json();
        console.log(data);

        const movies = data.Search.map(m => {
            return {
                title: m.Title,
                poster: m.Poster === 'N/A' ? '/assets/images/default.png' : m.Poster,
                description: `${m.Year}/${m.Type}`,
                imdbID: m.imdbID,
                isFavourite: false
            }
        });

        this.prepareMovies(movies)
    }


    prepareMovies(movies) {
        document.querySelector('#movies').innerHTML = '';

        movies.forEach(movie => {
            const movie_card = document.createElement('movie-card');
            movie_card.setAttribute("title", movie.title);
            movie_card.setAttribute("poster", movie.poster);
            movie_card.innerHTML = movie.description;
            movie_card.setAttribute("isFavourite", movie.isFavourite);
            movie_card.setAttribute("imdbID", movie.imdbID);
            document.querySelector('#movies').append(movie_card)
        })

    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Screen();
})