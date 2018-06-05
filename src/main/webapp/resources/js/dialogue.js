 document.writeln("<script type='text/javascript' src='resources/js/loadConfig.js'></script>");
 document.writeln("<script type='text/javascript' src='resources/js/spellCheckAndCache.js'></script>");
  document.writeln("<script type='text/javascript' src='resources/js/recorder.js'></script>");
  document.writeln("<script type='text/javascript' src='resources/js/firebase.js'></script>");
  var useGoogleChromeMic = false;
  var useNgGenieMic = false;
  var dragging = 0;
  var dialogWidth = 'auto';
  var prevTransactionId;
  var dialogHeight = 420;
  var ToggleSelector = 0;
  var checkForVideoToggle = 0;
  var videoName;
  var pdfName;
  var isVidioPlay = 0;
  var _currentWindow;
  var _emailTextContent = 0;
  var _isVideoFinished = 0;
  var _showCnfirmaitonMessage = 0;
  var userFeedbackTxt="";
  var isUserRating=false;
  var userFeedbackRating=0.0;
  var divDynamicCounter=3;
  var audio_context;
  var isMobile = {
		    Android: function() {
		        return navigator.userAgent.match(/Android/i);
		    },
		    BlackBerry: function() {
		        return navigator.userAgent.match(/BlackBerry/i);
		    },
		    iOS: function() {
		        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		    },
		    Opera: function() {
		        return navigator.userAgent.match(/Opera Mini/i);
		    },
		    Windows: function() {
		        return navigator.userAgent.match(/IEMobile/i);
		    },
		    any: function() {
		        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		    }
		};
						
		try {
        // webkit shim
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        navigator.getUserMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);
        window.URL = window.URL || window.webkitURL;

        audio_context = new AudioContext;
      } catch (e) {
        alert('No web audio support in this browser!');
      }
   
   function getContextPath() {
        return window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));
   }
   
   function playSound(text){
	   var url = getContextPath() + "/playWav?input="+text;
	   var audio = document.createElement('audio');
	   audio.style.display = "none";
	   audio.src = url;
	   audio.autoplay = true;
	   audio.onended = function(){
	     audio.remove() //Remove when played.
	   };
	   document.body.appendChild(audio);
	 }
   
  function greeting()
  {
	  var dt = new Date();
	  var time = dt.getHours();
	  var msgTitle = '${msgTitle}';
	  if(time>=0&&time<12)
		  {
		  greetings=$("#greetmorning").val();
		  
		  }
	  else if(time>=12&&time<17)
	  {
	  greetings=$("#greetafternoon").val();
	  
	  }
	  else
	  {
	  greetings=$("#greetevening").val();
	  
	  }
/*	  setTimeout(function(){ 
		  //alert($("#userName").val())
		  $("#genieText").text(greetings+" "+$("#userName").val()+", I am ngGenie, How may I help you?");
	   }, 2000);*/
	 // alert( 'loginusername  = > ' + $("#loginusername").val())
	   if(window.location.href.indexOf("email") != -1){
		   if(msgTitle==""){
			    $("#genieText").text("Sorry I could not find requested email details!!");
			    $("#queryArea *").attr("disabled", "disabled");    
		   }
		   else{
	  			$("#genieText").text(greetings+" "+$('#loginusername').val()+", I am ngGenie, I am here to help you with the issue you sent in email with subject :"+ msgTitle);
		   }
	   }else{
		   //var langText = '<spring:message code="welcome.springmvc" text="default text" />';
		   $("#genieText").text(greetings+" "+$('#loginusername').val()+ $("#initialGenieMsg").val());  
	   }
	  //$("#genieText").text(greetings+" ${userId}, I am ngGenie, How may I help you?");
  }
  
  function msieversion() {
      var ua = window.navigator.userAgent;                                      
      var msie = ua.indexOf("MSIE ");
      if (msie > 0)
      {      // If Internet Explorer, return version number
	      var version = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
	      //alert(version);
	      if(version < 10)
	      {
	      	//alert('Sorry we are not supporting this version of Internet browser');
	      	window.location="BrowserSupportAlert"
	      }       
       }      
  }
  
  function  validateEmpId(empId){
      if(isNaN(empId)){
      	alert('Please give only numbers in empId field');
      	return false;
      }
      else {
    	  if(empId.length<7 || empId.length>7){
          	alert('The empId should be of length 7');
          	return false;
          }
    	  else{
               if(empId.indexOf('70') == 0){
                  return true;
               }
               else{
                   alert('EmpId should starts with 70');
                   return false;
                   }
          }
      }
}

  
  var isRequestSend=0;
  $(function() {
	   $("#divLoading").hide();
$( "#draggable" ).draggable({ containment: "#containingBox", scroll: false });
	  
		
	  $("#playImage").click(function () {
		  playVid();
		  });
	  
	  $("#pauseImage").click(function () {
		  pauseVid();
		  });  
		  
     /*Menu*/
     if (isAutoSpellCheckEnabled == true) {
         spellCorrectionImgSrc = "resources/images/onImage.png";
         spellCorrectionImgSwapSrc = "resources/images/offImage.png";
     } else {
         spellCorrectionImgSrc = "resources/images/offImage.png";
         spellCorrectionImgSwapSrc = "resources/images/onImage.png";
     }

     if (isSpellSuggestionCheckEnabled == true) {
         spellSuggestionImgSrc = "resources/images/onImage.png";
         spellSuggestionImgSwapSrc = "resources/images/offImage.png";
     } else {
         spellSuggestionImgSrc = "resources/images/offImage.png";
         spellSuggestionImgSwapSrc = "resources/images/onImage.png";
     }

     if (isChatCacheEnabled == true) {
         autoCompleteImgSrc = "resources/images/onImage.png";
         autoCompleteImgSwapSrc = "resources/images/offImage.png";
     } else {
         autoCompleteImgSrc = "resources/images/offImage.png";
         autoCompleteImgSwapSrc = "resources/images/onImage.png";
     }
     if (useGoogleChromeMic == true) {
         useGoogleMicImgSrc = "resources/images/onImage.png";
         useGoogleMicImgSwapSrc = "resources/images/offImage.png";
     } else {
         useGoogleMicImgSrc = "resources/images/offImage.png";
         useGoogleMicImgSwapSrc = "resources/images/onImage.png";
     }
     if (useNgGenieMic == true) {
         useNgGenieMicImgSrc = "resources/images/onImage.png";
         useNgGenieMicSwapSrc = "resources/images/offImage.png";
     } else {
         useNgGenieMicImgSrc = "resources/images/offImage.png";
         useNgGenieMicImgSwapSrc = "resources/images/onImage.png";
     }
     if (userInputArray.length != 0) {
         clearChatImgSrc = "resources/images/ClearChat-Enabled.png";
         clearChatImgSwapSrc = "resources/images/ClearChat-Disabled.png";
     } else {
         clearChatImgSrc = "resources/images/ClearChat-Disabled.png";
         clearChatImgSwapSrc = "resources/images/ClearChat-Enabled.png";
     }
	 
	//var footer = '<div id="queryArea"><table style="width: 100%;height: 70px;"><tr><td><textarea id="userInputText" style="resize:none; border: 0; outline: none;" onkeydown="if (event.keyCode == 13) { return callFAQAjax(event); }"></textarea></td><td><div style="margin-left:25%"><input type="image" src="resources/images/sendbt.png" name="Ask Genie" value="Submit" onclick="return callFAQAjax(event);"><br><input type="image" src="resources/images/clear.png" tooltip="Clear Conversation" height="23" width="27" name="clear" value="clear"  onclick="resetForm()" ></div></td></tr></table></div>';
	var footer = '<div id="queryArea"><table id="tblQueryArea" style="width: 100%;height: 100%; background-color: white;"><tr style="border-top: 1px solid black;"><td style="width:100%;"><textarea id="userInputText" placeholder="Ask Away Anything" style="resize:none; border: 0; outline: none; height:80%;" onkeydown="if (event.keyCode == 32) { return callSpellCheckAjax(event); }" onkeyup="if (event.keyCode == 13) { return callSpellCheckAjax(event); }"></textarea></td><td><div style="margin-left:10%"><input type="image" id="sendUserTextBtn" src="resources/images/Send-Default.png" name="Ask Genie" value="Submit" onclick="return callSpellCheckAjax(event);"><br></div></td><td><div style="margin-left:5%;display:none"><input type="image" id="record" src="resources/images/audio.gif" name="Recording" value="Submit"  onclick="return stoprecording(event);" style="height: 50px;width: 50px;"><br></div></td><td><div style="margin-left:5%;display:none"><input type="image" id="startrecord" src="resources/images/OffMic.png" name="Start Recording" value="start" onclick="return startrecording(event);" style="height: 50px;width: 50px;"><br></div></td></tr></table></div>';
	  //var footer = '<div id="queryArea"><table id="tblQueryArea" style="width: 100%;height: 75px; background-color: white;"><tr><td><div id="userInputText"  contenteditable="true" style="width: 300px; max-width: 300px;overflow-x: hidden;overflow-y: scroll;word-break: break-all" onkeydown="if (event.keyCode == 32) { return callSpellCheckAjax(); }" onkeydown="if (event.keyCode == 13) { return callFAQAjax(event); }"></div></td><td><div style="margin-left:25%"><input type="image" src="resources/images/sendbt.png" name="Ask Genie" value="Submit" onclick="return callFAQAjax(event);" style="height: 50px;width: 50px;"><br></div></td></tr></table></div>';
	
    $( "#dialog" ).dialog({
      autoOpen: false,
//       modal: true,
      closeOnEscape: false,
      show: {
        effect: "blind",
        duration: 700
      },
      width : 385,
      height : 520,
      minHeight: 255,
      responsive: true,
      hide: {
        effect: "blind",
        duration: 1000
      },
      dialogClass: "myDialog",
      create: function() {
        $(".myDialog").append(footer);
      }
    });
    var windowHeight = $(window).height();
    windowHeight = windowHeight + 300;
    $( "#dialog" ).dialog({
          open: function(event, ui){
        	  $(this).parent().find('.ui-dialog-title').empty();
        	  $(".ui-dialog").addClass("ui-dialog-shadow");      	    
        	  //$(this).parent().find('.ui-dialog-titlebar').append('<div id="divTopBlueBar" ><a href="javascript:void(0);"><img src="resources/images/close.png" id="closeButton" style="float: right;padding-top: 5px;" onClick="javascript:closeDialogBox();"></a><table style="width:100%" ><tr><td><IMG class="displayed" alt="" src="resources/images/genie.png" /></td><td><div  onclick="showActiveAlerts()"><table height="35px" width="29px" background="resources/images/Alert_Badge.png" cellpadding="0" cellspacing="0"><tbody><tr><td valign="center" align="right"><div id="alertId" style="float:center" ><font color="white" size="2"></font></div></td></tr></tbody></table></div></td><td style="width:50%;align:right"><font face="Roboto, Arial" color="white"  size="4">ngGenie Quest Diagnostics</font></td></tr></table></div>');
        	  //$(this).parent().find('.ui-dialog-titlebar').append('<div id="divTopBlueBar" ><a href="javascript:void(0);"><img src="resources/images/close.png" id="closeButton" style="float: right;padding-top: 5px; margin-right: -4%;height: 14px;width: 14px;" onClick="javascript:closeDialogBox();"></a><table style="width:100%; height : 100%;" ><tr><td><IMG class="displayed" alt="" src="resources/images/genie.png" /></td><td><div  onclick="showActiveAlerts()"><table height="29px" width="29px" background="resources/images/Alert_Badge.png" cellpadding="0" cellspacing="0" style="background-repeat: round;"><tbody><tr><td valign="center" align="right"><div id="alertId" style="float: none;margin-top: 8px;" ><font color="white" size="2"></font></div></td></tr></tbody></table></div></td><td style="width:50%;align:right"><font face="Roboto, Arial"  size="4" style="color: rgb(0,133,63);">ngGenie</font></td></tr></table></div>');
        	  //$(this).parent().find('.ui-dialog-titlebar').append('<div id="divTopBlueBar"><table style="width: 55%; height : 100%;float: left;"><tbody><tr><td style="width: 45%;"><img class="displayed" alt="" src="resources/images/ngGenieLogo.png"></td><td style=" color :rgb(47, 177, 53);width: 5%; visibility: hidden;"> | </td><td><div onclick="showActiveAlerts();" style="width:29px;visibility: hidden;"><table height="29px" width="29px" background="resources/images/Alert_Badge.png" cellpadding="0" cellspacing="0" style="background-repeat: round;"><tbody><tr><td valign="center" align="right"><div id="alertId" style="float: right;margin-top: -17px;margin-right: 3px;"><font color="white" size="2"></font></div></td></tr></tbody></table></div></td></tr></tbody></table><div style="float: right;"><div style="margin-top: 5px; margin-left: 45%;"><a href="javascript:void(0);"><img src="resources/images/Minimizeicon.png" id="minimizeButton" style=" height: 18px;width: 18px;margin-right: 3px;" onclick="javascript:minimizeDialogBox();"></a><a href="javascript:void(0);"><img src="resources/images/close.png" id="closeButton" style=" height: 18px;width: 18px;" onclick="javascript:closeDialogBox();"></a></div><div><img src="resources/images/Quest_Logo.png" style="margin-top: 4px; height : 33px; visibility: hidden;"></div></div></div>');
        	// $(this).parent().find('.ui-dialog-titlebar').append('<div id="divTopBlueBar"><table style="width: 55%; height : 100%;float: left;"><tbody><tr><td style="width: 45%;"><img class="displayed" alt="" src="resources/images/ngGenieLogo.png"></td><td style=" color :rgb(47, 177, 53);width: 5%; visibility: hidden;"> | </td><td><div onclick="showActiveAlerts();" style="width:29px;visibility: hidden;"><table height="29px" width="29px" background="resources/images/Alert_Badge.png" cellpadding="0" cellspacing="0" style="background-repeat: round;"><tbody><tr><td valign="center" align="right"><div id="alertId" style="float: right;margin-top: -17px;margin-right: 3px;"><font color="white" size="2"></font></div></td></tr></tbody></table></div></td></tr></tbody></table><div style="margin-right: 2%; float: right;"><div style="margin-top: 5px;"><a href="javascript:void(0);"><img src="resources/images/Minimizeicon.png" id="minimizeButton" style=" height: 18px;width: 18px;margin-right: 3px;" onclick="javascript:minimizeDialogBox();"></a><a href="javascript:void(0);"><img src="resources/images/close.png" id="closeButton" style=" height: 18px;width: 18px;" onclick="javascript:closeDialogBox();"></a></div></div></div> <div class="dropdown" style="float:right;font-size: small;"> <img src="resources/images/3lines.png" class="dropbtn" style=" height: 20px; width: 20px; "> <div class="dropdown-content"> <a href="#">Clear Chat</a> <a href="#">Chat History</a> <a href="#">Help</a> </div> </div>');
			
        	
  			//$(this).parent().find('.ui-dialog-titlebar').append('<div id="divTopBlueBar"> <table style="width: 55%; height : 100%;float: left;"> <tbody> <tr> <td style="width: 45%;"> <img class="displayed" alt="" src="resources/images/ngGenieLogo.png"> </td> <td style=" color :rgb(47, 177, 53);width: 5%; visibility: hidden;"> | </td> <td> <div onclick="showActiveAlerts();" style="width:29px;visibility: hidden;"> <table height="29px" width="29px" background="resources/images/Alert_Badge.png" cellpadding="0" cellspacing="0" style="background-repeat: round;"> <tbody> <tr> <td valign="center" align="right"> <div id="alertId" style="float: right;margin-top: -17px;margin-right: 3px;"> <font color="white" size="2"/> </div> </td> </tr> </tbody> </table> </div> </td> </tr> </tbody> </table> <div style="margin-right: 2%; float: right;"> <div style="margin-top: 5px;"> <a href="javascript:void(0);"> <img src="resources/images/Minimizeicon.png" id="minimizeButton" style=" height: 18px;width: 18px;margin-right: 3px;" onclick="javascript:minimizeDialogBox();"> </a> <a href="javascript:void(0);"> <img src="resources/images/close.png" id="closeButton" style=" height: 18px;width: 18px;" onclick="javascript:closeDialogBox();"> </a> </div> <div class="dropdown" style="float:right;font-size: small;"> <img src="resources/images/3lines.png" class="dropbtn" style="height: 20px;width: 20px;margin-top: 15px;/* margin-left: -6px; */"> <div class="dropdown-content"> <table><tr> <td style="float : left; width: 80%;"> <a href="#" onclick="useChromeMic(\'img4\');">Use Google Mic</a> </td> <td style="float : right"> <img id ="img4" style="width:75%;"src='+img4src+'  data-swap='+img4swapsrc+' onClick="useChromeMic(this.id) "/> </td> </tr><tr> <td style="float : left; width: 80%;"> <a href="#" onclick="useNgGenieMicCall(\'img5\');">Use HMI Mic</a> </td> <td style="float : right"> <img id ="img5" style="width:75%;"src='+img5src+'  data-swap='+img5swapsrc+' onClick="useNgGenieMicCall(this.id) "/> </td> </tr><tr> <td style="float : left; width: 80%;"> <a href="#" onclick="spellcorrectionfun(\'img1\');">Spell Correction</a> </td> <td style="float : right"> <img id ="img1" style="width:75%;"src='+img1src+'  data-swap='+img1swapsrc+' onClick="spellcorrectionfun(this.id) "/> </td> </tr> <tr> <td style="float : left; width: 80%;"> <a href="#" onclick="spellsuggestionfun(\'img2\');">Spell Suggestion</a> </td> <td style="float : right"> <img  id ="img2" style="width:75%; "src='+img2src+'  data-swap='+img2swapsrc+' onclick="spellsuggestionfun(this.id) "/> </td> </tr> <tr> <td style="float : left ;"> <a href="#" onclick="sentencecompletionfun(\'img3\');">Sentence Completion  </a> </td> <td style="float : right"> <img  id ="img3" style="width:75%;"src='+img3src+' data-swap='+img3swapsrc+' onclick="sentencecompletionfun(this.id) "/> </td> </tr> <tr> <td> <a href="#" onclick="javascript:resetForm()();">Clear Chat</a> </td> </tr> <tr> <td> <a href="#" onclick="javascript:minimizeDialogBox();">Close</a> </td> </tr> </table> </div> </div> </div> </div>');
			$(this).parent().find('.ui-dialog-titlebar').append('<div id="divTopBlueBar"><table class="dialogueTable"><tbody><tr><td><img class="displayed" style="margin-left:2px;"alt="GenieLogo" src="resources/images/ngGenieLogoDialogue.png"></td><td><div onclick="showActiveAlerts();" style="width:29px;visibility: hidden;"><table height="29px" width="29px" background="resources/images/Alert_Badge.png" cellpadding="0" cellspacing="0" style="background-repeat: round;"><tbody><tr><td valign="center" align="right"><div id="alertId" style="float: right;margin-top: -17px;margin-right: 3px;"><font color="white" size="2"/></div></td></tr></tbody></table></div></td><td><div style="float:right; margin-bottom:22%;"><a href="javascript:void(0);"><img src="resources/images/AvatarMinimize-Default.png" id="minimizeRemoteSMEButton" onclick="javascript:showChatHelper(\'init\');"></a><div class="MenuDropDownBox" style="font-size: small;"><img id="dropDownMenuImg" src="resources/images/Menu-Default.png"><div class="MenuDropDownBox-Content"><div class="MenuDropDownBoxTable" style="width:100%"><a class="MenuDropDownBox-TableRow" href="#" onclick="spellcorrectionfun(\'spellcorrectionbutton\');"><div class="MenuDropDownBox-TableCell" style="width:100%">Spell Check</div><div class="MenuDropDownBox-TableCell"><img class="spellcorrectionbutton" src=' + spellCorrectionImgSrc + ' data-swap=' + spellCorrectionImgSwapSrc + '/></div></a><a class="MenuDropDownBox-TableRow" href="#" onclick="spellsuggestionfun(\'spellsuggestionbutton\');"><div class="MenuDropDownBox-TableCell" style="width:100%">Spell Suggestion</div><div class="MenuDropDownBox-TableCell"><img  class="spellsuggestionbutton" src=' + spellSuggestionImgSrc + '  data-swap=' + spellSuggestionImgSwapSrc + '/></div></a><a class="MenuDropDownBox-TableRow" href="#" onclick="sentencecompletionfun(\'sentencecompletionbutton\');"><div class="MenuDropDownBox-TableCell" style="width:100%">Auto Completion</div><div class="MenuDropDownBox-TableCell"><img  class="sentencecompletionbutton" src=' + autoCompleteImgSrc + ' data-swap=' + autoCompleteImgSwapSrc + '/></div></a><a class="MenuDropDownBox-TableRow" href="#" onclick="useChromeMic(\'useGoogleMicbutton\');"><div class="MenuDropDownBox-TableCell" style="width:100%">Use Google Mic</div><div class="MenuDropDownBox-TableCell"><img  class="useGoogleMicbutton" src=' + useGoogleMicImgSrc + ' data-swap=' + useGoogleMicImgSwapSrc + '/></div></a><a class="MenuDropDownBox-TableRow" href="#" onclick="useNgGenieMicCall(\'useNgGenieMicbutton\');"><div class="MenuDropDownBox-TableCell" style="width:100%">Use HMI Mic</div><div class="MenuDropDownBox-TableCell"><img class="useNgGenieMicbutton" src=' + useNgGenieMicImgSrc + ' data-swap=' + useNgGenieMicImgSwapSrc + '/></div></a><a class="MenuDropDownBox-TableRow ClearChatRow" href="#" onclick="dropdowncontenthidefunction(); javascript:resetForm();"><div class="MenuDropDownBox-TableCell" style="width:100%">Clear Chat</div><div class="MenuDropDownBox-TableCell"><img class="clearchatbutton" src=' + clearChatImgSrc + ' data-swap=' + clearChatImgSwapSrc + '/></div></a></div></div></div><a href="javascript:void(0);"><img src="resources/images/Minimize-Default.png" id="minimizeButton" onclick="javascript:minimizeDialogBox();"></a><a href="javascript:void(0);"><img src="resources/images/Close-Default.png" id="closeButton" onclick="javascript:closeDialogBox();"></a></div></td></tr></tbody></table></div>');
  			  },
          close: function (event, ui) { 
        	  $(this).parent().find('.ui-dialog-titlebar').empty(); 
           }
    });

    $("#dialog").css("visibility","visible");
    $("#dialog").css("background-color","white");
    $('#dialog').bind("dialogresize", function (event, ui) {
    resizeAllElements();
        /*
    	$("#grad1").width($("#dialog" ).width()-2);
    	$("#divTopBlueBar").width($("#dialog" ).width()-2);
    	$("#conversationSection").width($("#dialog" ).width()-2);
    	$("#genieTyping").width($("#dialog" ).width()-20);
    	$("#queryArea").width($("#dialog" ).width()-2);
    	$('#userInputText').width($("#dialog" ).width()-70);

    	$("#genieText").width($("#dialog" ).width()-45);
		$("#userText").width($("#dialog" ).width()-75);
		$("#genietopimg").width($("#dialog" ).width()-20);
		$("#geniebottomimg").width($("#dialog" ).width()-20);
		$("#usertopimg").width($("#dialog" ).width()-50);
		$("#userbottomimg").width($("#dialog" ).width()-50);

		$("div[id^=genieText]").width($("#dialog" ).width()-45);
		$("div[id^=userText]").width($("#dialog" ).width()-75);
		$("IMG[id^=genietopimg]").width($("#dialog" ).width()-20);
		$("IMG[id^=geniebottomimg]").width($("#dialog" ).width()-20);
		$("IMG[id^=usertopimg]").width($("#dialog" ).width()-50);
		$("IMG[id^=userbottomimg]").width($("#dialog" ).width()-50);
		
*/		
    	
    });
    
   
	 $( "#opener" ).click(function() {
		 greeting();
		 $("#draggable").hide();
	     $("#genieTypingText").hide();
	    // getActiveMessages();
	     //dialogInitiaize();
	    $('#overlay').fadeIn('fast',function(){ 
	    $( "#dialog" ).dialog( "open" );
 	    $( "#dialog" ).removeAttr("style");
 		if ($(window).width() <= 680)
 		{
 			var width = $(window).width();
 			var height = $(window).height();
 			height = height - (68 + parseInt( $("#queryArea").css("height").replace('px', ''))); 
 			$( "#dialog" ).css( "height", height);
 			$( "#dialog" ).css( "width", width);
 			$(".ui-dialog").css("width", width);
 			$( "#dialog" ).dialog( "option", "position",{my: "left top",at: "left top", of: window});
 			setTimeout(function(){ $(".ui-dialog").css("width", width);$(".ui-dialog").css("left", 0);}, 900);
			if( isMobile.any() )
			{
				$('body').css('overflow-y','hidden');
			}
 		}
 		else
 		{
 			if($(window).height() > 900)
 			{
 				$( "#dialog" ).css( "height", 650);
 			}
 			else
 			{
 				$( "#dialog" ).css( "height", dialogHeight);
 			}
 			$( "#dialog" ).css( "width", dialogWidth);
 		}
		//fluidDialog();
// 	    $( "#dialog").css({'min-width': '255px'});
// 	    event.preventDefault();
	     });
	    setTimeout(function(){ 

		    $('#userInputText').focus(); 
		   /* if($("#alertMessagesCount").val() < 9){
		    	$('#alertId').append("<font color=white size=1><B>0"+$("#alertMessagesCount").val()+"</font>");
		    }
		    else{
		    	$('#alertId').append("<font color=white size=1><B>"+$("#alertMessagesCount").val()+"</font>");
			}*/
		 }, 2000);

	    //added for suggestion call cache
		if(callChatCacheCheck==0){
	    	callChatCacheCheckAjax("GETALL");
	    	callChatCacheCheck=1;
	 	}
		spellCheckerArray=[];
		arrayCounter=0;	    
	  });
 
 	$('#draggable').click(function(){
	 $('#opener').trigger('click');
	});
$(document).ready(function(){
	msieversion();
	var checkopen = 0;
	if( isMobile.any() )
	{
		$('#opener').trigger('click');
		checkopen = 1;
		document.getElementById("containingBox").style.visibility = "hidden"; 
		setTimeout(function () {document.getElementById("minimizeButton").style.visibility = "hidden";}, 1000);
		$("#imgLogo").attr("src", "resources/images/ngGenieLogo.png");
		$("#imgHelpdesk").attr("src", "resources/images/Mobile.jpg")
		$("#draggable").css("display", "none");
		divfooterMessage.innerHTML = "This mobile site is best viewed in Android V 4.4 and above, IOS V 8 and above. Copyright @2015 Wipro Ltd. All Rights reserved "
	}
	else
	{
		$("#imgLogo").attr("src", "resources/images/ngGenieLogo.png");
		$("#imgHelpdesk").attr("src", "resources/images/Helpdesk1.jpg")
	}
	if (window.location.href.indexOf("email") != -1)
	{
		_currentWindow = window;
		var emailusername = '${username}';
		$("#userName").val(emailusername);
		if(checkopen == 0)
		{
			$('#opener').trigger('click');
		}
		document.getElementById("containingBox").style.visibility = "hidden"; 
		setTimeout(function () {document.getElementById("minimizeButton").style.visibility = "hidden";}, 1000);
		var json = '${emailJSON}';
		//alert(JSON.stringify(json));
		//var json = '{"transactionId":"201510061012043020001","userInputText":"Printer not workingI\u0027m unable to access printer. Kindly look into the issue and help me to fix the problem"}';
		 var newjson = json.replace(/([.;|\[\]\/\\])/g,' ');
		 obj = JSON.parse(newjson);
		var transactionStatus= '${transactionStatus}';
		var convertedtext= '${ConvertedText}';
			if(transactionStatus=="RESOLVED")
			{
				$("#conversationSection").append("<Div><div id='genieText'  class='bubble'>Resolution has already been provided for this issue. If you again facing issue again request you to send us a new email.Thank You.</div></Div>");
				setTimeout(function () {$("#queryArea *").attr("disabled", "disabled");}, 1000);
			}	
			else if(transactionStatus=="NOTRESOLVED"||transactionStatus=="CLOSED")
			{
				$("#conversationSection").append("<Div><div id='genieText'  class='bubble'>Your ticket has already been created for this issue. Our team will get back to you soon with resolution. Thank You </div></Div>");
				setTimeout(function () {$("#queryArea *").attr("disabled", "disabled");}, 1000);
			}
			else if(transactionStatus=="INPROGRESS")
			{
				$("#conversationSection").append("<Div><div id='genieText'  class='bubble'>"+ convertedtext +"</div></Div>");
				$('#transactionId').val(obj.transactionId);
				
			}
			else
			{
				_emailTextContent = 1;
	  			$('#transactionId').val(obj.transactionId);	  			
	  			$('#userInputText').val(obj.userInputText);			
				callFAQAjax("email");
			}
		
	}
	else
	{
		document.getElementById("draggable").style.visibility = "visible"; 
		//document.getElementById("minimizeButton").style.visibility = "visible";
	}
	if (window.location.href.indexOf("hi_IN") != -1)
	{
		$("#selectlang").val("?language=hi_IN");
	}
	if (window.location.href.indexOf("de_DE") != -1)
	{
		
		$("#selectlang").val("?language=de_DE");
	}
});
	
	/* $( window ).unload(function() {
		alert("success");
	}); */

/* 	window.onbeforeunload = function() {
	    if($('#transactionId').val() != '')
	    	{
	    	setFeedBackValue($('#transactionId').val());
	    	}
	}; */
	
function callFAQ(json)
{
	$.ajax({
        url: "faq",
        type: 'POST',        
        data: json, 
        cache:false,
        beforeSend: function(xhr) {  
            xhr.setRequestHeader("Accept", "application/json");  
            xhr.setRequestHeader("Content-Type", "application/json");  
        },       
        success:function(response){		  			
		  			var oldscrollHeight = document.getElementById('conversationSection').scrollHeight - 20;	 
		 			var resVal = response.errorText;
		    	  $("#conversationSection").append("<Div><div id='genieText'  class='bubble'>" + resVal + "</div></Div>");   		  
		   		$("#genieTypingText").hide();
		   		isRequestSend=0;
		   		$('#id').val(response.id);
	  			$('#errorCode').val(response.errorCode);
	  			$('#transactionId').val(response.transactionId);
	  			$('#userId').val(response.userId);
	  			$('#typeOfMessage').val(response.typeOfMessage);
	  			$('#answerType').val(response.answerType);
	  			$('#dataToCollect').val(response.dataToCollect);
	  			
	  			$('#userInputText').val(response.userInputText);
	  			$('#errorText').val(response.errorText);
	  						
	  			 CheckForToggle(response.errorText);
	  		     resizeAllElements();
		  		     
		  			//alert("   ErrorText: "+response.errorText+"  UserInputText: "+response.userInputText);
		          },
		          error : function(xhr, status, error) {
		        	  //$("#genieTypingText").hide();
		        	  $("#genieTypingText").html('<span id="genieTypingText" style="color: #A30000; font-size: 15px;">Error occurred!! Try again after sometime...</span>');
		        	  isRequestSend=0;
		        	  //alert(xhr.responseText);
		  			
		  		}
});
}
	
 $( "#slider" ).click(function() {
		
	 runEffect(url);
   });
 
 $( "#video_slider" ).click(function() {		
	 loadVideo("resources/videos/mov_bbb.mp4");
   });
 
//  $(".ui-dialog").resize(function() {
// 	  var position = GetDialogLocation();
// 	  setTimeout(function(){$("#divToggler").css("padding-left", position);}, 100);
// 	});
 
 $( "#dialog" ).dialog({
     resize: function(event, ui) {
    	 setTimeout(function()
    	{
	   		var position = GetDialogLocation();
    		var Size = GetDialogTopHeight();
    		parent.postMessage("resize-" + parseInt( $(".ui-dialog").css("height").replace('px', '')) + "-" + parseInt( $(".ui-dialog").css("width").replace('px', '')),"*");
    		$("#divToggler").css("padding-left", position);
    			if ($("#alert_effect").is(':visible'))
	    		{
	    			$("#alert_effect").css("height", Size[1]);
	    		}
	    		else if($("#form_effect").is(':visible'))
	    		{
	    			$("#form_effect").css("height", Size[1]);
	    		}
	    		else if($("#video_effect").is(':visible'))
	    		{
	    			$("#video_effect").css("height", Size[1]);
	    		} 
    	}, 500);
     }
  });
 	
 // remove the title bar
 //Commented by Sanjay
    //$("#dialog").siblings('div.ui-dialog-titlebar').remove();
    // one liner
    //$("#dialog").dialog(dialogOpts).siblings('.ui-dialog-titlebar').remove();
    
    $('.ui-widget-overlay').css('background', 'white');


    $(window).resize(function () {
        var dWidth = $("#dialog").width();
        setTbl();
       // alert(dWidth)
		//$("#grad1").width(dWidth)       
       
    });

  });

 function resizeAllElements(){
// 	 $("#grad1").width($("#dialog" ).width()-2);
//  	$("#divTopBlueBar").width($("#dialog" ).width()-2);
//  	$("#genieImage").width($("#dialog" ).width()-2); 	
//  	$("#conversationSection").width($("#dialog" ).width()-2);
// // 	$("#genieTyping").width($("#dialog" ).width()-20);
//  	$("#genieTyping").width($("#dialog" ).width()-17);
//  	$("#queryArea").width($("#dialog" ).width()-2);
//  	$('#userInputText').width($("#dialog" ).width()-70);

// // 	$("#genieText").width($("#dialog" ).width()-45);
//  	$("#genieText").width($("#dialog" ).width()-47);
// 	$("#userText").width($("#dialog" ).width()-75);
// 	$("#genietopimg").width($("#dialog" ).width()-20);
// 	$("#geniebottomimg").width($("#dialog" ).width()-20);
// 	$("#usertopimg").width($("#dialog" ).width()-50);
// 	$("#userbottomimg").width($("#dialog" ).width()-50);

// //	$("div[id^=genieText]").width($("#dialog" ).width()-60);//45
// 	$("div[id^=genieText]").width($("#dialog" ).width()-63);//45
// 	$("div[id^=userText]").width($("#dialog" ).width()-90);//75
// 	$("IMG[id^=genietopimg]").width($("#dialog" ).width()-35);//20
// 	$("IMG[id^=geniebottomimg]").width($("#dialog" ).width()-35);//20
// 	$("IMG[id^=usertopimg]").width($("#dialog" ).width()-65);//50
// 	$("IMG[id^=userbottomimg]").width($("#dialog" ).width()-65);//50
 }
 
 function minimizeDialogBox() {
	hideActiveAlerts();
	
	$('#effect').hide();
    $('#overlay').fadeOut('fast');					  
	$('#dialog').dialog('close');
	
	if(! isMobile.any()){
	 $("#draggable").show();
	}
	
	if($("#transactionId").val() == ''){
		resetForm();
	}
 }

  function closeDialogBox()
  {
	$('body').css('overflow-y','auto');
	if(! isMobile.any() )
	{
	 $("#draggable").show();
	}
	  if ($(window).width() >= 880)
	  {
	  	dialogHeight = $( "#dialog" ).css( "height" );
	  	dialogWidth = $( "#dialog" ).css( "width" );
	  }
	  var height = 50;
	  var width = 200;
	  hideActiveAlerts();
	  //alert($("#transactionId").val());
	  if($("#transactionId").val() == ''){
		 // alert('null');  
		  if(isRequestSend== 1){
				/* alert('Your request has been sent.\r\n'+
					  'Genie is proccessing your request.\r\n'+
					  'Please wait for sometime.\r\n') */
				
				  return ;
		  }
		  else{
			  resetForm();
			  $('#effect').hide();
		      $('#overlay').fadeOut('fast');					  
			  $('#dialog').dialog('close');
			  if (window.location.href.indexOf("email") != -1)
			  {
				  //open(location, '_self').close();
				  //customWindow.close();
			  }
		  }
	  }
	  else{
		  //setFeedBackValue($('#transactionId').val());
		  resetForm();
		  $('#effect').hide();
	      $('#overlay').fadeOut('fast');					  
		  $('#dialog').dialog('close');
		  if (window.location.href.indexOf("email") != -1)
		  {
			  //customWindow.close();
		  }
// //		  alert($("#transactionId").val());
// 		  var  dataStr=$("#transactionId").val();
// 		  //alert(dataStr);
// 			 try{
// 		      var errorText = ''; 
		      
// 		    	$.ajax({
// 		          url: "getFeedback",
// 		          type: 'POST',        
// 		          data: JSON.stringify(dataStr), 
// 		          cache:false,
// 		          beforeSend: function(xhr) {  
// 		              xhr.setRequestHeader("Accept", "application/json");  
// 		              xhr.setRequestHeader("Content-Type", "application/json");  
// 		          },       
// 		          success:function(response){
		  			
// 		  			$.ajax({
// 		  			    url:url,
// 		  			    type:'HEAD',
// 		  			    error: function()
// 		  			    {
// 		  			    	  //alert('error');
// 		  			    },
// 		  			    success: function()
// 		  			    {
// 		  			        alert('success');
// 		  			    }
		  			  
// 		  			});
// 		          },
// 		          error : function(xhr, status, error) {
// 		  		  		//alert('----' +xhr.responseText);
// 				   		var str =xhr.responseText;
// 				   		if(str == 'NA'){
// // 				   			height = $( "#dialog" ).css( "height" );
// // 				   			width = $( "#dialog" ).css( "width" );
// 				   			var dialog = $('<p id="pFeedback" style="height: 50px;">Are you satisfied with provided solution/s ?</p>').dialog({				   				
// 				   				dialogClass: "no-close",
// 				   				height : 50,
// 				   				position: {
// 				    				my: "center",
// 				    				at: "center"
// 				    			},
// 			                    buttons: {
// 			                        "Yes": function() {
// 				                        				dialog.dialog('close');
// 							                        	setFeedBackValue(dataStr,'YES');
							                        	
// 			                        				  },
// 			                        "No":  function() {
// 							                        	dialog.dialog('close');
// 							                        	setFeedBackValue(dataStr,'NO');
				                        				
// 				                        			  }
			                        
// 			                    }
// 			                });
// 				   			//$('#dialog').dialog('close');
// 				   			$( "#pFeedback" ).removeAttr("style");
// 				   		    $( "#pFeedback" ).css( "height", height);			   		
// 					   	}
// 				   		else{
//      						$('#dialog').dialog('close');
//     						$('#effect').hide();
//      					    $('#overlay').fadeOut('fast');
     					     						
// 					   	}
// 			   		}
		          
// 		      });
// 		  	}
// 		  	catch(err) {
// 		         //alert(err);
// 		    }
	  }
	  
	  if( isMobile.any() )
	  {
		 setTimeout(function(){ window.location="login"; }, 700);
	  }
  }

function setFeedBackValue(transid){
	try{
	      var dataStr = transid; 
	      
	    	$.ajax({
	          url: "setFeedback",
	          type: 'POST',        
	          data: JSON.stringify(dataStr), 
	          cache:false,
	          beforeSend: function(xhr) {  
	              xhr.setRequestHeader("Accept", "application/json");  
	              xhr.setRequestHeader("Content-Type", "application/json");  
	          },       
	          success:function(response){

	          },
	          error : function(xhr, status, error) {	        	  
	        	  
	          }
	        });
    	    
		 }
		 catch(err) {
		        //alert(err);
		 }
}
/*
function getActiveMessages(){
	try{
	      $.ajax({
	          url: "getActiveMessages",
	          type: 'POST',        
	          cache:false,
	          beforeSend: function(xhr) {  
	              xhr.setRequestHeader("Accept", "application/json");  
	              xhr.setRequestHeader("Content-Type", "application/json");  
	          },       
	          success:function(response){
										
		  				$("#alertMessages").val(JSON.stringify(response));		  				
		  				if($("#alertMessages").val() != '[]'){	
		  				//alert($("#alertMessages").val());
		  				$("#showAlerts").css("visibility","visible");
		  				//setInterval(showHideAlert, 3000);	
		  				 var count = 0;				  				
		  				$.each(JSON.parse($("#alertMessages").val()), function(idx, obj) {
		  					count=count+1;
		  				});
		  				$("#alertMessagesCount").val(count);
					}
	          },
	          error : function(xhr, status, error) {
	        	  //alert(xhr.responseText);
	        	  var str = xhr.responseText;
	          }
	        });
		 }
		 catch(err) {
		        //alert(err);
		 }
}
*/
function getUserName(){
	var userId = '${pageContext.request.userPrincipal.name}'
		//alert(userId);
	try{
	      $.ajax({
	          url: "getUserName?userId="+userId,
	          type: 'GET',        
	          cache:false,
//	          data: userId,
	          //data: JSON.stringify(userId), 
	          //beforeSend: function(xhr) {  
	          //    xhr.setRequestHeader("Accept", "application/json");  
	          //    xhr.setRequestHeader("Content-Type", "application/json");  
	          //},       
	          success:function(response){
						//alert('success ' + response)
						$("#userName").val(response);
						//var str = xhr.responseText;
						//$("#userName").val(str);
						$("#welcome").html('<font face="verdana" color="white"  size="3"> Welcome : '+ response + '&nbsp;&nbsp;|&nbsp;</font> <a href="<c:url value="j_spring_security_logout" />" ><font face="verdana" color="Red"  size="2">Logout</font></a>&nbsp;&nbsp;&nbsp;&nbsp;');
						//$("#dispUserName").val(xhr.responseText);
						
						//alert('getUserName ' + $("#userName").val())
	          },
	          error : function(xhr, status, error) {
	        	  alert('error' +xhr.responseText);
	        	  //alert(xhr);
	        	  
	          }
	        });
		 }
		 catch(err) {
		        //alert(err);
		 }
}

function showHideAlert() {            
    $('#showAlerts').fadeIn(1000).delay(500).fadeOut(1000);
} 

function isEmail(email) {
	  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  return regex.test(email);
	}
  
  var url = "";
 
  function softwareInstallFormAjax(e){
	  
			  var employeeId =  $('#formEmployeeid').val();
			  //var softwareName =  $('#formSoftwareName').val();     
		      var computerId = $('#formComputerID').val();
		      var softwareNameVersion = $('#formSoftwareName').val();
		      
		      
		      /* if(!isEmail(employeeId))
	    	  {		    	  
	    	  alert("Please enter valid email ID!!")
	    	  return;
	    	  } */
		      
		      if(computerId=='' || softwareNameVersion=="-Select-" || softwareNameVersion=='')
	    	  {		    	  
	    	  alert("Please fill/select all the mandatory fields!!")
	    	  return;
	    	  }
		      
	      	$('#softwareInstallButton' ).prop( "disabled", true );
	      	$('#softwareInstallButton' ).css( {"background-color":"grey"} );
	  		$('.softwareInstallClick').removeAttr("href");
	  		$('.softwareInstallClick').prop('onclick',null);
		      var transactionId = $("#transactionId").val();
		      
		      var formSoftwareInstallJson = {"employeeEmailId" : employeeId,"computerId" : computerId,"softwareNameVersion" : softwareNameVersion,"transactionId" : transactionId}; 
		      //var json={"dataJson" : dataJson,"transactionId" : transactionId,"formType" : formType};	
		      $.ajax({
		          url: "softwareInstallSubmit",
		          type: 'POST',        
		          data: JSON.stringify(formSoftwareInstallJson),
		          //data: JSON.stringify({ formSoftwareInstallJson: formSoftwareInstallJson, transactionId: transactionId }),
		          
		          cache:false,
		          beforeSend: function(xhr) {  
		              xhr.setRequestHeader("Accept", "application/json");  
		              xhr.setRequestHeader("Content-Type", "application/json");  
		          },       
		          success:function(response){
		        	  hideActiveAlerts();
		        	  $("#transactionId").val("");
		        	  if(window.location.href.indexOf("email") != -1)
		        		  {
		        		  $('#userInputText').val("In case you have more queries, please write us new email.");
		        		  }
		        	  else
		        		  {
			        		$("#queryArea *").removeAttr("disabled");
			          		$('#userInputText').val("");		        		  
		        		  }
		        	  var oldscrollHeight = document.getElementById('conversationSection').scrollHeight - 20;
				      var installationMessage=response.installationMessage;
				      if(installationMessage=="SUCCESS")
				    	  {
				    	  var html ='<div><div id="genieText" class="bubble">'+ $("#softwaresuccess").val() +'</div></div>';
				    	  }
				      else
				    	  {
				    	  var html ='<div><div id="genieText" class="bubble">'+ $("#softwareticket").val() +'</div></div>';
				    	  }
			 		  $("#conversationSection").append($(html));										  
					  var newscrollHeight = document.getElementById('conversationSection').scrollHeight - 20; //Scroll height after the request
				      if (newscrollHeight > oldscrollHeight) {
				    	  $("#conversationSection").css({"position":"relative"});
				          $("#conversationSection").animate({ scrollTop: newscrollHeight }, 'normal');
				      }

		      	 
		          },
		          error : function(xhr, status, error) {
		        	  hideActiveAlerts();
		        	  $("#transactionId").val("");
		        	  if(window.location.href.indexOf("email") != -1)
	        		  {
	        		  	$('#userInputText').val("");
	        		  }
	        	 	 else
	        		  {
		        		$("#queryArea *").removeAttr("disabled");
		          		$('#userInputText').val("");		        		  
	        		  }
		        	  var oldscrollHeight = document.getElementById('conversationSection').scrollHeight - 20;
				      var html ='<div><div id="genieText" class="bubble">Connection Error Occurred!! Please try again after some time.</div></div>';
			 		  $("#conversationSection").append($(html));				  
					  var newscrollHeight = document.getElementById('conversationSection').scrollHeight - 20; //Scroll height after the request
				      if (newscrollHeight > oldscrollHeight) {
				    	  $("#conversationSection").css({"position":"relative"});
				          $("#conversationSection").animate({ scrollTop: newscrollHeight }, 'normal');
				      }   		  	
		  		}
		      });
		 		
		  
		      return true;
  }
  
function internetFormAjax(e){
	 
	  
	  var employeeId =  $('#formEmployeeid').val();
	  var computerId = $('#formComputerID').val(); 
      var internetIssueDecription = $('#internetIssueDecription').val(); 
      var internetBrowserName = $('#internetBrowserName').val();
      var internetWebsite =  $('#internetWebsite').val();
      
	  
      
      var transactionId = $("#transactionId").val();

     /*  if(!isEmail(employeeId))
	  {		    	  
	  alert("Please enter valid email ID!!")
	  return;
	  } */
      
      if(computerId=='' || internetIssueDecription=='')
	  {		    	  
	  alert("Please fill all the mandatory fields!!")
	  return;
	  }
      
    	$('#internetButton' ).prop( "disabled", true );
      	$('#internetButton' ).css( {"background-color":"grey"} );
  		$('.internetClick').removeAttr("href");
  		$('.internetClick').prop('onclick',null);

      
     
      var internetDetailsJson = {"employeeEmailId" : employeeId,"computerId" : computerId,"internetIssueDecription" : internetIssueDecription,"internetBrowserName" : internetBrowserName,"internetWebsite" : internetWebsite,"transactionId" : transactionId}; 
      $.ajax({
          url: "internetSubmit",
          type: 'POST',        
          //data: JSON.stringify(json),
          //data: JSON.stringify({ printerDetailsJson: printerDetailsJson, transactionId: transactionId }),
          data: JSON.stringify(internetDetailsJson), 
          cache:false,
          beforeSend: function(xhr) {  
              xhr.setRequestHeader("Accept", "application/json");  
              xhr.setRequestHeader("Content-Type", "application/json");  
          },       
          success:function(response){
        	  hideActiveAlerts();
        	  $("#transactionId").val("");
        	  if(window.location.href.indexOf("email") != -1)
    		  {
    		  	$('#userInputText').val("In case you have more queries, please write us new email.");
    		  }
    	 	 else
    		  {
        		$("#queryArea *").removeAttr("disabled");
          		$('#userInputText').val("");		        		  
    		  }
        	  var oldscrollHeight = document.getElementById('conversationSection').scrollHeight - 20;
		      var html ='<div><div id="genieText" class="bubble">'+ $("#formsubmit").val() +'</div></div>';
	 		  $("#conversationSection").append($(html));										  
			  var newscrollHeight = document.getElementById('conversationSection').scrollHeight - 20; //Scroll height after the request
		      if (newscrollHeight > oldscrollHeight) {
		    	  $("#conversationSection").css({"position":"relative"});
		          $("#conversationSection").animate({ scrollTop: newscrollHeight }, 'normal');
		      }       	  
        	 
      	 
          },
          error : function(xhr, status, error) {
        	  hideActiveAlerts();
        	  $("#transactionId").val("");
        	  if(window.location.href.indexOf("email") != -1)
    		  {
    		  	$('#userInputText').val("");
    		  }
    	 	 else
    		  {
        		$("#queryArea *").removeAttr("disabled");
          		$('#userInputText').val("");		        		  
    		  }
        	  var oldscrollHeight = document.getElementById('conversationSection').scrollHeight - 20;
		      var html ='<div><div id="genieText" class="bubble">Connection Error Occurred!! Please try again after some time.</div></div>';
	 		  $("#conversationSection").append($(html));				  
			  var newscrollHeight = document.getElementById('conversationSection').scrollHeight - 20; //Scroll height after the request
		      if (newscrollHeight > oldscrollHeight) {
		    	  $("#conversationSection").css({"position":"relative"});
		          $("#conversationSection").animate({ scrollTop: newscrollHeight }, 'normal');
		      } 	
  		}
      });
 		
  
      return true;
}
  
function printerDetailsFormAjax(e){
	 
	  
	  var employeeId =  $('#formEmployeeid').val();
	  var printerMake =  $('#formPrinterMake').val(); 
      var printerModel = $('#formPrinterModel').val(); 
      var printerError = $('#formPrinterError').val();
      
      var printerLocation =  $('#formPrinterLocation').val();
      var printerBuilding =  $('#formPrinterBuilding').val();
      var printerFloor =  $('#formPrinterFloor').val();
      
	  var printerHostName =  $('#formPrinterHostName').val(); 
      var printerServerName = $('#formPrinterServerName').val();
      var printerQueueName =  $('#formPrinterQueueName').val(); 
      
      var contactNo = $('#formContactNo').val();
      
      var transactionId = $("#transactionId").val();
      
      

      /* if(!isEmail(employeeId))
	  {		    	  
	  alert("Please enter valid email ID!!")
	  return;
	  } */
      	  
      if(printerMake=='' || printerModel=='' )
	  {		    	  
	  alert("Please fill all the mandatory fields!!")
	  return;
	  }
     
        $('#printerDetailsButton' ).prop( "disabled", true );
		$('#printerDetailsButton' ).css( {"background-color":"grey"} );
		$('.printerDetailsClick').removeAttr("href");
		$('.printerDetailsClick').prop('onclick',null);

      
      //var printerDetailsJson = {"employeeId" : employeeId,"printerMake" : printerMake,"printerModel" : printerModel,"printerType" : printerType,"printerError" : printerError,"buildingFloor" : buildingFloor,"printerSerialNumber" : printerSerialNumber,"printerDeptName" : printerDeptName,"printerIP" : printerIP,"contactNo" : contactNo};
      var printerDetailsJson = {"employeeEmailId" : employeeId,"printerMake" : printerMake,"printerModel" : printerModel,"printerError" : printerError,"printerLocation" : printerLocation,"printerBuilding" : printerBuilding,"printerFloor" : printerFloor,"printerHostName" : printerHostName,"printerServerName" : printerServerName,"printerQueueName" : printerQueueName,"contactNo" : contactNo,"transactionId" : transactionId}; 
      $.ajax({
          url: "printerDetailsSubmit",
          type: 'POST',        
          //data: JSON.stringify(json),
          //data: JSON.stringify({ printerDetailsJson: printerDetailsJson, transactionId: transactionId }),
          data: JSON.stringify(printerDetailsJson), 
          cache:false,
          beforeSend: function(xhr) {  
              xhr.setRequestHeader("Accept", "application/json");  
              xhr.setRequestHeader("Content-Type", "application/json");  
          },       
          success:function(response){ 
        	  hideActiveAlerts();
        	  $("#transactionId").val("");
        	  if(window.location.href.indexOf("email") != -1)
    		  {
    		  	$('#userInputText').val("In case you have more queries, please write us new email.");
    		  }
    	 	 else
    		  {
        		$("#queryArea *").removeAttr("disabled");
          		$('#userInputText').val("");		        		  
    		  }
        	  var oldscrollHeight = document.getElementById('conversationSection').scrollHeight - 20;
		      var html ='<div><div id="genieText" class="bubble">'+ $("#formsubmit").val() +'</div></div>';
	 		  $("#conversationSection").append($(html));										  
			  var newscrollHeight = document.getElementById('conversationSection').scrollHeight - 20; //Scroll height after the request
		      if (newscrollHeight > oldscrollHeight) {
		    	  $("#conversationSection").css({"position":"relative"});
		          $("#conversationSection").animate({ scrollTop: newscrollHeight }, 'normal');
		      }       	  
        	 
      	 
          },
          error : function(xhr, status, error) {
        	  hideActiveAlerts();
        	  $("#transactionId").val("");
        	  if(window.location.href.indexOf("email") != -1)
    		  {
    		  	$('#userInputText').val("");
    		  }
    	 	 else
    		  {
        		$("#queryArea *").removeAttr("disabled");
          		$('#userInputText').val("");		        		  
    		  }
        	  var oldscrollHeight = document.getElementById('conversationSection').scrollHeight - 20;
		      var html ='<div><div id="genieText" class="bubble">Connection Error Occurred!! Please try again after some time.</div></div>';
	 		  $("#conversationSection").append($(html));				  
			  var newscrollHeight = document.getElementById('conversationSection').scrollHeight - 20; //Scroll height after the request
		      if (newscrollHeight > oldscrollHeight) {
		    	  $("#conversationSection").css({"position":"relative"});
		          $("#conversationSection").animate({ scrollTop: newscrollHeight }, 'normal');
		      } 	
  		}
      });
 		
  
      return true;
}

function UnsupportedCategoryFormAjax(e){
	
	var employeeId = $('#formEmployeeid').val();
	var computerId = $('#formComputerID').val(); 
    var unsupportedErrorDescription = $('#formUnsupportedErrorDescription').val(); 
    var unsupportedAdditionalRemarks = $('#formUnsupportedAdditionalRemarks').val();    
    var contactNo = $('#formContactNo').val();    
    var transactionId = $("#transactionId").val();
    
    	  
    if(computerId=='' || unsupportedErrorDescription=='' || contactNo=='')
	  {		    	  
	  alert("Please fill all the mandatory fields!!")
	  return;
	  }
   
      $('#UnsupportedCategoryButton' ).prop( "disabled", true );
		$('#UnsupportedCategoryButton' ).css( {"background-color":"grey"} );
		$('.UnsupportedCategoryClick').removeAttr("href");
		$('.UnsupportedCategoryClick').prop('onclick',null);

    
    //var printerDetailsJson = {"employeeId" : employeeId,"printerMake" : printerMake,"printerModel" : printerModel,"printerType" : printerType,"printerError" : printerError,"buildingFloor" : buildingFloor,"printerSerialNumber" : printerSerialNumber,"printerDeptName" : printerDeptName,"printerIP" : printerIP,"contactNo" : contactNo};
    var unsupportedCategoryDetailsJson = {"employeeEmailId" : employeeId,"computerId" : computerId,"unsupportedErrorDescription" : unsupportedErrorDescription,"unsupportedAdditionalRemarks" : unsupportedAdditionalRemarks,"contactNo" : contactNo,"transactionId" : transactionId}; 
    $.ajax({
        url: "unsupportedCategoryDetailsSubmit",
        type: 'POST',        
        //data: JSON.stringify(json),
        //data: JSON.stringify({ printerDetailsJson: printerDetailsJson, transactionId: transactionId }),
        data: JSON.stringify(unsupportedCategoryDetailsJson), 
        cache:false,
        beforeSend: function(xhr) {  
            xhr.setRequestHeader("Accept", "application/json");  
            xhr.setRequestHeader("Content-Type", "application/json");  
        },       
        success:function(response){ 
      	  hideActiveAlerts();
      	  $("#transactionId").val("");
      	  if(window.location.href.indexOf("email") != -1)
  		  {
  		  	$('#userInputText').val("In case you have more queries, please write us new email.");
  		  }
  	 	 else
  		  {
      		$("#queryArea *").removeAttr("disabled");
        		$('#userInputText').val("");		        		  
  		  }
      	  var oldscrollHeight = document.getElementById('conversationSection').scrollHeight - 20;
		      var html ='<div><div id="genieText" class="bubble">'+ $("#formsubmit").val() +'</div></div>';
	 		  $("#conversationSection").append($(html));										  
			  var newscrollHeight = document.getElementById('conversationSection').scrollHeight - 20; //Scroll height after the request
		      if (newscrollHeight > oldscrollHeight) {
		    	  $("#conversationSection").css({"position":"relative"});
		          $("#conversationSection").animate({ scrollTop: newscrollHeight }, 'normal');
		      }       	  
      	 
    	 
        },
        error : function(xhr, status, error) {
      	  hideActiveAlerts();
      	  $("#transactionId").val("");
      	  if(window.location.href.indexOf("email") != -1)
  		  {
  		  	$('#userInputText').val("");
  		  }
  	 	 else
  		  {
      		$("#queryArea *").removeAttr("disabled");
        		$('#userInputText').val("");		        		  
  		  }
      	  var oldscrollHeight = document.getElementById('conversationSection').scrollHeight - 20;
		      var html ='<div><div id="genieText" class="bubble">Connection Error Occurred!! Please try again after some time.</div></div>';
	 		  $("#conversationSection").append($(html));				  
			  var newscrollHeight = document.getElementById('conversationSection').scrollHeight - 20; //Scroll height after the request
		      if (newscrollHeight > oldscrollHeight) {
		    	  $("#conversationSection").css({"position":"relative"});
		          $("#conversationSection").animate({ scrollTop: newscrollHeight }, 'normal');
		      } 	
		}
    });
		

    return true;
}
  var isLiveChat = false;
  var expert ;
  var isexpertSet = false;
  var rsmeUserName ;
  var rsmeUserId ;
  var rsmeLoc ;
  var rsmeSkills ;
  var rsmeTeam ;
  var userticketId;
  
  function callFAQAjax(e){
	  if(isRequestSend== 1){
		/* alert('Your request has been sent.\r\n'+
			  'Genie is proccessing your request.\r\n'+
			  'Please wait for sometime.\r\n') */
		
		  return ;
	  }
	  $("#conversationSection").focus();
	  if($("#transactionId").val() == ''){
		hideActiveAlerts();
		//setTimeout(function () {$( "#alert_effect" ).toggle( "slide", options, 500 );}, 1000);
	  }
	  var currentLanguage = "en";
	  if (window.location.href.indexOf("hi_IN") != -1)
		{
		  currentLanguage = "hi"
		}
	  if (window.location.href.indexOf("de_DE") != -1)
		{
		  currentLanguage = "de"
		}
	  
	  var userInputText = $('#userInputText').val();
	  userFeedbackTxt =$('#userInputText').val();
	  var uppercaseUserInputText = userInputText.toUpperCase();
	  isRequestSend=1;  
	  var newUserInputText = userInputText.replace(/([."";|\[\]\/\\])/g,' ');
	  //var newUserInputText = userInputText.replace(/[^a-zA-Z0-9 ]/g, '');
	  //alert(newUserInputText)
	  var errorText =  $('#errorText').val();     
	  var id = $("#id").val(); 
	  var errorCode = $("#errorCode").val();
	  var transactionId = $("#transactionId").val(); 
	  var oldscrollHeight = document.getElementById('conversationSection').scrollHeight - 20;
	  if(isUserRating){
		if(userFeedbackRating!=null && (userFeedbackRating == 0 || userFeedbackRating == 0.0 || userFeedbackRating=='0.0')){
			transactionId='';
		}
	  }
	  //var userId ="9AA57830-054E-C611-C4EB-01448DAC6111";// $("#userId").val();
	  var tempusername=$('#loginusername').val();
	 // alert('tempusername -> ' + tempusername);
	  var userId = $('#loginusername').val();
	 // var userId = ${pageContext.request.userPrincipal.name};
	  
	  if(isLiveChat)
	  {
			var msg = {
		  loc : rsmeLoc,
         loginID : rsmeUserId,
         name :  rsmeUserName,
         team : rsmeTeam,
         text : newUserInputText,
         type : 1

	  };
			$("#conversationSection").append("<div><div id='userText' class='bubble bubble--alt'>"+newUserInputText+"</div></div>");
			$('#userInputText').val('');
			var newscrollHeight = document.getElementById('conversationSection').scrollHeight - 20; 
		      if (newscrollHeight > oldscrollHeight) {
		    	  $("#conversationSection").css({"position":"relative"});
		          $("#conversationSection").animate({ scrollTop: newscrollHeight }, 'normal');
		      }
			firebase.database().ref("RSME").child("messages").child(expert+"_chatID").push(msg);			
		  submitLiveChatData(transactionId,"<font color=#00A8FF size=2 face=verdana >$user : </font>"+newUserInputText)
		   isRequestSend=0;
		  return ;
	  }
	  
	  var typeOfMessage = $("#typeOfMessage").val(); 
	  var answerType = $("#answerType").val(); 
	  var dataToCollect = $("#dataToCollect").val();
	  var prevContextId = $('#prevContextId').val();
	  var contextManagerId = $('#contextManagerId').val();
	  json = {"errorText" : errorText,"userInputText" : newUserInputText,"id" : id,"errorCode" : errorCode,"transactionId" : transactionId,"userId" : userId,"typeOfMessage" : typeOfMessage,"answerType" : answerType, "dataToCollect" : dataToCollect, "currentLanguage" : currentLanguage,"prevTransactionId" : prevTransactionId, "prevContextId": prevContextId,
		         "contextManagerId": contextManagerId};
	  if(userInputText.length > 0 ){
	   	  if(_emailTextContent == 1)
	   		{
	   		  _emailTextContent = 0;
	   		}
	   	  else
	   		{
	// 	      $("#conversationSection").append("<IMG  id='usertopimg' src='resources/images/conversationbg_top.png' style='padding-left: 39px;'/>");
	// 		  $("#conversationSection").append("<div id='userText'><font face='Roboto, Arial' size=2px color='#FFFFFF' >"+userInputText+"<font></div>");
	// 		  $("#conversationSection").append("<IMG id='userbottomimg' src='resources/images/conversationbg_bottom.png' style='padding-left: 39px'/>");
			  if(userInputText!='@dummy@')
				  {
				  $("#conversationSection").append("<div><div id='userText' class='bubble bubble--alt'>"+userInputText+"</div></div>");  
				  }
			  $("#genieTypingText").show();
			  resizeAllElements();
		   	}
		   }
	  if(!isUserRating){
			  $('#userInputText').val('');
			  
			  var newscrollHeight = document.getElementById('conversationSection').scrollHeight - 20; //Scroll height after the request
		      if (newscrollHeight > oldscrollHeight) {
		    	  $("#conversationSection").css({"position":"relative"});
		          $("#conversationSection").animate({ scrollTop: newscrollHeight }, 'normal');
		      }    
		      
		      //alert(JSON.stringify(json))
		      //document.write(JSON.stringify(json))
			  
			   $(".selectOptionLabels").removeAttr("onclick");
              // $(".selectOptionLabels").removeClass("selectOptionLabels");
			   if($('#ratings')!=null && $('#ratings').length > 0){
				   $('#ratings-2').ratings('disable'); 
			   }
				   console.log("chat ce part calling ");
			    	$.ajax({
			          url: myurl+"chatCE",
			          type: 'POST',        
			          data: JSON.stringify(json), 
			          cache:false,
			          beforeSend: function(xhr) {  
			              xhr.setRequestHeader("Accept", "application/json; charset=UTF-8");  
			              xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");  
			          },       
			          success:function(response){        	  
			        	  $('#userInputText').focus();
	
			        	// to close the right hand side chat window   
			        	if (response.errorText.indexOf("Thank you for contacting the virtual agent.") >=0 ||
			        		response.errorText.indexOf("Sorry, I could not resolve your problem this time.") >= 0 ) {
				        	//alert('in smita -->' )
				        	hideActiveAlerts();
							setTimeout(function () {$( "#alert_effect" ).toggle( "slide", options, 500 );}, 1000);
				        }
			        	  	
						if (response.errorText.toLowerCase()=="good bye")
						{
			                setTimeout(function(){closeDialogBox(); }, 1000);
			         	}
					  			if (userInputText.match("^RE :")) {
			  				userInputText = userInputText.substring(4);
			  			}
			  			var oldscrollHeight = document.getElementById('conversationSection').scrollHeight - 20;	 
			 			var resVal = response.errorText;
			 			if(resVal.indexOf("loadVideo(this)") >= 0)
			 				{
			 				_showCnfirmaitonMessage = 1;
			 				}
			 			
			 			if(resVal.indexOf("$greeting") >= 0)
			 			{
	
			 				var dt = new Date();
			 				  var time = dt.getHours();
			 				 if(time>=0&&time<12)
			 				  {
			 				  greetings=$("#greetmorning").val();
			 				  
			 				  }
				 			  else if(time>=12&&time<17)
				 			  {
				 			  greetings=$("#greetafternoon").val();
				 			  
				 			  }
				 			  else
				 			  {
				 			  greetings=$("#greetevening").val();
				 			  
				 			  }
	
					 			resVal = resVal.replace("$greeting", greetings);
				 		}
			 			var uname='${userId}'
			 				//pageContext.request.userPrincipal.name}
			 						 			
			 			if(response.userId != undefined && response.userId != null)
			 			{
			 			  resVal = resVal.replace("$username", response.userId);
			 			}
			 			else
			 			{
			 			  var uname='${userId}'
			 			  resVal = resVal.replace("$username", uname);  
			 			  resVal = resVal.replace("${userId}", "");
			 			}
			 			
			 			
			 			if(resVal.indexOf("ticket number") != -1)
		 				{
			 				 rsmeUserName = response.rsmeUserName;
			 				 rsmeUserId = response.rsmeUserId;
			 				 rsmeLoc = response.rsmeLoc;
			 				 rsmeSkills = response.rsmeSkills;
			 				 rsmeTeam = response.rsmeTeam;
			 				 
			 				 var index = resVal.indexOf("ticket number");
			 				userticketId = resVal.substring(index+14,index+20);
			 				
			 				isLiveChat = true;
							 var firebaseconfig = {
							apiKey: "AIzaSyDplp_CUknCczVLVvknV0Wu-IRaBX6vD1A",
							authDomain: "hmiplatform-732ab.firebaseapp.com",
						    databaseURL: "https://hmiplatform-732ab.firebaseio.com",
							projectId: "hmiplatform-732ab",
							storageBucket: "hmiplatform-732ab.appspot.com",
						    messagingSenderId: "644746045620"
							 };
						
					  var defaultApp = firebase.initializeApp(firebaseconfig);
			 				
			 				
			 				firebase.database().ref('RSME/fe_engineers/' + rsmeUserName).set({
			 				     id:rsmeUserId,
			 				    skills: rsmeSkills,
			 				    status: 1

			 				  });
			 				
			 				var experts = firebase.database().ref('RSME/expert_status');
			 				experts.on('value', function(snapshot) {
				 				snapshot.forEach(function(childSnapshot) {
								var childKey = childSnapshot.key;
								var childData = childSnapshot.val();
								if(childData.status ==1 && isexpertSet == false)
								{
									var list = $("#conversationSection")[0].childNodes;
									
									for(var i=0;i<list.length;i++)
									{
										var child = list[i];
										if(child.nodeName == "DIV")
										{
											var innerhtml = child.innerHTML;
											if(innerhtml.indexOf("<div id=\"genieText\" class=\"bubble\">") != -1)
											{
												var len = innerhtml.indexOf("<div id=\"genieText\" class=\"bubble\">");
												len = len + "<div id=\"genieText\" class=\"bubble\">".length;
												var value = insertstring(innerhtml,len,"Genie:");
												child.innerHTML = value;
											}
											if(innerhtml.indexOf("<div id=\"userText\" class=\"bubble bubble--alt\">") != -1)
											{
												var len = innerhtml.indexOf("<div id=\"userText\" class=\"bubble bubble--alt\">");
												len = len + "<div id=\"userText\" class=\"bubble bubble--alt\">".length;
												var value = insertstring(innerhtml,len,"User:");
												child.innerHTML = value;
											}
										}
									}
									
									isexpertSet = true;
									var msg = {
			 					  loc : rsmeLoc,
			 		              loginID : rsmeUserId,
			 		              name :  rsmeUserName,
			 		              team : rsmeTeam,
			 		              text : $("#conversationSection")[0].innerHTML,
			 		              type : 1

			 				  };
									expert = childKey;
									firebase.database().ref("RSME").child("messages").child(childKey+"_chatID").push(msg);
									
									var list = $("#conversationSection")[0].childNodes;
									
									for(var i=0;i<list.length;i++)
									{
										var child = list[i];
										if(child.nodeName == "DIV")
										{
											var innerhtml = child.innerHTML;
											if(innerhtml.indexOf("<div id=\"genieText\" class=\"bubble\">") != -1)
											{
												var value = innerhtml.replace("Genie:","")
												child.innerHTML = value;
											}
											if(innerhtml.indexOf("<div id=\"userText\" class=\"bubble bubble--alt\">") != -1)
											{
												var value = innerhtml.replace("User:","")
												child.innerHTML = value;
											}
										}
									}
									
									var textVal = "We found one Live Expert to help you.All the details has been transferred to Expert <br/> Now Expert is going to guide you on your query";
									 $("#conversationSection").append("<Div><div id='genieText'  class='livechatbubble'>" + textVal + "</div></Div>");
									 var newscrollHeight = document.getElementById('conversationSection').scrollHeight - 20; //Scroll height after the request
								      if (newscrollHeight > oldscrollHeight) {
								    	  $("#conversationSection").css({"position":"relative"});
								          $("#conversationSection").animate({ scrollTop: newscrollHeight }, 'normal');
								      }
								      
								      var iconelem = document.getElementById("livechaticon");
								      iconelem.parentNode.style.display="block";
									 submitLiveChatData(transactionId,"<font color=#00A8FF size=2 face=verdana >$genie : </font>"+textVal);
								}
							  });
				 				
				 				if(isexpertSet == false)
				 					{
				 				var resp = "<br/> We tried to contact Live experts for your query but as all Experts are busy in other calls we could not connect.Please try again after sometime";
				 				$("#conversationSection").append("<Div><div id='genieText'  class='livechatbubble'>" + resp + "</div></Div>");
				 				var newscrollHeight = document.getElementById('conversationSection').scrollHeight - 20; //Scroll height after the request
							      if (newscrollHeight > oldscrollHeight) {
							    	  $("#conversationSection").css({"position":"relative"});
							          $("#conversationSection").animate({ scrollTop: newscrollHeight }, 'normal');
							      }
				 				submitLiveChatData(transactionId,"<font color=#00A8FF size=2 face=verdana >$genie : </font>"+resp);
				 					}
				 				});
			 				
			 				
			 				
			 				 var liveRes = firebase.database().ref('RSME/messages/'+rsmeUserId+'_chatID');
													
			 				liveRes.on('child_added', function(snapshot) {
							  var key = snapshot.key;
							  
							  if(snapshot.val().text == "User Query is Resolved")
							  {
								 updateTicketStatus(transactionId,userticketId); 
								  
							  }else
							  {							  
			 				 $("#conversationSection").append("<Div><div id='genieText'  class='livechatbubble'>" + snapshot.val().text + "</div></Div>");
			 				var newscrollHeight = document.getElementById('conversationSection').scrollHeight - 20; //Scroll height after the request
						      if (newscrollHeight > oldscrollHeight) {
						    	  $("#conversationSection").css({"position":"relative"});
						          $("#conversationSection").animate({ scrollTop: newscrollHeight }, 'normal');
						      }
							}
			 				submitLiveChatData(transactionId,"<font color=#00A8FF size=2 face=verdana >$Expert : </font>"+snapshot.val().text) 
							 var refForRemoving = firebase.database().ref("RSME/").child('messages/' + rsmeUserId+'_chatID');
								refForRemoving.child(key).remove();					 
			 				});
			 				
			 				resVal = "We are in the process of connecting you to Live Expert for your query.Please hold on";
			 				submitLiveChatData(transactionId,"<font color=#00A8FF size=2 face=verdana >$genie : </font>"+resVal);
		 				}
			 			
			 			if(resVal.toLowerCase()=="good bye" && window.location.href.indexOf("hi_IN") != -1)
			 				{
			 					$("#conversationSection").append("<Div><div id='genieText'  class='bubble'>अलविदा</div></Div>");
			 				}
				 		else if(response.recommendations=="map1.png,map2.png,map3.png")
						{
							  $("#genieTypingText").hide();
							  //var html= "<button title="Next Slide" class="rightarrow" style="top: 148px;" data-m='{"i":156,"p":90,"n":"nextSlideArrow","o":24}' data-id="156">Next Slide</button>" 
							  var html="<div class='container' style='width : 200px; /*padding-right: 58px;*/ padding-bottom: 15px;'><br><div id='myCarousel' class='carousel slide' data-ride='carousel'><ol class='carousel-indicators'><li data-target='#myCarousel' data-slide-to='0' class='active'></li><li data-target='#myCarousel' data-slide-to='1'></li><li data-target='#myCarousel' data-slide-to='2' class='active'></li></ol><a id='myLink' href='#' onclick='return extractUserInput();'><div class='carousel-inner' role='listbox'><div class='item active'><img src='resources/images/TyrePlus.png' id='img1' alt='Tyre_Plus' width='200' height='100'><div class='carousel-caption' id='img1' style='padding-bottom : 15px;'><h3 id='img1'>Tyre Plus</h3></div></div><div class='item'><img src='resources/images/TyreShop.png' id='img2' alt='Tyre_Shop' width='200' height='100'><div class='carousel-caption' id='img2' style='padding-bottom : 15px;'><h3 id='img2'>Tyre Shop</h3></div></div><div class='item'><img src='resources/images/BestTyre.png' id='img2' alt='Best_Tyre' width='200' height='100'><div class='carousel-caption' id='img2' style='padding-bottom : 15px;'><h3 id='img2'>Best Tyre</h3></div></div></div></a><a class='left carousel-control' href='#myCarousel' role='button' data-slide='prev'><span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span><span class='sr-only'>Previous</span></a><a class='right carousel-control' href='#myCarousel' role='button' data-slide='next'><span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span><span class='sr-only'>Next</span></a></div></div>";
							  var erText=response.errorText + html;
							  $("#conversationSection").append("<Div><div id='genieText'  class='bubble'>" + erText + "</div></Div>");	  				 
						}
				 		else if(response.recommendations=="Yes,No")
						{
					  		var html = "<br><input class='yesNoBtn' type='button' id='yesBtn' style='background-color: #4CAF50; border-radius: 6px; border: 1px solid; width: 40%;' value='Yes' onclick='getYesNo(event);'/>&nbsp;&nbsp;<input class='yesNoBtn' type='button' id='noBtn' style='background-color: #4CAF50; border-radius: 6px; border: 1px solid; width: 40%;' value='No' onclick='getYesNo(event);'/>";
				        	var erText=response.errorText + html;
				        	//erText=erText.replace("(Yes/No)",html);
				        	$("#conversationSection").append("<Div><div id='genieText'  class='bubble'>" + erText + "</div></Div>");	  				 
						}
				 		else
			 			{	
			    	  		$("#conversationSection").append("<Div><div id='genieText'  class='bubble'>" + resVal + "</div></Div>");
			    	  		//below setting is for user feedback
			    	  		//append this only when the rating jquery component is present in errorText in reponse.
			    	  		if(resVal.indexOf("ratings-2") >= 0)
				 			{
				    	  		var js = document.createElement("script");
				    	  		
								js.type = "text/javascript";
								js.src = "resources/js/jquery.ratings.js";
								document.body.appendChild(js);
								 
								if($('#ratings-'+divDynamicCounter)!=null && $('#ratings-'+divDynamicCounter).length > 0){
									$('#ratings-'+divDynamicCounter).ratings('disable'); 
									divDynamicCounter=divDynamicCounter+1;
								 }
								
				 			}
			 			}
					
			   		$("#genieTypingText").hide();
					
					if((response.answerKey!= undefined || response.answerKey!=null)&&(response.answerKey.toLowerCase()=="wait1" || response.answerKey.toLowerCase()=="wait2" || response.answerKey.toLowerCase()=="wait3"))
			   		  {
			   		setTimeout(function(){	 
			   			 
			   			
				   		  	$('#divLoading').show();
				   		  	setTimeout(function(){
				   			  $("#divLoading").hide();
				   			  $('#userInputText').val('@dummy@');
				   			callFAQAjax();
				   			}, 3000);
				   		  
			   			
			   			}, 1000);
			   		  }
			   		isRequestSend=0;
			   		var newscrollHeight = document.getElementById('conversationSection').scrollHeight - 20; //Scroll height after the request
			        if (newscrollHeight > oldscrollHeight) {
			        	$("#conversationSection").css({"position":"relative"});
			            $("#conversationSection").animate({ scrollTop: newscrollHeight }, 'normal');
			        }
			   		
			        if(resVal.indexOf("Printer installation is in progress") >= 0)
					{
					$("#queryArea *").attr("disabled", "disabled");
					
					setTimeout(function(){
						
						$("#conversationSection").append("<Div><div id='genieText'  class='bubble'>Please check and verify whether the printer has been installed or not.(Yes/No)</div></Div>");
						 $("#queryArea *").removeAttr("disabled");
						 var newscrollHeight2 = document.getElementById('conversationSection').scrollHeight - 20; //Scroll height after the request
					      if (newscrollHeight2 > newscrollHeight) {
					    	  $("#conversationSection").css({"position":"relative"});
					          $("#conversationSection").animate({ scrollTop: newscrollHeight }, 'normal');
					      }
					}, 5000);
					
					}
			        
			        
		
			  			prevTransactionId = response.prevTransactionId;
			  			$('#id').val(response.id);
			  			$('#errorCode').val(response.errorCode);
			  			$('#transactionId').val(response.transactionId);
			  			$('#userId').val(response.userId);
			  			$('#typeOfMessage').val(response.typeOfMessage);
			  			$('#answerType').val(response.answerType);
			  			$('#dataToCollect').val(response.dataToCollect);
			  			
			  			$('#userInputText').val(response.userInputText);
			  			$('#errorText').val(response.errorText);
			  			
			  			$('#printerMakeValue').val(response.printerMakeValue);
			  			$('#printerModelValue').val(response.printerModelValue);
			  			$('#printerErrorValue').val(response.printerErrorValue);
			  			$('#softwareList').val(response.softwareList);
			  			$('#browserName').val(response.browserName);
			  			$('#internetIssue').val(response.internetIssue);
			  			
			  			$('#printerLocationValue').val(response.printerLocationValue);
			  			$('#printerBuildingValue').val(response.printerBuildingValue);
			  			$('#printerFloorValue').val(response.printerFloorValue);
			  			$('#printerServerNameValue').val(response.printerServerNameValue);
			  			$('#printerQueueNameValue').val(response.printerQueueNameValue);
			  			
			  			$('#printerhostName').val(response.printerhostName);
			  			if(response.userId != undefined && response.userId != null)
			  			$('#loginusername').val(response.userId);
			  			 $('#prevContextId').val(response.prevContextId);
		                 $('#contextManagerId').val(response.contextManagerId);
			  			
			  			
			  						
			  			if((window.location.href.indexOf("email") != -1)&&($('#transactionId').val()==""))
			    		  {
			  				$('#userInputText').val("In case you have more queries, please write us new email.");
			  				$("#queryArea *").attr("disabled", "disabled");
			    		  }
			    	 	 
			  			
			  			 CheckForToggle(response.errorText);
			  		     resizeAllElements();
			  		     if(useGoogleChromeMic)
			  		    {
						 var su = new SpeechSynthesisUtterance();
						su.lang = "en";
						su.text = response.errorText;
						speechSynthesis.speak(su);
			  		    }
			  		     
			  		   if(useNgGenieMic)
			  		   {
			  			 var voicetxt = response.errorText;
			  			 playSound(voicetxt);
			  		   }
			  		     
			  			
			          },
			          error : function(xhr, status, error) {
			        	  //$("#genieTypingText").hide();
			        	  $("#genieTypingText").html('<span id="genieTypingText" style="color: #A30000; font-size: 15px;">Connection Error occurred!! Try again after sometime...</span>');
			        	  isRequestSend=0;
			        	  //alert(xhr.responseText);
			  			
			  		}
			          
			      });
			    }else{
			    	console.log("else part calling save");
			    	saveUserRating();
					userFeedbackTxt="";
			    }
		    	//added to fetch chat cache
				callChatCacheCheckAjax(userInputText);
				
		      //resizeAllElements();
		     
		      return true;
  }
  
  function extractUserInput(){
		$("#myLink").removeAttr("onclick");
		  event = event || window.event; // IE
		    var target = event.target || event.srcElement; // IE

		    var id = target.id;
			//alert(id);
			 var fullPath = document.getElementById(id).src;
		     var filename = fullPath.replace(/^.*[\\\/]/, '');
		     var text=filename.split('.');
		     //alert("User text to be sent to ce"+text[0]);
			  var userInputText = $('#userInputText').val(text[0]);
			  $('#myLink').click(function(e) {
				  e.preventDefault();
				  
				    //do other stuff when a click happens
				});
			  callFAQAjax('');
			  //$('#userInputText').focus();
			 //alert("File name of image is "+filename)
		  //alert("image clicked");
	 }
  
  function getYesNo(event){
		var yesNo=event.target.id;
		//alert(yesNo);
		var res=$('#'+yesNo).val();
		var userInputText = $('#userInputText').val(res);
		if(res=='Yes'){
			$("#yesBtn").css('background-color','#a2c8b6');
		}
		else
			{
			$("#noBtn").css('background-color','#a2c8b6');
			}
		
		var userInputText = $('#userInputText').val(res);
		$(".yesNoBtn").attr('disabled','disabled');
		callFAQAjax('');
		$("#yesBtn").removeAttr('id');
		$("#noBtn").removeAttr('id');
	}

  function resetForm(){

  	$.ajax({
  	    error: function()
  	    {
  	        //file not exists
  	        //alert('error');

  	    },
  	    success: function()
  	    {
  	        //file exists
  	        //alert('success');
  	        $("#queryArea *").removeAttr("disabled");
  	    	$('#transactionId').val('');
  	    	$('#typeOfMessage').val('');
  	    	$('#answerType').val('');
  	    	$('#dataToCollect').val('');
  	    	$('#userInputText').val('');
  	    	$('#prevContextId').val('');
  	        $('#contextManagerId').val('');
  	    	//$('#errorText').html("<div style='color:#333333;'>I am ngGenie, How may I help you?</div>");	
  	    	$('#conversationSection').empty();
// 			var html ='<div><IMG id="genietopimg" src="resources/images/conversationbggenie_top.png" style="padding-left: 9px;  padding-top: 10px;"/>';
// 			html += '<center><div id="genieText"><font face="Roboto, Arial" size=2px color="#383838" >I am ngGenie, How may I help you? </font></div></center>';
// 			html += '<IMG id="geniebottomimg" src="resources/images/conversationbggenie_bottom.png" style="padding-left: 9px"/></div>';
 			var html ='<div><div id="genieText" class="bubble">I am ngGenie, How may I help you?</div></div>';
			 $("#conversationSection").append($(html)); 
			 //added for spell suggestions
			 if($('#suggestion')!=null){
			 	$('#suggestion').css("visibility", 'hidden');
			 	$('#genieTyping').css("visibility", 'hidden');
				$('#conversationSection').height('93%');
  	    	  }
    		greeting();
  			
  	    }
  	});	
  }


  function runEffect(url) {

     // most effect types need no options passed by default
     var options = {};     
   $('#pdf').attr('src', url);
   $('#pdf').attr('data', url);
     // run the effect
     $( "#effect" ).toggle( "slide", options, 500 );
    
   }
	 
  
  function openDoc(atag) {
		docName = atag.name;
		docName = "resources/docs/" + docName;
	    window.open(docName, "documentWindow", "width=600,height=600,scrollbars=yes");
	    //runEffect(url);
	}
  function GetDialogLocation(){
	var dialogWidth = $( "#dialog" ).dialog( "option", "width" );
	//var dialogPosition = parseInt( $( ".ui-dialog-shadow" ).css( "left" ).replace('px', ''));
	//var toggleposition = dialogWidth + dialogPosition + 4;
	var toggleposition = dialogWidth + 3;
	if( isMobile.any() )
	{
		//$("#form_effect").css("width", dialogWidth);
		return 0;
	}
	else
	{
		return toggleposition;
	}
  }
  
  function changeTogglerWidth()
  {
	  var convSecWidth = 0;
	  if( isMobile.any() )
		{
		  convSecWidth = parseInt( $(".ui-dialog-shadow").css("width").replace('px', ''));
		}
	  return convSecWidth; 
  }
  
  function GetDialogTopHeight(){
		var dialogTop = parseInt( $( ".ui-dialog-shadow" ).css( "top" ).replace('px', ''));
		var ConvSecHeight = parseInt( $(".ui-dialog-shadow").css("height").replace('px', ''));
		var headerHeight = parseInt( $(".ui-dialog-titlebar").css("height").replace('px', ''));
		ConvSecHeight = ConvSecHeight - 5;
		var height = -(headerHeight);
		var TopHeight = [];
		TopHeight.push(height);
		TopHeight.push(ConvSecHeight);
		return TopHeight;
	  }
  function SelectSlideDirection(){
	  var option;
	  return option; 
  }

  function showActiveAlerts(htmlText){
	  
//	  	$("#effect").hide();
//	  	$("#video_effect").hide();
//	  	$("#alert_effect").show();
//		var options = SelectSlideDirection();
//		alert('in ' + 'pages/'+htmlText)
		var options = {};
		var position = GetDialogLocation();
		var Size = GetDialogTopHeight();
		$("#divToggler").css("padding-left", position);
		$("#divToggler").css("margin-top", Size[0]);
		$("#alert_effect").css("height", Size[1]);
		
		$("#alert_effect").resizable();
		$("#divToggler").resizable();
		$("#alert_effect").css("overflow-x","hidden");
		
		var checkMobileWidth = changeTogglerWidth();
		if(checkMobileWidth != 0)
		{
			$("#alert_effect").css("width", checkMobileWidth);
		}
		if(ToggleSelector > 0 && ToggleSelector != 1)
		{
			hideActiveAlerts();
			setTimeout(function () {$( "#alert_effect" ).toggle( "slide", options, 500 );}, 1000);
		}
		else
		{
			$( "#alert_effect" ).toggle( "slide", options, 500 );
		}
		if (ToggleSelector != 1)
		{
			ToggleSelector = 1;
			parent.postMessage("expand","*");
		}
		else
		{
			ToggleSelector = 0;
			parent.postMessage("collapse","*");
		}
		var res = '<br>';				  				
		//$.each(JSON.parse($("#alertMessages").val()), function(idx, obj) {
			//alert(obj.message);
			//res = res + '&nbsp;&nbsp;<li>&nbsp;&nbsp;' + obj.message+'</li>';
			//$("#showMessages").css("visibility","visible");
		//});
		res = '<font face="arial" size="2">' +htmlText + '</font>';
		///$('#showMessages').html(res);
		$('#showMessages').load(htmlText);
	  }

  function hideActiveAlerts()
  {
	  //$('#effect').hide();
        var options = {};
        if( ToggleSelector == 1)
        {
       		$( "#alert_effect" ).toggle( "slide", options, 500 );
       		ToggleSelector = 0;
        }
        else if(ToggleSelector == 2)
       	{
        	if($("#form_effect").is(':visible'))
        	{
        	$( "#form_effect" ).toggle( "slide", options, 500 );
        	}
        	else
        	{
        		resolutionConfirmation();
        		//$( "#video_effect" ).toggle( "slide", options, 500 );
        		//_isVideoFinished = 1;
        		//resolutionConfirmation();
        		
        	}
        	ToggleSelector = 0;
        	isVidioPlay = 0;
       	}
        parent.postMessage("resize-" + parseInt( $(".ui-dialog").css("height").replace('px', '')) + "-" + parseInt( $(".ui-dialog").css("width").replace('px', '')),"*");
  }
  
	function resolutionConfirmation()
	{
		var options = {};
		$( "#video_effect" ).toggle( "slide", options, 500 );
		ToggleSelector = 0;
    	isVidioPlay = 0;
    	if(_showCnfirmaitonMessage == 1)
    	{
    		var oldscrollHeight = document.getElementById('conversationSection').scrollHeight - 20;    		
			var resolutionConfirmation = $('#resolutionconfirmation').val();
			$("#conversationSection").append("<Div><div id='genieText'  class='bubble'>" + resolutionConfirmation + "</div></Div>");
			var newscrollHeight = document.getElementById('conversationSection').scrollHeight - 20; //Scroll height after the request
		      if (newscrollHeight > oldscrollHeight) {
		    	  $("#conversationSection").css({"position":"relative"});
		          $("#conversationSection").animate({ scrollTop: newscrollHeight }, 'normal');
		      }
		      _showCnfirmaitonMessage = 0;
    	}
	}
  
  function openURL(url) {
	    window.open(url);
	    
	}
  
  function CheckForToggle(GenieText){
  }
  
  
  
  function loadVideo(atag) {
		var options = {};
		videoName = atag.name;
		//videoName = "http://localhost:8080/ProjectResource/Resources/Videos/" + videoName;
		videoName = "<%=resourceURL %>" + "/" + videoName;
		//var vidPath = '${videoPath}';
		//videoName = vidPath + videoName;
   var position = GetDialogLocation();
	var Size = GetDialogTopHeight();
	$("#divToggler").css("padding-left", position);
	$("#divToggler").css("margin-top", Size[0]);
	$("#video_effect").css("height", Size[1]);
	var checkMobileWidth = changeTogglerWidth();
	if(checkMobileWidth != 0)
	{
		var height = $(window).height();
		$("#video_effect").css("width", checkMobileWidth);
		if(checkMobileWidth >= height)
		{
			$("#divVideo").removeAttr("style");
			$("#divVideo").css("width", 350);
		}
		else
		{
			$("#divVideo").css("margin-top", "30%");
			checkMobileWidth = checkMobileWidth - 20;
			$("#divVideo").css("width", checkMobileWidth);
		}
	}
	
   // run the effect
     
     if(ToggleSelector > 0 && !$("#video_effect").is(':visible'))
 	{
 		hideActiveAlerts();
 		setTimeout(function () {$( "#video_effect" ).toggle( "slide", options, 500 );}, 1000);
 	}
 	else
 	{
 		// run the effect
 		$( "#video_effect" ).toggle( "slide", options, 500 );
 	}
    //$( "#form_effect" ).load("/WEB-INF/pages/login.jsp")
 	
 	if (ToggleSelector != 2)
 	{
 		ToggleSelector = 2;
 	}
 	else
 	{
 		ToggleSelector = 0;
 	}
	$('#divVideo source').attr('src', videoName);
  	divVideo.autoplay = true;
  	if (isVidioPlay == 0)
 		{
		setTimeout(function(){ divVideo.load(); }, 1000);
		ToggleSelector = 2;
		isVidioPlay = 1;
 		}
  	else
 		{
 			isVidioPlay = 0;
 			ToggleSelector = 0;
 		}
	}
	
  
  function loadSoftwareInstallForm() {
	  $( "#form_effect" ).empty();
		var options = {};
 var position = GetDialogLocation();
	var Size = GetDialogTopHeight();
	$("#divToggler").css("padding-left", position);
	$("#divToggler").css("margin-top", Size[0]);
	$("#form_effect").css("height", Size[1]);
	var checkMobileWidth = changeTogglerWidth();
	if(checkMobileWidth != 0)
	{
		$("#form_effect").css("width", checkMobileWidth);
	}
	//$('#userInputText').attr("disabled",true);
	$("#queryArea *").attr("disabled", "disabled");
	$('#userInputText').val("Please submit the form to proceed.");
	
	//$( "#form_effect" ).append( '<input type="image" src="resources/images/close.png" id="closeSlidder3" style="float: right;padding: 5px; height: 15px;width: 15px;" onclick="hideActiveAlerts()">' )
	//$( "#form_effect" ).append( '<div align="center"><table border="0" style="margin-top: 40px;"><tr><td colspan="2" align="center"><h4>Please fill the below details</h4></td></tr><tr><td>Employee ID:</td><td><input type="text" id="formEmployeeid"/></td></tr><tr><td>Software Name:</td><td><input type="text" id="formSoftwareName"/></td></tr><tr><td>Computer ID:</td><td><input type="text" id="formComputerID"/></td></tr><tr><td>Reason for Installation:</td><td><input type="text" id="formReasonForInstallation"/></td></tr><tr><td colspan="2" align="center"><input type="button" value="Submit" onclick="return softwareInstallFormAjax(event)"/></td></tr></table></div>' );
	
	
	 
	if($('#softwareList').val()=="")
		{
		$( "#form_effect" ).append( '<div id="divFormTable" align="center"><table id="tblForm" border="0" style="margin-top: 40px;"><tr><td colspan="2" align="center"><h4>Please fill the below details</h4></td></tr><tr><td>Employee Email ID:</td><td width="50%"><input type="text" id="formEmployeeid" style=" width: 180px;" readonly/></td></tr><tr><td>Computer Name:<font color="red">*</font></td><td><input type="text" id="formComputerID" style=" width: 180px;"/></td></tr><tr><td>Software Name with Version:<font color="red">*</font></td><td><input type="text" id="formSoftwareName" style=" width: 180px;"/></td></tr><tr><td><font color="red">(* Mandatory Fields)</font></td></tr><tr><td colspan="2" align="center"><input type="button" id="softwareInstallButton" class="formSubmitButton" value="Submit" onclick="return softwareInstallFormAjax(event)"/></td></tr></table></div>' );
		}
	else
		{
		var softwareList = "-Select-,"+$('#softwareList').val();
		var options = softwareList.split(",");
		if(options.length==2)
			{
				$( "#form_effect" ).append( '<div id="divFormTable" align="center"><table id="tblForm" border="0" style="margin-top: 40px;"><tr><td colspan="2" align="center"><h4>Please fill the below details</h4></td></tr><tr><td>Employee Email ID:</td><td><input type="text" id="formEmployeeid" style=" width: 180px;" readonly/></td></tr><tr><td>Computer Name:<font color="red">*</font></td><td><input type="text" id="formComputerID" style=" width: 180px;"/></td></tr><tr><td>Software Name with Version:<font color="red">*</font></td><td><input type="text" id="formSoftwareName" style=" width: 180px;"/></td></tr><tr><td><font color="red">(* Mandatory Fields)</font></td></tr><tr><td colspan="2" align="center"><input type="button" id="softwareInstallButton" class="formSubmitButton" value="Submit" onclick="return softwareInstallFormAjax(event)"/></td></tr></table></div>' );
				$("#formSoftwareName").val(options[1])
			}
		else
			{
				$( "#form_effect" ).append( '<div id="divFormTable" align="center"><table id="tblForm" border="0" style="margin-top: 40px;"><tr><td colspan="2" align="center"><h4>Please fill the below details</h4></td></tr><tr><td>Employee Email ID:</td><td><input type="text" id="formEmployeeid" style=" width: 180px;" readonly/></td></tr><tr><td>Computer Name:<font color="red">*</font></td><td><input type="text" id="formComputerID" style=" width: 180px;"/></td></tr><tr><td>Software Name with Version:<font color="red">*</font></td><td><select id="formSoftwareName" style=" width: 185px;"/></td></tr><tr><td><font color="red">(* Mandatory Fields)</font></td></tr><tr><td colspan="2" align="center"><input type="button" id="softwareInstallButton" class="formSubmitButton" value="Submit" onclick="return softwareInstallFormAjax(event)"/></td></tr></table></div>' );	
				var option="";
				for (var i=0;i<options.length;i++){
				   option += '<option value="'+ options[i] + '">' + options[i] + '</option>';
				}
				$('#formSoftwareName').append(option);
			}
		
		}
	var email = '${email}';
	$("#formEmployeeid").val(email);
	if( isMobile.any() && $(window).height() <= 480)
	{
		$("#tblForm").removeAttr("style");
		$("#divFormTable").css("height", (Size[1] - 20));
	}
	if(ToggleSelector > 0 && !$("#form_effect").is(':visible'))
	{
		hideActiveAlerts();
		setTimeout(function () {$( "#form_effect" ).toggle( "slide", options, 500 );}, 1000);
	}
	else
	{
		// run the effect
		$( "#form_effect" ).toggle( "slide", options, 500 );
	}
   //$( "#form_effect" ).load("/WEB-INF/pages/login.jsp")
	
	if (ToggleSelector != 2)
	{
		ToggleSelector = 2;
	}
	else
	{
		ToggleSelector = 0;
	}
	}
  
   function loadInternetForm() {
	   $( "#form_effect" ).empty();
		var options = {};
	var position = GetDialogLocation();
	var Size = GetDialogTopHeight();
	$("#divToggler").css("padding-left", position);
	$("#divToggler").css("margin-top", Size[0]);
	$("#form_effect").css("height", Size[1]);
	var checkMobileWidth = changeTogglerWidth();
	if(checkMobileWidth != 0)
	{
		$("#form_effect").css("width", checkMobileWidth);
	}
	//$('#userInputText').attr("disabled",true);
	$("#queryArea *").attr("disabled", "disabled");
	$('#userInputText').val("Please submit the form to proceed.");
	
	//$( "#form_effect" ).append( '<input type="image" src="resources/images/close.png" id="closeSlidder3" style="float: right;padding: 5px; height: 15px;width: 15px;" onclick="hideActiveAlerts()">' )
	$( "#form_effect" ).append( '<div id="divFormTable" align="center"><table id="tblForm" border="0" style="margin-top: 40px;"><tr><td colspan="2" align="center"><h4>Please fill the below details</h4></td></tr><tr><td>Employee Email ID:</td><td width="50%"><input type="text" id="formEmployeeid" style=" width: 180px;" readonly/></td></tr><tr><td>Computer ID:<font color="red">*</font></td><td><input type="text" id="formComputerID" style=" width: 180px;"/></td></tr><tr><td>Issue Description:<font color="red">*</font></td><td><input type="text" id="internetIssueDecription" style=" width: 180px;"/></td></tr><tr><td>Browser Name & Version:</td><td><input type="text" id="internetBrowserName" style=" width: 180px;"/></td></tr><tr><td>Particular Website(If any):</td><td><input type="text" id="internetWebsite" style=" width: 180px;"/></td></tr><tr><td><font color="red">(* Mandatory Fields)</font></td></tr><tr><td colspan="2" align="center"><input type="button" id="internetButton" class="formSubmitButton" value="Submit" onclick="return internetFormAjax(event)"/></td></tr></table></div>' );
	$("#internetBrowserName").val($('#browserName').val())
	$("#internetIssueDecription").val($('#internetIssue').val())
	
	var email = '${email}';
	$("#formEmployeeid").val(email);
	$("form_effect").attr("wmode", "transparent");
	if( isMobile.any() && $(window).height() <= 480)
	{
		$("#tblForm").removeAttr("style");
		$("#divFormTable").css("height", (Size[1] - 20));
	}
	if(ToggleSelector > 0 && !$("#form_effect").is(':visible'))
	{
		hideActiveAlerts();
		setTimeout(function () {$( "#form_effect" ).toggle( "slide", options, 500 );}, 1000);
	}
	else
	{
		// run the effect
		$( "#form_effect" ).toggle( "slide", options, 500 );
	}
   //$( "#form_effect" ).load("/WEB-INF/pages/login.jsp")
	
	if (ToggleSelector != 2)
	{
		ToggleSelector = 2;
	}
	else
	{
		ToggleSelector = 0;
	}

	}

function loadPrinterDetailsForm() {
	  
	  $( "#form_effect" ).empty();
		var options = {};
 var position = GetDialogLocation();
	var Size = GetDialogTopHeight();
	$("#divToggler").css("padding-left", position);
	$("#divToggler").css("margin-top", Size[0]);
	$("#form_effect").css("height", Size[1]);
	var checkMobileWidth = changeTogglerWidth();
	if(checkMobileWidth != 0)
	{
		$("#form_effect").css("width", checkMobileWidth);
	}
	//$('#userInputText').attr("disabled",true);
	$("#queryArea *").attr("disabled", "disabled");
	$('#userInputText').val("Please submit the form to proceed");
	
	//$( "#form_effect" ).append( '<input type="image" src="resources/images/close.png" id="closeSlidder3" style="float: right;padding: 5px; height: 15px;width: 15px;" onclick="hideActiveAlerts()">' )
	//$( "#form_effect" ).append( '<div align="center"><table border="0" style="margin-top: 40px;"><tr><td colspan="2" align="center"><h4>Please fill the below details</h4></td></tr><tr><td>Employee ID:</td><td><input type="text" id="formEmployeeid"/></td></tr><tr><td>Software Name:</td><td><input type="text" id="formSoftwareName"/></td></tr><tr><td>Computer ID:</td><td><input type="text" id="formComputerID"/></td></tr><tr><td>Reason for Installation:</td><td><input type="text" id="formReasonForInstallation"/></td></tr><tr><td colspan="2" align="center"><input type="button" value="Submit" onclick="return softwareInstallFormAjax(event)"/></td></tr></table></div>' );
	//$( "#form_effect" ).append( '<div align="center"><table border="0" style="margin-top: 40px;"><tr><td colspan="2" align="center"><h4>Please fill the below details</h4></td></tr><tr><td>Employee ID:<font color="red">*</font></td><td><input type="text" id="formEmployeeid"/></td></tr><tr><td>Printer Make:<font color="red">*</font></td><td><input type="text" id="formPrinterMake"/></td></tr><tr><td>Printer Model:<font color="red">*</font></td><td><input type="text" id="formPrinterModel"/></td></tr><tr><td>Printer Error:<font color="red">*</font></td><td><input type="text" id="formPrinterError"/></td></tr><tr><td>Building/Floor:<font color="red">*</font></td><td><input type="text" id="formBuildingFloor"/></td></tr><tr><td>Printer Host Name:</td><td><input type="text" id="formPrinterHostName"/></td></tr><tr><td>Department Name:</td><td><input type="text" id="formPrinterDeptName"/></td></tr><tr><td>Printer IP:</td><td><input type="text" id="formPrinterIP"/></td></tr><tr><td>Contact No:</td><td><input type="text" id="formContactNo"/></td></tr><tr><td><font color="red">(* Mandatory Fields)</font></td></tr><tr><td colspan="2" align="center"><input type="button" id="printerDetailsButton" class="formSubmitButton" value="Submit" onclick="return printerDetailsFormAjax(event)"/></td></tr></table></div>' ); 
	//$( "#form_effect" ).append( '<div align="center"><table border="0" style="margin-top: 40px;"><tr><td colspan="2" align="center"><h4>Please fill the below details</h4></td></tr><tr><td>Employee Email ID:<font color="red">*</font></td><td><input type="text" id="formEmployeeid" /></td></tr><tr><td>Printer Make:<font color="red">*</font></td><td><input type="text" id="formPrinterMake"/></td></tr><tr><td>Printer Model:<font color="red">*</font></td><td><input type="text" id="formPrinterModel"/></td></tr><tr><td>Printer Error:</td><td><input type="text" id="formPrinterError"/></td></tr><tr><td>Building/Floor:</td><td><input type="text" id="formBuildingFloor"/></td></tr><tr><td>Printer Host Name:</td><td><input type="text" id="formPrinterHostName"/></td></tr><tr><td>Department Name:</td><td><input type="text" id="formPrinterDeptName"/></td></tr><tr><td>Printer IP:</td><td><input type="text" id="formPrinterIP"/></td></tr><tr><td>Contact No:</td><td><input type="text" id="formContactNo"/></td></tr><tr><td><font color="red">(* Mandatory Fields)</font></td></tr><tr><td colspan="2" align="center"><input type="button" id="printerDetailsButton" class="formSubmitButton" value="Submit" onclick="return printerDetailsFormAjax(event)"/></td></tr></table></div>' );
	$( "#form_effect" ).append( '<div id="divFormTable" style="overflow : auto;" align="center"><table id="tblForm" border="0" style="margin-top: 40px;"><tr><td colspan="2" align="center"><h4>Please fill the below details</h4></td></tr><tr><td>Employee Email ID:</td><td><input type="text" id="formEmployeeid" readonly/></td></tr><tr><td>Printer Make:<font color="red">*</font></td><td><input type="text" id="formPrinterMake"/></td></tr><tr><td>Printer Model:<font color="red">*</font></td><td><input type="text" id="formPrinterModel"/></td></tr><tr><td>Printer Error:</td><td><input type="text" id="formPrinterError"/></td></tr><tr><td>Location:</td><td><input type="text" id="formPrinterLocation"/></td></tr><tr><td>Building:</td><td><input type="text" id="formPrinterBuilding"/></td></tr><tr><td>Floor:</td><td><input type="text" id="formPrinterFloor"/></td></tr><tr><td>Printer Host Name:</td><td><input type="text" id="formPrinterHostName"/></td></tr><tr><td>Server Name:</td><td><input type="text" id="formPrinterServerName"/></td></tr><tr><td>Queue Name:</td><td><input type="text" id="formPrinterQueueName"/></td></tr><tr><td>Contact No:</td><td><input type="text" id="formContactNo"/></td></tr><tr><td><font color="red">(* Mandatory Fields)</font></td></tr><tr><td colspan="2" align="center"><input type="button" id="printerDetailsButton" class="formSubmitButton" value="Submit" onclick="return printerDetailsFormAjax(event)"/></td></tr></table></div>' );
	
	$("#formPrinterMake").val($('#printerMakeValue').val())
	$("#formPrinterModel").val($('#printerModelValue').val())
	$("#formPrinterError").val($('#printerErrorValue').val())
	
	$("#formPrinterLocation").val($('#printerLocationValue').val())
	$("#formPrinterBuilding").val($('#printerBuildingValue').val())
	$("#formPrinterFloor").val($('#printerFloorValue').val())
	
	$("#formPrinterHostName").val($('#printerhostName').val())
	$("#formPrinterServerName").val($('#printerServerNameValue').val())
	$("#formPrinterQueueName").val($('#printerQueueNameValue').val())
	
	var email = '${email}';
	$("#formEmployeeid").val(email);
	
	if( isMobile.any() && $(window).height() <= 480)
	{
		$("#tblForm").removeAttr("style");
		$("#divFormTable").css("height", (Size[1] - 20));
	}
	
	$("form_effect").attr("wmode", "transparent");
 // run the effect
	if(ToggleSelector > 0 && !$("#form_effect").is(':visible'))
       {
              hideActiveAlerts();
              setTimeout(function () {$( "#form_effect" ).toggle( "slide", options, 500 );}, 1000);
       }
       else
       {
              // run the effect
              $( "#form_effect" ).toggle( "slide", options, 500 );
       }
   //$( "#form_effect" ).load("/WEB-INF/pages/login.jsp")
       
       if (ToggleSelector != 2)
       {
              ToggleSelector = 2;
       }
       else
       {
              ToggleSelector = 0;
       }
}
	
function loadUnsupportedCategoryForm() {
	  
	  $( "#form_effect" ).empty();
		var options = {};
	var position = GetDialogLocation();
	var Size = GetDialogTopHeight();
	$("#divToggler").css("padding-left", position);
	$("#divToggler").css("margin-top", Size[0]);
	$("#form_effect").css("height", Size[1]);
	var checkMobileWidth = changeTogglerWidth();
	if(checkMobileWidth != 0)
	{
		$("#form_effect").css("width", checkMobileWidth);
	}
	//$('#userInputText').attr("disabled",true);
	$("#queryArea *").attr("disabled", "disabled");
	$('#userInputText').val("Please submit the form to proceed");
	
	//$( "#form_effect" ).append( '<input type="image" src="resources/images/close.png" id="closeSlidder3" style="float: right;padding: 5px; height: 15px;width: 15px;" onclick="hideActiveAlerts()">' )
	//$( "#form_effect" ).append( '<div align="center"><table border="0" style="margin-top: 40px;"><tr><td colspan="2" align="center"><h4>Please fill the below details</h4></td></tr><tr><td>Employee ID:</td><td><input type="text" id="formEmployeeid"/></td></tr><tr><td>Software Name:</td><td><input type="text" id="formSoftwareName"/></td></tr><tr><td>Computer ID:</td><td><input type="text" id="formComputerID"/></td></tr><tr><td>Reason for Installation:</td><td><input type="text" id="formReasonForInstallation"/></td></tr><tr><td colspan="2" align="center"><input type="button" value="Submit" onclick="return softwareInstallFormAjax(event)"/></td></tr></table></div>' );
	//$( "#form_effect" ).append( '<div align="center"><table border="0" style="margin-top: 40px;"><tr><td colspan="2" align="center"><h4>Please fill the below details</h4></td></tr><tr><td>Employee ID:<font color="red">*</font></td><td><input type="text" id="formEmployeeid"/></td></tr><tr><td>Printer Make:<font color="red">*</font></td><td><input type="text" id="formPrinterMake"/></td></tr><tr><td>Printer Model:<font color="red">*</font></td><td><input type="text" id="formPrinterModel"/></td></tr><tr><td>Printer Error:<font color="red">*</font></td><td><input type="text" id="formPrinterError"/></td></tr><tr><td>Building/Floor:<font color="red">*</font></td><td><input type="text" id="formBuildingFloor"/></td></tr><tr><td>Printer Host Name:</td><td><input type="text" id="formPrinterHostName"/></td></tr><tr><td>Department Name:</td><td><input type="text" id="formPrinterDeptName"/></td></tr><tr><td>Printer IP:</td><td><input type="text" id="formPrinterIP"/></td></tr><tr><td>Contact No:</td><td><input type="text" id="formContactNo"/></td></tr><tr><td><font color="red">(* Mandatory Fields)</font></td></tr><tr><td colspan="2" align="center"><input type="button" id="printerDetailsButton" class="formSubmitButton" value="Submit" onclick="return printerDetailsFormAjax(event)"/></td></tr></table></div>' ); 
	//$( "#form_effect" ).append( '<div align="center"><table border="0" style="margin-top: 40px;"><tr><td colspan="2" align="center"><h4>Please fill the below details</h4></td></tr><tr><td>Employee Email ID:<font color="red">*</font></td><td><input type="text" id="formEmployeeid" /></td></tr><tr><td>Printer Make:<font color="red">*</font></td><td><input type="text" id="formPrinterMake"/></td></tr><tr><td>Printer Model:<font color="red">*</font></td><td><input type="text" id="formPrinterModel"/></td></tr><tr><td>Printer Error:</td><td><input type="text" id="formPrinterError"/></td></tr><tr><td>Building/Floor:</td><td><input type="text" id="formBuildingFloor"/></td></tr><tr><td>Printer Host Name:</td><td><input type="text" id="formPrinterHostName"/></td></tr><tr><td>Department Name:</td><td><input type="text" id="formPrinterDeptName"/></td></tr><tr><td>Printer IP:</td><td><input type="text" id="formPrinterIP"/></td></tr><tr><td>Contact No:</td><td><input type="text" id="formContactNo"/></td></tr><tr><td><font color="red">(* Mandatory Fields)</font></td></tr><tr><td colspan="2" align="center"><input type="button" id="printerDetailsButton" class="formSubmitButton" value="Submit" onclick="return printerDetailsFormAjax(event)"/></td></tr></table></div>' );
	$( "#form_effect" ).append( '<div id="divFormTable" style="overflow : auto;" align="center"><table id="tblForm" border="0" style="margin-top: 40px;"><tr><td colspan="2" align="center"><h4>Please fill the below details</h4></td></tr><tr><td>Employee Email ID:</td><td><input type="text" id="formEmployeeid" readonly/></td></tr><tr><td>Computer Name:<font color="red">*</font></td><td><input type="text" id="formComputerID"/></td></tr><tr><td>Error Description:<font color="red">*</font></td><td><input type="text" id="formUnsupportedErrorDescription"/></td></tr><tr><td>Additional Remarks:</td><td><input type="text" id="formUnsupportedAdditionalRemarks"/></td></tr><tr><td>Contact No:<font color="red">*</font></td>l<td><input type="text" id="formContactNo"/></td></tr><tr><td><font color="red">(* Mandatory Fields)</font></td></tr><tr><td colspan="2" align="center"><input type="button" id="UnsupportedCategoryButton" class="formSubmitButton" value="Submit" onclick="return UnsupportedCategoryFormAjax(event)"/></td></tr></table></div>' );
	
	var email = '${email}';
	$("#formEmployeeid").val(email);
	
	if( isMobile.any() && $(window).height() <= 480)
	{
		$("#tblForm").removeAttr("style");
		$("#divFormTable").css("height", (Size[1] - 20));
	}
	
	$("form_effect").attr("wmode", "transparent");
// run the effect
	if(ToggleSelector > 0 && !$("#form_effect").is(':visible'))
     {
            hideActiveAlerts();
            setTimeout(function () {$( "#form_effect" ).toggle( "slide", options, 500 );}, 1000);
     }
     else
     {
            // run the effect
            $( "#form_effect" ).toggle( "slide", options, 500 );
     }
 //$( "#form_effect" ).load("/WEB-INF/pages/login.jsp")
     
     if (ToggleSelector != 2)
     {
            ToggleSelector = 2;
     }
     else
     {
            ToggleSelector = 0;
     }


	}

var vid = document.getElementById("divVideo"); 

function playVid() { 
	  divVideo.play(); 
} 

function pauseVid() { 
	  divVideo.pause(); 
} 

//document.addEventListener("touchmove", function(e) { e.preventDefault() });

var onlykeypad = 0;
var jsonDictionary;
var jsonSkipPatterns;
function setTbl(){
	loadConfig();
	var dictionaryObj = document.getElementById("dictionary").getAttribute("value");
    var dictionaryStr = dictionaryObj.replace(/\'/g, '"');
    jsonDictionary = JSON.parse(dictionaryStr);
    jsonSkipPatterns = document.getElementById("skippatterns").getAttribute("value");
	//alert("hello")
	var h=window.innerHeight - 20;
    $("#1").height((h/10)*1);
    $("#2").height((h/10)*0.5);
	if ($(window).height() <= 680 && $(window).height() > 480)
 	{
		var width = $(window).width();
		var height = $(window).height();
		$("#3").height((h/10)*4.5);
		if(onlykeypad == 1)
		{
			$( "#dialog" ).css("display", "block");
			$(".ui-dialog-titlebar").removeAttr("style");
			$( "#dialog" ).css("display", "block");
			$("#queryArea").removeAttr("style");
			$("#tblQueryArea").css("height", 75);
		}
		if ($("#dialog").is(':visible') && isMobile.any())
	    {
		height = height - (68 + parseInt( $("#queryArea").css("height").replace('px', ''))); 
		$( "#dialog" ).css( "height", height);
		$( "#dialog" ).css( "width", width);
		$(".ui-dialog").css("width", width);
		$(".ui-dialog").css("width", width);
		$( "#dialog" ).dialog( "option", "position",{my: "left top",at: "left top", of: window});
		setTimeout(function () {toggleResize(1);}, 400);
		}
		$("#divcenter").removeAttr("style");
		$("#imgHelpdesk").removeAttr("style");
	}
	else if($(window).height() <= 480 && $(window).height() > 180)
	{
		var width = $(window).width();
		var height = $(window).height();
		$("#3").height((h/10)*2);
		if(onlykeypad == 1)
		{
			$( "#dialog" ).css("display", "block");
			$(".ui-dialog-titlebar").removeAttr("style");
			$( "#dialog" ).css("display", "block");
			$("#queryArea").removeAttr("style");
			$("#tblQueryArea").css("height", 75);
		}
		if ($("#dialog").is(':visible') && isMobile.any())
	    {
			height = height - (68 + parseInt( $("#queryArea").css("height").replace('px', ''))); 
			$( "#dialog" ).css( "height", height);
			$( "#dialog" ).css( "width", width);
			$(".ui-dialog").css("width", width);
			$(".ui-dialog").css("width", width);
			$( "#dialog" ).dialog( "option", "position",{my: "left top",at: "left top", of: window});
			setTimeout(function () {toggleResize(0);}, 400);
		}
		$("#divcenter").css("margin", 0);
		$("#imgHelpdesk").css("height", 0);
		$("#imgLogo").css("width", 100);
	}
	else if($(window).height() <= 180)
	{
		if(!$("#form_effect").is(':visible') && !$("#video_effect").is(':visible'))
		{
			onlykeypad = 1;
			$(".ui-dialog-titlebar").css("display", "none");
			$( "#dialog" ).css("display", "none");
			$("#queryArea").css("height", $(window).height());
			$("#tblQueryArea").css("height", $(window).height());
		}
		setTimeout(function () {toggleResize(0);}, 400);
	}
	else
	{
		var width = $(window).width();
		var height = $(window).height();
		if($(window).height() > 900)
		{
			$("#3").height((h/10)*7);
		}
		else
		{
			$("#imgHelpdesk").css("height", 250);
			$("#3").height((h/10)*5);
		}
		if ($("#dialog").is(':visible'))
	    {
			var DailogHeight = parseInt( $(".ui-dialog").css("height").replace('px', ''));
			if(DailogHeight >= height)
			{ 
				$( "#dialog" ).css( "height", dialogHeight);
			}
			else
			{
				$( "#dialog" ).css( "height", 650);
			}
			var dialogWidth = $( "#dialog" ).dialog( "option", "width" );
			width = width / 2;
			dialogWidth = dialogWidth / 2;
			var leftPosition = width - dialogWidth;
			$(".ui-dialog").css("left", leftPosition)
			$("#divcenter").css("margin", 0);
			$("#imgHelpdesk").removeAttr("style");
			setTimeout(function () {toggleResize(1);}, 400);
		}
	}
	var newscrollHeight = document.getElementById('conversationSection').scrollHeight - 20;
    $("#conversationSection").animate({ scrollTop: newscrollHeight }, 'normal');
  	$("#4").height((h/10)*1);
  	var uname=''
  	$("#userName").val(uname);
}


function buttonClicked(element)
{
   var selected_value = element.innerHTML;
   //selected_value = selected_value.slice(2);
  //alert(selected_value);
   $("#userInputText").val(selected_value);
  
  //$(element).addClass("selectedOptionLabel");
  $(".selectOptionLabels").removeAttr("onclick");
  element.style.backgroundColor = "#A2C8B6";
 // $(".selectOptionLabels").css("background-color", "gray" );
 // $(".selectOptionLabels").removeClass("selectOptionLabels");
  
   callFAQAjax();
}


function toggleResize(orientation)
{
	var DailogHeight = parseInt( $(".ui-dialog").css("height").replace('px', ''));
	var DailogWidth = parseInt( $(".ui-dialog").css("width").replace('px', ''));
	var headerHeight = parseInt( $(".ui-dialog-titlebar").css("height").replace('px', ''));
	var height = $(window).height();
	if(isMobile.any())
	{
		if(orientation == 0)
	  	{
			if($("#form_effect").is(':visible'))	  	
		  	{
				$("#divToggler").css("padding-left", 0);
		  		$("#divToggler").css("margin-top", -headerHeight);
		  		$("#form_effect").css("height", DailogHeight);
		  		$("#form_effect").css("width", DailogWidth);
				$("#tblForm").removeAttr("style");
				$("#divFormTable").css("height", (height - 20));
		  	}
		  	else if($("#video_effect").is(':visible'))
		  	{
		  		$("#divToggler").css("padding-left", 0);
		  		$("#divToggler").css("margin-top", -headerHeight);
		  		$("#video_effect").css("height", DailogHeight);
	  			$("#video_effect").css("width", DailogWidth);
	  			if(DailogWidth >= height)
	  			{
	  				$("#divVideo").removeAttr("style");
	  				$("#divVideo").css("width", 350);
	  			}
	  			else
	  			{
	  				$("#divVideo").css("margin-top", "30%");
	  				DailogWidth = DailogWidth - 20;
	  				$("#divVideo").css("width", DailogWidth);
	  			}
		  	}
		}		
	  	else
	  	{
	  		if($("#form_effect").is(':visible'))	  	
		  	{
				$("#divToggler").css("padding-left", 0);
		  		$("#divToggler").css("margin-top", -headerHeight);
		  		$("#form_effect").css("height", DailogHeight);
		  		$("#form_effect").css("width", DailogWidth);
				$("#tblForm").css("margin-top", 40);
				$("#divFormTable").css("height", (DailogHeight - 20));
		  	}
		  	else if($("#video_effect").is(':visible'))
		  	{
		  		$("#divToggler").css("padding-left", 0);
		  		$("#divToggler").css("margin-top", -headerHeight);
		  		$("#video_effect").css("height", DailogHeight);
	  			$("#video_effect").css("width", DailogWidth);
  				$("#divVideo").css("margin-top", "30%");
  				$("#divVideo").css("width", DailogWidth - 20);
		  	}	  		
	  	}
	}
}

function hideSliderBox()
{
	
      //$('#effect').hide();
      var options = {};
     $( "#effect" ).toggle( "slide", options, 500 );
}

/* $("#language").change(function () {
	if($("#language").val() == "English")
		{
			
		}
	if($("#language").val() == "Hindi")
		{
		
		}
}) */

/*
var cntxt;
var idx = 0;
var j = 0, x = 0, y = 0;
var coin, coinImage, canvas, willAnimate, loop, imagevar, coinImage2;
var di = 0;
var ypos=0;
var xpos=0;
var action;
var frames;
var sentidx = 0;
Initialize();
function Initialize() {
canvas = document.getElementById("coinAnimation");
canvas.width = 500;
canvas.height = 500;
// Create sprite sheet
cntxt = canvas.getContext("2d");
// Create sprite
coinImage = new Image();
coinImage.src = "resources/images/Disha_eyeblink.png";
//EyeMovementSprite
coinImage.onload = function () {
 cntxt.clearRect(0, 0, 500, 500);
 cntxt.drawImage(coinImage, 0,0, 5000 / 10, 500, 0, 0, 5000 / 10, 500);
}



imagevar = coinImage;

coin = sprite({
 context: canvas.getContext("2d"),
 width: 5000,
 height: 500,
 image: coinImage,
 numberOfFrames: 10,
 ticksPerFrame: 70,
});
}

function gameLoop() {
if (willAnimate) {
 setTimeout(function () {
     window.requestAnimationFrame(gameLoop);
     coin.render();
 }, ticksPerFrame);
}
}

function sprite(options) {
var that = {},
frameIndex = 0,
tickCount = 0,
index = 0;
ticksPerFrame = options.ticksPerFrame || 0,
numberOfFrames = options.numberOfFrames || 1;
that.context = options.context;
that.width = options.width;
that.height = options.height;
that.image = options.image;

that.render = function () {
 

 // Clear the canvas
 that.context.clearRect(0, 0, 500, 500);
 cntxt = this.context;
 // Draw the animation

 that.context.drawImage(imagevar, xpos, ypos, that.width / numberOfFrames, that.height, 0, 0, that.width / numberOfFrames, that.height);

 xpos = xpos + 500;
 if (xpos >= 5000) {
     xpos = 0;
     stopAnimating();
 }
 
};
return that;
}

function stopAnimating() {
imagevar = coinImage;
willAnimate = false;

xpos = 0; ypos = 0;
cntxt.clearRect(0, 0, 500, 500);
cntxt.drawImage(coinImage, 0, 0, 5000 / 10, 500, 0, 0, 5000 / 10, 500);
//di = 0;


}
function startAnimating() {
//action = ac;
willAnimate = true;
//coinImage.src = "Disha_Full_18%20x%2025.png";
gameLoop();
}

var auto_blink=setInterval(startAnimating, 4000);

  */

function spellcorrectionfun(eventid){
	 var _this = $('#'+eventid);
      var current = _this.attr("src");
      var swap = _this.attr("data-swap");     
    _this.attr('src', swap).attr("data-swap",current);
	 if(isAutoSpellCheckEnabled)  isAutoSpellCheckEnabled=false;
	 
	                        else isAutoSpellCheckEnabled=true;
	 }
	 
	 function useChromeMic(eventid){
	 var _this = $('#'+eventid);
      var current = _this.attr("src");
      var swap = _this.attr("data-swap");     
    _this.attr('src', swap).attr("data-swap",current);
	 if(useGoogleChromeMic)  useGoogleChromeMic=false;
	 
	                        else useGoogleChromeMic=true;
	 }
	 
	 function useNgGenieMicCall(eventid){
	 var _this = $('#'+eventid);
      var current = _this.attr("src");
      var swap = _this.attr("data-swap");     
    _this.attr('src', swap).attr("data-swap",current);
	 if(useNgGenieMic)  useNgGenieMic=false;
	 
	                        else useNgGenieMic=true;
	 }
	 
	 function spellsuggestionfun(eventid){
	 var _this = $('#'+eventid);
      var current = _this.attr("src");
      var swap = _this.attr("data-swap");     
    _this.attr('src', swap).attr("data-swap",current);
	 if(isSpellSuggestionCheckEnabled) isSpellSuggestionCheckEnabled=false;
	 
	                        else isSpellSuggestionCheckEnabled=true;
	 }
	 function sentencecompletionfun(eventid){
	 var _this = $('#'+eventid);
      var current = _this.attr("src");
      var swap = _this.attr("data-swap");     
    _this.attr('src', swap).attr("data-swap",current);
	 if(isChatCacheEnabled) 
	 {
	 isChatCacheEnabled=false;
	 $( "#userInputText" ).autocomplete( "disable" );
	 }
	else 
	{	
	isChatCacheEnabled=true;
	$( "#userInputText" ).autocomplete( "enable" );
	}
	 }
	 
	//added for user feedback
   function submitUserFeedback()
	 {
		 userFeedbackRating=0.0;
		 var enabled = $('[data-ratings]').ratings('get', 'enabled');
		 if(enabled === true){
			 isUserRating=true;
			 userFeedbackRating =  $('[data-ratings]').ratings('get', 'value');
			 $("#userInputText").attr("placeholder", "Please provide your feedback here");
		 }else{
			 $("#userInputText").attr("placeholder", "");
		 }
	 }
	 var recorderObjectTemp;
	 function startrecording(ev)
	 {
		var elem = document.getElementById("startrecord");
		elem.parentNode.style.display="none";
		 elem = document.getElementById("record");
		elem.parentNode.style.display="block";
		
		if(useGoogleChromeMic)
		{
		var recognizer = new webkitSpeechRecognition();
		recognizer.lang = "en";
		recognizer.onresult = function(event) {
			if (event.results.length > 0) {
				var result = event.results[event.results.length-1];
				if(result.isFinal) {
					console.log(result[0].transcript);
					  var elem = document.getElementById("userInputText");
					   elem.value = result[0].transcript;
					   stoprecording();
					   recognizer.stop();
					   callFAQAjax();
				}
			}  
		};
		recognizer.start();
		}
		
		if(useNgGenieMic)
		{

        navigator.getUserMedia({audio: true}, function(stream) {
          var recorderObject = new MP3Recorder(audio_context, stream);
          recorderObjectTemp =  recorderObject;

          recorderObject.start();
        }, function(e) { });
		}
	 }
	 
	 function stoplivechat(ev)
	 {
		var elem = document.getElementById("livechaticon");
		elem.parentNode.style.display="none";
		isLiveChat = false;
		
		var msg = {
				  loc : rsmeLoc,
		         loginID : rsmeUserId,
		         name :  rsmeUserName,
		         team : rsmeTeam,
		         text : "Genie User went offline",
		         type : 1

			  };
			firebase.database().ref("RSME").child("messages").child(expert+"_chatID").push(msg);			
			submitLiveChatData(transactionId,"<font color=#00A8FF size=2 face=verdana >$Genie : </font>"+"Genie User went offline")
	 }
	 
	 function insertstring(str, index, value) {
		    return str.substr(0, index) + value + str.substr(index);
		}
	 
	  function stoprecording(ev)
	 {
		var elem = document.getElementById("record");
		elem.parentNode.style.display="none";
		 elem = document.getElementById("startrecord");
		elem.parentNode.style.display="block"; 
		if(useNgGenieMic)
		{

        recorderObject = recorderObjectTemp;
        recorderObject.stop();

        recorderObject.exportWAV(function(base64_wav_data) {
            var url = 'data:audio/wav;base64,' + base64_wav_data;
            var au  = document.createElement('audio'); 
            document.getElementById("playerContainer").innerHTML = "";

            var duc = document.getElementById("dataUrlcontainer");
            duc.innerHTML = url;

            au.controls = true;
            au.src = url;
            //$recorder.append(au);
            $('#playerContainer').append(au);

            var fd = new FormData();
            fd.append('fname', 'test.wav');
            fd.append('myUrl', duc.innerHTML);
         $.ajax({
        	 type: "POST",
             url: getContextPath()+"/recordWav",
             data: fd,
             processData: false,
             contentType: false,			  
			  success:function(response){ 
		        	var elem = document.getElementById("userInputText");
				   elem.value = response;		        	
		        },
		        error : function(xhr, status, error) {
		        	console.log("Error while fetching Voice to Text");
				}
            });
          recorderObject.logStatus('');
        });
		}
	 }
	 
	 function saveUserRating(){
		   var userFeedbackRating=0.0;
		   isUserRating=false;
		   userFeedbackRating = $('[data-ratings]').ratings('get', 'value');
		   if($('#ratings')!=null || $('#ratings').length > 0){
			   var userFeedbackComment ="";
				 if(userFeedbackTxt == ''){
					 userFeedbackComment =$('#userInputText').val();
				 }else{
					 userFeedbackComment=userFeedbackTxt;
				 }
				 $('#userInputText').val('');
				 console.log("userFeedbackComment "+userFeedbackComment);
			   if(userFeedbackComment!=null && userFeedbackComment!="" && userFeedbackRating!=null && userFeedbackRating!="" && userFeedbackRating!="0.0"){
				   var currentLanguage = "en";
				  if (window.location.href.indexOf("hi_IN") != -1)
					{
					  currentLanguage = "hi"
					}
				  if (window.location.href.indexOf("de_DE") != -1)
					{
					  currentLanguage = "de"
					}
				  var transId=$('#transactionId').val();
				  var userInputText = $('#userInputText').val();
				  userFeedbackTxt =$('#userInputText').val();
				  var uppercaseUserInputText = userInputText.toUpperCase();
				  isRequestSend=1;  
				  var newUserInputText = userInputText.replace(/([."";|\[\]\/\\])/g,' ');
				  var errorText =  $('#errorText').val();     
				  var id = $("#id").val(); 
				  var errorCode = $("#errorCode").val();
				  var tempusername=$('#loginusername').val();
				  var userId = $('#loginusername').val();
				  
				  var typeOfMessage = $("#typeOfMessage").val(); 
				  var answerType = $("#answerType").val(); 
				  var dataToCollect = $("#dataToCollect").val();
				   
				   
				 var json = {errorText : errorText,userInputText : newUserInputText,id : id,errorCode : errorCode,transactionId : transId,userId : userId,typeOfMessage : typeOfMessage,answerType : answerType, dataToCollect : dataToCollect, currentLanguage : currentLanguage,userFeedbackComment :userFeedbackComment,rating : userFeedbackRating,"prevTransactionId" : prevTransactionId};
				 console.log("inside submitfeedback data saving rating");
				 $.ajax({
			 		url: myurl+"submitFeedBackData",
			          type: 'POST',        
			          data: JSON.stringify(json), 
			          cache:false,
			          beforeSend: function(xhr) {  
			              xhr.setRequestHeader("Accept", "application/json; charset=UTF-8");  
			              xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");  
			          },        
			              success:function(response){		  			
			 		  			console.log("working fine");

					  			$('#id').val(response.id);
					  			$('#errorCode').val(response.errorCode);
					  			$('#transactionId').val('');
					  			$('#userId').val(response.userId);
					  			$('#typeOfMessage').val(response.typeOfMessage);
					  			$('#answerType').val(response.answerType);
					  			$('#dataToCollect').val(response.dataToCollect);
					  			
					  			$('#userInputText').val(response.userInputText);
					  			$('#errorText').val(response.errorText);
					  			prevTransactionId = response.prevTransactionId;
					  			var oldscrollHeight = document.getElementById('conversationSection').scrollHeight - 20;
					  			
					  			$("#conversationSection").append("<Div><div id='genieText'  class='bubble'>" + response.userFeedbackText + "</div></Div>");
			 		  			if(response.transactionId != undefined && response.transactionId != null  && response.transactionId!='' && prevTransactionId!=null && prevTransactionId!='' ){
			 		  				$("#conversationSection").append("<Div><div id='genieText'  class='bubble'>" + response.errorText + "</div></Div>");
			 		  			}
			 		  				
			 		  			var newscrollHeight = document.getElementById('conversationSection').scrollHeight - 20; //Scroll height after the request
						        if (newscrollHeight > oldscrollHeight) {
						        	$("#conversationSection").css({"position":"relative"});
						            $("#conversationSection").animate({ scrollTop: newscrollHeight }, 'normal');
						        }
						         isRequestSend=0;
						         CheckForToggle(response.errorText);
					  		     resizeAllElements();
					  		    $('#ratings').html('');
					  		    $('#ratings').attr('id', 'ratings'+divDynamicCounter);
			              },
			 		          error : function(xhr, status, error) {
			 		        	  console.log("error while submitting user feedback");
			 		        	  isRequestSend=0;
			 		  			
			 		  		}
			 		});
				 
				 $("#userInputText").attr("placeholder", "");
				 }
		   }
		   $('#ratings-2').ratings('disable');
	 }
	 
function submitLiveChatData(transId,chatData)
 {							
	var json= {"transactionID":transId,
	"chatUpdate":chatData
	}

	$.ajax({
			url: myurl+"updateRemoteSMEData",
			type: 'POST',        
			data: JSON.stringify(json), 
			cache:false,
			beforeSend: function(xhr) {  
				xhr.setRequestHeader("Accept", "text/plain");  
				xhr.setRequestHeader("Content-Type", "application/json");  
			},       
			success:function(response){ 
							
			},
			error : function(xhr, status, error) {
				alert(xhr.responseText);
			}
		}); 					
						
}

function updateTicketStatus(transId,ticketID)
{							
	var json= {"transactionID":transId,
	"chatUpdate":ticketID
	}

	$.ajax({
			url: myurl+"updateTicketAsRes",
			type: 'POST',        
			data: JSON.stringify(json), 
			cache:false,
			beforeSend: function(xhr) {  
				xhr.setRequestHeader("Accept", "text/plain");  
				xhr.setRequestHeader("Content-Type", "application/json");  
			},       
			success:function(response){ 
							
			},
			error : function(xhr, status, error) {
				alert(xhr.responseText);
			}
		}); 					
						
}
	 