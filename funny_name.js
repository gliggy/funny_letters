var myName = "Leo";

var red = [0, 100, 63];
var orange = [40, 100, 60];
var green = [75, 100, 40];
var blue = [196, 77, 55];
var purple = [280, 50, 60];
var pink = [337, 100, 80];
var letterColors = [red, pink, purple];

var defaultName = "yay!";

function writeName() {
  var name = $("#namey").val() || defaultName;
  bubbleShape = $("#shapey").val(); //'heart'; // This should be a variable (heart or circle). //
  console.log("DRAWING", name, letterColors, bubbleShape);
  drawName(name, letterColors);
  bounceBubbles();
  $('#videoLink a').attr('href', 'https://gliggy.github.io/rect_in_lava/?name=' + name);
}

$("#namey").change(function(){
  writeName();
});

$("#shapey").change(function(){
  writeName();
});

var params = {};
if (location.search) {
    var parts = location.search.substring(1).split('&');

    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        nv[1] = nv[1].replace(/[^a-z]/i,'');
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

