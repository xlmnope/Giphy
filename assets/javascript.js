const characters = [
  {
    name: "Big Bird",
    giphyResponse: {},
  },
  {
    name: "Cookie Monster",
    giphyResponse: {},

    
  },  
  {
    name: "Elmo",
    giphyResponse: {},

    
  },    
]



//convert without spaces and all lowercase for API??



loadPage();

function loadPage(){
  
  //create tabs by looping through characters array
  var i;
  for (i = 0; i < characters.length; i++) { 
    $('.nav-tabs').append(" <li class='nav-item nav-character' onclick='showGiphy(" + i +")'>  <a class='nav-link' href='#'>" + characters[i].name + "</a> </li>" );
    generateQueryURL(i);
    
  }
  $('.nav-tabs').append('<li class="nav-item"> <a class="nav-link nav-add" href="#"> +  </a>');
  $('.nav-tabs').append('<form class="form-inline" style="display: none"> <input class="form-control mr-sm-2 form-control-sm" type="search" placeholder="Search" id="search" aria-label="Search"> <button class="btn btn-sm btn-outline-secondary my-2 my-sm-0" id="search-button" type="submit">Search</button> </form></li>');
  
}

function generateQueryURL(characterIndex){
  console.log(characterIndex);
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + "RFJGAvH4YDbVtysNfscTPM6Vj0PJeDF1" + "&q=" + characters[characterIndex].name + "&limit=25&offset=0&rating=G&lang=en";
  //save to array
  characters[characterIndex].queryURL = queryURL
}


//on click of add show search
$( ".nav-add" ).click(function() {
  $( ".form-inline" ).toggle();
});

$("#search-button").click(function() {
  //save what customer searched 
  var input = $("#search").val();
  //add customer search to array
  characters.push(input);
  characterIndex = characters.last();
  console.log(characterIndex);
  $.ajax({
    //use saved queryurl for character
    url: characters[characterIndex].queryURL,
    method: "GET"
  }).then(function(response) {
    //save response 
    characters[characterIndex].giphyResponse = response
    for (j = 0; j < 10; j++) {
      $('.giphys').append('<img src="' + characters[characterIndex].giphyResponse.data[j].images.fixed_width_still.url + '" class="gif" data-state="still" id="'+ characters[characterIndex].name + j+'" >');
  }
  });
});









function showGiphy(characterIndex){
  console.log(characterIndex);
  console.log(characters[characterIndex].queryURL)
  //only make ajax call if giphyResponse doesn't already exist
  if (!characters[characterIndex].giphyResponse.data) {
    $.ajax({
      //use saved queryurl for character
      url: characters[characterIndex].queryURL,
      method: "GET"
    }).then(function(response) {
      //save response 
      characters[characterIndex].giphyResponse = response
      for (j = 0; j < 10; j++) {
        $('.giphys').append('<img src="' + characters[characterIndex].giphyResponse.data[j].images.fixed_width_still.url + '" class="gif" data-state="still" data-img-id="'+j+'" data-character="'+characterIndex+'">');
      }
      bindGifs();
    });
  }
}

  


//on click of gif play gif
function bindGifs(){
  $(".gif").click(function() {
    var state = $(this).attr("data-state");
    var characterNumber = $(this).attr("data-character");
      var imgNumber = $(this).attr("data-img-id");
    if (state == 'still') {
      var animatedUrl = characters[characterNumber].giphyResponse.data[imgNumber].images.fixed_width.url;
      $(this).attr("src", animatedUrl);
      $(this).attr("data-state", "animate");
  }
    if (state == 'animate') {
    var stillURL = characters[characterNumber].giphyResponse.data[imgNumber].images.fixed_width_still.url
    $(this).attr("src", stillURL);
    state == 'animate'
  }
  });
}


function showMoreGifs(){
  // show ten gifs under the current ten giphs
};

function showlearnMore(){
  //show rating
  //show other metatdata
  
}