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
    
    
  }
]    

var characterIndexArray = [];


loadPage();

function loadPage(){
  
  //create tabs by looping through characters array
  var i;
  for (i = 0; i < characters.length; i++) { 
    $('.nav-tabs').append(" <li class='nav-item nav-character' onclick='showGiphy(" + i +")'>  <a class='nav-link' href='#'>" + characters[i].name + "</a> </li>" );
    generateQueryURL(i);
    
  }
  $('.nav-tabs').append('<li class="nav-item nav-addd"> <a class="nav-link nav-add" href="#"> +  </a>');
  $('.nav-tabs').append('<form class="form-inline" style="display: none"> <input class="form-control mr-sm-2 form-control-sm" type="search" placeholder="Search" id="search" aria-label="Search"> <button class="btn btn-sm btn-outline-secondary my-2 my-sm-0" id="search-button" type="submit">Search</button> </form></li>');
  
}

function generateQueryURL(characterIndex){
  console.log(characterIndex);
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + "RFJGAvH4YDbVtysNfscTPM6Vj0PJeDF1" + "&q=" + characters[characterIndex].name + "&limit=25&offset=0&rating=G&lang=en";
  //save to array
  characters[characterIndex].queryURL = queryURL
}

$( ".nav-tabs" ).click(function(event) {
  event.preventDefault()
  
});

//on click of add show search
$( ".nav-add" ).click(function() {
  $( ".form-inline" ).toggle();
});


$("#search-button").click(function() {
  //save what customer searched 
  var input = $("#search").val();
  //add customer search to array
  characters.push({'name': input, giphyResponse: {}} );
  
  //update characterIndex 
  characterIndex = characters.length -1;
  console.log(characterIndex);
  
  generateQueryURL(characterIndex);
  
  $( ".nav-addd" ).before( "<li class='nav-item nav-character' onclick='showGiphy(" + characterIndex +")'>  <a class='nav-link' href='#'>" + characters[characterIndex].name + "</a> </li>" );
  
  
  showGiphy(characterIndex);
 
});





var currentIndex = null



function showGiphy(characterIndex){
  currentIndex = characterIndex;
  console.log(characterIndex);
  console.log(characters[characterIndex].queryURL)
  //only make ajax call if giphyResponse doesn't already exist
  if (!characters[characterIndex].giphyResponse.data) {
    //clear any existing gifs
    $('.card-columns').html("");
    $.ajax({
      //use saved queryurl for character
      url: characters[characterIndex].queryURL,
      method: "GET"
    }).then(function(response) {
      //save response 
      characters[characterIndex].giphyResponse = response
      for (j = 0; j < 10; j++) {
        $('.card-columns').append('<div class="card"> <img src="' + characters[characterIndex].giphyResponse.data[j].images.fixed_width_still.url + '" class="gif card-img-top" data-state="still" data-img-id="'+j+'" data-character="'+characterIndex+'"></div>');
      }
      bindGifs();
    });
  }
  else { 
    $('.card-columns').html("");
    for (j = 0; j < 10; j++) {
      if (characters[characterIndex].giphyResponse.data[j].images) {
        $('.card-columns').append('<div class="card"> <img src="' + characters[characterIndex].giphyResponse.data[j].images.fixed_width_still.url + '" class="gif card-img-top" data-state="still" data-img-id="'+j+'" data-character="'+characterIndex+'"></div>');
      }
    }
    bindGifs();
  }
  showLoadMore();

}

var loadMore = document.getElementById('load-more')

function showLoadMore() {
  console.log('show load more handler');
  loadMore.style.visibility='visible';

}
function generateQueryURLMore(){
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + "RFJGAvH4YDbVtysNfscTPM6Vj0PJeDF1" + "&q=" + characters[characterIndex].name + "&limit=25&offset=9&rating=G&lang=en";
  //save to array
  characters[characterIndex].queryURL = queryURL
  console.log(queryURL);

}

//how do i keep track of characterindex?
  $( "#load-more" ).click(function() {
    //load next ten from array
    if (characters[currentIndex].giphyResponse.data[9]){
      for (j = 9; j < 20; j++) {
      $('.card-columns').append('<div class="card"> <img src="' + characters[currentIndex].giphyResponse.data[j].images.fixed_width_still.url + '" class="gif card-img-top" data-state="still" data-img-id="'+j+'" data-character="'+currentIndex+'"></div>');
      }
      bindGifs();
    }
  });


  


//on click of gif play gif
function bindGifs(){
  $('.gif').off();
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


;