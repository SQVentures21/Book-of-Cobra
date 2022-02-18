const SLOTS_PER_REEL = 12;
// radius = Math.round( ( panelWidth / 2) / Math.tan( Math.PI / SLOTS_PER_REEL ) );
// current settings give a value of 149, rounded to 150
const REEL_RADIUS = 280;

const timer = 4;

const matches = [10, 8, 7, 12, 11, 9, 3, 2, 6, 1, 5, 4];

function createSlots(ring) {
  var slotAngle = 360 / SLOTS_PER_REEL;

  var seed = getSeed();

  for (var i = 0; i < SLOTS_PER_REEL; i++) {
    var slot = document.createElement("div");

    slot.className = "slot";

    // compute and assign the transform for this slot
    var transform =
      "rotateX(" + slotAngle * i + "deg) translateZ(" + REEL_RADIUS + "px)";

    slot.style.transform = transform;

    // val = ((seed + i)%12) + 1; before

    val = (i % 12) + 1;
    spin(0);
    source = "./img1/image" + String(val) + ".png";
    // <img src="img_girl.jpg" >

    var content = $(slot).append('<img src="' + source + '" class = "images">');

    // add the poster to the row
    ring.append(slot);
  }
}

function getSeed(val = 0, previous = 0) {
  // generate random number smaller than 13 then floor it to settle between 0 and 12 inclusive
  return Math.floor(Math.random() * SLOTS_PER_REEL);
}
const modal1 = document.querySelector("#myModal1");
const modal2 = document.querySelector("#myModal2");
const modal3 = document.querySelector("#myModal3");
function getValue(value, randomNr, nr, i) {
  switch (value) {
    case 1:
      if (i === 2 || i === 3 || i === 4) {
        nr = randomNr;
        setTimeout(function () {
          modal2.style.display = "block";
        }, 5500);

        setTimeout(function () {
          modal2.style.display = "none";
        }, 9500);
      }
      break;
    case 2:
      nr = randomNr;
      setTimeout(function () {
        modal1.style.display = "block";
      }, 5500);

      setTimeout(function () {
        modal1.style.display = "none";
      }, 9500);

      break;

    default:
      break;
  }
  return nr;
}

async function spin(value) {
  let randomNr = Math.floor(Math.random() * 12);
  for (var i = 1; i < 7; i++) {
    var oldSeed = -1;
    var oldClass = $("#ring" + i).attr("class");
    if (oldClass.length > 5) {
      oldSeed = parseInt(oldClass.slice(10));
    }
    var seed = getSeed();
    while (oldSeed === seed) {
      seed = getSeed();
    }
    // let nr = seed;
    nr = getValue(value, randomNr, seed, i);
    if (nr === oldSeed) {
      if (oldSeed + 1 === 13) {
        nr = 1;
      } else {
        nr = oldSeed + 1;
      }
    }

    $("#ring" + i)
      .css(
        "animation",
        "back-spin 1s, spin-" + nr + " " + (timer + i * 0.2) + "s"
      )
      .attr("class", "ring spin-" + nr);
  }
  return true;
}

//https://stackoverflow.com/questions/1836105/how-to-wait-5-seconds-with-jquery
$.wait = function (callback, seconds) {
  return window.setTimeout(callback, seconds * 1000);
};

$(document).ready(function () {
  let count = 0;
  let totalValue = 0;
  let countRemain = 20;

  let income_matrix = [
    [2, 0, 1, 0, 2, 0, 1, 0, 0, 1, 0, 2, 0, 2, 0, 1, 0, 2, 0, 1],
    // [0, 2, 0, 1, 0, 2, 2, 0, 1, 0, 0, 1, 0, 1, 0, 2, 0, 0, 1, 0, 1, 0, 0, 0],
    // [2, 0, 0, 1, 0, 1, 0, 0, 0, 0, 2, 0, 1, 0, 2, 2, 0, 1, 0, 0, 1, 0, 1, 0],
    // [0, 2, 0, 1, 0, 2, 2, 0, 1, 0, 0, 1, 0, 1, 0, 2, 0, 0, 1, 0, 1, 0, 0, 0],
    // [0, 2, 0, 1, 0, 2, 2, 0, 1, 0, 0, 1, 0, 1, 0, 2, 0, 0, 1, 0, 1, 0, 0, 0],
    // [0, 2, 0, 1, 0, 2, 2, 0, 1, 0, 0, 1, 0, 1, 0, 2, 0, 0, 1, 0, 1, 0, 0, 0],
    // [0, 2, 0, 1, 0, 2, 2, 0, 1, 0, 0, 1, 0, 1, 0, 2, 0, 0, 1, 0, 1, 0, 0, 0],
    // [0, 2, 0, 1, 0, 2, 2, 0, 1, 0, 0, 1, 0, 1, 0, 2, 0, 0, 1, 0, 1, 0, 0, 0],
  ];
  let randomNr = Math.floor(Math.random() * income_matrix.length - 1);

  createSlots($("#ring1"));
  createSlots($("#ring2"));
  createSlots($("#ring3"));
  createSlots($("#ring4"));
  createSlots($("#ring5"));
  createSlots($("#ring6"));

  //const button = document.querySelector(".go");
  $(".test-shine").on("keypress click", function (e) {
    if (e.which === 13 || e.type === "click") {
      document.querySelector(".test-shine").style.pointerEvents = "none";
      if (count === 20) {
        modal3.style.display = "block";
      }
      // spin(income_matrix[randomNr][count]);

      spin(income_matrix[0][count]);
      // $.wait(function () {
      $("#credit").text(function () {
        // totalValue = income_matrix[randomNr][count] + totalValue;
        totalValue = income_matrix[0][count] + totalValue;
        return "WIN: " + String(totalValue) + " €";
        console.log(totalValue);
      });
      // }, 5);

      setTimeout(function () {
        document.querySelector(".test-shine").style.pointerEvents = "auto";
      }, 5000);

      $.wait(function () {
        $("#spinRemain").text(function () {
          countRemain = countRemain - 1;
          return "Free Spins:" + String(countRemain);
        });
      }, 5);

      count = count + 1;
    }
  });
});
