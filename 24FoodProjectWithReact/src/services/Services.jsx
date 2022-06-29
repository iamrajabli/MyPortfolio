export default class Services {

    getMethod = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${res.url}`);
        }

        return await res.json();
    }

    postMethod = async (url, data) => {
        const conf = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        const res = await fetch(url, conf);

        if (!res.ok) {
            throw new Error(`Could not fetch ${res.url}`);
        }
        
        return await res.json();
    }

}
