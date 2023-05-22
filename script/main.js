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
    // console.log(Token);
  })
  .catch(error => console.log(error));

}

async function GetArtists(searchTerm) {
  return await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=artist`, {
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
        console.log(Data.artists.items[0]);
        Dropdown(Data);
        // console.log(Data.tracks)
      })
      .catch(error => console.log(error));
}

String.prototype.replaceAt = function(index, replacement) {
  return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

String.prototype.Capitalize = function() {
  return this.replaceAt(0, this.charAt(0).toUpperCase());
}

function GetInput() {
  const input = document.querySelector("#input");
  if (input.value == "") {
    console.log("No input");
    for (let i = 0; i < Drp.length; i++) {
      Drp[i].style.display = "none";
    }
  }
  else{
    let result = input.value
    
    result = result.Capitalize();
    // console.log(result);
    
    GetArtists(result);
  }
}


function Dropdown(Data) {
  Drp = document.getElementsByClassName("drp");
  for (let i = 0; i < Drp.length; i++) {
    Drp[i].style.display = "flex";
  }
  var dropdown;
  for (let i = 0; i < 5; i++) {
    console.log(Data.artists.items[i].name);
    dropdown = document.querySelector("#drp"+(i+1));
    dropdown.innerHTML = Data.artists.items[i].name
    dropdown.myParams = Data.artists.items[i];
    dropdown.addEventListener("click", Details);

  }
}

var affiche = []
function Details(e) {
  let details = document.querySelector(".details");
  let Data = e.target.myParams;
  if (affiche.includes(Data.name)) {
    return
  }
  affiche.push(Data.name);
  index = affiche.indexOf(Data.name)
  console.log(index)
  let html = "<div id=\"player\"><figure><figcaption>"+Data.name+"</figcaption><audio controls src=\""+Data.preview_url+"\"></audio></figure><div id=\"close\" onclick=\"Close(this)\">X</div></div>`";
  details.innerHTML += html
  `
  <div id="player">
    <figure>
      <figcaption>${Data.name}</figcaption>
      <audio
          controls
          src="${Data.preview_url}">
      </audio>
    </figure>
    <div id="close" onclick="Close(this,Data,index)">
    X
    </div>
    </div>`;
    
}

function Close(e) {
  e.parentNode.remove();
  let name = e.parentNode.firstChild.firstChild.innerHTML
  
  affiche.splice(affiche.indexOf(name),1);
  console.log(affiche.indexOf(name))
  console.log(affiche)
}



SpotifyAuthentification();

