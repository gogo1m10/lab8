const express = require("express");
const app = express();

// you can optionally use handlebars
app.set("view engine", "ejs");
app.use(express.static("public")); //access images, css, js

// enable use of json
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.get("/", function(req, res){
    res.render("index");
});

app.get("/results", function(req, res) {
  function rightAnswer(index, points) {
    $(`#q${index}Feedback`).html("Correct!");
    $(`#q${index}Feedback`).attr("class", "bg-success text-white");
    $(`#markImg${index}`).html("<img src='img/checkmark.png' alt='checkmark'>");
    score += points;
  }

  function wrongAnswer(index) {
    $(`#q${index}Feedback`).html("Incorrect!");
    $(`#q${index}Feedback`).attr("class", "bg-warning text-white");
    $(`#markImg${index}`).html("<img src='img/xmark.png' alt='xmark'>");
  }

  let q1 = $("#q1").val().toLowerCase();
  let q2 = $("#q2").val();
  let q4 = $("input[name=q4]:checked").val();
  let q6 = $("input[type='date']").val();
  let q7 = $("input[type='number']").val();
  let q81 = $("input[name=color1]").val();
  let q82 = $("input[name=color2]").val();
  let q83 = $("input[name=color3]").val();
  let listColors = ["#ffffff", "#ff0000", "#0000ff"];
  var score = 0;

  // Question 1
  if (q1 == "sacramento") {
    rightAnswer(1, 20);
  } else {
    wrongAnswer(1);
  }

  // Question 2
  if (q2 == "mo") {
    rightAnswer(2, 20);
  } else {
    wrongAnswer(2);
  }

  // Question 3
  if ($("#Jefferson").is(":checked") && $("#Roosevelt").is(":checked") && !$("#Jackson").is(":checked") && !$("#Franklin").is(":checked")) {
    rightAnswer(3, 20);
  } else {
    wrongAnswer(3);
  }

  // Question 4
  if (q4 == "Rhode Island") {
    rightAnswer(4, 20);
  } else {
    wrongAnswer(4);
  }

  // Question 5
  if ($("#seal2").css("background-color") == "rgb(255, 255, 0)") {
    rightAnswer(5, 20);
  } else {
    wrongAnswer(5);
  }

  // Question 6
  if (q6 == "1776-08-04") {
    rightAnswer(6, 12.5);
  } else {
    wrongAnswer(6);
  }

  // Question 7
  if (q7 == 45) {
    rightAnswer(7, 12.5);
  } else {
    wrongAnswer(7);
  }

  // Question 8
  let nbColors = 0;
  for (let i = 0; i < 3; i++)
  {
    if (q81 == listColors[i] || q82 == listColors[i] || q83 == listColors[i])
      nbColors++;
  }
  if (nbColors == 3) {
    rightAnswer(8, 12.5);
  } else {
    wrongAnswer(8);
  }

  ("#totalScore").html(`Total Score: ${score}`);

  if (score < 80)
  {
    $("#totalScore").each(function() {
      this.style.setProperty("color", "rgb(255, 0, 0)", "important");
    });
  }
  else
  {
    $("#totalScore").each(function() {
      this.style.setProperty("color", "rgb(0, 255, 0)", "important");
    });
  }
  if (score > 80)
    $("#congratulations").html("Congrats, that's an awesome score!");

});

// running server
app.listen(process.en.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});
