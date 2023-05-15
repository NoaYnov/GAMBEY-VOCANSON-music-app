var client_id = 'daec6d9a79f942dd8c6aa6f1e01864a2';
var client_secret = '2ea349c16553457fb31a3dfccb8d9a53';
var Token;
var Data

// var authOptions = {
//   url: 'https://accounts.spotify.com/api/token',
//   headers: {
//     'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
//   },
//   form: {
//     grant_type: 'client_credentials'
//   },
//   json: true
// };

// request.post(authOptions, function(error, response, body) {
//   if (!error && response.statusCode === 200) {
//     var token = body.access_token;
//   }
// });


async function SpotifyAuthentification() {
  let token = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
          "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
  })
  .then(response => response.json())
  .then(data => {
    Token = data;
    console.log(Token);
  })
  .catch(error => console.log(error));

}

async function GetTracks(searchTerm) {
  console.log(Token);
  return await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
      method: "GET",
      headers: {
          authorization: `Bearer ${Token.access_token}`
      }
  })
      .then(response => {   
        return response.json();
      })
      .then(data => {
        Data = data;
        console.log(Data);
      })
      .catch(error => console.log(error));
}
SpotifyAuthentification();