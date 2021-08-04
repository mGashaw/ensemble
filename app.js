var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = 'fe614bda22424dd49eaef4022c4c8568'; // Your client id
var client_secret = '2dccded21d2c42928fb66e7de6a30fea'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/public'))
    .use(cors())
    .use(cookieParser());

app.get('/login', function (req, res) {

    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    var scope = 'user-read-recently-played user-read-playback-state user-top-read playlist-modify-public user-modify-playback-state playlist-modify-private user-follow-modify  user-read-currently-playing user-follow-read playlist-read-private user-read-playback-position user-library-modify user-read-private user-read-email user-library-read playlist-read-collaborative streaming';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});

app.get('/callback', function (req, res) {

    // your application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                console.log(body)

                var access_token = body.access_token,
                    refresh_token = body.refresh_token;

                res.cookie('access_token', access_token);
                res.cookie('refresh_token', refresh_token);

                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };

                var options2 = {
                    url: 'https://api.spotify.com/v1/me/player/recently-played',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options2, function (error, response, body) {
                    // console.log(body.items[0].track);
                    const track = body.items[0].track;
                    const image = track.album.images[0];
                    const trackName = track.artists[0].name;
                    console.log(image);
                    console.log(trackName);
                });

                // we can also pass the token to the browser to make requests from there
                // res.redirect('/#' +
                //     querystring.stringify({
                //         access_token: access_token,
                //         refresh_token: refresh_token
                //     }));

                res.redirect('/dashboard.html');


            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
});

app.get('/dashboard.html', function (req, res) {
    // const access_token = 'BQAHdQXGRIsI9EzoJ17B2a7CGXHk7V4ajTF5PCWsU9VvZNO3vqDIu8VVqB137BOtKeQkZ0037VlwhooiVpwz2ORchorlv8XHCzFMLXJvIB_uA11BRwH_BSa57xIqglfWU6qN0Jeq70Io8R44ewaAiaP8YP8Qq-i0np9aJ3Rloq7h5j3Ku8gYI9od2kJ47cRTz5xi7W82kHRG25dwfg3qmlFxNAQP9pR606PYPYHyr0i5O5_e3pJ2T22RoL-cQyW2O3dXgNG4CRu_V4P7B_dvlNE2DG08D8rzjXYCBZnmOZ7t62s';
    // console.log(access_token);

    // var options = {
    //     url: 'https://api.spotify.com/v1/me/player/recently-played',
    //     headers: { 'Authorization': 'Bearer ' + access_token },
    //     json: true
    // };

    // request.get(options, function (error, response, body) {
    //     console.log(body);
    // });
    console.log("it works!");
});


console.log('Listening on 8888');
app.listen(8888);