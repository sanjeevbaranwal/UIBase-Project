var availableTags=localStorage.getItem("availableTags");
var moduleId = '';
var callChatCacheCheck=0;
var chatAppId=1;
var isAutoSpellCheckEnabled=true;
var isSpellSuggestionCheckEnabled=true;
var isChatCacheEnabled=true;
var spellCheckerArray=[];
var arrayCounter=0;
var wordToReplace=[];
var correctedWords=[];
var validateClientDictionary=true;
/**
 * When user enters below text the above setting changes:-
 * if user enters
 * DISABLEAUTOSPELL -then it will disable autospell functionality
   ENABLEAUTOSPELL -then it will enable autospell functionality
   
   DISABLESPELLSUGGESTION -then it will disable autospell functionality
   ENABLESPELLSUGGESTION -then it will enable autospell functionality
   
   DISABLECHATCACHE- then it will disable chat cache functionality
   ENABLECHATCACHE- then it will enable chat cache functionality.
 */

	
$( function() {
    availableTags = [ 
    ];
    $( "#userInputText" ).autocomplete({
    	maxResults: 3,
        source: function(request, response) {
            var results = $.ui.autocomplete.filter(availableTags, request.term);
            response(results.slice(0, this.options.maxResults));
        }
    });
  } );


function callChatCacheCheckAjax(inputText){
	
	/**
	 * When user enters below text the above setting changes:-
	 * if user enters
	 * DISABLEAUTOSPELL -then it will disable autospell functionality
	   ENABLEAUTOSPELL -then it will enable autospell functionality
	   
	   DISABLECHATCACHE- then it will disable chat cache functionality
	   ENABLECHATCACHE- then it will enable chat cache functionality.
	 */
	inputText=inputText.trim();
	if(inputText.includes("ENABLECHATCACHE")){
		isChatCacheEnabled=true;
		$( "#userInputText" ).autocomplete( "enable" );
	}else if(inputText.includes("DISABLECHATCACHE")){
		isChatCacheEnabled=false;
		$( "#userInputText" ).autocomplete( "disable" );
	}
	
	if(inputText.includes("ENABLEAUTOSPELL")){
		isAutoSpellCheckEnabled=true;
	}else if(inputText.includes("DISABLEAUTOSPELL")){
		isAutoSpellCheckEnabled=false;
	}
	
	if(inputText.includes("ENABLESPELLSUGGESTION")){
		isSpellSuggestionCheckEnabled=true;
	}else if(inputText.includes("DISABLESPELLSUGGESTION")){
		isSpellSuggestionCheckEnabled=false;
	}
	firstWordToReplace="";
	/*if(callChatCacheCheck!=0){
		callSpellCheckAjax();
	}*/
		
if(isChatCacheEnabled)
  { 
	var userInputText = inputText;
	  userInputText=userInputText.trim();
	  var chatList=[{inputText:userInputText,correctedText:""}];
	  var userId=$('#loginusername').val();
	  
	  var found=false;
	  if(availableTags!=null){
		  if(availableTags.length>0){
			  if(availableTags.indexOf(userInputText)> -1){
				  found=true;
			  }
		  }
	  }
	  var moduleId=""; 
	  if(myurl!=null){
	  	var myurlstr = myurl.substring(myurl.indexOf("//")+2,myurl.length);
	  	var words=myurlstr.split('/');
	  	moduleId=words[1];
	  }
	  if(!moduleId || 0 == moduleId.length){
		  found=true;
	  }
	  json = {appId:chatAppId,userId:userId,moduleId:moduleId,chatList:chatList};
	  
	 if(!found){
		 $.ajax({
		        url: myurl+"getChatCache",
		        type: 'POST',        
		        data: JSON.stringify(json),  
		        dataType: "json",
		        beforeSend: function(xhr) {  
		            xhr.setRequestHeader("Accept", "application/json; charset=UTF-8");  
		            xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");  
		        },       
		        success:function(response){ 
		        	 if(availableTags!=null){ 
			        		 if(response!=null){
			        			 $.each(response.chatList, function( index, value ) {
			        					if(availableTags.length == 0){
			        						availableTags.push(value.correctedText);
			        					}else{
			        						if(availableTags.indexOf(value.correctedText)== -1){
			        							availableTags.push(value.correctedText);
			        						}
			        					}
			        				});
			        		 }
			        	localStorage.setItem( 'availableTags', availableTags );
		        	 }
		        	
		        },
		        error : function(xhr, status, error) {
		        	console.log("Error while fetching chatCache ");
				}
		    });
	 } 
  }
}

function callSpellCheckAjax(e){
	var userInputText = $("#userInputText").val();
	if(userInputText.match(/[^a-zA-Z0-9\s\-_\.\?]/))
	{
	  alert("Invalid Data");
	  $('#userInputText').val("");
	  return;
	  
	}
	if(userInputText.match(/<(\w+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/))
	{
	  alert("Invalid Data");
	  $('#userInputText').val("");
	  return;
	  
	}
	userInputText=userInputText;
	$('#suggestion').css("visibility", 'hidden');
    $('#genieTyping').css("visibility", 'hidden');
    $('#suggestion').height('0%');
	$('#conversationSection').height('93%');
	
	if(validateClientDictionary)
	{
		if(e.keyCode==32){
			  var inputWord = userInputText;		  
			  var match = userInputText.split(' ');
				 for (var pattern in match)
				  {
				     var tempVar = match[pattern];
				     inputWord = tempVar;
				   }
			  
			 if (inputWord in jsonDictionary)
			 {
				var val = jsonDictionary[inputWord];
				if(val == inputWord)
				return;
				else
				{
				 var tempText = userInputText;
				  var replaceText=tempText.replace(RegExp(inputWord, "gi"), val.trim());
				  if(isAutoCorrect && isAutoSpellCheckEnabled){
						  $("#userInputText").val(replaceText);
						  $("#userInputText").focus();
						  return;
				 }	
				}
			 }
			 var match = jsonSkipPatterns.split(',')
			 for (var pattern in match)
			  {
			     var tempVar = match[pattern];
			     var regex = new RegExp(tempVar);
			     var res = regex.test(inputWord);
			     if(res)
			     {
			       return;
			     }
			   }			  
		  }
	}
	if(isSpellSuggestionCheckEnabled)
	{	    
	  if(e.keyCode==32){
		  getSpellCheckerValues(e,userInputText);
	  }else{
		  callFAQAjax(e);
	  }
	}else{
		if(e.keyCode==13){
			wordToReplace=[];
			spellCheckerArray=[];
			callFAQAjax(e);
		}
	}
}

function getSpellCheckerValues(e,userInputText){
	//if want to use coloring uncomment below code
	//$("#userInputText").html($("#userInputText").val().replace(regex, "<font style='color:red'>"+userInputText+"</font>"));
	//$("#userInputText").focus();
	userTextValWithST = 0;
	userInputText=userInputText;
	var arrayUterance = userInputText.split(" ");
	
	var userText=arrayUterance[arrayUterance.length-1];
	var spellSuggestionList=[{spellSuggestionWord:userText}];
	
	json = {inputText:userText,spellSuggestionList:spellSuggestionList};
	var currentText="";
	var isAutoCorrect=false;
	var suggstionDetails="";
	var $context = $(".context");
	var wordFound=false;
		
	if(correctedWords!=null){
		  if(correctedWords.length>0){
			  $.each( correctedWords, function( key, obj ) {
				  var inputWordKey = obj.key;
				  var correctedWordValue=obj.value.toString();
				  var tempusrInput=userText.toLowerCase().trim();
				  var tempcorrText=correctedWordValue.toLowerCase().trim();
				  currentText=$("#userInputText").val();
				  if(tempusrInput === inputWordKey){
					  console.log("corrected word "+correctedWordValue);
					  if(correctedWordValue!=''){
						  console.log("This word is previously corrected,not making AJAX call input word :-"+inputWordKey+ " Corrected word :- "+correctedWordValue);
						  currentText=currentText.replace(RegExp(userText, "gi"), correctedWordValue);
						if(isAutoSpellCheckEnabled){
						  $("#userInputText").val(currentText);
						  $("#userInputText").focus();
						}
						wordFound=true;
					  }else{
						  if(spellCheckerArray!=null){
							  if(spellCheckerArray.length >0){
								  var index = wordToReplace.indexOf(userText);
								  $('#suggestion').css("visibility", 'visible');
								  $('#genieTyping').css("visibility", 'hidden');
								  console.log("This word is previously suggested at index " + index + "so,not making AJAX call input word :-"+inputWordKey);
								  getValuesFromArray(index,userText);
								  wordFound=true;
							  }
						  }
					  }
				  }
				});
		  }
	}
	
	if(!wordFound){
		$.ajax({
			url: "getAutoSpellChecker",
	        type: 'POST',        
	        data: JSON.stringify(json),  
	        dataType: "json",
	        beforeSend: function(xhr) {  
	            xhr.setRequestHeader("Accept", "application/json; charset=UTF-8");  
	            xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");  
	        },  
			success:function(response){ 
				console.log("Spell checker call was successful");
				var correctedText="";
				var res = "";
				res = res + isNaN(userText)
				if(isNaN(userText)==false) //check number is a number 
				{
					return ;
				}
				currentText=$("#userInputText").val();
				if(response!=null){
					isAutoCorrect=response.isAutoCorrect;
					//if autocorrect true mean replace word in text
					if(isAutoCorrect){
						var count=0;
		   			   $.each(response.spellSuggestionList, function( index, value ) {
		   				   correctedText = value.spellSuggestion;
		   				});
					}//else autocorrect false mean show suggestions.
					else{
						$.each(response.spellSuggestionList, function( index, value ) {
							if(suggstionDetails!=""){
								suggstionDetails = suggstionDetails+" | "+"<a id='"+value.spellSuggestion + "' href =javascript:replaceWord('"+value.spellSuggestion+"','"+userText+"',true"+");>"+ value.spellSuggestion+"</a>";
							}else{
								suggstionDetails = suggstionDetails+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id='"+value.spellSuggestion + "' href =javascript:replaceWord('"+value.spellSuggestion+"','"+userText+"',true"+");>"+ value.spellSuggestion+"</a>";
							}
						});
					}
	   		    }
				var tempuserInput=userText.toLowerCase().trim();
				var tempcorrectedText=correctedText.toLowerCase().trim();
				if(currentText.includes(userText)){
					//if want to use coloring uncomment below code
					//currentText=currentText.replace(RegExp(userInputText, "gi"), "<font style='color:green'>"+correctedText+"</font>");
					//$("#userInputText").html(currentText);
					if(!(tempuserInput==tempcorrectedText)){
						  currentText=currentText.replace(RegExp(userText, "gi"), correctedText.trim());
						if(isAutoCorrect && isAutoSpellCheckEnabled){
						  $("#userInputText").val(currentText);
						  $("#userInputText").focus();
						}
					}else {
						currentText=correctedText;
					}
					var correctedValue=correctedText.trim();
					var word = {
							  key: userText,
						      value: correctedText.trim()
						    }
						correctedWords.push(word);
					}
				console.log(" correctedWords "+correctedWords);
				if(!isAutoCorrect){
					$('#suggestion').css("visibility", 'visible');
					$('#genieTyping').css("visibility", 'hidden');
					if(suggstionDetails!=''){
						spellCheckerArray.push(suggstionDetails);
					}
					wordToReplace.push(userText);
					getValuesFromArray(0,userText);
				 }
		},
			error : function(xhr, status, error) {
				console.log("Error while checking spelling");
			}	
		});
   }
}
function getValuesFromArray(arrayCounter,actualWord){
	if(spellCheckerArray!=null && spellCheckerArray[arrayCounter]!=null){
		$("#suggestionTitle").text("Word to Replace -");
		var tempText=$("#suggestionTitle").text()+" "+wordToReplace[arrayCounter];
		$("#suggestionTitle").text(tempText);
		$("#genieSuggestText").html(spellCheckerArray[arrayCounter]);
		$('#suggestion').height('25%');
		$('#conversationSection').height("75%");
	}
}
function replaceWord(wordToReplace,actualWord,isReplaceflag){
	//console.log("called wordToReplace "+wordToReplace+" actualWord "+actualWord+" isReplaceflag "+isReplaceflag);
	var currntText=$("#userInputText").val();
	if(isReplaceflag){
		currntText=currntText.replace(RegExp(actualWord, "gi"), wordToReplace.trim());
		$("#userInputText").val(currntText);
		if(spellCheckerArray.length > arrayCounter ){
			arrayCounter=arrayCounter+1;
		}
		else if(arrayCounter > spellCheckerArray.length){
			arrayCounter=arrayCounter-1;
		}
	}
	if(actualWord=='L'){
		if(arrayCounter > 0){
			arrayCounter=arrayCounter-1;
		}
	}else if (actualWord=='R'){
		if((spellCheckerArray.length-1) > arrayCounter){
			arrayCounter=arrayCounter+1;
		}
	}
	getValuesFromArray(arrayCounter,actualWord);
	
	if(arrayCounter == spellCheckerArray.length || arrayCounter > spellCheckerArray.length ){
		arrayCounter=0;
		//spellCheckerArray=[];
		$('#suggestion').css("visibility", 'hidden');
	    $('#genieTyping').css("visibility", 'hidden');
	    $('#suggestion').height('0%');
		$('#conversationSection').height('93%');
	}
 }


