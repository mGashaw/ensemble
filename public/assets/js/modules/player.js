
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
        await Player.spotify.connect("BQCJvqNZTszxC63hGkHHShtov2mXg_edPYEzVn4qd3t1shB-j28BihYQf8Ll3vDm_3FnVMVoqEEyiFmVT9Mx7z20VYk6uxVLyoiAsjAWHMGttHnwHkN2ctr27kX-e43zJCoPVQldir8gVu82H1X7Yr3G4pdnd2MmYLIjIga7XKw1PxuPB6J5W7Dt4zo");
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