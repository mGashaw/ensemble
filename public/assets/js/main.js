// WELL DONE DAMN TEAM 7! Alright get that recently played and liked shit up and we rocking!!!
// Static Setup


const mainFrame = document.querySelector("#main-frame");
let GUser = null;

async function setupPlayer() {
    const spotify = await import('/assets/js/modules/player.js');
    const player = spotify.Player
    player.setUp();
}
window.onload = () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            document.querySelector('.user-settings__btn--name').innerHTML = user.displayName;
            document.querySelector('.user-settings__btn--img').firstElementChild.src = user.photoURL;
            GUser = user;
            dashboardLoader(user);
        } else {
            window.location.href = 'index.html';
        }
    })
    setupPlayer();
}

async function navbarClicked(button) {
    let dictionary = await import('/assets/js/modules/frames.js');
    const frameDict = dictionary.frame;
    if (button === 'discover') {
        document.querySelector('#main-frame').innerHTML = frameDict.discover.html; 
        discoverLoader();
    } else if (button === 'dashboard') {
        document.querySelector('#main-frame').innerHTML = frameDict.dashboard.html;
        dashboardLoader(GUser);
    } else if (button === 'favorites') {
        document.querySelector('#main-frame').innerHTML = frameDict.favorites.html;
        favoritesLoader();
    }
}

// Dasboard

async function dashboardLoader(user) {
    let module = await import('/assets/js/modules/data.js');
    const data = module.DataController;


    const dataRef = firebase.database().ref(`users/${user.uid}/recently-played`);
    dataRef.on('value', (snapshot) => {
        const data = snapshot.val();
        for (const key in data) {
            displayTrack(data[key].track, 'box');
        }
    });  



}

// Favorites

async function favoritesLoader() {
     let module = await import('/assets/js/modules/data.js');
    const data = module.DataController;

    const dataRef = firebase.database().ref(`users/${GUser.uid}/liked-tracks`);
    dataRef.on('value', (snapshot) => {
        const data = snapshot.val();
        for (const key in data) {
            displayTrack(data[key].track, 'rectangle', true);
            console.log(data[key].track);
        }
    });  
}

// Discover
let isPlaying = false;
let playerStarted = false;

async function discoverLoader() {
    let Module = await import('/assets/js/modules/api.js');
    const API = Module.APIController
    if (typeof API.token != "string") {
        console.log('we are waiting!')
        setTimeout(discoverLoader, 1000);
        return;        
    }
    const genreData = await API.getGenres();
    genreData.forEach(genre => displayGenre(genre));

}
discoverLoader();

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

function displayTrack(t, type, isFav) {

    const trackname = t.name;
    const trackImg = t.album.images[0].url;
    let artistNames = '';

    if(t.artists.length > 1) {
        t.artists.forEach((artist) => {
            artistNames += (artist.name + ", ");
        });
    } else {  
        artistNames = t.artists[0].name;
    }

    if (type == 'box') {
        const gallery = document.querySelector("#recentlyplayed-gallery");
        gallery.innerHTML += `
        <li class="card">
            <div class="card__inner">
                <figure class="card__image"><img
                        src="${trackImg}"
                        alt="The Truth Hurts" loading="lazy" width="300" height="300"><button
                        class="play-btn" aria-label="Play track" tabindex="-1" onclick="trackSelected('${encodeURIComponent(JSON.stringify(t))}')"><svg class="MuiSvgIcon-root"
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
    } else if (type == 'rectangle') {
        const gallery = (isFav) ? document.querySelector("#favorites-gallery") : document.querySelector("#track-gallery");
        //const gallery = document.querySelector("#track-gallery");
        gallery.innerHTML += `
            <li class="list-item track"><img src="${trackImg}"
                    alt="album cover" loading="lazy" width="300" height="300">
                <div class="list-item__body" onclick="trackSelected('${encodeURIComponent(JSON.stringify(t))}')">
                    <h2 class="list-item__body--title">${trackname}</h2>
                    <p class="list-item__body--desc">${artistNames}</p>
                </div>
                <button aria-label="Like" title="Like" type="button" onclick="likeTrack('${encodeURIComponent(JSON.stringify(t))}')" id="${t.id}">
                    <svg class="MuiSvgIcon-root" focusable="false"
                        viewBox="0 0 24 24" aria-hidden="true">
                        <path
                            d="M9.719,17.073l-6.562-6.51c-0.27-0.268-0.504-0.567-0.696-0.888C1.385,7.89,1.67,5.613,3.155,4.14c0.864-0.856,2.012-1.329,3.233-1.329c1.924,0,3.115,1.12,3.612,1.752c0.499-0.634,1.689-1.752,3.612-1.752c1.221,0,2.369,0.472,3.233,1.329c1.484,1.473,1.771,3.75,0.693,5.537c-0.19,0.32-0.425,0.618-0.695,0.887l-6.562,6.51C10.125,17.229,9.875,17.229,9.719,17.073 M6.388,3.61C5.379,3.61,4.431,4,3.717,4.707C2.495,5.92,2.259,7.794,3.145,9.265c0.158,0.265,0.351,0.51,0.574,0.731L10,16.228l6.281-6.232c0.224-0.221,0.416-0.466,0.573-0.729c0.887-1.472,0.651-3.346-0.571-4.56C15.57,4,14.621,3.61,13.612,3.61c-1.43,0-2.639,0.786-3.268,1.863c-0.154,0.264-0.536,0.264-0.69,0C9.029,4.397,7.82,3.61,6.388,3.61">
                        </path>
                    </svg>
                </button>
            </li>
        `
    }
    
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
    tracksData.forEach((t) => {
        displayTrack(t.track, 'rectangle');
    });
}

async function trackSelected(ecodedTrackObj) {
    const track = JSON.parse(decodeURIComponent(ecodedTrackObj));

    const spotify = await import('/assets/js/modules/player.js');
    const player = spotify.Player

    const dataModule = await import('/assets/js/modules/data.js');
    const data = dataModule.DataController;

    player.playNewSong(track);
    document.querySelector('.toggle-play').firstElementChild.firstElementChild.setAttribute('d', 'M6 19h4V5H6v14zm8-14v14h4V5h-4z');

    data.pushData(firebase, GUser, track, 'recently-played');

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

async function likeTrack(ecodedTrackObj) {
    const track = JSON.parse(decodeURIComponent(ecodedTrackObj));

    let module = await import('/assets/js/modules/data.js');
    const data = module.DataController;

    document.getElementById(track.id).firstElementChild.firstElementChild.setAttribute('d', 'M13.797 2.727a4.057 4.057 0 00-5.488-.253.558.558 0 01-.31.112.531.531 0 01-.311-.112 4.054 4.054 0 00-5.487.253c-.77.77-1.194 1.794-1.194 2.883s.424 2.113 1.168 2.855l4.462 5.223a1.791 1.791 0 002.726 0l4.435-5.195a4.052 4.052 0 001.195-2.883 4.057 4.057 0 00-1.196-2.883z');
    document.getElementById(track.id).firstElementChild.firstElementChild.setAttribute('fill', 'red');

    data.pushData(firebase, GUser, track, 'liked-tracks')
}
// CHECK CHECK CHECK! Next up! Player footer updates, add SignIn using google, add database to hold liked tracks!!!
