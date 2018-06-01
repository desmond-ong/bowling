var BrowserDetect = {
  init: function () {
    this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
    this.version = this.searchVersion(navigator.userAgent)
      || this.searchVersion(navigator.appVersion)
      || "an unknown version";
    this.OS = this.searchString(this.dataOS) || "an unknown OS";
  },
  searchString: function (data) {
    for (var i=0;i<data.length;i++) {
      var dataString = data[i].string;
      var dataProp = data[i].prop;
      this.versionSearchString = data[i].versionSearch || data[i].identity;
      if (dataString) {
        if (dataString.indexOf(data[i].subString) != -1)
          return data[i].identity;
      }
      else if (dataProp)
        return data[i].identity;
    }
  },
  searchVersion: function (dataString) {
    var index = dataString.indexOf(this.versionSearchString);
    if (index == -1) return;
    return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
  },
  dataBrowser: [
    {
      string: navigator.userAgent,
      subString: "Chrome",
      identity: "Chrome"
    },
    {   string: navigator.userAgent,
      subString: "OmniWeb",
      versionSearch: "OmniWeb/",
      identity: "OmniWeb"
    },
    {
      string: navigator.vendor,
      subString: "Apple",
      identity: "Safari",
      versionSearch: "Version"
    },
    {
      prop: window.opera,
      identity: "Opera",
      versionSearch: "Version"
    },
    {
      string: navigator.vendor,
      subString: "iCab",
      identity: "iCab"
    },
    {
      string: navigator.vendor,
      subString: "KDE",
      identity: "Konqueror"
    },
    {
      string: navigator.userAgent,
      subString: "Firefox",
      identity: "Firefox"
    },
    {
      string: navigator.vendor,
      subString: "Camino",
      identity: "Camino"
    },
    {   // for newer Netscapes (6+)
      string: navigator.userAgent,
      subString: "Netscape",
      identity: "Netscape"
    },
    {
      string: navigator.userAgent,
      subString: "MSIE",
      identity: "Explorer",
      versionSearch: "MSIE"
    },
    {
      string: navigator.userAgent,
      subString: "Gecko",
      identity: "Mozilla",
      versionSearch: "rv"
    },
    {     // for older Netscapes (4-)
      string: navigator.userAgent,
      subString: "Mozilla",
      identity: "Netscape",
      versionSearch: "Mozilla"
    }
  ],
  dataOS : [
    {
      string: navigator.platform,
      subString: "Win",
      identity: "Windows"
    },
    {
      string: navigator.platform,
      subString: "Mac",
      identity: "Mac"
    },
    {
         string: navigator.userAgent,
         subString: "iPhone",
         identity: "iPhone/iPod"
      },
    {
      string: navigator.platform,
      subString: "Linux",
      identity: "Linux"
    }
  ]

};
BrowserDetect.init();

/*
showSlide(id)
Displays each slide
*/

function showSlide(id) {
  $(".slide").hide();
  $("#"+id).show();
}

/*
random(a,b)
Returns random number between a and b, inclusive
*/

function random(a,b) {
  if (typeof b == "undefined") {
    a = a || 2;
    return Math.floor(Math.random()*a);
  } else {
    return Math.floor(Math.random()*(b-a+1)) + a;
  }
}


/*
Array.prototype.random
Randomly shuffles elements in an array. Useful for condition randomization.
*/

Array.prototype.random = function() {
  return this[random(this.length)];
};

/*
Produces an array with numbers 0~arrLength
in random order. Kind of spurious--use
Array.prototype.random instead
*/

function shuffledArray(arrLength)
{
  var j, tmp;
  var arr = new Array(arrLength);
  for (i = 0; i < arrLength; i++)
  {
    arr[i] = i;
  }
  for (i = 0; i < arrLength-1; i++)
  {
    j = Math.floor((Math.random() * (arrLength - 1 - i)) + 0.99) + i;
    tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

/*
Gets the value of the checked radio button
*/

function getRadioCheckedValue(formNum, radio_name)
{
   var oRadio = document.forms[formNum].elements[radio_name];
   for(var i = 0; i < oRadio.length; i++)
   {
      if(oRadio[i].checked)
      {
         return oRadio[i].value;
      }
   }
   return '';
}

function setQuestion(array) {
    var i = random(0, array.length - 1);
    var q = array[i];
    return q;
}


/* 
Clears value from form
*/

function clearForm(oForm) {
    
  var elements = oForm.elements;
    
  oForm.reset();

  for(i=0; i<elements.length; i++) {
      
	field_type = elements[i].type.toLowerCase();
	
	switch(field_type) {
	
		case "text":
		case "password":
		case "textarea":
          case "hidden":

      elements[i].value = "";
			break;
        
		case "radio":
		case "checkbox":
      if (elements[i].checked) {
            elements[i].checked = false;
			}
			break;

		case "select-one":
		case "select-multi":
              elements[i].selectedIndex = -1;
			break;

		default:
			break;
	}
    }
}


// function setupSlider(sliderName, hiddenSliderName) {
//       sliderString = "#" + sliderName;
//       $(sliderString).slider({
//         // animate: true,
//         max: 100 , min: 0, step: 1, value: 50,
//         create: function( event, ui ) {
//           $(sliderString + " .ui-slider-handle").hide();
//         },
        
//         slide: function(sS) {
//           return function( event, ui ) {
//             $(sS + " .ui-slider-handle").show();
//             $(sS + " .ui-slider-handle").css({
//               "background":"#E0F5FF",
//               "border-color": "#001F29"
//             });
//           }; // end return function
//         }(sliderString),
//         change: function(hSN, sS) {
//           return function( event, ui ) {
//             $('#' + hSN).attr('value', ui.value);
//             $(sS).css({"background":"#99D6EB"});
//             $(sS + " .ui-slider-handle").css({
//               "background":"#667D94",
//               "border-color": "#001F29"
//             }); // end .css
//           } // end return function
//         }(hiddenSliderName, sliderString)
//       }); // end sliderString.slider({})
// }






// Input Data for the wheel



var allConditions = [
[
{"movieID":1, "name1": "Cookie Monster", "name2": "Elmo", "movieName":"Bowl"}//,
//{"movieID":2, "name1": "Sally", "name2": "Anne", "movieName":"Drop"}
],
[
{"condition":2}
]
];






/* Experimental Variables */
// Number of conditions in experiment
//var numConditions = 1; //allConditions.length;

// Randomly select a condition number for this particular participant
//var chooseCondition = 1; // random(0, numConditions-1);

// Based on condition number, choose set of input (trials)
//var allTrialOrders = allConditions[chooseCondition-1];

// Number of trials in each condition
var numTrials = 1; //not necessarily allTrialOrders.length;

// Produce random order in which the trials will occur
//var shuffledOrder = shuffledArray(allTrialOrders.length);

var shuffledOrder;
if(Math.round(Math.random())){
  shuffledOrder = [0,1];
} else {
  shuffledOrder = [1,0];
}

// Keep track of current trial
var currentTrialNum = 0;

// A variable special for this experiment because we're randomly
// choosing word orders as well
// var wordOrder = 100;
//var trial;

// Keep track of how many trials have been completed
var numComplete = 0;



/*
Show the instructions slide — this is what we want subjects to see first.
*/

if (BrowserDetect.browser != 'Chrome' && BrowserDetect.browser != 'Safari' && BrowserDetect.browser != 'Firefox') {
    alert ("Warning: We have not tested this HIT with your browser. We recommend Chrome, Firefox or Safari");
    $("#startButton").attr("disabled", "disabled");
}

$("#progressBar").hide();
showSlide("instructions");


// Updates the progress bar
$("#trial-num").html(numComplete);
$("#total-num").html(numTrials);

// setupSlider('slider1', 'hiddenSliderValue1');

/*
The actual variable that will be returned to MTurk. The experiment object with various variables that you want to keep track of and return as results.

More practically, you should stick everything in an object and submit that whole object so that you don’t lose data (e.g. randomization parameters, what condition the subject is in, etc). Don’t worry about the fact that some of the object properties are functions — mmturkey (the Turk submission library) will strip these out.
*/

var experiment = {

/*
Parameters for this sequence.
*/
  movieName1: "",
  movieName2: "",
  startTime: 0,
  endTime: 0,

  // forcedHappyArray: new Array(numTrials),
  // forcedHappyFreeResponseArray: new Array(numTrials),

  // attentionCheck1Array: new Array(numTrials),
  // attentionCheck2Array: new Array(numTrials),
  // reactionTimeArray: new Array(numTrials),
  showJustInFirst: Math.round(Math.random()), // 1 if the Just In goes first

  happyAtPause1: NaN,
  betterAfter1: NaN,
  deltaHappy1: NaN,

  happyAtPause2: NaN,
  betterAfter2: NaN,
  deltaHappy2: NaN,

  happyAtPauseJustIn: NaN,
  betterAfterJustIn: NaN,
  deltaHappyJustIn: NaN,

  happyAtPauseJustMissed: NaN,
  betterAfterJustMissed: NaN,
  deltaHappyJustMissed: NaN,

  forcedHappyByOrder: NaN,
  forcedHappyJustIn: NaN,
  forcedHappyFreeResponse: "",

  attentionCheck1Halfway: NaN,
  attentionCheck1: NaN,
  attentionCheck2Halfway: NaN,
  attentionCheck2: NaN,
  reactionTime1: NaN,
  reactionTime2: NaN,
  reactionTime3: NaN,

  // Demographics
  gender: "",
  age:"",
  nativeLanguage:"",
  comments:"",
  browser: BrowserDetect.browser,
  browserVersion: BrowserDetect.version,
  browserOS: BrowserDetect.OS,

 //trials: myTrialOrder,

/*
An array to store the data that we’re collecting.
*/

  // data: [],

// Goes to description slide
  description: function() {
    // $("#progressBar").show();
    showSlide("description");
    $("#tot-num").html(numTrials);


    if (turk.previewMode) {
      alert ( "Please accept the HIT before continuing." );
    }
    videoElement1 = document.getElementById("videoElement1");
    videoElement1b = document.getElementById("videoElement1b");
    videoElement2 = document.getElementById("videoElement2");
    videoElement2b = document.getElementById("videoElement2b");

      if(experiment.showJustInFirst==1) {
        experiment.movieName1 = "Annie_JustIn_";
        experiment.movieName2 = "Sally_NearMiss_";
        $('#halfwayOutcomeSpan1').html("Annie thinks her ball is going to go out.");
        $('#halfwayOutcomeSpan2').html("Sally thinks her ball is going to go straight.");
      } else {
        experiment.movieName1 = "Annie_NearMiss_";
        experiment.movieName2 = "Sally_JustIn_";
        $('#halfwayOutcomeSpan1').html("Annie thinks her ball is going to go straight.");
        $('#halfwayOutcomeSpan2').html("Sally thinks her ball is going to go out.");
      }

      if (videoElement1.canPlayType("video/mp4")) {
          videoElement1.setAttribute("src", "stimuli/" + experiment.movieName1 + "1.mp4#t=1");
          videoElement2.setAttribute("src", "stimuli/" + experiment.movieName2 + "1.mp4#t=1");

          videoElement1b.setAttribute("src", "stimuli/" + experiment.movieName1 + "2.mp4");
          videoElement2b.setAttribute("src", "stimuli/" + experiment.movieName2 + "2.mp4");
         //window.alert("can play mp4");
      } else if (videoElement1.canPlayType("video/webm")) {
         videoElement1.setAttribute("src", "stimuli/" + experiment.movieName1 + "1.webm#t=1");
         videoElement2.setAttribute("src", "stimuli/" + experiment.movieName2 + "1.webm#t=1");
         
         videoElement1b.setAttribute("src", "stimuli/" + experiment.movieName1 + "2.webm");
         videoElement2b.setAttribute("src", "stimuli/" + experiment.movieName2 + "2.webm");
         //window.alert("can play webm");
      } else if (videoElement1.canPlayType("video/ogg")) {
         videoElement1.setAttribute("src", "stimuli/" + experiment.movieName1 + "1.ogv#t=1");
         videoElement2.setAttribute("src", "stimuli/" + experiment.movieName2 + "1.ogv#t=1");

         videoElement1b.setAttribute("src", "stimuli/" + experiment.movieName1 + "2.ogv");
         videoElement2b.setAttribute("src", "stimuli/" + experiment.movieName2 + "2.ogv");
         //window.alert("can play ogg");
      } else {
         window.alert("Can't play anything");
      }
      videoElement1.load();
      videoElement1b.load();
      videoElement2.load();
      videoElement2b.load();

  },

/*
The function that gets called when the sequence is finished.
*/

  loadNextVideo1: function(){
    // if (videoElement1.canPlayType("video/mp4")) {
    //   videoElement1.setAttribute("src", "stimuli/" + experiment.movieName1 + "2.mp4");
    // } else if (videoElement1.canPlayType("video/webm")) {
    //   videoElement1.setAttribute("src", "stimuli/" + experiment.movieName1 + "2.webm");
    // } else if (videoElement1.canPlayType("video/ogg")) {
    //   videoElement1.setAttribute("src", "stimuli/" + experiment.movieName1 + "2.ogv");
    // } else {
    //   window.alert("Can't play anything");
    // }
    // videoElement1.load();

    $('#movie1Div').hide();
    $('#movie1bDiv').show();
  },

  afterPause1: function() {
    experiment.happyAtPause1 = ($('input[name="happySadPause1"]:checked').val()=="6")*1;
    if($('input[name="happySadPause1"]:checked').val()=="6") {
      $('#happyPauseResponse1').html("happy");
      $('#happyPauseResponse1b').html("happy");
      $('#happySadAfter1_happy').attr('checked', 'checked');
    } else {
      $('#happyPauseResponse1').html("sad");
      $('#happyPauseResponse1b').html("sad");
      $('#happySadAfter1_sad').attr('checked', 'checked');
    }
  },


  loadNextVideo2: function(){
    // if (videoElement1.canPlayType("video/mp4")) {
    //   videoElement2.setAttribute("src", "stimuli/" + experiment.movieName2 + "2.mp4");
    //    } else if (videoElement1.canPlayType("video/webm")) {
    //     videoElement2.setAttribute("src", "stimuli/" + experiment.movieName2 + "2.webm");
    //    } else if (videoElement1.canPlayType("video/ogg")) {
    //     videoElement2.setAttribute("src", "stimuli/" + experiment.movieName2 + "2.ogv");
    //    } else {
    //        window.alert("Can't play anything");
    //    }
    //    videoElement2.load();

    $('#movie2Div').hide();
    $('#movie2bDiv').show();
  },

  afterPause2: function() {
    experiment.happyAtPause2 = ($('input[name="happySadPause2"]:checked').val()=="6")*1;
    if($('input[name="happySadPause2"]:checked').val()=="6") {
      $('#happyPauseResponse2').html("happy");
      $('#happyPauseResponse2b').html("happy");
      $('#happySadAfter2_happy').attr('checked', 'checked');
    } else {
      $('#happyPauseResponse2').html("sad");
      $('#happyPauseResponse2b').html("sad");
      $('#happySadAfter2_sad').attr('checked', 'checked');
    }
  },

  end: function() {
    // Records demographics
    experiment.gender = $('input[name="genderButton"]:checked').val();
    experiment.age = $('#ageRange').val();
    experiment.nativeLanguage = $('input[name="nativeLanguage"]').val();
    experiment.comments = $('textarea[name="commentsTextArea"]').val();
    //experiment.sanityCheck = $('input[name="example1Button"]:checked').val();
    
    // Show the finish slide.
    showSlide("finished");

    /*
    Wait 1.5 seconds and then submit the whole experiment object to Mechanical Turk (mmturkey filters out the functions so we know we’re just submitting properties [i.e. data])
    */
    setTimeout(function() { turk.submit(experiment);}, 1500);
  },


  next: function() {
  
  showSlide("stage");
  // $("#nextButton").hide();
  $("#response1").hide();
  $("#startMovieDiv").hide();
  $("#startMovieDiv2").hide();
  $("#movie1Div").hide();
  $("#movie2Div").hide();
  $("#movie1bDiv").hide();
  $("#movie2bDiv").hide();

  $("#response2").hide();
  $("#overallDiv").hide();
  
  $("#response1Halfway").hide();
  $("#response1bHalfway").hide();
  $("#response2Halfway").hide();
  $("#response2bHalfway").hide();
  $("#afterResponse1b").hide();
  $("#afterResponse2b").hide();

  // If this is not the first trial, record variables
      if (numComplete > 0) {
            experiment.endTime = (new Date()).getTime();
            experiment.reactionTime3 = experiment.endTime - experiment.startTime;

            experiment.betterAfter1 = parseInt($('input[name="happySadAfter1"]:checked').val());
            experiment.deltaHappy1 = parseInt($('input[name="happySadAfterLikert1"]:checked').val());
            
            experiment.betterAfter2 = parseInt($('input[name="happySadAfter2"]:checked').val());
            experiment.deltaHappy2 = parseInt($('input[name="happySadAfterLikert2"]:checked').val());
                        
            experiment.forcedHappyByOrder = parseInt($('input[name="3AFCHappy"]:checked').val());
            experiment.forcedHappyFreeResponse = $('textarea[name="3AFCFreeResponse"]').val();
            experiment.attentionCheck1Halfway = $('#attentionCheck1Halfway').val();
            experiment.attentionCheck2Halfway = $('#attentionCheck2Halfway').val();
            experiment.attentionCheck1 = $('#attentionCheck1').val();
            experiment.attentionCheck2 = $('#attentionCheck2').val();


            if(experiment.showJustInFirst) {
              experiment.happyAtPauseJustIn = experiment.happyAtPause1;
              experiment.betterAfterJustIn = experiment.betterAfter1;
              experiment.deltaHappyJustIn = experiment.deltaHappy1;
              
              experiment.happyAtPauseJustMissed = experiment.happyAtPause2;
              experiment.betterAfterJustMissed = experiment.betterAfter2;
              experiment.deltaHappyJustMissed = experiment.deltaHappy2;

              if(experiment.forcedHappyByOrder==1) {
                experiment.forcedHappyJustIn = 1;
              } else if(experiment.forcedHappyByOrder==2) {
                experiment.forcedHappyJustIn = 0;
              } else {
                experiment.forcedHappyJustIn = -1;
              }
            } else {
              experiment.happyAtPauseJustIn = experiment.happyAtPause2;
              experiment.betterAfterJustIn = experiment.betterAfter2;
              experiment.deltaHappyJustIn = experiment.deltaHappy2;
              
              experiment.happyAtPauseJustMissed = experiment.happyAtPause1;
              experiment.betterAfterJustMissed = experiment.betterAfter1;
              experiment.deltaHappyJustMissed = experiment.deltaHappy1;

              if(experiment.forcedHappyByOrder==1) {
                experiment.forcedHappyJustIn = 0;
              } else if(experiment.forcedHappyByOrder==2) {
                experiment.forcedHappyJustIn = 1;
              } else {
                experiment.forcedHappyJustIn = -1;
              }
            }
      }
      
      // If subject has completed all trials, update progress bar and
      // show slide to ask for demographic info
      if (numComplete >= numTrials) {
          // $('.bar').css('width', (200.0 * numComplete/numTrials) + 'px');
          // $("#trial-num").html(numComplete);
          // $("#total-num").html(numTrials);
          showSlide("askInfo");
      
      } else {
        // Otherwise, if trials not completed yet, update progress bar
        // and go to next trial based on the order in which trials are supposed
        // to occur

        // $('.bar').css('width', (200.0 * numComplete/numTrials) + 'px');
        // $("#trial-num").html(numComplete);
        // $("#total-num").html(numTrials);

        //currentTrialNum is used for randomizing later
        // currentTrialNum = shuffledOrder[numComplete];
        // trial = allTrialOrders[currentTrialNum];

        firstChar = "Annie";
        secondChar = "Sally";
        $('#resultsSpan').html("<img width=50 src='images/Annie.png'></img> <img width=50 src='images/Sally.png'></img>");
        $('#resultsSpan2').html("<img width=50 src='images/Annie.png'></img> <img width=50 src='images/Sally.png'></img>");
        
        $('#CharName1a').html(firstChar);
        $('#CharName1b').html(firstChar);
        $('#CharName1c').html(firstChar);
        $('#CharName1d').html(firstChar);
        $('#CharName1e').html(firstChar);
        $('#CharName1f').html(firstChar);
        $('#CharName1g').html(firstChar);
        $('#CharName1h').html(firstChar);
        $('#CharName1i').html(firstChar);
        // $('#CharName1j').html(firstChar);
        $('#CharName2a').html(secondChar);
        $('#CharName2b').html(secondChar);
        $('#CharName2c').html(secondChar);
        $('#CharName2d').html(secondChar);
        $('#CharName2e').html(secondChar);
        $('#CharName2f').html(secondChar);
        $('#CharName2g').html(secondChar);
        $('#CharName2h').html(secondChar);
        $('#CharName2i').html(secondChar);
        // $('#CharName2j').html(secondChar);

        $('#outcome1span').html("How many pins did Annie knock down? (type a number from 0 to 6)");
        $('#outcome2span').html("How many pins did Sally knock down? (type a number from 0 to 6)");

        $('#storySpan1').html("They are playing on a simple bowling alley with 6 pins. <br>The grey areas on both sides of the alley represent the gutter (if the ball goes into the gutter, it will not be able to hit any pins). <br><br><img width=300 src='images/alley.jpg'></img>");
        
        numComplete++;
       } // end of experiment.next's else block (numComplete < numTrials)
  } // end of experiment.next();
}; // end of experiment variable



