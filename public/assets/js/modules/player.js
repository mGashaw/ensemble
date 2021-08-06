
import SpotifyPlayer from 'https://esm.sh/spotify-web-playback';
// import SpotifyPlayer from '/node_modules/spotify-web-playback';

// Local functions
function getArtists(track) {
    let artistNames = '';
    if(track.artists.length > 1) {
        track.artists.forEach((artist) => {
            artistNames += (artist.name + ", ");
        });
    } else {  
        artistNames = track.artists[0].name;
    }
    return artistNames
}

class Player {

    static spotify = new SpotifyPlayer()

    static async setUp() {
        console.log(Player.spotify)
        await Player.spotify.connect("BQCCSLMY8JEC8CQr5LMinGRsmCSOgXBwo6qw2V02OK-euP96lV4DWgkVHGtb9CMDhNdBUeV5mxky5kofdGNog0-4aeQNRuSsmWg_nNGVDac9fL7oyaNc2wi5xm4BQF9Y7S_GHKa8tOFDHR-lw9DEkvnlHYOhhGROtkk1mjmKfUiYFr24iup7Jqqe3jk");
    }

    static playNewSong(track) {
        const artistNames = getArtists(track);
        console.log(artistNames);
        document.querySelector(".currently-playing__cover").src = track.album.images[0].url;
        document.querySelector(".currently-playing__details--track").innerHTML = track.name;
        document.querySelector(".currently-playing__details--artist").innerHTML = getArtists(track);
        Player.spotify.play(track.uri);
    }

    static pauseSong() {
        Player.spotify.pause();
    }

    static playSong() {
        Player.spotify.play();
    }

}

export { Player }