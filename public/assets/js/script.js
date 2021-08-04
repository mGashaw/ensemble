// import request from './request';

// // Element selectors
// const playBtn = document.querySelector(".play-btn");
// console.log(playBtn);

// playBtn.addEventListener("click", () => {
//     console.log('Button clicked!');
//     let access_token = req.cookies['access_token'];
//     var options = {
//         url: 'https://api.spotify.com/v1/me/player/play',
//         headers: { 'Authorization': 'Bearer ' + access_token },
//         json: true
//     };
//     request.put(options, function (error, response, body) {
//         console.log(body);
//     });
// });

const playBtn = document.querySelector(".play-btn");

playBtn.addEventListener("click", () => {
    const x = document.querySelector(".svg-path");

    const svg_path = x.getAttribute("d") == 'M8 5v14l11-7z' ? 'M6 19h4V5H6v14zm8-14v14h4V5h-4z' : 'M8 5v14l11-7z';

    x.setAttribute("d", svg_path);

});