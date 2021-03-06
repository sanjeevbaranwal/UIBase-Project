<!doctype html>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@page session="true"%>
<%@page contentType="text/html; charset=UTF-8" pageEncoding="utf-8" %>
<%@page import="com.wipro.configuration.ConfigReader" %>

<html lang="en">
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
   <cfheader name="Access-Control-Allow-Origin" value="*">
	<link rel="shortcut icon" href='<c:url value="/resources/images/favicon.ico" />' type="image/x-icon">
  <meta http-equiv="Content-Type" charset="utf-8" content="IE=edge;chrome=1">
  <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
  <title>ngGenie Support</title>
  
  <% String resourceURL = ConfigReader.getParameter("ResourcesURL" + "."+ ConfigReader.getParameter("DeploymentType")); %>
  <% String mapJsonObj = ConfigReader.getClientDictionaryMapObj(pageContext.getServletContext()); %>
  <% String skipPatterObj = ConfigReader.getSkipSpellPatternsObj(pageContext.getServletContext()); %>
  
<!-- 
  <script src="//code.jquery.com/jquery-1.10.2.js"></script>
  <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
  <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css"> 
   -->
  <script src="resources/js/jquery-1.11.3.js"></script>
  <script src="resources/js/main_test.js"></script>
 <!--   <script src="resources/js/dialogue.js"></script> -->
  <script src="resources/js/spellCheckAndCache.js"></script>
  <script src="resources/js/jquery.min.js"></script>
  <script src="resources/js/jquery-ui-top.js"></script>
  <script src="resources/js/bootstrap.min.js"></script> 
  <link rel="stylesheet" href="resources/css/jquery-ui.css">
  <link rel="stylesheet" href="resources/css/BubbleStyle.css">
  <link rel="stylesheet" href="resources/css/menu.css">
    <link rel="stylesheet" href="resources/css/style.css">
     <link rel="stylesheet" href="resources/bootstrap/css/bootstrap.css">
<!--   <script src="resources/bootstrap.js"></script>
  <link rel="stylesheet" href="resources/bootstrap.css">
  <link rel="stylesheet" href="resources/bootstrap-responsive.css"> -->
 
  <link  href="resources/css/StyleMobile.css" rel="stylesheet" media="only screen and (min-width:0px) and (max-width:880px)" />
  <!-- <link  href="resources/StyleFablet.css" rel="stylesheet" media="only screen and (min-width:421px) and (max-width:399px)" />
  <link  href="resources/StyleTablet.css" rel="stylesheet" media="only screen and (min-width:0px) and (max-width:399px)" /> -->

</head>
<body style="background-color: #E7ECEB;margin: 0; overflow-x: hidden;" onload="setTbl()">
	<div id="divLoading" style="margin: 0px; padding: 0px; position: fixed; right: 0px; top: 0px; width: 100%; height: 100%; background-color: rgb(102, 102, 102); z-index: 30001; opacity: 0.8;">
	<p style="position: absolute; color: White; top: 50%; left: 45%; ">
	Please wait...
	<img src="resources/images/ajax-loader.gif">
	</p>
   </div>
	<form:form commandName="messageBean" method="post" action="">

		<div class="overlay" id="overlay" style="display:none;"></div>
		<div class="head circle" id="draggable" ></div>
		
		<c:set var="hindival1"><spring:message code="welcome.genie"/></c:set>
		<input id="initialGenieMsg" type="hidden" value='${hindival1}'/>
		
		<c:set var="hindival2"><spring:message code="greetings.morning"/></c:set>
		<input id="greetmorning" type="hidden" value='${hindival2}'/>
		
		<c:set var="hindival3"><spring:message code="greetings.afternoon"/></c:set>
		<input id="greetafternoon" type="hidden" value='${hindival3}'/>
		
		<c:set var="hindival4"><spring:message code="greetings.evening"/></c:set>
		<input id="greetevening" type="hidden" value='${hindival4}'/>
		
		<c:set var="hindival5"><spring:message code="formdetails.submit"/></c:set>
		<input id="formsubmit" type="hidden" value='${hindival5}'/>
		
		<c:set var="hindival6"><spring:message code="software.success"/></c:set>
		<input id="softwaresuccess" type="hidden" value='${hindival6}'/>
		
		<c:set var="hindival7"><spring:message code="sotware.ticket"/></c:set>
		<input id="softwareticket" type="hidden" value='${hindival7}'/>
		
		<c:set var="hindival8"><spring:message code="resolution.confirmation"/></c:set>
		<input id="resolutionconfirmation" type="hidden" value='${hindival8}' />

		<input id="loginusername" type="hidden" value='${principal}' />

		<form:hidden path="id" id="id" value="NEWID12" />
		<!--<form:hidden path="userId" id="userId" value="9AA57830-054E-C611-C4EB-01448DAC6286"/>-->
		<form:hidden path="userId" id="userId"
			value="9AA57830-054E-C611-C4EB-01448DAC6111" />
		<form:hidden path="typeOfMessage" id="typeOfMessage" value="ERROR" />
		<form:hidden path="errorCode" id="errorCode" />
		<form:hidden path="transactionId" id="transactionId" />
		<form:hidden path="answerType" id="answerType" />
		<form:hidden path="dataToCollect" id="dataToCollect" />
		<form:hidden path="docName" id="docName" />
		<form:hidden path="errorText" id="errorText" />
		<form:hidden path="alertMessages" id="alertMessages" />
		<form:hidden path="alertMessagesCount" id="alertMessagesCount" />
		<form:hidden path="userName" id="userName" />

		<form:hidden path="printerMakeValue" id="printerMakeValue" />
		<form:hidden path="printerModelValue" id="printerModelValue" />
		<form:hidden path="printerErrorValue" id="printerErrorValue" />
		<form:hidden path="softwareList" id="softwareList" />
		<form:hidden path="browserName" id="browserName" />
		<form:hidden path="internetIssue" id="internetIssue" />

		<form:hidden path="printerLocationValue" id="printerLocationValue" />
		<form:hidden path="printerBuildingValue" id="printerBuildingValue" />
		<form:hidden path="printerFloorValue" id="printerFloorValue" />
		<form:hidden path="printerhostName" id="printerhostName" />
		<form:hidden path="printerServerNameValue" id="printerServerNameValue" />
		<form:hidden path="printerQueueNameValue" id="printerQueueNameValue" />
	  	<form:hidden name="dictionary" id="dictionary" value="<%=mapJsonObj%>" />
		<form:hidden name="skippatterns" id="skippatterns" value="<%=skipPatterObj%>" />
	</form:form>

	<div id="containingBox" style="display:none">
		<center>
			<table id="tblPage" border="0" cellspacing="0" cellpadding="0">
				<tr id="1" class="headerGradient">
					<td>
						<div id="divLogoimg">
							<img id="imgLogo">
						</div>
					</td>
					<td align="right">					
					<div id="divUsenName">
				  	 Welcome ${principal}&nbsp;&nbsp; 
					 | <a href="<c:url value="j_spring_security_logout" />" ><font face="verdana" color="rgb(46,177,53)"  size="2">Logout</font></a>
					&nbsp;&nbsp;&nbsp;&nbsp; 
					
			</div>			
			</td>
				</tr>
				<br>
				<tr id="2" class="headerGradient">
					<td colspan=2 style="border-bottom: solid 1px #A89F96;">
						<div id="divLinks">

							<!-- <font face="verdana" color="Black"  size="2">Home   |    About Us   |    Mission, Vision and Values   |    Management   |    Corporate   |    Locations   |   Contact Us |  Chat with <a id="opener" href="#" style="color: rgb(46,177,53);font-size: 0.917em;font-weight: bold;">ngGenie</a> in <select id="selectlang" name="language" onchange="window.location.href = this.value;"><option value="?language=en">English</option><option value="?language=hi_IN">Hindi</option><option value="?language=de_DE">German</option></select></font> -->
							<font face="verdana" color="#003399" size="2"> Homepage |
								Insurance | Pensions & retirement | Savings & investments |
								Business | About us | Chat with <a id="opener" href="#"
								style="color: #000066; font-size: 0.917em; font-weight: bold;">ngGenie</a> in <select id="selectlang" name="language" onchange="window.location.href = this.value;"><option value="?language=en">English</option><option value="?language=de_DE">German</option></select></font>
						</div>
					</td>
				</tr>
				<tr id="3" style="height: 100%">
					<td colspan=2>
						<center>
							<div id="divcenter">
								<font face="verdana" color="#003399" size="3">Please get
									support of Genie on ngGenie link</font> <br> <img
									id="imgHelpdesk">
							</div>
						</center>
					</td>
				</tr>
			</table>
		</center>
		<center>
			<br>
			<table id="tblFooter" height="10%" cellspacing="0" cellpadding="0"
				style="border-bottom: solid 1px #A89F96;">
				<tr id="headerRow">
					<td>
						<div id="divFooter1">
							<!-- <font face="verdana" color="White"  size="2">Home   |    About Us   |    Mission, Vision and Values   |    Management   |    Corporate   |    Locations   |    Pressroom   |    Contact Us</font> -->
						</div> <br>
						<center>
							<div id="divFooter2">
								<font face="verdana" color="#003399" size="2"> Advisers |
									Brokers | Careers | Media | Sitemap | Contact us | Legal |
									Privacy | Cookies | Accessibility © </font>
							</div>
						</center>
					</td>
				</tr>
			</table>
			<br>
			<div id="footer">
				<center>
					<div id="divfooterMessage" style="padding-bottom: 10px;">
						<font face="verdana" color="#A89F96" size="1">This website
							is best viewed in IE10 and above, Mozilla Firefox, Google Chrome
							V.34 and above. Copyright @2015 Wipro Ltd. All Rights reserved 
					</div>
				</center>
			</div>
		</center>
	</div>
	<div id="dialog" style="visibility: hidden; background-color: #005d7c;">
		<div id="divToggler" class="toggler">
			<div id="effect" class="ui-widget-content ui-corner-all"
				style="display: none;">
				<input type="image" src="resources/images/close.png"
					id="closeSlidder1"
					style="float: right; padding: 5px; height: 15px; width: 15px;"
					onclick="hideSliderBox()">
				<object id="pdf" data="" type="application/pdf" src=""
					height="630px" width="390px" style="overflow: auto;"> </object>

			</div>


			<div id="alert_effect" class="ui-widget-content ui-corner-all"
				style="height: 630px; width: 350px; overflow: auto; display: none; font-family: verdana;">
				<input type="image" src="resources/images/close.png"
					id="closeSlidder2"
					style="float: right; padding: 5px; height: 15px; width: 15px;"
					onclick="hideActiveAlerts()">
				<div id="showMessages"></div>
			</div>

			<div id="video_effect" class="ui-widget-content ui-corner-all"
				style="display: none; height: 630px; width: 430px;">
				<input type="image" src="resources/images/close.png"
					id="closeSlidder2"
					style="float: right; padding: 5px; height: 15px; width: 15px;"
					onclick="hideActiveAlerts()">
				<center>
					<video id="divVideo" style="margin-top: 30%; width: 410px"
						onended="resolutionConfirmation()" controls="controls">
						<source src="" type="video/mp4"></source>
						Your browser does not support the video tag.
					</video>
				</center>
			</div>

			<div id="form_effect" class="ui-widget-content ui-corner-all"
				style="display: none; height: 630px; width: 350px; font-family: verdana; font-size: 13px;">

			</div>
		</div>
		<div style="height: 100%; width: 100%;">
			<div id="conversationSection">
				<div>
					<div id="genieText" class="bubble"></div>
				</div>
			</div>
			<div id="suggestion" style="border-top: 1px solid darkblue; overflow-y:auto; background-color: rgb(226, 226, 226); position: absolute; width: 100%; visibility: hidden; font-size: 14px; font-family: verdana; height: 0%;">
					<div id="suggest" style="width: 100%;">
						<div>
							<div style="width:90%;">
								<div style="margin: 2px; color: black;text-align:center; " id="suggestionTitle"><font color="blue"><b>&nbsp;</b></font> 
								</div>
								
								<div style="margin-left: 1%; float: left;">
									<div style="margin-top: -4px;">
										<a href="javascript:void(0);">
										<img src="resources/images/Left Arrow.png" id="leftSuggestion" style=" height: 20px;width: 20px;"
									 onclick="return replaceWord(' ','L',false);"></a>
									</div>
							 	</div>
								
								<div style="margin-right: -10%; float: right;">
									<div style="margin-top: -4px;">
										<a href="javascript:void(0);">
										<img src="resources/images/Right Arrow.png" id="rightSuggestion" style=" height: 20px;width: 20px;"
									 onclick="return replaceWord(' ','R',false);"></a>
									</div>
							 	</div>
							 	<div style="margin-left: 22px; margin-right:2px; width:100%" id="genieSuggestText" ></div>
								<!-- <a href="#" onclick="sendSuggestion(event)" style="color: black;">
								<div style="margin: 2px;" id="genieSuggestText" ></div>
								</a> -->
							</div>
							
							
							<!-- <div style="width:10%">
								<div style="margin-top: -20px">
									<input type="image" src="resources/images/close.png" id="closeSlidder1" 
									style="margin-top: inherit;float: right; padding-bottom: 35px; padding-right: 15px; height: 20px; width: 20px;" onclick="return closeSuggestion(event);">
								</div>
							</div> -->
						</div>
					</div>
			</div>
			<div id="genieTyping">
				<!-- <span id="genieTypingText" style="color: #0000FF; font-size: 15px"> genie is answering...</span> -->
				<input name="submit" type="submit" value="Clear Chat" class="red"
					onclick="resetForm()" style="visibility: hidden;" />
			</div>
			<div class="recorder" style="display:none">
		        <input id = "startbutton" type="button" class="start" value="Record" /> <input id="stopbutton"
		            type="button" class="stop" value="Stop" />
		        <div id="playerContainer"></div>
		        <div id="dataUrlcontainer" hidden></div>
		        <pre class="status"></pre>
		    </div>
		</div>
		
		</div>
		
		<div id="myModal" class="parentDivClass ui-dialog-content ui-widget-content">
		<table id="tableid" width="auto" border="1" align="top" style="display:none;background:#009EE0" >
		<tr>
		<td>
		<span id="draggable-element" class="draggable-element" style="float: right">
		<img src="resources/images/dragImg.png" ></img>
		</span>
		</td>
	<!--	<td>
	 	<span id="closeimg" style="float: right">
		<img src="resources/images/closeImg.png" onclick ="closeDialgoue();"></img>
		</span>  
		</td> -->
		</tr>
		</table>
		
		  </div>
		<!-- <div id="queryArea">                        
                <table>
                <tr>
                <td><textarea id="userInputText" style="resize:none; border: 0; outline: none;" onkeydown="if (event.keyCode == 13) { return callFAQAjax(event); }"></textarea></td>
                <td style="padding-left: 1em;">
                <input type="image" src="resources/images/sendbt.png" name="Ask Genie" value="Submit" onclick="return callFAQAjax(event);">
                <br>
                <br>
                <input type="image" src="resources/images/clear.png" tooltip="Clear Conversation" height="23" width="27" name="clear" value="clear"  onclick="resetForm()" >
                </td>
                </tr>                
                </table>
        </div> -->
		<!--       </div>  -->
		</div>
		<script type="text/javascript">
		$("#parentDiv").hide();
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
 			setTimeout(function(){ $(".ui-dialog").css("width", width);$(".ui-dialog").css("left", 750);}, 900);
			 setTimeout(function(){showChat(true); }, 1000);
 		}
		//fluidDialog();
// 	    $( "#dialog").css({'min-width': '255px'});
// 	    event.preventDefault();
	     });
	    setTimeout(function(){ 

		    $("#userInputText").focus(); 
		   /* if($("#alertMessagesCount").val() < 9){
		    	$('#alertId').append("<font color=white size=1><B>0"+$("#alertMessagesCount").val()+"</font>");
		    }
		    else{
		    	$('#alertId').append("<font color=white size=1><B>"+$("#alertMessagesCount").val()+"</font>");
			}*/
		 }, 2000);
	    
	    document.getElementById('draggable-element').onmousedown = function () {
		    _drag_init(document.getElementById('myModal'));
		    return false;
		};

		document.onmousemove = _move_elem;
		document.onmouseup = _destroy;
		</script>
	</body>	
</html>