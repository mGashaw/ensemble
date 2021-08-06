// <li class="card card-category"><a class="card__inner" aria-label="Top Lists"
//         href="/discover/categories/toplists">
//         <figure class="card__image"><img
//                 src="https://t.scdn.co/media/derived/toplists_11160599e6a04ac5d6f2757f5511778f_0_0_275_275.jpg"
//                 alt="Top Lists" loading="lazy" width="300" height="300"></figure>
//         <div class="card__body">
//             <h3 class="card__body--title">Top Lists</h3>
//         </div>
//     </a></li>

let isPlaying = false;
let playerStarted = false;

async function main() {
    let Module = await import('/assets/js/modules/api.js');
    const API = Module.APIController
    if (typeof API.token != "string") {
        console.log('we are waiting!')
        setTimeout(main, 1000);
        return;        
    }
    const genreData = await API.getGenres();
    genreData.forEach(genre => displayGenre(genre));

    const spotify = await import('/assets/js/modules/player.js');
    const player = spotify.Player
    player.setUp();
}
main();

function displayGenre(genre) {
    const gallery = document.querySelector("#genre-gallery");
    gallery.innerHTML += `
    <li class="card card-category"><a onclick="genreSelected('${genre.id}')" class="card__inner" aria-label="${genre.name}">
            <figure class="card__image"><img
                    src="${genre.icons[0].url}"
                    alt="${genre.name}" loading="lazy" width="300" height="300">
            </figure>
            <div class="card__body">
                <h3 class="card__body--title">${genre.name}</h3>
            </div>
        </a>
    </li>
    `;
}

function displayPlaylist(playlist) {
    const gallery = document.querySelector("#playlist-gallery");
    gallery.innerHTML += `
    <li class="card">
        <div class="card__inner">
            <figure class="card__image"><img
                    src="${playlist.images[0].url}"
                    alt="The Truth Hurts" loading="lazy" width="300" height="300"><button
                    class="play-btn" aria-label="Play track" tabindex="-1" onclick="playlistSelected('${encodeURIComponent(JSON.stringify(playlist))}')"><svg class="MuiSvgIcon-root"
                        focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8 5v14l11-7z"></path>
                    </svg><span>Play</span></button></figure>
            <div class="card__body">
                <h3 class="card__body--title">${playlist.name}</h3>
                <p class="card__body--desc">${playlist.description}</p>
            </div>
        </div>
    </li>
    `
}

function displayTrack(t) {

    const trackname = t.track.name;
    const trackImg = t.track.album.images[0].url;
    let artistNames = '';

    if(t.track.artists.length > 1) {
        t.track.artists.forEach((artist) => {
            artistNames += (artist.name + ", ");
        });
    } else {  
        artistNames = t.track.artists[0].name;
    }

    const gallery = document.querySelector("#track-gallery");
    gallery.innerHTML += `
    <li class="card">
        <div class="card__inner">
            <figure class="card__image"><img
                    src="${trackImg}"
                    alt="The Truth Hurts" loading="lazy" width="300" height="300"><button
                    class="play-btn" aria-label="Play track" tabindex="-1" onclick="trackSelected('${encodeURIComponent(JSON.stringify(t.track))}')"><svg class="MuiSvgIcon-root"
                        focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8 5v14l11-7z"></path>
                    </svg><span>Play</span></button></figure>
            <div class="card__body">
                <h3 class="card__body--title">${trackname}</h3>
                <p class="card__body--desc">${artistNames}</p>
            </div>
        </div>
    </li>
    `
    
}

async function genreSelected(genreId) {
    let dictionary = await import('/assets/js/modules/frames.js');
    let module = await import('/assets/js/modules/api.js');
    const frameDict = dictionary.frame;
    const API = module.APIController;

    const mainFrame = document.querySelector("#main-frame");
    mainFrame.innerHTML = frameDict.playlist.html;

    const playlistData = await API.getPlaylistByGenre(genreId);
    playlistData.forEach(playlist => displayPlaylist(playlist));    
}

async function playlistSelected(encodedPlaylist) {
    const playlist = JSON.parse(decodeURIComponent(encodedPlaylist));

    let dictionary = await import('/assets/js/modules/frames.js');
    let module = await import('/assets/js/modules/api.js');
    const frameDict = dictionary.frame;
    const API = module.APIController;

    const mainFrame = document.querySelector("#main-frame");
    mainFrame.innerHTML = frameDict.track.html; 
    
    document.querySelector("#track-header").innerHTML = `${playlist.name}`;
    
    const tracksData = await API.getTracks(playlist.tracks.href);
    tracksData.forEach(track => displayTrack(track));
}

async function trackSelected(ecodedTrackObj) {
    const track = JSON.parse(decodeURIComponent(ecodedTrackObj));
    const spotify = await import('/assets/js/modules/player.js');
    const player = spotify.Player
    player.playNewSong(track);

    isPlaying = true;
    playerStarted = true;
    console.log(track);
}

async function toggleMusic() {
    const spotify = await import('/assets/js/modules/player.js');
    const player = spotify.Player
    if (isPlaying) {
        player.pauseSong(); 
        document.querySelector('.toggle-play').firstElementChild.firstElementChild.setAttribute('d', 'M8 5v14l11-7z');
        //document.querySelector("#currently-playing__button").setAttribute('d', 'M6 19h4V5H6v14zm8-14v14h4V5h-4z');   
        isPlaying = false;   
    } else if (playerStarted) {
        console.log('playing');
        player.playSong();
        document.querySelector('.toggle-play').firstElementChild.firstElementChild.setAttribute('d', 'M6 19h4V5H6v14zm8-14v14h4V5h-4z');
        isPlaying = true;
    }
}
// CHECK CHECK CHECK! Next up! Player footer updates, add SignIn using google, add database to hold liked tracks!!!
