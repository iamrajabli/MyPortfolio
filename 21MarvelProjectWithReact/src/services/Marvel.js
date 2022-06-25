export default class Marvel {
    _baseKey = 'bc0cfbc6138a38d065994132514104f0';
    _offset = 210;

    getResources = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
           throw new Error(`Could not fetch ${res.status}`)
        }

        return await res.json();
    }


    getAllCharacters = async (offset = this._offset) => {
        const res = await this.getResources(`https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=${offset}&apikey=${this._baseKey}`);

        return res.data.results.map(item => this.getTransform(item));
    }

    getCharacter = async (id) => {
        const res = await this.getResources(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=${this._baseKey}`)
        return this.getTransform(res.data.results[0])
    }


    getTransform = (item) => {
        return {
            "id": item.id,
            "name": item.name,
            "description": (item.description === '') ? 'This is good hero' : item.description,
            "thumbnail": item.thumbnail.path + '.' + item.thumbnail.extension
        }
    }
}