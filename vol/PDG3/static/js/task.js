/*
 * Requires:
 *     psiturk.js
 *     utils.js
 */

// Initalize psiturk object
var psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);

var mycondition = condition;  // these two variables are passed by the psiturk server process
var mycounterbalance = counterbalance;  // they tell you which condition you have been assigned to
// they are not used in the stroop code but may be useful to you

// All pages to be loaded
var pages = [
	"instructions/instruct-1.html",
	"instructions/instruct-2.html",
	"instructions/instruct-3.html",
	"instructions/instruct-4.html",
	"instructions/instruct-ready.html",
	"stage.html",
	"instructions/endPDG.html",
	"instructions/ansInstruct-1.html",
	"instructions/ansInstruct-2.html",
	"instructions/ansInstruct-ready.html",
	"postquestionnaire.html"
];

psiTurk.preloadPages(pages);

var instructionPages = [ // add as a list as many pages as you like
	"instructions/instruct-1.html",
	"instructions/instruct-2.html",
	"instructions/instruct-3.html",
	"instructions/instruct-4.html",
	"instructions/instruct-ready.html"
];

var ansInstructionPages = [// add as a list as many pages as you like
        "instructions/endPDG.html",
        "instructions/ansInstruct-1.html",
	"instructions/ansInstruct-2.html",
	"instructions/ansInstruct-ready.html",
];


/********************
* HTML manipulation
*
* All HTML files in the templates directory are requested 
* from the server when the PsiTurk object is created above We
* need code to get those pages from the PsiTurk object and 
* insert them into the document
*
********************/

/********************
* probability game  *
********************/
var PDG2_experiment = function() {

	var stimOn, // time word is presented
	    listening = false;
        
        // Stimuli for a basic Stroop experiment
        var stimFolder = "/static/images/Pics/White/"
	var stims = [];
	var stims = [
			["White_80_55_3_L.jpg","0"],["White_85_10_2_L.jpg","0"],["White_95_15_3_R.jpg","1"],["White_80_10_1_R.jpg","1"],
                        ["White_95_10_3_R.jpg","1"],["White_75_50_3_L.jpg","0"],["White_55_50_3_R.jpg","1"],["White_90_10_2_L.jpg","0"],
                        ["White_50_15_3_L.jpg","0"],["White_95_55_2_L.jpg","0"],["White_50_15_2_R.jpg","1"],["White_60_20_1_L.jpg","0"],
                        ["White_55_45_1_R.jpg","1"],["White_85_10_1_R.jpg","1"],["White_80_60_1_L.jpg","0"],["White_80_60_3_R.jpg","1"],
                        ["White_75_15_1_L.jpg","0"],["White_45_40_2_R.jpg","1"],["White_40_10_1_R.jpg","1"],["White_45_40_1_R.jpg","1"],
                        ["White_60_20_3_L.jpg","0"],["White_50_15_1_L.jpg","0"],["White_55_45_2_R.jpg","1"],["White_80_20_2_R.jpg","1"],
                        ["White_40_10_2_R.jpg","1"],["White_80_55_2_L.jpg","0"],["White_60_40_2_R.jpg","1"],["White_60_20_2_L.jpg","0"],
                        ["White_95_50_3_L.jpg","0"],["White_55_50_1_L.jpg","0"],["White_60_40_3_R.jpg","1"],["White_40_15_2_L.jpg","0"],
                        ["White_75_50_2_L.jpg","0"],["White_95_55_1_R.jpg","1"],["White_90_10_3_R.jpg","1"],["White_80_10_3_L.jpg","0"],
                        ["White_95_15_2_R.jpg","1"],["White_40_15_1_L.jpg","0"],["White_55_50_2_L.jpg","0"],["White_95_50_2_R.jpg","1"],
                        ["White_50_45_2_R.jpg","1"],["White_55_45_3_L.jpg","0"],["White_80_55_1_R.jpg","1"],["White_75_50_1_L.jpg","0"],
                        ["White_40_10_3_R.jpg","1"],["White_80_20_3_L.jpg","0"],["White_50_25_3_L.jpg","0"],["White_50_45_1_R.jpg","1"],
                        ["White_50_25_2_L.jpg","0"],["White_50_25_1_L.jpg","0"],["White_80_60_2_R.jpg","1"],["White_95_55_3_L.jpg","0"],
                        ["White_95_10_1_R.jpg","1"],["White_40_15_3_R.jpg","1"],["White_50_45_3_R.jpg","1"],["White_45_40_3_L.jpg","0"],
                        ["White_75_15_3_L.jpg","0"],["White_80_10_2_L.jpg","0"],["White_95_10_2_R.jpg","1"],["White_60_40_1_R.jpg","1"],
                        ["White_95_50_1_L.jpg","0"],["White_75_15_2_R.jpg","1"],
                        ["White_80_55_3_L_v2.jpg","0"],["White_85_10_2_L_v2.jpg","0"],["White_95_15_3_R_v2.jpg","1"],["White_80_10_1_R_v2.jpg","1"],
                        ["White_95_10_3_R_v2.jpg","1"],["White_75_50_3_L_v2.jpg","0"],["White_55_50_3_R_v2.jpg","1"],["White_90_10_2_L_v2.jpg","0"],
                        ["White_50_15_3_L_v2.jpg","0"],["White_95_55_2_L_v2.jpg","0"],["White_50_15_2_R_v2.jpg","1"],["White_60_20_1_L_v2.jpg","0"],
                        ["White_55_45_1_R_v2.jpg","1"],["White_85_10_1_R_v2.jpg","1"],["White_80_60_1_L_v2.jpg","0"],["White_80_60_3_R_v2.jpg","1"],
                        ["White_75_15_1_L_v2.jpg","0"],["White_45_40_2_R_v2.jpg","1"],["White_40_10_1_R_v2.jpg","1"],["White_45_40_1_R_v2.jpg","1"],
                        ["White_60_20_3_L_v2.jpg","0"],["White_50_15_1_L_v2.jpg","0"],["White_55_45_2_R_v2.jpg","1"],["White_80_20_2_R_v2.jpg","1"],
                        ["White_40_10_2_R_v2.jpg","1"],["White_80_55_2_L_v2.jpg","0"],["White_60_40_2_R_v2.jpg","1"],["White_60_20_2_L_v2.jpg","0"],
                        ["White_95_50_3_L_v2.jpg","0"],["White_55_50_1_L_v2.jpg","0"],["White_60_40_3_R_v2.jpg","1"],["White_40_15_2_L_v2.jpg","0"],
                        ["White_75_50_2_L_v2.jpg","0"],["White_95_55_1_R_v2.jpg","1"],["White_90_10_3_R_v2.jpg","1"],["White_80_10_3_L_v2.jpg","0"],
                        ["White_95_15_2_R_v2.jpg","1"],["White_40_15_1_L_v2.jpg","0"],["White_55_50_2_L_v2.jpg","0"],["White_95_50_2_R_v2.jpg","1"],
                        ["White_50_45_2_R_v2.jpg","1"],["White_55_45_3_L_v2.jpg","0"],["White_80_55_1_R_v2.jpg","1"],["White_75_50_1_L_v2.jpg","0"],
                        ["White_40_10_3_R_v2.jpg","1"],["White_80_20_3_L_v2.jpg","0"],["White_50_25_3_L_v2.jpg","0"],["White_50_45_1_R_v2.jpg","1"],
                        ["White_50_25_2_L_v2.jpg","0"],["White_50_25_1_L_v2.jpg","0"],["White_80_60_2_R_v2.jpg","1"],["White_95_55_3_L_v2.jpg","0"],
                        ["White_95_10_1_R_v2.jpg","1"],["White_40_15_3_R_v2.jpg","1"],["White_50_45_3_R_v2.jpg","1"],["White_45_40_3_L_v2.jpg","0"],
                        ["White_75_15_3_L_v2.jpg","0"],["White_80_10_2_L_v2.jpg","0"],["White_95_10_2_R_v2.jpg","1"],["White_60_40_1_R_v2.jpg","1"],
                        ["White_95_50_1_L_v2.jpg","0"],["White_75_15_2_R_v2.jpg","1"],["White_95_15_1_L_v2.jpg","0"],["White_80_20_1_R_v2.jpg","1"],
                        ["White_90_10_1_R_v2.jpg","1"],["White_85_10_3_L_v2.jpg","0"]
		];

	stims = _.shuffle(stims);
	//add practice trials and 1st 4 trials
	stims.unshift(["1.jpg","1"],["2.jpg","0"],["3.jpg","0"],["4.jpg","1"],
	["White_95_15_1_L.jpg","0"],["White_80_20_1_R.jpg","1"],["White_90_10_1_R.jpg","1"],["White_85_10_3_L.jpg","0"]);
        // add intermissions:
        trialCounter = 0;
        //15, 31, 47, 63, 89,95,111,127
        stims.splice(15, 0, ["intermission.jpg","0"]);    
        stims.splice(31, 0, ["intermission.jpg","0"]); 
        stims.splice(47, 0, ["intermission.jpg","0"]);
        stims.splice(63, 0, ["intermission.jpg","0"]);
        stims.splice(89, 0, ["intermission.jpg","0"]);
        stims.splice(95, 0, ["intermission.jpg","0"]);
        stims.splice(111, 0, ["intermission.jpg","0"]);
        stims.splice(127, 0, ["intermission.jpg","0"]);
        
        //sets the amount of time stimulus is seen
        stimViewTime = 1500;
        
	var next = function() {
		//deletes intermission screens right before next trial begins
		//15, 31, 47, 63, 89,95,111,127
		if (trialCounter === 16 || trialCounter === 32 || trialCounter === 48 || trialCounter === 64 || trialCounter === 90 || trialCounter === 96 || trialCounter === 112 || trialCounter === 128) {
			     d3.select("#pic").remove();
		} 
		
		if (stims.length===0) {
		        //psiturk.saveData();
			psiTurk.doInstructions(ansInstructionPages,
                        function() { currentview = new PDG2b_experiment();}
                        );
		}
		else {
			stim = stims.shift();
			show_stim(stim[0]);
			stimOn = new Date().getTime();
			listening = true;
			d3.select("#query").html('<p id="prompt">Type "Z" for Blue or "M" for green.</p>');
			trialCounter++;
		}
	};
	
	var response_handler = function(e) {
		if (!listening) return;
		

		var keyCode = e.keyCode,
			response;
                
		switch (keyCode) {
			case 90:
				// "Z"
				response="0";
				break;
			case 77:
				// "M"
				response="1";
				break;
			default:
				response = "";
				break;
		}
		if (response.length>0) {
			listening = false;
			var hit = response == stim[1];
			var rt = new Date().getTime() - stimOn;

			psiTurk.recordTrialData({'phase':"TEST",
                                     'image':stim[0],
                                     'correct':stim[1],
                                     'response':response,
                                     'rt':rt}
                                   );
			     remove_stim();
			     setTimeout(function(){ 
			     next();
			     }, 500);
			     
		}
		
	};

	var finish = function() {
	    $("body").unbind("keydown", response_handler); // Unbind keys
	    currentview = new Questionnaire();
	};
	
	var show_stim = function(image) {
	        $("body").unbind("keydown", response_handler); // Unbind keys
	        d3.select("#container-exp")
			.append("img") // append image
                        .attr("src", stimFolder + image)
                        .attr("id","pic");
                //15, 31, 47, 63, 89,95,111,127
                if (trialCounter === 15 || trialCounter === 31 || trialCounter === 47 || trialCounter === 63 || trialCounter === 89 || trialCounter === 95 || trialCounter === 111 || trialCounter === 127) {
                    $("body").focus().keydown(response_handler); // collect response
            
                } else {
                
                    setTimeout(function(){ 
		      d3.select("#pic").remove();
		      d3.select("#container-exp")
			    .append("img") // append image
                            .attr("src", "/static/images/Pics/" + "boxes.jpg")
                            .attr("id","boxes");
                            $("body").focus().keydown(response_handler); //collect response
                    }, stimViewTime);
                }
                
	};
	var show_boxes = function(image) {
	        d3.select("#boxes").remove();
	        d3.select("#container-exp")
			.append("img") // append image
                        .attr("src", "/static/images/Pics/boxes.jpg")
                        .attr("id","boxes");
	};

	var remove_stim = function() {
		  d3.select("#boxes").remove();
	};

	
	// Load the stage.html snippet into the body of the page
	psiTurk.showPage('stage.html');

	// Register the response handler that is defined above to handle any
	// key down events.
	 


	// Start the test
	next();
};

////// Start ANS dots task:
var PDG2b_experiment = function() {

	var stimOn, // time word is presented
	    listening = false;
        
        // Stimuli for a basic Stroop experiment
        var stimFolder = "/static/images/Pics/White/"
	var stims = [];
	var stims = [
			["White_80_55_3_L.jpg","0"],["White_85_10_2_L.jpg","0"],["White_95_15_3_R.jpg","1"],["White_80_10_1_R.jpg","1"],
                        ["White_95_10_3_R.jpg","1"],["White_75_50_3_L.jpg","0"],["White_55_50_3_R.jpg","1"],["White_90_10_2_L.jpg","0"],
                        ["White_50_15_3_L.jpg","0"],["White_95_55_2_L.jpg","0"],["White_50_15_2_R.jpg","1"],["White_60_20_1_L.jpg","0"],
                        ["White_55_45_1_R.jpg","1"],["White_85_10_1_R.jpg","1"],["White_80_60_1_L.jpg","0"],["White_80_60_3_R.jpg","1"],
                        ["White_75_15_1_L.jpg","0"],["White_45_40_2_R.jpg","1"],["White_40_10_1_R.jpg","1"],["White_45_40_1_R.jpg","1"],
                        ["White_60_20_3_L.jpg","0"],["White_50_15_1_L.jpg","0"],["White_55_45_2_R.jpg","1"],["White_80_20_2_R.jpg","1"],
                        ["White_40_10_2_R.jpg","1"],["White_80_55_2_L.jpg","0"],["White_60_40_2_R.jpg","1"],["White_60_20_2_L.jpg","0"],
                        ["White_95_50_3_L.jpg","0"],["White_55_50_1_L.jpg","0"],["White_60_40_3_R.jpg","1"],["White_40_15_2_L.jpg","0"],
                        ["White_75_50_2_L.jpg","0"],["White_95_55_1_R.jpg","1"],["White_90_10_3_R.jpg","1"],["White_80_10_3_L.jpg","0"],
                        ["White_95_15_2_R.jpg","1"],["White_40_15_1_L.jpg","0"],["White_55_50_2_L.jpg","0"],["White_95_50_2_R.jpg","1"],
                        ["White_50_45_2_R.jpg","1"],["White_55_45_3_L.jpg","0"],["White_80_55_1_R.jpg","1"],["White_75_50_1_L.jpg","0"],
                        ["White_40_10_3_R.jpg","1"],["White_80_20_3_L.jpg","0"],["White_50_25_3_L.jpg","0"],["White_50_45_1_R.jpg","1"],
                        ["White_50_25_2_L.jpg","0"],["White_50_25_1_L.jpg","0"],["White_80_60_2_R.jpg","1"],["White_95_55_3_L.jpg","0"],
                        ["White_95_10_1_R.jpg","1"],["White_40_15_3_R.jpg","1"],["White_50_45_3_R.jpg","1"],["White_45_40_3_L.jpg","0"],
                        ["White_75_15_3_L.jpg","0"],["White_80_10_2_L.jpg","0"],["White_95_10_2_R.jpg","1"],["White_60_40_1_R.jpg","1"],
                        ["White_95_50_1_L.jpg","0"],["White_75_15_2_R.jpg","1"],
                        ["White_80_55_3_L_v2.jpg","0"],["White_85_10_2_L_v2.jpg","0"],["White_95_15_3_R_v2.jpg","1"],["White_80_10_1_R_v2.jpg","1"],
                        ["White_95_10_3_R_v2.jpg","1"],["White_75_50_3_L_v2.jpg","0"],["White_55_50_3_R_v2.jpg","1"],["White_90_10_2_L_v2.jpg","0"],
                        ["White_50_15_3_L_v2.jpg","0"],["White_95_55_2_L_v2.jpg","0"],["White_50_15_2_R_v2.jpg","1"],["White_60_20_1_L_v2.jpg","0"],
                        ["White_55_45_1_R_v2.jpg","1"],["White_85_10_1_R_v2.jpg","1"],["White_80_60_1_L_v2.jpg","0"],["White_80_60_3_R_v2.jpg","1"],
                        ["White_75_15_1_L_v2.jpg","0"],["White_45_40_2_R_v2.jpg","1"],["White_40_10_1_R_v2.jpg","1"],["White_45_40_1_R_v2.jpg","1"],
                        ["White_60_20_3_L_v2.jpg","0"],["White_50_15_1_L_v2.jpg","0"],["White_55_45_2_R_v2.jpg","1"],["White_80_20_2_R_v2.jpg","1"],
                        ["White_40_10_2_R_v2.jpg","1"],["White_80_55_2_L_v2.jpg","0"],["White_60_40_2_R_v2.jpg","1"],["White_60_20_2_L_v2.jpg","0"],
                        ["White_95_50_3_L_v2.jpg","0"],["White_55_50_1_L_v2.jpg","0"],["White_60_40_3_R_v2.jpg","1"],["White_40_15_2_L_v2.jpg","0"],
                        ["White_75_50_2_L_v2.jpg","0"],["White_95_55_1_R_v2.jpg","1"],["White_90_10_3_R_v2.jpg","1"],["White_80_10_3_L_v2.jpg","0"],
                        ["White_95_15_2_R_v2.jpg","1"],["White_40_15_1_L_v2.jpg","0"],["White_55_50_2_L_v2.jpg","0"],["White_95_50_2_R_v2.jpg","1"],
                        ["White_50_45_2_R_v2.jpg","1"],["White_55_45_3_L_v2.jpg","0"],["White_80_55_1_R_v2.jpg","1"],["White_75_50_1_L_v2.jpg","0"],
                        ["White_40_10_3_R_v2.jpg","1"],["White_80_20_3_L_v2.jpg","0"],["White_50_25_3_L_v2.jpg","0"],["White_50_45_1_R_v2.jpg","1"],
                        ["White_50_25_2_L_v2.jpg","0"],["White_50_25_1_L_v2.jpg","0"],["White_80_60_2_R_v2.jpg","1"],["White_95_55_3_L_v2.jpg","0"],
                        ["White_95_10_1_R_v2.jpg","1"],["White_40_15_3_R_v2.jpg","1"],["White_50_45_3_R_v2.jpg","1"],["White_45_40_3_L_v2.jpg","0"],
                        ["White_75_15_3_L_v2.jpg","0"],["White_80_10_2_L_v2.jpg","0"],["White_95_10_2_R_v2.jpg","1"],["White_60_40_1_R_v2.jpg","1"],
                        ["White_95_50_1_L_v2.jpg","0"],["White_75_15_2_R_v2.jpg","1"],["White_95_15_1_L_v2.jpg","0"],["White_80_20_1_R_v2.jpg","1"],
                        ["White_90_10_1_R_v2.jpg","1"],["White_85_10_3_L_v2.jpg","0"]
		];

	stims = _.shuffle(stims);
	//add practice trials and 1st 4 trials
	stims.unshift(["1.jpg","1"],["2.jpg","0"],["3.jpg","0"],["4.jpg","1"],
	["White_95_15_1_L.jpg","0"],["White_80_20_1_R.jpg","1"],["White_90_10_1_R.jpg","1"],["White_85_10_3_L.jpg","0"]);
        // add intermissions:
        trialCounter = 0;
        //15, 31, 47, 63, 89,95,111,127
        stims.splice(15, 0, ["intermission.jpg","0"]);    
        stims.splice(31, 0, ["intermission.jpg","0"]); 
        stims.splice(47, 0, ["intermission.jpg","0"]);
        stims.splice(63, 0, ["intermission.jpg","0"]);
        stims.splice(89, 0, ["intermission.jpg","0"]);
        stims.splice(95, 0, ["intermission.jpg","0"]);
        stims.splice(111, 0, ["intermission.jpg","0"]);
        stims.splice(127, 0, ["intermission.jpg","0"]);
        
        //sets the amount of time stimulus is seen
        stimViewTime = 750;
        
	var next = function() {
		//deletes intermission screens right before next trial begins
		//15, 31, 47, 63, 89,95,111,127
		if (trialCounter === 16 || trialCounter === 32 || trialCounter === 48 || trialCounter === 64 || trialCounter === 90 || trialCounter === 96 || trialCounter === 112 || trialCounter === 128) {
			     d3.select("#pic").remove();
		} 
		
		if (stims.length===0) {
		        //psiturk.saveData();
			finish();
		}
		else {
			stim = stims.shift();
			show_stim(stim[0]);
			stimOn = new Date().getTime();
			listening = true;
			d3.select("#query").html('<p id="prompt">Type "Z" for Blue or "M" for green.</p>');
			trialCounter++;
		}
	};
	
	var response_handler = function(e) {
		if (!listening) return;
		

		var keyCode = e.keyCode,
			response;
                
		switch (keyCode) {
			case 90:
				// "Z"
				response="0";
				break;
			case 77:
				// "M"
				response="1";
				break;
			default:
				response = "";
				break;
		}
		if (response.length>0) {
			listening = false;
			var hit = response == stim[1];
			var rt = new Date().getTime() - stimOn;

			psiTurk.recordTrialData({'phase':"TEST",
                                     'image':stim[0],
                                     'correct':stim[1],
                                     'response':response,
                                     'rt':rt}
                                   );
			     remove_stim();
			     setTimeout(function(){ 
			     next();
			     }, 500);
			     
		}
		
	};

	var finish = function() {
	    $("body").unbind("keydown", response_handler); // Unbind keys
	    currentview = new Questionnaire();
	};
	
	var show_stim = function(image) {
	        $("body").unbind("keydown", response_handler); // Unbind keys
	        d3.select("#container-exp")
			.append("img") // append image
                        .attr("src", stimFolder + image)
                        .attr("id","pic");
                //15, 31, 47, 63, 89,95,111,127
                if (trialCounter === 15 || trialCounter === 31 || trialCounter === 47 || trialCounter === 63 || trialCounter === 89 || trialCounter === 95 || trialCounter === 111 || trialCounter === 127) {
                    $("body").focus().keydown(response_handler); // collect response
            
                } else {
                
                    setTimeout(function(){ 
		      d3.select("#pic").remove();
		      d3.select("#container-exp")
			    .append("img") // append image
                            .attr("src", "/static/images/Pics/" + "boxes.jpg")
                            .attr("id","boxes");
                            $("body").focus().keydown(response_handler); //collect response
                    }, stimViewTime);
                }
                
	};
	var show_boxes = function(image) {
	        d3.select("#boxes").remove();
	        d3.select("#container-exp")
			.append("img") // append image
                        .attr("src", "/static/images/Pics/boxes.jpg")
                        .attr("id","boxes");
	};

	var remove_stim = function() {
		  d3.select("#boxes").remove();
	};

	
	// Load the stage.html snippet into the body of the page
	psiTurk.showPage('stage.html');

	// Register the response handler that is defined above to handle any
	// key down events.
	 


	// Start the test
	next();
};

/****************
* Questionnaire *
****************/

var Questionnaire = function() {

	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

	record_responses = function() {

		psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'submit'});

		$('textarea').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('select').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);		
		});
		$('input').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);

	};

	prompt_resubmit = function() {
		replaceBody(error_message);
		$("#resubmit").click(resubmit);
	};

	resubmit = function() {
		replaceBody("<h1>Trying to resubmit...</h1>");
		reprompt = setTimeout(prompt_resubmit, 10000);
		
		psiTurk.saveData({
			success: function() {
			    clearInterval(reprompt); 
                //psiTurk.computeBonus('compute_bonus', function(){finish()}); 
			}, 
			error: prompt_resubmit
		});
	};

	// Load the questionnaire snippet 
	psiTurk.showPage('postquestionnaire.html');
	psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'begin'});
	
	$("#next").click(function () {
	    record_responses();
	    psiTurk.saveData({
            success: function(){
                //psiTurk.computeBonus('compute_bonus', function() { 
                	psiTurk.completeHIT(); // when finished saving compute bonus, the quit
                //}); 
            }, 
            error: prompt_resubmit});
	});
    
	
};

// Task object to keep track of the current phase
var currentview;

/*******************
 * Run Task
 ******************/
$(window).load( function(){
    psiTurk.doInstructions(
    	instructionPages, // a list of pages you want to display in sequence
    	function() { currentview = new PDG2_experiment();} // what you want to do when you are done with instructions
    );
});
