var myName = "Leo";

var red = [0, 100, 63];
var orange = [40, 100, 60];
var green = [75, 100, 40];
var blue = [196, 77, 55];
var purple = [280, 50, 60];
var pink = [337, 100, 80];
var black = [0, 0, 0];
var white = [255, 255, 255];
var grey = [128, 128, 128];

// themes
var theme = document.getElementById("style").value; 
console.log(theme);
var rainbow = [red, orange, green, blue, purple];
var enby = [orange, white, purple, black];
var valentine = [red, pink, purple];
var trans = [blue, pink, white, pink, blue, white];
var ace = [black, grey, white, purple];
var letterColors = [];

if (theme == "rainbow") {
  letterColors = rainbow;
} else if (theme == "enby") {
  letterColors = enby;
} else if (theme == "valentine") {
  letterColors = valentine;
} else if (theme == "trans") {
  letterColors = trans;
} else {
  letterColors = [0, 0, 0];
}

var defaultName = "yay!";

function writeName(colors) {
  var name = $("#namey").val() || defaultName;
  if (colors == "rainbow") {
    colors = rainbow;
  } else if (colors == "enby") {
    colors = enby;
  } else if (colors == "valentine") {
    colors = valentine;
  } else if (colors == "trans") {
    colors = trans;
  } else {
    colors = rainbow;
  }
  bubbleShape = $("#shapey").val(); 
  //console.log("DRAWING", name, letterColors, bubbleShape);
  drawName(name, colors);
  bounceBubbles();
  //$('#videoLink a').attr('href', 'https://gliggy.github.io/rect_in_lava/?person=' + name);
}

$("#namey").change(function(){
  writeName(letterColors);
});

$("#shapey").change(function(){
  writeName(letterColors);
});

//$("#style").change(function(){
//  writeName(letterColors);
//});

/*
$("#style").live('change', function() {
  if ($(this).val() == 'rainbow'){
      writeName(rainbow);
  } else if ($(this).val() == 'enby') {
      writeName(enby);
  } else if ($(this).val() == 'trans') {
      writeName(trans);
  } else if ($(this).val() == 'valentine') {
      writeName(valentine);
  } else {
      writeName([0, 0, 0])
  }
}); */

$(document).ready(function() {
  $('#style').change(function() {
    var colors = ($(this).val());  
    writeName(colors);
  });
});

var params = {};
if (location.search) {
    var parts = location.search.substring(1).split('&');

    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        nv[1] = nv[1].replace(/[^a-z.]/i,'');
        nv[1] = nv[1].toLowerCase();
        params[nv[0]] = nv[1] || true;
    }
}
var person = params.person;
if (person) {
  defaultName = person;
  function go() {
    $("#namey").attr({placeholder: person});
    writeName(); 
    console.log("DRAWING NOW");
  }
  console.log("HELLO");
  setTimeout(go, 1000);
}

var paramColors = params.style;
if (paramColors) {
  letterColors = paramColors;
  function go() {
    $("#style").val(letterColors);
    writeName(letterColors);
    console.log(paramColors);
  }
  setTimeout(go, 1000);
}

//Daddy has a big nose, and it is very big!
