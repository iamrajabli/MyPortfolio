const movies = [{
        title: "The Man From Earth 1",
        description: `John üniversiteden ayrılıp, başka bir yere gitmeye karar vermiş, akademisyen arkadaşları da ona veda etmek için evine gelmişlerdir. Arkadaşları John'u kalması için ikna etmeye çalışırken, John büyük sırrını ortaya dökecek ve herkesi büyük bir şaşkınlığa sürükleyecekti`,
        poster: "https://i0.wp.com/teaser-trailer.com/wp-content/uploads/Boyka-Undisputed-4.jpg",
        isFavourite: true
    },
    {
        title: "The Man From Earth 2",
        description: `John üniversiteden ayrılıp, başka bir yere gitmeye karar vermiş, akademisyen arkadaşları da ona veda etmek için evine gelmişlerdir. Arkadaşları John'u kalması için ikna etmeye çalışırken, John büyük sırrını ortaya dökecek ve herkesi büyük bir şaşkınlığa sürükleyecekti`,
        poster: "https://i1.sndcdn.com/artworks-000063531234-0ugymf-t500x500.jpg",
        isFavourite: false
    },
    {
        title: "The Man From Earth 3",
        description: `John üniversiteden ayrılıp, başka bir yere gitmeye karar vermiş, akademisyen arkadaşları da ona veda etmek için evine gelmişlerdir. Arkadaşları John'u kalması için ikna etmeye çalışırken, John büyük sırrını ortaya dökecek ve herkesi büyük bir şaşkınlığa sürükleyecekti`,
        poster: "https://kungfukingdom.com/wp-content/uploads/2014/02/undisputed_2_featured_image.jpg",
        isFavourite: true
    }
];

const search_text = document.querySelector('.search_text');
search_text.addEventListener('keydown', event => {
    if (event.key == 'Enter') {
        searchMovie(search_text.value)

    }
});

async function searchMovie(value) {
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

    prepareMovies(movies)
}

function prepareMovies(movies) {
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

// prepareMovies(movies)