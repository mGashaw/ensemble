            // <header class="page-header">
            //     <h1 class="page-header__title">Discover new music</h1>
            // </header>
            // <section class="grid-section">
            //     <header class="grid-section__header">
            //         <h2 class="grid-section__header--title">Recommended for you</h2><a
            //             class="grid-section__header--link" href="/discover/recommendations"><span>View all</span><svg
            //                 class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
            //                 <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
            //             </svg></a>
            //     </header>
            //     <ul class="grid-section__grid">
            //         <li>Nothing to display</li>
            //     </ul>
            // </section>
            // <section class="grid-section">
            //     <header class="grid-section__header">
            //         <h2 class="grid-section__header--title">Genres &amp; themes</h2><a
            //             class="grid-section__header--link" href="/discover/categories"><span>View all</span><svg
            //                 class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
            //                 <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
            //             </svg></a>
            //     </header>
            //     <ul class="grid-section__grid" id="genre-gallery">
                   

            //     </ul>
            // </section>

const frame = {
    discover: {
        parent: 'N/A',
        html: `
            <header class="page-header">
                <h1 class="page-header__title">Discover new music</h1>
            </header>
            <section class="grid-section">
                <header class="grid-section__header">
                    <h2 class="grid-section__header--title">Genres &amp; themes</h2><a>
                </header>
                <ul class="grid-section__grid" id="genre-gallery">
                   

                </ul>
            </section>`
    },
    dashboard: {
        parent: 'N/A',
        html: `
            <header class="page-header">
                <h1 class="page-header__title">Your music</h1>
            </header>
            <section class="card card-discover">
                <figure class="card__image"><img
                        src="https://newjams-images.scdn.co/image/ab676477000033ad/dt/v3/discover-weekly/aAbca4VNfzWuUCQ_FGiEFA==/bmVuZW5lbmVuZW5lbmVuZQ=="
                        alt="Discover Weekly" loading="lazy" width="300" height="300"><button class="play-btn"
                        aria-label="Play playlist" tabindex="-1"><svg class="MuiSvgIcon-root" focusable="false"
                            viewBox="0 0 24 24" aria-hidden="true">
                            <path class="svg-path" d="M8 5v14l11-7z"></path>
                        </svg><span>Play</span></button></figure>
                <div class="card__body"><span class="card__body--subtitle">playlist</span>
                    <h2 class="card__body--title"><a href="/playlist/37i9dQZEVXcXFQMxzBCStJ">Discover Weekly</a></h2>
                    <p class="card__body--desc">Your weekly mixtape of fresh music. Enjoy new music and deep cuts picked
                        for you. Updates every Monday.</p>
                    <p class="card__body--details">Made for Marcus by Spotify · 30 tracks</p>
                </div>
            </section>
            <section class="grid-section">
                <header class="grid-section__header">
                    <h2 class="grid-section__header--title">Recently played</h2>
                </header>
                <ul class="grid-section__grid" id="recentlyplayed-gallery">

                </ul>
            </section>
            <section class="grid-section">
                <header class="grid-section__header">
                    <h2 class="grid-section__header--title">Playlists</h2><a class="grid-section__header--link"
                        href="/dashboard/playlists"><span>View all</span><svg class="MuiSvgIcon-root" focusable="false"
                            viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                        </svg></a>
                </header>
                <ul class="grid-section__grid">
                </ul>
            </section>
            <section class="grid-section">
                <header class="grid-section__header">
                    <h2 class="grid-section__header--title">Followed artists</h2><a class="grid-section__header--link"
                        href="/dashboard/artists"><span>View all</span><svg class="MuiSvgIcon-root" focusable="false"
                            viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                        </svg></a>
                </header>
                <ul class="grid-section__grid">
                    <li>Nothing to display</li>
                </ul>
            </section>
            <section class="grid-section">
                <header class="grid-section__header">
                    <h2 class="grid-section__header--title">Saved albums</h2><a class="grid-section__header--link"
                        href="/dashboard/albums"><span>View all</span><svg class="MuiSvgIcon-root" focusable="false"
                            viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                        </svg></a>
                </header>
                <ul class="grid-section__grid">
                    <li>Nothing to display</li>
                </ul>
            </section>
        `
    },
    playlist: {
        parent: 'discover',
        html: `            
            <header class="page-header">
                <h1 class="page-header__title">Browse Playlists</h1>
            </header>
            <section class="grid-section">
                <header class="grid-section__header">
                    <h2 class="grid-section__header--title">Playlist</h2><a
                        class="grid-section__header--link" href="/discover/categories"><span>View all</span><svg
                            class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                        </svg></a>
                </header>
                <ul class="grid-section__grid" id="playlist-gallery">
                   

                </ul>
            </section> `
    },
    track: {
        parent: 'playlist',
        html: `            
            <header class="page-header">
                <h1 class="page-header__title" id="track-header">Songs</h1>
            </header>
            <section class="grid-section">
                <header class="grid-section__header">
                    <h2 class="grid-section__header--title">Songs</h2><a
                        class="grid-section__header--link" href="/discover/categories"><span>View all</span><svg
                            class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                        </svg></a>
                </header>
                <ul class="grid-section__grid" id="track-gallery">
                   

                </ul>
            </section> `
    }
}

export { frame }