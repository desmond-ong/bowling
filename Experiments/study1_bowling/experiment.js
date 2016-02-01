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

/*
The actual variable that will be returned to MTurk. The experiment object with various variables that you want to keep track of and return as results.

More practically, you should stick everything in an object and submit that whole object so that you don’t lose data (e.g. randomization parameters, what condition the subject is in, etc). Don’t worry about the fact that some of the object properties are functions — mmturkey (the Turk submission library) will strip these out.
*/

var experiment = {

/*
Parameters for this sequence.
*/
  //condition: 1,

  // An array of subjects' responses to each trial (NOTE: in the order in which
  // you initially listed the trials, not in the order in which they appeared)
  //results: new Array(numTrials),

  // The order in which each trial appeared
  //orders: new Array(numTrials),

  // The order in which each trial is presented. i.e.
  // presentationOrder[i] = j means the i-th trial is the j-th one in the trial sequence.
  // Note that presentationOrder is now obsolete with spinnerIDArray
  // presentationOrder: new Array(numTrials),

  //movieIDArray: new Array(numTrials),
  
  showElmoFirst: Math.round(Math.random()), // 1 if elmo goes first
  showJustInFirst: Math.round(Math.random()), // 1 if the Just In goes first

  startTime: 0,
  endTime: 0,

  //distance1Array: new Array(numTrials),
  //distance2Array: new Array(numTrials),

  // happy1responseArray: new Array(numTrials),
  // sad1responseArray: new Array(numTrials),
  // anger1responseArray: new Array(numTrials),
  // surprise1responseArray: new Array(numTrials),
  // relief1responseArray: new Array(numTrials),
  // regret1responseArray: new Array(numTrials),
  // contentment1responseArray: new Array(numTrials),
  // disappointment1responseArray: new Array(numTrials),
  // // closeness1Array: new Array(numTrials),
  // // effort1Array: new Array(numTrials),
  // happy2responseArray: new Array(numTrials),
  // sad2responseArray: new Array(numTrials),
  // anger2responseArray: new Array(numTrials),
  // surprise2responseArray: new Array(numTrials),
  // relief2responseArray: new Array(numTrials),
  // regret2responseArray: new Array(numTrials),
  // contentment2responseArray: new Array(numTrials),
  // disappointment2responseArray: new Array(numTrials),
  // // closeness2Array: new Array(numTrials),
  // // effort2Array: new Array(numTrials),

  // forcedHappyArray: new Array(numTrials),
  // forcedHappyFreeResponseArray: new Array(numTrials),

  // attentionCheck1Array: new Array(numTrials),
  // attentionCheck2Array: new Array(numTrials),
  // reactionTimeArray: new Array(numTrials),

  happy1: -1,
  // sad1:  -1,
  // anger1:  -1,
  // surprise1:  -1,
  // relief1:  -1,
  // regret1:  -1,
  // contentment1:  -1,
  // disappointment1:  -1,
  // closeness1Array: new Array(numTrials),
  // effort1Array: new Array(numTrials),
  
  happy2:  -1,
  // sad2:  -1,
  // anger2:  -1,
  // surprise2:  -1,
  // relief2:  -1,
  // regret2:  -1,
  // contentment2:  -1,
  // disappointment2:  -1,
  // closeness2Array: new Array(numTrials),
  // effort2Array: new Array(numTrials),

  happyJustIn: -1,
  // sadJustIn: -1,
  // angerJustIn:  -1,
  // surpriseJustIn:  -1,
  // reliefJustIn:  -1,
  // regretJustIn:  -1,
  // contentmentJustIn:  -1,
  // disappointmentJustIn:  -1,

  happyJustMissed: -1,
  // sadJustMissed:  -1,
  // angerJustMissed:  -1,
  // surpriseJustMissed:  -1,
  // reliefJustMissed:  -1,
  // regretJustMissed:  -1,
  // contentmentJustMissed:  -1,
  // disappointmentJustMissed:  -1,

  forcedHappyByOrder: -1,
  forcedHappyJustIn: -1,
  forcedHappyFreeResponse: "",

  attentionCheck1: -1,
  attentionCheck2: -1,
  reactionTime1: -1,
  reactionTime2: -1,
  reactionTime3: -1,

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

  data: [],

// Goes to description slide
  description: function() {
    $("#progressBar").show();
    showSlide("description");
    $("#tot-num").html(numTrials);

    if (turk.previewMode) {
      alert ( "Please accept the HIT before continuing." );
    }
  },

/*
The function that gets called when the sequence is finished.
*/

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
  $("#response2").hide();
  $("#overallDiv").hide();
  
  if (numComplete === 0) {
    videoElement1 = document.getElementById("videoElement1");
    videoElement2 = document.getElementById("videoElement2");
  }

  // If this is not the first trial, record variables
      if (numComplete > 0) {
            // experiment.ChooseLeft[numComplete-1] = $('input[name="q1"]:checked').val()==1;
            // experiment.Cuteness[numComplete-1] = $('input[name="q2"]:checked').val();
            // $('input[name="q1"]:').prop('checked', false);
            // $('input[name="q2"]:').prop('checked', false);
            
            // experiment.movieIDArray[numComplete-1] = trial.movieID;
            

            // experiment.happy1responseArray[numComplete-1] = $('input[name="happy1"]:checked').val();
            // experiment.sad1responseArray[numComplete-1] = $('input[name="sad1"]:checked').val();
            // experiment.anger1responseArray[numComplete-1] = $('input[name="anger1"]:checked').val();
            // experiment.surprise1responseArray[numComplete-1] = $('input[name="surprise1"]:checked').val();
            // experiment.relief1responseArray[numComplete-1] = $('input[name="relief1"]:checked').val();
            // experiment.regret1responseArray[numComplete-1] = $('input[name="regret1"]:checked').val();
            // experiment.contentment1responseArray[numComplete-1] = $('input[name="contentment1"]:checked').val();
            // experiment.disappointment1responseArray[numComplete-1] = $('input[name="disappointment1"]:checked').val();
            // // experiment.closeness1Array[numComplete-1] = $('input[name="closeness1"]:checked').val();
            // // experiment.effort1Array[numComplete-1] = $('input[name="effort1"]:checked').val();
            // experiment.happy2responseArray[numComplete-1] = $('input[name="happy2"]:checked').val();
            // experiment.sad2responseArray[numComplete-1] = $('input[name="sad2"]:checked').val();
            // experiment.anger2responseArray[numComplete-1] = $('input[name="anger2"]:checked').val();
            // experiment.surprise2responseArray[numComplete-1] = $('input[name="surprise2"]:checked').val();
            // experiment.relief2responseArray[numComplete-1] = $('input[name="relief2"]:checked').val();
            // experiment.regret2responseArray[numComplete-1] = $('input[name="regret2"]:checked').val();
            // experiment.contentment2responseArray[numComplete-1] = $('input[name="contentment2"]:checked').val();
            // experiment.disappointment2responseArray[numComplete-1] = $('input[name="disappointment2"]:checked').val();
            // // experiment.closeness2Array[numComplete-1] = $('input[name="closeness2"]:checked').val();
            // // experiment.effort2Array[numComplete-1] = $('input[name="effort2"]:checked').val();


            // experiment.forcedHappyArray[numComplete-1] = $('input[name="3AFCHappy"]:checked').val();

            // experiment.forcedHappyFreeResponseArray[numComplete-1] = $('textarea[name="3AFCFreeResponse"]').val();
            // experiment.attentionCheck1Array[numComplete-1] = $('#attentionCheck1').val();
            // experiment.attentionCheck2Array[numComplete-1] = $('#attentionCheck2').val();

            experiment.endTime = (new Date()).getTime();
            experiment.reactionTime3 = experiment.endTime - experiment.startTime;

            // $('input[name="happy1"]:').prop('checked', false);
            // $('input[name="sad1"]:').prop('checked', false);
            // $('input[name="anger1"]:').prop('checked', false);
            // $('input[name="surprise1"]:').prop('checked', false);
            // $('input[name="relief1"]:').prop('checked', false);
            // $('input[name="regret1"]:').prop('checked', false);
            // $('input[name="contentment1"]:').prop('checked', false);
            // $('input[name="disappointment1"]:').prop('checked', false);
            // // $('input[name="closeness1"]:checked').prop('checked', false);
            // // $('input[name="effort1"]:checked').prop('checked', false);
            // $('input[name="happy2"]:').prop('checked', false);
            // $('input[name="sad2"]:').prop('checked', false);
            // $('input[name="anger2"]:').prop('checked', false);
            // $('input[name="surprise2"]:').prop('checked', false);
            // $('input[name="relief2"]:').prop('checked', false);
            // $('input[name="regret2"]:').prop('checked', false);
            // $('input[name="contentment2"]:').prop('checked', false);
            // $('input[name="disappointment2"]:').prop('checked', false);
            // // $('input[name="closeness2"]:checked').prop('checked', false);
            // // $('input[name="effort2"]:checked').prop('checked', false);
            // $('input[name="3AFCHappy"]:checked').prop('checked', false);
            // $('#attentionCheck1').val('');
            // $('#attentionCheck2').val('');
            // $('textarea[name="3AFCFreeResponse"]').val('');

            // experiment.data.push(trial);


            experiment.happy1 = $('input[name="happy1"]:checked').val();
            // experiment.sad1 = $('input[name="sad1"]:checked').val();
            // experiment.anger1 = $('input[name="anger1"]:checked').val();
            // experiment.surprise1 = $('input[name="surprise1"]:checked').val();
            // experiment.relief1 = $('input[name="relief1"]:checked').val();
            // experiment.regret1 = $('input[name="regret1"]:checked').val();
            // experiment.contentment1 = $('input[name="contentment1"]:checked').val();
            // experiment.disappointment1 = $('input[name="disappointment1"]:checked').val();
            
            experiment.happy2 = $('input[name="happy2"]:checked').val();
            // experiment.sad2 = $('input[name="sad2"]:checked').val();
            // experiment.anger2 = $('input[name="anger2"]:checked').val();
            // experiment.surprise2 = $('input[name="surprise2"]:checked').val();
            // experiment.relief2 = $('input[name="relief2"]:checked').val();
            // experiment.regret2 = $('input[name="regret2"]:checked').val();
            // experiment.contentment2 = $('input[name="contentment2"]:checked').val();
            // experiment.disappointment2 = $('input[name="disappointment2"]:checked').val();
            
            experiment.forcedHappyByOrder = $('input[name="3AFCHappy"]:checked').val();
            experiment.forcedHappyFreeResponse = $('textarea[name="3AFCFreeResponse"]').val();
            experiment.attentionCheck1 = $('#attentionCheck1').val();
            experiment.attentionCheck2 = $('#attentionCheck2').val();

            if(experiment.showJustInFirst) {
              experiment.happyJustIn = experiment.happy1;
              // experiment.sadJustIn = experiment.sad1;
              // experiment.angerJustIn = experiment.anger1;
              // experiment.surpriseJustIn = experiment.surprise1;
              // experiment.reliefJustIn = experiment.relief1;
              // experiment.regretJustIn = experiment.regret1;
              // experiment.contentmentJustIn = experiment.contentment1;
              // experiment.disappointmentJustIn = experiment.disappointment1;

              experiment.happyJustMissed = experiment.happy2;
              // experiment.sadJustMissed = experiment.sad2;
              // experiment.angerJustMissed = experiment.anger2;
              // experiment.surpriseJustMissed = experiment.surprise2;
              // experiment.reliefJustMissed = experiment.relief2;
              // experiment.regretJustMissed = experiment.regret2;
              // experiment.contentmentJustMissed = experiment.contentment2;
              // experiment.disappointmentJustMissed = experiment.disappointment2;

              if(experiment.forcedHappyByOrder==1) {
                experiment.forcedHappyJustIn = 1;
              } else {
                experiment.forcedHappyJustIn = 0;
              }
            } else {
              experiment.happyJustIn = experiment.happy2;
              // experiment.sadJustIn = experiment.sad2;
              // experiment.angerJustIn = experiment.anger2;
              // experiment.surpriseJustIn = experiment.surprise2;
              // experiment.reliefJustIn = experiment.relief2;
              // experiment.regretJustIn = experiment.regret2;
              // experiment.contentmentJustIn = experiment.contentment2;
              // experiment.disappointmentJustIn = experiment.disappointment2;

              experiment.happyJustMissed = experiment.happy1;
              // experiment.sadJustMissed = experiment.sad1;
              // experiment.angerJustMissed = experiment.anger1;
              // experiment.surpriseJustMissed = experiment.surprise1;
              // experiment.reliefJustMissed = experiment.relief1;
              // experiment.regretJustMissed = experiment.regret1;
              // experiment.contentmentJustMissed = experiment.contentment1;
              // experiment.disappointmentJustMissed = experiment.disappointment1;

              if(experiment.forcedHappyByOrder==1) {
                experiment.forcedHappyJustIn = 0;
              } else {
                experiment.forcedHappyJustIn = 1;
              }
            }
      }
      
      // If subject has completed all trials, update progress bar and
      // show slide to ask for demographic info
      if (numComplete >= numTrials) {
          $('.bar').css('width', (200.0 * numComplete/numTrials) + 'px');
          $("#trial-num").html(numComplete);
          $("#total-num").html(numTrials);
          showSlide("askInfo");
      
      } else {
        // Otherwise, if trials not completed yet, update progress bar
        // and go to next trial based on the order in which trials are supposed
        // to occur

        $('.bar').css('width', (200.0 * numComplete/numTrials) + 'px');
        $("#trial-num").html(numComplete);
        $("#total-num").html(numTrials);

        //currentTrialNum is used for randomizing later
        // currentTrialNum = shuffledOrder[numComplete];
        // trial = allTrialOrders[currentTrialNum];

        movieName1 = "CMJustMiss";
        movieName2 = "ElmoJustIn";
        
        if(experiment.showJustInFirst==1) {
          if(experiment.showElmoFirst==1) {
            movieName1 = "ElmoJustIn";
            movieName2 = "CMJustMiss";
          } else {
            movieName1 = "CMJustIn";
            movieName2 = "ElmoJustMiss";
          }
        } else {
          if(experiment.showElmoFirst==1) {
            movieName1 = "ElmoJustMiss";
            movieName2 = "CMJustIn";
          }
        }

       if (videoElement1.canPlayType("video/mp4")) {
            videoElement1.setAttribute("src", "stimuli/" + movieName1 + ".mp4");
            videoElement2.setAttribute("src", "stimuli/" + movieName2 + ".mp4");
           //window.alert("can play mp4");
       }
       else if (videoElement1.canPlayType("video/webm")) {
           videoElement1.setAttribute("src", "stimuli/" + movieName1 + ".webm");
           videoElement2.setAttribute("src", "stimuli/" + movieName2 + ".webm");
           //window.alert("can play webm");
       }
       else if (videoElement1.canPlayType("video/ogg")) {
           videoElement1.setAttribute("src", "stimuli/" + movieName1 + ".ogv");
           videoElement2.setAttribute("src", "stimuli/" + movieName2 + ".ogv");
           //window.alert("can play ogg");
       }
       else {
           window.alert("Can't play anything");
       }
       videoElement1.load();
       videoElement2.load();
 
        firstChar = "Cookie Monster";
        secondChar = "Elmo";
        if(experiment.showElmoFirst) {
          firstChar = "Elmo";
          secondChar = "Cookie Monster";
          $('#resultsSpan').html("<img width=250 src='images/Elmo.png'></img> <img width=250 src='images/CM.png'></img>");
          $('#resultsSpan2').html("<img width=250 src='images/Elmo.png'></img> <img width=250 src='images/CM.png'></img>");
        } else {
          $('#resultsSpan').html("<img width=250 src='images/CM.png'></img> <img width=250 src='images/Elmo.png'></img>");
          $('#resultsSpan2').html("<img width=250 src='images/CM.png'></img> <img width=250 src='images/Elmo.png'></img>");
        }
        
        $('#CharName1a').html(firstChar);
        $('#CharName1b').html(firstChar);
        $('#CharName1c').html(firstChar);
        $('#CharName1d').html(firstChar);
        $('#CharName1e').html(firstChar);
        $('#CharName1f').html(firstChar);
        $('#CharName1g').html(firstChar);
        $('#CharName1h').html(firstChar);
        $('#CharName1i').html(firstChar);
        $('#CharName1j').html(firstChar);
        $('#CharName2a').html(secondChar);
        $('#CharName2b').html(secondChar);
        $('#CharName2c').html(secondChar);
        $('#CharName2d').html(secondChar);
        $('#CharName2e').html(secondChar);
        $('#CharName2f').html(secondChar);
        $('#CharName2g').html(secondChar);
        $('#CharName2h').html(secondChar);
        $('#CharName2i').html(secondChar);
        $('#CharName2j').html(secondChar);

        $('#outcome1span').html("how many pins did he knock down? (type a number from 0 to 6)");
        $('#outcome2span').html("how many pins did he knock down? (type a number from 0 to 6)");

        $('#storySpan1').html("They are playing on a simple bowling alley with 6 pins. The grey areas on both sides of the alley represent the gutter (if the ball goes into the gutter, it will not be able to hit any pins). <br><img width=300 src='images/alley.jpg'></img>");
        

        numComplete++;
       } // end of experiment.next's else block (numComplete < numTrials)
          // experiment.data.push(data);
          //setTimeout(experiment.next, 500);
  } // end of experiment.next();
}; // end of experiment variable
