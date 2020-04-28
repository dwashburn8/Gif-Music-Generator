$(document).ready(function () {
  var search = $("#Music").val();
  var sweepSong = "";
  var timeElement = $(".currentTime");
  var sweepTime = $("#sweepTime")
  var secondsRemaining = 0;
  var sweepValueDiv = $("#sweepValue").val()
  $("#sweepGifDiv").hide()
  $("#sweepSongDiv").hide()
  $("#sweepShare").hide()


  $("#Music").keypress(function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      $("#musicButton").click();
    }
  });

  $("#musicButton").on("click", function (event) {
    event.preventDefault();
    if ($("#divC").children().length > 0) {
      $("#divC").slick("unslick");
      $("#divC").empty();
    }
    search = $("#Music").val();
    musicGrab();

    // $("#Music").val("");
    console.log(search);
  });

  $(".toggle-play").on("click", function () {
    song.trigger("play");
    isPlaying = true;
    var timeIntervalId = setInterval(function () {
      secondsRemaining++;
      timeElement.text("00:0" + secondsRemaining);
      $(".time").val(secondsRemaining);
      if (secondsRemaining === 7) {
        song.trigger("pause");
        isPlaying = false;
        clearInterval(timeIntervalId);
        secondsRemaining = 0;
      }
    }, 1000);

    console.log("playing...");
  });

  $("#sweep").on("click", function (event) {
    event.preventDefault();
    

   $("#sweepTitle").hide();
   $("#sweepGifDiv").show()
   $("#sweepSongDiv").show()
   $("#sweepShare").show()

  $("#sweepPlay").on("click", function (event) {
    event.preventDefault();
    song.prop("currentTime",0);
    song.trigger("play");
    isPlaying = true;
    var timeIntervalId = setInterval(function () {
      secondsRemaining++;
      sweepTime.text("00:0" + secondsRemaining);
      $("#sweepValue").val(secondsRemaining);
      if (secondsRemaining === 7) {
        clearInterval(timeIntervalId);
        secondsRemaining = 0;
        song.trigger("pause");
        isPlaying = false;
      }

     } , 1000);

  });

  // $("#sweepPause").on("click", function (event) {
  //   event.preventDefault();
  //   song.trigger("pause");
  //   isPlaying = false;
  // }); 

  });

  var isPlaying = false;
  var song = $("<audio>");
  $.get();





  function musicGrab() {
    var settings = {
      async: true,
      crossDomain: true,
      url: "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + search,
      method: "GET",
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "28fa3a645fmsh6347d64020ec954p186251jsn525605cce2a6",
      },
    };
    
    $.ajax(settings).then(function (response) {
      console.log(response);
      var musicData = response.data;
      for (let i = 0; i < musicData.length; i++) {
        console.log(response);
        var newTitle = $("<h4>");
        var newDiv = $("<div>");
        newDiv.attr("class", "has-text-centered");
        song.attr("src", musicData[i].preview);
        newTitle.attr("class", "has-text-white");
        // audioPlayer.attr("class", "play")
        var newImg = $("<img>");
        newImg.attr("class", "songClick")
        newTitle.text(musicData[i].title_short);
        newImg.attr("src", musicData[i].album.cover_medium);
        newImg.attr("name", musicData[i].preview);
        newDiv.append(newTitle);
        $("#divC").append(newDiv);
        newDiv.append(newImg);
        // $("#divC").append(audioPlayer);
      }

      $(".songClick").on("click", function (event) {
        $("#sweepSongDiv").empty()
       
        song.attr("src", event.target.name);
        var selectedSong = event.target.name;
        sweepSong = selectedSong;
        var sweepPlay = $("<button>");
        // var sweepPause= $("<button>");
        // sweepPause.attr("id", "sweepPause");
        sweepPlay.attr("id", "sweepPlay");
        sweepPlay.attr("class", "button is-primary has-text-black")
        // sweepPause.text("Pause");
        sweepPlay.text("Play");
        $("#sweepSongDiv").append(song);
        $("#sweepSongDiv").append(sweepPlay);
        // $("#sweepSongDiv").append(sweepPause);

        console.log(event.target);
      });

      // function makeSlider (){
      $("#divC").slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ],
      });
      // }
    });
  }


});
