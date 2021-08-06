class APIController {

    static clientId     = "d89b41b14fc24bacbd04e067f15f08b4";
    static clientSecret = "aeaaa94ae93a448c8e6722fe9b8b3f3b";
    static token        = "N/A"

    static async getToken() {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(APIController.clientId + ':' + APIController.clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        APIController.token = data.access_token;
        console.log(APIController.token);
    }

    static async getGenres() {
        console.log(APIController.token);
        const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + APIController.token}
        });

        const data = await result.json();
        console.log(data);
        return data.categories.items;       
    }

    static async getPlaylistByGenre(genreId) {
        const limit = 10;

        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + APIController.token}
        });

        const data = await result.json();
        return data.playlists.items;
    }

    static async getTracks(tracksEndPoint) {
        const limit = 15;

        const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + APIController.token}
        });

        const data = await result.json();
        return data.items;
    }

    toString() {
        console.log(`[This API is running with a secret of ${this.clientSecret}]`)
    }

}
APIController.token = APIController.getToken();

export { APIController }