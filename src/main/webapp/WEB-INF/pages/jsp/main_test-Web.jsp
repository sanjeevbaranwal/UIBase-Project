<!doctype html>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page session="true"%>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" charset="utf-8" content="IE=edge;chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>NgGenie Support</title>
<!-- 
  <script src="//code.jquery.com/jquery-1.10.2.js"></script>
  <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
  <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css"> 
   -->
  <script src="resources/jquery-1.11.3.js"></script>
  <script src="resources/jquery-ui.js"></script>
  <link rel="stylesheet" href="resources/jquery-ui.css">
  <link rel="stylesheet" href="resources/BubbleStyle.css">
    <link rel="stylesheet" href="resources/style.css">
<!--   <script src="resources/bootstrap.js"></script>
  <link rel="stylesheet" href="resources/bootstrap.css">
  <link rel="stylesheet" href="resources/bootstrap-responsive.css"> -->
  <link  href="resources/StyleMobile.css" rel="stylesheet" media="only screen and (min-width:0px) and (max-width:480px)" />
  <!-- <link  href="resources/StyleFablet.css" rel="stylesheet" media="only screen and (min-width:421px) and (max-width:399px)" />
  <link  href="resources/StyleTablet.css" rel="stylesheet" media="only screen and (min-width:0px) and (max-width:399px)" /> -->

 
<!--   <style>
  
#tblSuppApp tr td ul
{
margin: 0.1px;padding-left: 15px;
}
  		
         /* #grad1
        {
            height: 647px;
            width: 378px;      
           -webkit-box-shadow: 0px 2px 5px 5px rgba(0,0,0,0.55);
		   -moz-box-shadow: 0px 2px 5px 5px rgba(0,0,0,0.55);
			box-shadow: 0px 2px 5px 5px rgba(0,0,0,0.55);
			
			
        } */
         .ui-dialog-titlebar-close { 
   visibility: hidden; 
 }
 
 	a:hover {
	    color: #0F8E5C;
	    text-decoration: none;
	} 

.ui-dialog .ui-widget-content {
		max-width: 600px;
    	min-width: 320px;
/*     	min-height: 125px; */
/*     	height:400px; */
}
    .ui-dialog.ui-widget-content {
        border:none; 
         margin: 0;
	    padding: 0;
    }
.ui-dialog-shadow {
		max-width: 600px;
    	min-width: 320px;
    	min-height: 255px;
 		box-shadow: 0px 2px 5px 5px rgba(0,0,0,0.55); 
 }
 .ui-widget-header
 {
/*      background: linear-gradient(to bottom, #286f37 0%, #9ab63d 100%); */
     background: white;
 }
 .ui-dialog .ui-dialog-titlebar
 {
 	padding: 0px;
 }
 #divTopBlueBar
        {
        	height: 65px;
        	width:auto;
        	margin-top: 5px;
        }
        
	.red {
    width: 120px;
    height: 100%;
    color: rgb(255,255,255);
    background: rgb(204, 213, 176);
    border: 0;
    float: right;
	}
	
	.red:hover {
		background: rgb(39,155,45);
	}
/*         #divTopBlueBar */
/*         { */
/*         	height: 65px; /*60px*/ */
/*         	width:auto;   */
            
/* /*          /* IE10 Consumer Preview */  */
/* /* background-image: -ms-linear-gradient(bottom, #448AE4 0%, #3B63EA 100%); */ */
 
/* /* Mozilla Firefox */  */
/* /* background-image: -moz-linear-gradient(bottom, #448AE4 0%, #3B63EA 100%); */ */

/* /* Opera */  */
/* /* background-image: -o-linear-gradient(bottom, #448AE4 0%, #3B63EA 100%); */ */

/* /* Webkit (Safari/Chrome 10) */  */
/* /* background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0, #448AE4), color-stop(1, #3B63EA)); */ */

/* /* Webkit (Chrome 11+) */  */
/* /* background-image: -webkit-linear-gradient(bottom, #448AE4 0%, #3B63EA 100%); */ */

/* /* W3C Markup, IE10 Release Preview */  */
/* /* background-image: linear-gradient(to top, #448AE4 0%, #3B63EA 100%);  */  */

/* /* IE10 Consumer Preview */  */
/* background-image: -ms-linear-gradient(top, #000D13 0%, #003E7C 100%); */

/* /* Mozilla Firefox */  */
/* background-image: -moz-linear-gradient(top, #000D13 0%, #003E7C 100%); */

/* /* Opera */  */
/* background-image: -o-linear-gradient(top, #000D13 0%, #003E7C 100%); */

/* /* Webkit (Safari/Chrome 10) */  */
/* background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #000D13), color-stop(1, #003E7C)); */

/* /* Webkit (Chrome 11+) */  */
/* background-image: -webkit-linear-gradient(top, #000D13 0%, #003E7C 100%); */

/* /* W3C Markup, IE10 Release Preview */  */
/* background-image: linear-gradient(to bottom, #000D13 0%, #003E7C 100%);      */
/*         } */

#containingBox
{
			height: auto;
        	width:auto;
			overflow: hidden;
}
        #genieImage
        {         
            height: 220px;
            width: auto;
            background: #005d7c;
            box-shadow: 1 0 21 #000000;
            margin-bottom: -30px;
            /* -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75); */
               
        }
		#conversationSection
        {   
            height: 98%;
            color:white;
/*             width: 100%; */
            background: #e2e2e2;
            overflow-y: auto;
  			overflow-x: hidden;
  			padding: 0.4em;
  			font-family: Roboto;
    		font-size: 12px;
    		font-family : verdana;
    		max-width: 589px;
  			::-webkit-scrollbar {
      		width: 15px;
			 padding-top: 10px;
			}
        }
		#genieTyping
		{
			height: 5%;
            width: auto;
            background: #e2e2e2;
            padding-left: 1em;
            visibility: hidden;
		}
       
        #queryArea
        {
            height: 70px;
            width: auto;
            overflow: hidden;
/*             background: #FEFEF2;  */
/*             padding: 0.3em; */
        }
        
        /*  #genieText, #genieText1
        {
          	margin-left: 10px;
          	margin-right: 40px;
          	margin-top: -5px;
  			margin-bottom: -9px;          	            
            padding-left: 13px; /*10px
            padding-top: 6px;
            padding-bottom: 6px;
            padding-right: 10px;
            
            height: auto;
            width: 306px;            
            background: #FFFFFF;
            text-align: left;
            overflow-wrap: break-word;
            word-wrap: break-word;
            
            color: #383838;                        
            font-family: "Roboto, Arial, regular";
            font-size: 16px;
            border-radius: 3px;
        }
        #userText
        {
          	margin-left: 40px;
          	margin-right: 10px; 
          	margin-top: -5px;
  			margin-bottom: -1px;
  			padding-left: 10px;
            padding-top: 6px;
            padding-bottom: 6px;
            padding-right: 10px;
            height: auto;
            width: 306px;            
            background: #00a8ff;
            text-align: left;
            overflow-wrap: break-word; 
            word-wrap: break-word;
            
            color: #FFFFFF;                       
            font-family: "Roboto, Arial, regular";            
            font-size: 16px;
        } */
        
         #userInputText
        {                        
/*             margin-top: 5px; */
/*             margin-left: 5px; */
/*             margin-bottom: 5px; */
/*             color: white; */
            height: 55px;
    		margin: 3px;
            width: 100%;
    
            background: -webkit-linear-gradient(#ffffff, #ededed); /* For Safari 5.1 to 6.0 */
            background: -o-linear-gradient(#ffffff, #ededed); /* For Opera 11.1 to 12.0 */
            background: -moz-linear-gradient#ffffff, #ededed); /* For Firefox 3.6 to 15 */
            background: linear-gradient(#ffffff, #ededed); /* Standard syntax (must be last) */
            text-align: left;
            
            color: #333333;
            font-family: verdana;
            font-size: 13px;
        }
        
        

/*         IMG.displayed { */
/*     display: block; */
/*     margin-left: auto; */
/*     margin-right: auto } */
        
/* DIALOG MAIN CONTAINER */
    .ui-dialog .ui-widget-content {
        /* border:none; */    
         margin: 0;
	    padding: 0;
    }
            
            /* DIALOG TITLE BAR */
    .ui-dialog.ui-widget-header {
        border:0;
        background:none
         margin: 0;
    padding: 0;
    }
    
       
    #conversationSection::-webkit-scrollbar{
width:8px;
background-color:#cccccc;
}
#conversationSection::-webkit-scrollbar-thumb{
background-color:#333333;
}
#conversationSection::-webkit-scrollbar-thumb:hover{
background-color:#999999;
border:1px solid #333333;
}
#conversationSection::-webkit-scrollbar-thumb:active{
background-color:#666666;
border:1px solid #333333;
}
#conversationSection::-webkit-scrollbar-track{
border:1px gray solid;
-webkit-box-shadow:0 0 2px gray inset;
}
    #slide_effect {
    position: relative;
    width: 240px;
    height: 135px;
    padding: 0.4em;
  }
  
  #slide_out
  {
    width: 500px;
    height: 200px;
  } 
    
    
    
  .toggler {
	position: fixed;
    height: 0px;
/*     padding-left: 884px; */
    z-index:101;    
  }   
  #effect {
    position: relative;
    width: 373px;
    height: 635px;
    padding: 0.4em;
    z-index:101;    
  }
/*    #video_effect { 
     position: relative; 
     width: 400px; 
     height: 635px; 
     padding: 0.4em; 
     z-index:101;
   } */
  #effect h3 {
    margin: 0;
    padding: 0.4em;
    text-align: center;
  }
/*    #divVideo { */
/*     position: relative; */
/*     width: 400px; */
/*     height: 635px; */
/*     padding: 0.4em; */
/*   }    */
/*     .headerGradient{ */
/* 		background: #000D13; */
/* 		background: -moz-linear-gradient(top, #000D13 0%, #003E7C 100%); */
/* 		background: -webkit-gradient(left top, left bottom, color-stop(0%, #000D13), colorstop( */
/* 		100%, #003E7C)); */
/* 		background: -webkit-linear-gradient(top, #000D13 0%, #003E7C 100%); */
/* 		background: -o-linear-gradient(top, #000D13 0%, #003E7C 100%); */
/* 		background: -ms-linear-gradient(top, #000D13 0%, #003E7C 100%); */
/* 		background: linear-gradient(to bottom, #000D13 0%, #003E7C 100%); */
/* 	} */

	.headerGradient{
		background: White;
	}
    
	.no-close .ui-dialog-titlebar-close {display: none }
       
    .overlay{
    background:transparent url(resources/images/overlay.png) repeat top left;
    position:fixed;
    top:0px;
    bottom:0px;
    left:0px;
    right:0px;
    z-index:100;
	}
    
    #coinAnimation
     {
         width: auto;
                height: 93%;
                margin-left: 0px;
     }  
     
			
		.slow-motion {
		  @include transition(all 0.4s linear);
		}
		.head {
		  width: 60px;
		  min-height: 60px;
		  box-shadow: 0 0 10px rgba(#000,.5);
		  background: url(resources/images/head.png) center center no-repeat;
		  border: 10px solid #2EB135;
		  background-size: cover;
		  box-shadow: 0px 0px 15px;
		}
		
		.circle {
		  border-radius: 50%
		}
		
		.head:hover { 
		 box-shadow: 0px 0px 30px; 
		 }
    
    .required label:after {
    color: #e32;
    content: '*';
    display:inline;
}

.formSubmitButton {
    width: 80px;
    height: 30px;
    color: rgb(255,255,255);
    background: rgb(84,185,72);
    border: 0;
    box-shadow: 2px 2px 2px rgba(0,0,0,0.25), inset -2px -2px 2px rgba(0,0,0,0.25);
	}
	
	.formSubmitButton:hover {
		background: rgb(39,155,45);
	}
	
#tblPage
 {
 	width: 70%;
 	background-color: white;
 }

 #divcenter
 {
 	margin-left: 32%;
 	float: left;
 	margin-top: 9%;
 	margin-bottom: 9%;
 }
 
 #divFooter1
 {
     margin-left: 10%;
 }
 
 #divFooter2
 {
 	margin-left: 24%;
 }
 #divCircle
 {
 	position: absolute; 
 	visibility: hidden;
 }
 #divLinks
 {
 	 margin-left: 6%;
 }
    
    </style> -->
  
	<script>
  var dragging = 0;
  var dialogWidth = 370;
  var dialogHeight = 480;
  var ToggleSelector = 0;
  var checkForVideoToggle = 0;
  var videoName;
  var pdfName;
  var isVidioPlay = 0;
  var _currentWindow;
  function greeting()
  {
	  var dt = new Date();
	  var time = dt.getHours();
	  var greetings="Good Evening";
	  var msgTitle = '${msgTitle}';
	  if(time>=0&&time<12)
		  {
		  greetings="Good Morning";
		  
		  }
	  else if(time>=12&&time<17)
	  {
	  greetings="Good Afternoon";
	  
	  }
	  else
	  {
	  greetings="Good Evening";
	  
	  }
/*	  setTimeout(function(){ 
		  //alert($("#userName").val())
		  $("#genieText").text(greetings+" "+$("#userName").val()+", I am ngGenie, How may I help you?");
	   }, 2000);*/
	   if(window.location.href.indexOf("email") != -1){
		   if(msgTitle==""){
			    $("#genieText").text("Sorry I could not find requested email details!!");
			    $("#queryArea *").attr("disabled", "disabled");    
		   }
		   else{
	  			$("#genieText").text(greetings+" "+$("#userName").val()+", I am ngGenie, I am here to help you with the issue you sent in email with subject :"+ msgTitle);
		   }
	   }else{
		   $("#genieText").text(greetings+" "+$("#userName").val()+", I am ngGenie, How may I help you?");  
	   }
	  //$("#genieText").text(greetings+" ${userId}, I am ngGenie, How may I help you?");
  }
  
  var isRequestSend=0;
  $(function() {
$( "#draggable" ).draggable({ containment: "#containingBox", scroll: false });
	  
		
	  $("#playImage").click(function () {
		  playVid();
		  });
	  
	  $("#pauseImage").click(function () {
		  pauseVid();
		  });  
	//var footer = '<div id="queryArea"><table style="width: 100%;height: 70px;"><tr><td><textarea id="userInputText" style="resize:none; border: 0; outline: none;" onkeydown="if (event.keyCode == 13) { return callFAQAjax(event); }"></textarea></td><td><div style="margin-left:25%"><input type="image" src="resources/images/sendbt.png" name="Ask Genie" value="Submit" onclick="return callFAQAjax(event);"><br><input type="image" src="resources/images/clear.png" tooltip="Clear Conversation" height="23" width="27" name="clear" value="clear"  onclick="resetForm()" ></div></td></tr></table></div>';
	var footer = '<div id="queryArea"><table style="width: 100%;height: 70px; background-color: rgb(204, 204, 204);"><tr><td><textarea id="userInputText" style="resize:none; border: 0; outline: none;" onkeydown="if (event.keyCode == 13) { return callFAQAjax(event); }"></textarea></td><td><div style="margin-left:25%"><input type="image" src="resources/images/sendbt.png" name="Ask Genie" value="Submit" onclick="return callFAQAjax(event);" style="height: 50px;width: 50px;"><br></div></td></tr></table></div>';
    $( "#dialog" ).dialog({
      autoOpen: false,
//       modal: true,
      closeOnEscape: false,
      show: {
        effect: "blind",
        duration: 700
      },
      width : dialogWidth,
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
        	  $(this).parent().find('.ui-dialog-titlebar').append('<div id="divTopBlueBar"><table style="width: 55%; height : 100%;float: left;"><tbody><tr><td style="width: 45%;"><img class="displayed" alt="" src="resources/images/ngGenieLogo.png"></td><td style=" color :rgb(47, 177, 53);width: 5%; visibility: hidden;"> | </td><td><div onclick="showActiveAlerts();" style="width:29px;visibility: hidden;"><table height="29px" width="29px" background="resources/images/Alert_Badge.png" cellpadding="0" cellspacing="0" style="background-repeat: round;"><tbody><tr><td valign="center" align="right"><div id="alertId" style="float: right;margin-top: -17px;margin-right: 3px;"><font color="white" size="2"></font></div></td></tr></tbody></table></div></td></tr></tbody></table><div style="margin-right: 2%; float: right;"><div style="margin-top: 5px;"><a href="javascript:void(0);"><img src="resources/images/Minimizeicon.png" id="minimizeButton" style=" height: 18px;width: 18px;margin-right: 3px;" onclick="javascript:minimizeDialogBox();"></a><a href="javascript:void(0);"><img src="resources/images/close.png" id="closeButton" style=" height: 18px;width: 18px;" onclick="javascript:closeDialogBox();"></a></div></div></div>');
          },
          close: function (event, ui) { 
        	  $(this).parent().find('.ui-dialog-titlebar').empty(); 
           }
    });

    $("#dialog").css("visibility","visible");
    $("#dialog").css("background-color","white");
    $('#dialog').bind("dialogresize", function (event, ui) {
    resizeAllElements();    	
    });
    
    function fluidDialog() {
    }
    
	 $( "#opener" ).click(function() {
		 greeting();
		 $("#draggable").hide();
	     $("#genieTypingText").hide();
	     getActiveMessages();
	     //dialogInitiaize();
	    $('#overlay').fadeIn('fast',function(){ 
	    $( "#dialog" ).dialog( "open" );
 	    $( "#dialog" ).removeAttr("style");
 		if ($(window).width() <= 480)
 		{
 			$( "#dialog" ).css( "height", 370);
 			//$( "#dialog" ).css( "width", 320);
 			//setTimeout(function(){ $( ".ui-dialog" ).css('width', '');}, 700);
 		}
 		else
 		{
 			$( "#dialog" ).css( "height", dialogHeight);
 			$( "#dialog" ).css( "width", dialogWidth);
 		}
		//fluidDialog();
// 	    $( "#dialog").css({'min-width': '255px'});
// 	    event.preventDefault();
	     });
	    setTimeout(function(){ 

		    //$("#userInputText").focus(); 
		    if($("#alertMessagesCount").val() < 9){
		    	$('#alertId').append("<font color=white size=1><B>0"+$("#alertMessagesCount").val()+"</font>");
		    }
		    else{
		    	$('#alertId').append("<font color=white size=1><B>"+$("#alertMessagesCount").val()+"</font>");
			}
		 }, 2000);

	    	    
	  });
 
 	$('#draggable').click(function(){
	 $('#opener').trigger('click');
	});
$(document).ready(function(){
	if ($(window).width() <= 420)
	{		
	//dialogWidth = $(window).width()-50;
		$("#imgHelpdesk").hide();	
		$("#imgLogo").attr("src", "resources/images/HomlesLogo1.png");
	}
	else
	{
		$("#imgHelpdesk").show();
	}
	if (window.location.href.indexOf("email") != -1)
	{
		_currentWindow = window;
		$('#opener').trigger('click');
		document.getElementById("containingBox").style.visibility = "hidden"; 
		setTimeout(function () {document.getElementById("minimizeButton").style.visibility = "hidden";}, 1000);
		var json = '${emailJSON}';
		//alert(JSON.stringify(json));
		//var json = '{"transactionId":"201510061012043020001","userInputText":"Printer not workingI\u0027m unable to access printer. Kindly look into the issue and help me to fix the problem"}';
		 var newjson = json.replace(/([.;|\[\]\/\\])/g,' ');
		var transactionStatus= '${transactionStatus}';
			if(transactionStatus=="RESOLVED")
			{
				$("#conversationSection").append("<Div><div id='genieText'  class='bubble'>Resolution has already been provided for this issue. If you again facing issue again request you to send us a new email.Thank You.</div></Div>");
				setTimeout(function () {$("#queryArea *").attr("disabled", "disabled");}, 1000);
			}	
			else if(transactionStatus=="NOTRESOLVED")
			{
				$("#conversationSection").append("<Div><div id='genieText'  class='bubble'>Your ticket has already been created for this issue. Our team will get back to you soon with resolution. Thank You </div></Div>");
				setTimeout(function () {$("#queryArea *").attr("disabled", "disabled");}, 1000);
			}
			else
			{
				 callFAQ(newjson);
			}
		
	}
	else
	{
		document.getElementById("draggable").style.visibility = "visible"; 
		//document.getElementById("minimizeButton").style.visibility = "visible";
	}
});



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
        $("#dialog").dialog("option", "position", {my: "center", at: "Top", of: window});
       // alert(dWidth)
		//$("#grad1").width(dWidth)       
       
    });

  });

 function resizeAllElements(){
 }
 
 function minimizeDialogBox()
 {
	 hideActiveAlerts();
	 $('#effect').hide();
     $('#overlay').fadeOut('fast');					  
	 $('#dialog').dialog('close');
	 $("#draggable").show();
 }

  function closeDialogBox()
  {
	  $("#draggable").show();
	  dialogHeight = $( "#dialog" ).css( "height" );
	  dialogWidth = $( "#dialog" ).css( "width" );
	  var height = 50;
	  var width = 200;
	  hideActiveAlerts();
	  //alert($("#transactionId").val());
	  if($("#transactionId").val() == ''){
		 // alert('null');  
		  if(isRequestSend== 1){
				alert('Your request has been sent.\r\n'+
					  'Genie is proccessing your request.\r\n'+
					  'Please wait for sometime.\r\n')
				
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
  }

function setFeedBackValue(transid ,feedback){
	try{
	      var dataStr = transid + ':'+feedback; 
	      
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
	  			
	  			$.ajax({
	  			    url:url,
	  			    type:'HEAD',
	  			    error: function()
	  			    {
	  			    	  //alert('error');
	  			    },
	  			    success: function()
	  			    {
	  			        alert('success');
	  			    }
	  			  
	  			});
	          },
	          error : function(xhr, status, error) {
	        	  //alert(xhr.responseText);
	        	  var str = xhr.responseText;
	          }
	        });
    	    resetForm();
    		$('#effect').hide();
    	    $('#overlay').fadeOut('fast');
    	    	    
	    	$('#dialog').dialog('close');
		 }
		 catch(err) {
		        //alert(err);
		 }
}

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
  
  var url = "";
 
  function softwareInstallFormAjax(e){
	  
			  var employeeId =  $('#formEmployeeid').val();
			  //var softwareName =  $('#formSoftwareName').val();     
		      var computerId = $('#formComputerID').val();
		      var softwareNameVersion = $('#formSoftwareName').val();
		      
		      if(employeeId=='' || computerId=='' || softwareNameVersion=="-Select-" || softwareNameVersion=='')
		    	  {		    	  
		    	  alert("Please fill/select all the mandatory fields!!")
		    	  return;
		    	  }
		      	$('#softwareInstallButton' ).prop( "disabled", true );
		      	$('#softwareInstallButton' ).css( {"background-color":"grey"} );
		  		$('.softwareInstallClick').removeAttr("href");
		  		$('.softwareInstallClick').prop('onclick',null);
		  		$("#queryArea *").removeAttr("disabled");
		  		$("#userInputText").val("");
		      var transactionId = $("#transactionId").val();
		      
		      var formSoftwareInstallJson = {"employeeId" : employeeId,"computerId" : computerId,"softwareNameVersion" : softwareNameVersion,"transactionId" : transactionId}; 
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
		        	  var oldscrollHeight = document.getElementById('conversationSection').scrollHeight - 20;
				      var html ='<div><div id="genieText" class="bubble">Your details have been submitted successfully. Customer Support Executive will get back to you soon. Thanks for contacting us.</div></div>';
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
      var buildingFloor =  $('#formBuildingFloor').val();
	  var printerSerialNumber =  $('#formPrinterSerialNumber').val(); 
      var printerDeptName = $('#formPrinterDeptName').val()
      var printerIP =  $('#formPrinterIP').val(); 
      var contactNo = $('#formContactNo').val()
      
      var transactionId = $("#transactionId").val();
      
      if(employeeId=='' || printerMake=='' || printerModel=='' || printerError=='' || buildingFloor=='' )
	  {		    	  
	  alert("Please fill all the mandatory fields!!")
	  return;
	  }
        $('#printerDetailsButton' ).prop( "disabled", true );
		$('#printerDetailsButton' ).css( {"background-color":"grey"} );
		$('.printerDetailsClick').removeAttr("href");
		$('.printerDetailsClick').prop('onclick',null);
		$("#queryArea *").removeAttr("disabled");
  		$("#userInputText").val("");
      
      //var printerDetailsJson = {"employeeId" : employeeId,"printerMake" : printerMake,"printerModel" : printerModel,"printerType" : printerType,"printerError" : printerError,"buildingFloor" : buildingFloor,"printerSerialNumber" : printerSerialNumber,"printerDeptName" : printerDeptName,"printerIP" : printerIP,"contactNo" : contactNo};
      var printerDetailsJson = {"employeeId" : employeeId,"printerMake" : printerMake,"printerModel" : printerModel,"printerError" : printerError,"buildingFloor" : buildingFloor,"printerSerialNumber" : printerSerialNumber,"printerDeptName" : printerDeptName,"printerIP" : printerIP,"contactNo" : contactNo,"transactionId" : transactionId}; 
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
        	  var oldscrollHeight = document.getElementById('conversationSection').scrollHeight - 20;
		      var html ='<div><div id="genieText" class="bubble">Your details have been submitted successfully. Customer Support Executive will get back to you soon. Thanks for contacting us.</div></div>';
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
  
  function callFAQAjax(e){
	  if(isRequestSend== 1){
		alert('Your request has been sent.\r\n'+
			  'Genie is proccessing your request.\r\n'+
			  'Please wait for sometime.\r\n')
		
		  return ;
	  }
	  

	  var userInputText = $('#userInputText').val();
	  var uppercaseUserInputText = userInputText.toUpperCase();
			  isRequestSend=1;  
			  var newUserInputText = userInputText.replace(/([."";|\[\]\/\\])/g,' ');
			  var errorText =  $('#errorText').val();     
		      var id = $("#id").val(); 
		      var errorCode = $("#errorCode").val(); 
		      var transactionId = $("#transactionId").val(); 
		      //var userId ="9AA57830-054E-C611-C4EB-01448DAC6111";// $("#userId").val(); 
		      var userId = '${pageContext.request.userPrincipal.name}'
		      //alert(userId)
		      var typeOfMessage = $("#typeOfMessage").val(); 
		      var answerType = $("#answerType").val(); 
		      var dataToCollect = $("#dataToCollect").val(); 
		      var json = {"errorText" : errorText,"userInputText" : newUserInputText,"id" : id,"errorCode" : errorCode,"transactionId" : transactionId,"userId" : userId,"typeOfMessage" : typeOfMessage,"answerType" : answerType, "dataToCollect" : dataToCollect};
		      
		      var oldscrollHeight = document.getElementById('conversationSection').scrollHeight - 20;
		      if(userInputText.length > 0 ){
		// 	      $("#conversationSection").append("<IMG  id='usertopimg' src='resources/images/conversationbg_top.png' style='padding-left: 39px;'/>");
		// 		  $("#conversationSection").append("<div id='userText'><font face='Roboto, Arial' size=2px color='#FFFFFF' >"+userInputText+"<font></div>");
		// 		  $("#conversationSection").append("<IMG id='userbottomimg' src='resources/images/conversationbg_bottom.png' style='padding-left: 39px'/>");
				  $("#conversationSection").append("<div><div id='userText' class='bubble bubble--alt'>"+userInputText+"</div></div>");
				  $("#genieTypingText").show();
				resizeAllElements();
		      }
			  $('#userInputText').val('');
			  
			  var newscrollHeight = document.getElementById('conversationSection').scrollHeight - 20; //Scroll height after the request
		      if (newscrollHeight > oldscrollHeight) {
		    	  $("#conversationSection").css({"position":"relative"});
		          $("#conversationSection").animate({ scrollTop: newscrollHeight }, 'normal');
		      }      
		      
		    	$.ajax({
		          url: "faq",
		          type: 'POST',        
		          data: JSON.stringify(json), 
		          cache:false,
		          beforeSend: function(xhr) {  
		              xhr.setRequestHeader("Accept", "application/json");  
		              xhr.setRequestHeader("Content-Type", "application/json");  
		          },       
		          success:function(response){        	  
		    			//alert(response.docName);
		  			
// 			if(uppercaseUserInputText=="BYE" || uppercaseUserInputText=="QUIT" || uppercaseUserInputText=="CLOSE" || uppercaseUserInputText=="EXIT" || uppercaseUserInputText=="GOOD BYE" || uppercaseUserInputText=="GOODBYE")
// 		  {
// 		  closeDialogBox();		
// 		  }
			
  			/* $('#errorText').val(response.errorText); 
  			var oldscrollHeight = document.getElementById('errorText').scrollHeight - 20;
  			 */
			if (response.errorText.toLowerCase()=="good bye")
			{
                setTimeout(function(){closeDialogBox(); }, 1000);
         	}
		  			if (userInputText.match("^RE :")) {
		  				userInputText = userInputText.substring(4);
		  			}
		  			
		  			var oldscrollHeight = document.getElementById('conversationSection').scrollHeight - 20;	 
		 			var resVal = response.errorText;
		 			if(resVal.indexOf("$greeting") >= 0)
		 			{

		 				var dt = new Date();
		 				  var time = dt.getHours();
		 				  var greetings="Good Evening";
		 				  if(time>=0&&time<12)
		 					  {
		 					  greetings="Good Morning";
		 					  
		 					  }
		 				  else if(time>=12&&time<17)
		 				  {
		 				  greetings="Good Afternoon";
		 				  
		 				  }
		 				  else
		 				  {
		 				  greetings="Good Evening";
		 				  
		 				  }
				 			resVal = resVal.replace("$greeting", greetings);
			 		}
		 			var uname='${userId}'
		 			resVal = resVal.replace("$username", uname);
		 			
		//   		   $("#conversationSection").append("<div><IMG id='genietopimg' src='resources/images/conversationbggenie_top.png' style='padding-left: 9px;  padding-top: 10px;'/>");
		//    		  $("#conversationSection").append("<center><div id='genieText'><font face='Roboto, Arial' size=2px color='#383838' >" + response.errorText + "</font></div></center>");
		//    		  $("#conversationSection").append("<IMG id='geniebottomimg' src='resources/images/conversationbggenie_bottom.png' style='padding-left: 9px'/></div>");
		    	  $("#conversationSection").append("<Div><div id='genieText'  class='bubble'>" + resVal + "</div></Div>");   		  
		   		//resizeAllElements();
			    	/*
		   		$("#genieText1").width($("#dialog" ).width()-45);
				$("#genietopimg1").width($("#dialog" ).width()-20);
				$("#geniebottomimg1").width($("#dialog" ).width()-20);*/
		
				
				
		   		$("#genieTypingText").hide();
		   		isRequestSend=0;
		   		var newscrollHeight = document.getElementById('conversationSection').scrollHeight - 20; //Scroll height after the request
		        if (newscrollHeight > oldscrollHeight) {
		        	$("#conversationSection").css({"position":"relative"});
		            $("#conversationSection").animate({ scrollTop: newscrollHeight }, 'normal');
		        }
		   		
		  			/* var newscrollHeight = document.getElementById('errorText').scrollHeight - 20; //Scroll height after the request
		              if (newscrollHeight > oldscrollHeight) {
		                  $("#errorText").animate({ scrollTop: newscrollHeight }, 'normal');
		              } */
		  		
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
		
		  	  
		      //resizeAllElements();
		     
		      return true;
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
  	    	//$('#errorText').html("<div style='color:#333333;'>I am ngGenie, How may I help you?</div>");	
  	    	$('#conversationSection').empty();
// 			var html ='<div><IMG id="genietopimg" src="resources/images/conversationbggenie_top.png" style="padding-left: 9px;  padding-top: 10px;"/>';
// 			html += '<center><div id="genieText"><font face="Roboto, Arial" size=2px color="#383838" >I am ngGenie, How may I help you? </font></div></center>';
// 			html += '<IMG id="geniebottomimg" src="resources/images/conversationbggenie_bottom.png" style="padding-left: 9px"/></div>';
 			var html ='<div><div id="genieText" class="bubble">I am ngGenie, How may I help you?</div></div>';
			 $("#conversationSection").append($(html)); 
    		greeting();
  			
  	    }
  	});	
  }
  function myFunction(){
// 	  //var w=window.innerWidth 
// 	  //var h=window.innerHeight 
// 	  //alert( "Window h " +h + " Windows W "+ w)
	
// 	//  $("div").width(w) 
// //	alert( $("#dialog" ).width())
// //	alert($("#dialog").height())

// 	var w=$("#dialog" ).width()-50
// 	var h=$("#dialog").height()-50
// 	//$("#grad1").width(w)
// 	//$("#grad1").height(h)
	
// 	//$("#divRightContent").width(w)
// 	//$("#divRightContent").height(h)
	
// 	$("#enclosingErrorText").width(w)
// 	$("#enclosingUserInputText").width(w)
// 	$("#centreImage").width(w)
	
// 	$("#inputTextTable").width(w)	
  }

  function runEffect(url) {
		 
     // get effect type from
     //var selectedEffect = $( "#effectTypes" ).val();

     // most effect types need no options passed by default
     var options = {};
     // some effects have required parameters
     /* if ( selectedEffect === "scale" ) {
       options = { percent: 0 };
     } else if ( selectedEffect === "size" ) {
       options = { to: { width: 200, height: 60 } };
     } */
     
   $('#pdf').attr('src', url);
   $('#pdf').attr('data', url);
     // run the effect
     $( "#effect" ).toggle( "slide", options, 500 );
    
   }
	 
  
  function openDoc() {
	    window.open(pdfName, "documentWindow", "width=600,height=600,scrollbars=yes");
	    //runEffect(url);
	}
  function GetDialogLocation(){
	var dialogWidth = $( "#dialog" ).dialog( "option", "width" );
	//var dialogPosition = parseInt( $( ".ui-dialog-shadow" ).css( "left" ).replace('px', ''));
	//var toggleposition = dialogWidth + dialogPosition + 4;
	var toggleposition = dialogWidth + 3;
	if ($(window).width() <= 420)
	{
		//$("#form_effect").css("width", dialogWidth);
		return 0;
	}
	else if($(window).width() > 420 && $(window).width() <= 820)
	{
		return 0;
	}
	else
	{
		return toggleposition;
	}
  }
  
  function GetDialogTopHeight(){
		var dialogTop = parseInt( $( ".ui-dialog-shadow" ).css( "top" ).replace('px', ''));
		var ConvSecHeight = parseInt( $(".ui-dialog-shadow").css("height").replace('px', ''));
		var headerHeight = parseInt( $("#divTopBlueBar").css("height").replace('px', ''));
		ConvSecHeight = ConvSecHeight - 5;
		var height = -(headerHeight + 5);
		var TopHeight = [];
		TopHeight.push(height);
		TopHeight.push(ConvSecHeight);
		return TopHeight;
	  }
  function SelectSlideDirection(){
	  var option;
	  return option; 
  }

  function showActiveAlerts(){
// 	  	$("#effect").hide();
// 	  	$("#video_effect").hide();
// 	  	$("#alert_effect").show();
// 		var options = SelectSlideDirection();
		var options = {};
		var position = GetDialogLocation();
		var Size = GetDialogTopHeight();
		$("#divToggler").css("padding-left", position);
		$("#divToggler").css("margin-top", Size[0]);
		$("#alert_effect").css("height", Size[1]);
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
		}
		else
		{
			ToggleSelector = 0;
		}
 		var res = '<ul>';				  				
		$.each(JSON.parse($("#alertMessages").val()), function(idx, obj) {
			//alert(obj.message);
			res = res + '&nbsp;&nbsp;<li>&nbsp;&nbsp;' + obj.message+'</li>';
			//$("#showMessages").css("visibility","visible");
		});
		res = res + '</ul>';
		$('#showMessages').html(res);
	  
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
        		$( "#video_effect" ).toggle( "slide", options, 500 );
        	}
        	ToggleSelector = 0;
        	isVidioPlay = 0;
       	}
  }
  
  function openURL(url) {
	    window.open(url);
	    
	}
  
  function CheckForToggle(GenieText){
/* 	  if ( GenieText.indexOf('id="urlVideo"') != -1 )
		{
		  videoName = $("#urlVideo").attr('name');
		  videoName = "resources/videos/" + videoName;
		}
	  if ( GenieText.indexOf('id="urlPDF"') != -1 )
		{
		  pdfName = $("#urlPDF").attr('name');
		  pdfName = "resources/docs/" + pdfName ;
		} */
  }
  
  function loadVideo(atag) {
		var options = {};
		videoName = atag.name;
		videoName = "resources/videos/" + videoName;
   var position = GetDialogLocation();
   if(position == 0)
	{
	   position = position + 8;
	}
	var Size = GetDialogTopHeight();
	$("#divToggler").css("padding-left", position); 
	$("#divToggler").css("margin-top", Size[0]);
	$("#video_effect").css("height", Size[1]);
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
	//$("#userInputText").attr("disabled",true);
	$("#queryArea *").attr("disabled", "disabled");
	$("#userInputText").val("Please submit the form to proceed.");
	
	//$( "#form_effect" ).append( '<input type="image" src="resources/images/close.png" id="closeSlidder3" style="float: right;padding: 5px; height: 15px;width: 15px;" onclick="hideActiveAlerts()">' )
	//$( "#form_effect" ).append( '<div align="center"><table border="0" style="margin-top: 40px;"><tr><td colspan="2" align="center"><h4>Please fill the below details</h4></td></tr><tr><td>Employee ID:</td><td><input type="text" id="formEmployeeid"/></td></tr><tr><td>Software Name:</td><td><input type="text" id="formSoftwareName"/></td></tr><tr><td>Computer ID:</td><td><input type="text" id="formComputerID"/></td></tr><tr><td>Reason for Installation:</td><td><input type="text" id="formReasonForInstallation"/></td></tr><tr><td colspan="2" align="center"><input type="button" value="Submit" onclick="return softwareInstallFormAjax(event)"/></td></tr></table></div>' );
	
	
	 
	if($('#softwareList').val()=="")
		{
		$( "#form_effect" ).append( '<div align="center"><table border="0" style="margin-top: 40px;"><tr><td colspan="2" align="center"><h4>Please fill the below details</h4></td></tr><tr><td>Employee ID:<font color="red">*</font></td><td width="50%"><input type="text" id="formEmployeeid" style=" width: 180px;"/></td></tr><tr><td>Computer ID:<font color="red">*</font></td><td><input type="text" id="formComputerID" style=" width: 180px;"/></td></tr><tr><td>Software Name with Version:<font color="red">*</font></td><td><input type="text" id="formSoftwareName" style=" width: 180px;"/></td></tr><tr><td><font color="red">(* Mandatory Fields)</font></td></tr><tr><td colspan="2" align="center"><input type="button" id="softwareInstallButton" class="formSubmitButton" value="Submit" onclick="return softwareInstallFormAjax(event)"/></td></tr></table></div>' );
		}
	else
		{
		var softwareList = "-Select-,"+$('#softwareList').val();
		var options = softwareList.split(",");
		if(options.length==2)
			{
				$( "#form_effect" ).append( '<div align="center"><table border="0" style="margin-top: 40px;"><tr><td colspan="2" align="center"><h4>Please fill the below details</h4></td></tr><tr><td>Employee ID:<font color="red">*</font></td><td><input type="text" id="formEmployeeid" style=" width: 180px;"/></td></tr><tr><td>Computer ID:<font color="red">*</font></td><td><input type="text" id="formComputerID" style=" width: 180px;"/></td></tr><tr><td>Software Name with Version:<font color="red">*</font></td><td><input type="text" id="formSoftwareName" style=" width: 180px;"/></td></tr><tr><td><font color="red">(* Mandatory Fields)</font></td></tr><tr><td colspan="2" align="center"><input type="button" id="softwareInstallButton" class="formSubmitButton" value="Submit" onclick="return softwareInstallFormAjax(event)"/></td></tr></table></div>' );
				$("#formSoftwareName").val(options[1])
			}
		else
			{
				$( "#form_effect" ).append( '<div align="center"><table border="0" style="margin-top: 40px;"><tr><td colspan="2" align="center"><h4>Please fill the below details</h4></td></tr><tr><td>Employee ID:<font color="red">*</font></td><td><input type="text" id="formEmployeeid" style=" width: 180px;"/></td></tr><tr><td>Computer ID:<font color="red">*</font></td><td><input type="text" id="formComputerID" style=" width: 180px;"/></td></tr><tr><td>Software Name with Version:<font color="red">*</font></td><td><select id="formSoftwareName" style=" width: 185px;"/></td></tr><tr><td><font color="red">(* Mandatory Fields)</font></td></tr><tr><td colspan="2" align="center"><input type="button" id="softwareInstallButton" class="formSubmitButton" value="Submit" onclick="return softwareInstallFormAjax(event)"/></td></tr></table></div>' );	
				var option="";
				for (var i=0;i<options.length;i++){
				   option += '<option value="'+ options[i] + '">' + options[i] + '</option>';
				}
				$('#formSoftwareName').append(option);
			}
		
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
	//$("#userInputText").attr("disabled",true);
	$("#queryArea *").attr("disabled", "disabled");
	$("#userInputText").val("Please submit the form to proceed");
	
	//$( "#form_effect" ).append( '<input type="image" src="resources/images/close.png" id="closeSlidder3" style="float: right;padding: 5px; height: 15px;width: 15px;" onclick="hideActiveAlerts()">' )
	//$( "#form_effect" ).append( '<div align="center"><table border="0" style="margin-top: 40px;"><tr><td colspan="2" align="center"><h4>Please fill the below details</h4></td></tr><tr><td>Employee ID:</td><td><input type="text" id="formEmployeeid"/></td></tr><tr><td>Software Name:</td><td><input type="text" id="formSoftwareName"/></td></tr><tr><td>Computer ID:</td><td><input type="text" id="formComputerID"/></td></tr><tr><td>Reason for Installation:</td><td><input type="text" id="formReasonForInstallation"/></td></tr><tr><td colspan="2" align="center"><input type="button" value="Submit" onclick="return softwareInstallFormAjax(event)"/></td></tr></table></div>' );
	$( "#form_effect" ).append( '<div align="center"><table border="0" style="margin-top: 40px;"><tr><td colspan="2" align="center"><h4>Please fill the below details</h4></td></tr><tr><td>Employee ID:<font color="red">*</font></td><td><input type="text" id="formEmployeeid"/></td></tr><tr><td>Printer Make:<font color="red">*</font></td><td><input type="text" id="formPrinterMake"/></td></tr><tr><td>Printer Model:<font color="red">*</font></td><td><input type="text" id="formPrinterModel"/></td></tr><tr><td>Printer Error:<font color="red">*</font></td><td><input type="text" id="formPrinterError"/></td></tr><tr><td>Building/Floor:<font color="red">*</font></td><td><input type="text" id="formBuildingFloor"/></td></tr><tr><td>Serial Number of Printer:</td><td><input type="text" id="formPrinterSerialNumber"/></td></tr><tr><td>Department Name:</td><td><input type="text" id="formPrinterDeptName"/></td></tr><tr><td>Printer IP:</td><td><input type="text" id="formPrinterIP"/></td></tr><tr><td>Contact No:</td><td><input type="text" id="formContactNo"/></td></tr><tr><td><font color="red">(* Mandatory Fields)</font></td></tr><tr><td colspan="2" align="center"><input type="button" id="printerDetailsButton" class="formSubmitButton" value="Submit" onclick="return printerDetailsFormAjax(event)"/></td></tr></table></div>' ); 
	
	$("#formPrinterMake").val($('#printerMakeValue').val())
	$("#formPrinterModel").val($('#printerModelValue').val())
	$("#formPrinterError").val($('#printerErrorValue').val())
	
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

function setTbl(){
	//alert("hello")
	var h=window.innerHeight - 20
    $("#1").height((h/10)*1)
    $("#2").height((h/10)*0.5)
//   	$("#3").height((h/10)*7.5)
  	$("#4").height((h/10)*1)
  	var uname='${userId}'
  	$("#userName").val(uname);
  	//alert('Uname ' + uname)
//alert(${userId});
//  	getUserName();
	
	
}

function hideSliderBox()
{
	
      //$('#effect').hide();
      var options = {};
     $( "#effect" ).toggle( "slide", options, 500 );
}

</script>

</head>
<body style="background-color: #A2C8B6;margin: 0; overflow-x: hidden;" onresize="myFunction()" onload="setTbl()">


<div class="overlay" id="overlay" style="display:none;"></div>



<div class="head circle" id="draggable" >

</div>


<form:form commandName="messageBean" method="post" action="">
 		<form:hidden path="id" id="id" value="NEWID12"/>
                               		<!--<form:hidden path="userId" id="userId" value="9AA57830-054E-C611-C4EB-01448DAC6286"/>-->
            <form:hidden path="userId" id="userId" value="9AA57830-054E-C611-C4EB-01448DAC6111"/>
			<form:hidden path="typeOfMessage" id="typeOfMessage" value="ERROR"/>
			<form:hidden path="errorCode" id="errorCode"/>
			<form:hidden path="transactionId" id="transactionId"/>
			<form:hidden path="answerType" id="answerType"/>
			<form:hidden path="dataToCollect" id="dataToCollect"/>
			<form:hidden path="docName" id="docName"/>
			<form:hidden path="errorText" id="errorText"/>
			<form:hidden path="alertMessages" id="alertMessages"/>
			<form:hidden path="alertMessagesCount" id="alertMessagesCount"/>
			<form:hidden path="userName" id="userName"/>
			
			<form:hidden path="printerMakeValue" id="printerMakeValue"/>
			<form:hidden path="printerModelValue" id="printerModelValue"/>
			<form:hidden path="printerErrorValue" id="printerErrorValue"/>
			<form:hidden path="softwareList" id="softwareList"/>
			
</form:form>	

<div id="containingBox">
  <center>
  <table id="tblPage" border="0" cellspacing="0" cellpadding="0">
  	<tr id="1" class="headerGradient">
  		<td>
	  		<br>
				<div id="divLogoimg">
					<img id="imgLogo" src="resources/images/Quest-logo.gif">
				</div>
  		</td>
  		<td align="right">
  		<c:if test="${pageContext.request.userPrincipal.name != null}">
			<div id="divUsenName">
				 Welcome ${userId}&nbsp;&nbsp; 
					 | <a href="<c:url value="j_spring_security_logout" />" ><font face="verdana" color="rgb(46,177,53)"  size="2">Logout</font></a>
					&nbsp;&nbsp;&nbsp;&nbsp;
			</div>			
			</c:if>
  		</td>
  	</tr>
  	<br>
  	<tr id="2" class="headerGradient">
  		<td colspan=2 style="border-bottom: solid 1px #D5E7E0;">				
		<div id="divLinks">
			<font face="verdana" color="Black"  size="2">Home   |    About Us   |    Mission, Vision and Values   |    Management   |    Corporate   |    Locations   |    Pressroom   |    Contact Us |  <a id="opener" href="#" style="color: rgb(46,177,53);font-size: 0.917em;font-weight: bold;">ngGenie</a></font>
		</div>
		</td>
  	</tr>
  	<tr id="3" style="height:100%">
  		<td  colspan=2>
		<div id="divcenter">
  			<font face="verdana" color="black"  size="3">Please get support of Genie on ngGenie link</font>
  			<br>
  			<img id="imgHelpdesk" src="resources/images/Helpdesk1.jpg">
		</div>
  		</td>
  	</tr>
  </table>
  </center>
   <center><br> 
	<table id="tblFooter"   height="10%" cellspacing="0" cellpadding="0" style="border-bottom: solid 1px #D5E7E0;">
 		 <tr id="headerRow">
				<td>
				<div id="divFooter1">
					<font face="verdana" color="White"  size="2">Home   |    About Us   |    Mission, Vision and Values   |    Management   |    Corporate   |    Locations   |    Pressroom   |    Contact Us</font>
				</div><br>
				<div id="divFooter2">
					<font face="verdana" color="White"  size="2">Site Map   |    Terms and Conditions   |    Online Privacy Policy   |    Data Privacy Policy</font>
				</div>  
				</td>
			</tr>
 		 </table><br> 		 
 <div id="footer">
<!--             <div style="padding-bottom: 10px;">
                Quest Diagnostics India Private Limited, A-17 Info City, Sector 34, Gurgaon-122001, Haryana, India. +91 124 4608888</div> -->
            <div style="padding-bottom: 10px;"><center>
<!--                 Quest, Quest Diagnostics, the associated logo, ExamOne, Nichols Institute and all associated Quest Diagnostics marks are the registered trademarks of Quest Diagnostics. All third-party marks and - are the property of their respective owners. 2000-2008 Quest Diagnostics Incorporated. All rights reserved. -->
 			This website is best viewed in Chrome, Firefox & IE 10(Compatibility Mode - Off).
		<br>© Wipro Limited 2015. All rights reserved. </center>
            </div>
</div>
</center>
</div>
  <div id="dialog" style="visibility:hidden; background-color: #005d7c;">
  <div id="divToggler" class="toggler">
  <div id="effect" class="ui-widget-content ui-corner-all" style="display: none;">
  <input type="image" src="resources/images/close.png" id="closeSlidder1" style="float: right;padding: 5px; height: 15px;width: 15px;" onclick="hideSliderBox()">  
    <object id="pdf" data="" type="application/pdf" src="" height="630px" width="390px" style="overflow: auto;">		
	</object>
	
  </div>


  <div id="alert_effect" class="ui-widget-content ui-corner-all" style="height:630px;width:368px;overflow: auto;display: none; font-family: verdana;" >
  <input type="image" src="resources/images/close.png" id="closeSlidder2" style="float: right;padding: 5px; height: 15px;width: 15px;" onclick="hideActiveAlerts()">  
  <div id="showMessages" ></div>	
  </div>
  
  <div id="video_effect" class="ui-widget-content ui-corner-all" style="display: none;height:630px;width:360px;">
 		<input type="image" src="resources/images/close.png" id="closeSlidder2" style="float: right;padding: 5px; height: 15px;width: 15px;" onclick="hideActiveAlerts()">	
		<video id="divVideo" width="320" height="240" controls="controls" autoplay style="margin-top: 30%; margin-left: 20px;">
		<source src="" type="video/mp4"></source>
		</video>
	</div>
  
  <div id="form_effect" class="ui-widget-content ui-corner-all" style="display: none;height:368px;width:368px; font-family: verdana; font-size: 13px; ">
	 		
  </div>
</div>
        <div style="height: 100%;width: 100%;">
        <div id="conversationSection">                        
               <div>
					 <div id="genieText" class="bubble"></div>
               </div> 
        </div>
        <div id="genieTyping">
        	<!-- <span id="genieTypingText" style="color: #0000FF; font-size: 15px"> genie is answering...</span> -->
        	<input name="submit" type="submit" value="Clear Chat"  class="red" onclick="resetForm()" style="visibility: hidden;" />
        </div>
        </div>
</div>
  
</body>
<script>
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

</script>
</html>