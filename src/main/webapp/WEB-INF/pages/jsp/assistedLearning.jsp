<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>



<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
	

		<style>
		
		
/* The Modal (background) */
.modal-old {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 80px; /* Location of the box */
    left: 0;
    top: -45px;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
	background-color:rgba(0,0,0,.0001);/*Fallback color*/
	
	
}

/* Modal Content */
.modal-content-old{
    background-color: #F2F5F8;
    margin: auto;
    /*padding: 20px;*/
    border: 1px solid #888;
    width: 50%;
	   /* border-radius: 15px;*/
		resize:both;
		overflow:auto;
		min-width:45%;
		min-height:75%;
}

/* The Close Button */
.close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
	
#agent:hover{
	background-color:white;
}
}


</style>
		
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<title>Demo Genie</title>
		
		<link rel="stylesheet" href="resources/css/zurichstyle.css">  
		
		<script src="resources/js/jquery-1.12.4.min.js"></script>
		<!-- js file for timer	
		
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
		<script type="text/javascript" src="resources/js/countimer.js"></script>-->
			
		
  		<script src="resources/js/jquery-ui.js"></script>
		<!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
		<!--<link rel="stylesheet" href="resources/bootstrap/css/bootstrap.min.css">-->
		<!-- modal and its functionality for changing the password -->
		<!--<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" type="text/css" rel="stylesheet">-->
		 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
         <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		<link rel="stylesheet" href="resources/font-awesome-4.7.0/css/font-awesome.min.css">
		
		<script src="resources/js/changePassword.js"></script>
		<link rel="stylesheet" href="resources/css/menu.css">
		<link rel="stylesheet" href="resources/css/modal.css">
		
		
		
		<script src="resources/js/assitedLearning.js"></script>
		<!--<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-notify/0.2.0/css/bootstrap-notify.css">-->
		<!--<script src="resources/bootstrap/js/jquery.min.js"></script>-->
	   <!-- <script src="resources/bootstrap/js/bootstrap.min.js"></script>-->
		<script src="resources/bootstrap/js/bootstrap-notify.js"></script>
		<script src="resources/bootstrap/js/bootstrap-notify.min.js"></script>
		<!--<script src="resources/js/treeJquery/jquery.min.js" type="text/javascript"></script>
       
        <!-- <script src="resources/js/OntologyManager.js"></script>	 -->
		<script src="resources/js/treeJquery/jquery-ui.js" type="text/javascript"></script>
		<script src="resources/js/TreeComponent.js" type="text/javascript"></script>
		<link rel="stylesheet" type="text/css" href="resources/css/TreeComponent.css">
		<link rel="stylesheet" type="text/css" href="resources/css/jquery-ui.css">
		<link rel="stylesheet" type="text/css" href="resources/css/Example.css">
		<link rel="stylesheet" type="text/css" href="resources/css/chatPot.css">

	</head>
	
	<body style="background-color:#9BA9B5; margin:1%;">
	<div id="divLoading" style="display:none; margin: 0px; padding: 0px; position: fixed; right: 0px; top: 0px; width: 100%; height: 100%; background-color: rgb(102, 102, 102); z-index: 30001; opacity: 0.8;">
	<p style="position: absolute; color: White; top: 50%; left: 45%; ">
	Loading, please wait...
	<img src="resources/images/ajax-loader.gif">
	</p>
  </div>
  	<div id="mynewModal" class="modal">
			<!-- Modal content -->
			<div class="modal-content" style="border-radius:15px; height:60%;">
				<!--<span class="close" onclick="closeWindow();">&times;</span>-->
				<div id="password_modal" style="height:100%; background-color: white;display: block;position: relative;border-radius: 11px;border: 1px solid black;">
					<div class="modal-header" align="center" style="height:20%;">
						<h2 id="changePassHeader">Change Password</h2>
					</div>
					<div class="modal-body form-horizontal" align="center" style="height:50%;">
						<div class="control-group" style="height:33%">
							<label for="current_password" class="control-label">Current Password</label>
							<div class="controls">
								<input type="password" name="current_password" id="currentPassword" class="inputPass">
								<div id="currentPassAlert" style="display:none">
								<span style="color:red;">Please fill the current password</span>
								</div>
							</div>
						</div>
						<div class="control-group" style="height:33%">
							<label for="new_password" class="control-label">New Password</label>
							<div class="controls">
								<input type="password" name="new_password" id="newPassword" class="inputPass">
								<div id="newPassAlert" style="display:none">
								<span style="color:red;">Please fill the new password</span>
								</div>
							</div>
						</div>
						<div class="control-group" style="height:33%">
							<label for="confirm_password" class="control-label">Confirm Password</label>
							<div class="controls">
								<input type="password" name="confirm_password" id="confirmPassword" class="inputPass">
								<div id="confirmPassAlert" style="display:none">
								
								</div>
							</div>
						</div>      
					</div>
					<div class="modal-footer" style="text-align:center;">
						<button href="#" class="btn" data-dismiss="modal" aria-hidden="true" onclick="closePasswordModel();">Close</button>
						<button href="#" class="btn btn-primary" id="password_modal_save" onclick="saveChanges();">Save changes</button>
					</div>
				</div>
			</div>
	</div>
	<input id="loginusername" type="hidden" value='admin' />
	<input id="loginfullname" type="hidden" value='admin' />

		<!-- <div id="dialog" title="My Dialog Title"></div>
		<div id="myModal" class="modal">
			<div class="modal-content">
				<span class="close" onclick="closeWindow();">&times;</span>
				<div id="div_log" style="display:none"></div>
				<div id="div_tree"></div>
				<div><button type="button" onclick="selectedCategory();">OK</button></div>
			</div>
		</div> -->
		<div id="myModal" class="modal-old">
			<input type="hidden" id="agentId" value="">
			<input type="hidden" id="adminId" value='${pageContext.request.userPrincipal.name}'>
			
			<!-- Modal content -->
			<div class="modal-content-old" style="height:100%;">
				
				<div id="div_log" style="display:none"></div>
				<div class="chatHead" style="float:left; background-color:rgba(77, 79, 92, 0.25);">
					<div id="agentNameId" style="float:left; margin-top:1%; color:black;">
					</div>
					<div class="chatCloseButton" style="float:right; margin-right:1%; font-size:20px;">
						<!--<img src="resources/images/skypeMinimizeIcon.PNG"  title="minimize Window" onclick="minimizeWindow()" style="padding-bottom: 4px;">
						<img id="closeJS" src="resources/images/skypeCloseIcon.PNG" title="close Window" onclick="closeWindow()" style="height:35px;">-->
						<span id="minimizeModal" class="fa fa-minus" aria-hidden="true" style="color:black; cursor:pointer;" onclick="minimizeWindow()"></span>
						<span id="closeModal" class="fa fa-times" aria-hidden="true" style="color:black; cursor:pointer;" onclick="closeWindow()"></span>
					</div>
				</div>
				<div id="chat_Pot" style="height:90%;">
					<div id="div_Contact" style="background-color:#444753; width:25%; height:104.5%; float:left; padding:0px; overflow: auto; color:white;">
					</div>
					<div class="chatBox" style="float:right;">
						
						<div class="messageWrap">
							<!--<div class="msg_body" id="agent1chatDiv">
								<div>HIIIIII agent1</div>
								<div class="msg_push"></div>
							</div>
							<div class="msg_body" id="agent2chatDiv" style="display:none;">
								<div>HIIIIII agent2</div>
								<div class="msg_push"></div>
							</div>-->
							<div class="msg_footer">
								<div class="submit">
									<span class="fa fa-paper-plane" aria-hidden="true" style="color:black; font-size: 30px; " onclick="sendQuery();"></span>
								</div>
								<textarea class="inputBox" id="userText" style=" width: 85%; height:100%; resize:none; outline: none; border-radius:2px;" autofocus></textarea>
							</div>
						</div>
					</div>
				</div>
				
			</div>
		</div>
		<table width="98%" height="100%" border="0"  cellspacing="0" cellpadding="0" class="bodybackground" bgcolor="#317DC8" >
			<!--  Header view -->
			<tr id="headerRow" class="headerGradient" >
				<td>
				<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		
					<img id="imgLogo">			
					<!--<font face="verdana" color="#003E7C"  size="5">&nbsp;&nbsp;&nbsp;&nbsp;Genie </font>-->
					<font face="verdana" color="#003E7C"  size="3">&nbsp;&nbsp;&nbsp;&nbsp;Assisted Learning </font><p>					
				</td>
				<td align="right">
					<div><div style="float: left;width:89%;margin-top: 1%;">
					<c:if test="${pageContext.request.userPrincipal.name != null}">
					<font face="verdana" color="#003E7C"  size="3" style="float:right;">
						Welcome : ${loggedInFullName} |</font> </div>
						<div class="dropdown" style="float:none;font-size: small; right:3%;">
									<img src="resources/images/userImage.png" class="dropbtn" style="width: 35px; padding-right:5px;">
										<div class="dropdown-content" style="min-width:175px;">
											<table style="width:100%">										
												<tr>
													<td>
														<a href="#" id="userChangePassId" onclick="showChangePasswordModal();"><font face="verdana" color="#172084"  size="2">Change Password</font></a></a>
													</td>
												</tr>
												<tr>
													<td>
														<a href="<c:url value="j_spring_security_logout" />" id="adminlogoutId"> <font face="verdana" color="#172084" size="2">Logout</font>
													</td>								
												</tr>
											</table>
										</div>
									</div>			
				</c:if> 
				</div></td>
			</tr>
			<tr>
				<td id="menuheader" colspan=2 class="headerGradientmenu">
					<font face="verdana" color="#FFFFFF"  size="2">&nbsp;&nbsp;&nbsp;&nbsp; <a  href="#"  onclick="parent.location='admin'" style="color:#FFFFFF " id="backToAdmin"><i>Back to Admin</i> </a></font> 
				</td>
			</tr>
			<tr id="tabRow" >
				<td colspan=2>
				<table border="0" cellspacing="7" width="100%">
					<tr>
						<td id="tabRow1" class="chartCss" BGCOLOR="#FFFFFF" >
							<div id="sltbl">
								 <ul class="nav nav-tabs ">
                                     <li class="active"><a data-toggle="tab" id="present" href="#present1" onclick="checkNavChange(event);">Today's queries</a></li>
                                     <li ><a data-toggle="tab" id="past" href="#past1" onclick="checkNavChange(event);">Past queries</a></li>
									 <div style=" float:right;">
										<label id="todaysStatus"></label>
										<a id="liveChatBtn" class="btn btn-default" style="background-color:#00a9ea; color:white;">Live chat</a></li>
									</div>
                                 </ul>
                                 <div class="tab-content" style="width:100%;">
                                     <div id="present1" class="tab-pane fade in active">
										<div class="panel-group" id="accordionToday">
											<div class="panel panel-default">
												<div class="panel-heading" data-toggle="collapse" data-parent="#accordionToday" href="#collapseOneToday" style="cursor:pointer;">
													<h4 class="panel-title">
														UnAttended Queries<span class="glyphicon glyphicon-chevron-down pull-right"></span>
													</h4>
												</div>
												<div id="collapseOneToday" class="panel-collapse collapse in">
													<div class="panel-body unAttendedPanel" id="unAttendedCollapseToday" style="overflow:auto;">
														
													</div>
												</div>
											</div>
											<div class="panel panel-default">
												<div class="panel-heading" data-toggle="collapse" data-parent="#accordionToday" href="#collapseTwoToday" style="cursor:pointer;">
													<h4 class="panel-title">
														Attended Queries<span class="glyphicon glyphicon-chevron-down pull-right"></span>
													</h4>
												</div>
												<div id="collapseTwoToday" class="panel-collapse collapse">
													<div class="panel-body attendedPanel" id="attendedCollapseToday" style="overflow:auto;">
														
													</div>
												</div>
											</div>
										</div>
                                     </div>
                                     <div id="past1" class="tab-pane fade">
										<div class="panel-group" id="accordionPast">
											<div class="panel panel-default">
												<div class="panel-heading" data-toggle="collapse" data-parent="#accordionPast" href="#collapseOnePast" style="cursor:pointer;">
													<h4 class="panel-title">
														UnAttended Queries<span class="glyphicon glyphicon-chevron-down pull-right"></span>
													</h4>
												</div>
												<div id="collapseOnePast" class="panel-collapse collapse in">
													<div class="panel-body unAttendedPanel" id="unAttendedCollapsePast" style="overflow:auto;">
														
													</div>
												</div>
											</div>
											<div class="panel panel-default">
												<div class="panel-heading" data-toggle="collapse" data-parent="#accordionPast" href="#collapseTwoPast" style="cursor:pointer;">
													<h4 class="panel-title">
														Attended Queries<span class="glyphicon glyphicon-chevron-down pull-right"></span>
													</h4>
												</div>
												<div id="collapseTwoPast" class="panel-collapse collapse">
													<div class="panel-body attendedPanel" id="attendedCollapsePast" style="overflow:auto;">
														
													</div>
												</div>
											</div>
										</div>
                                     </div>
                                 </div>
							
							</div> 	
							 
						</td>	
		
					</tr>
				</table>
				</td>
			</tr>
				<!--  footer view -->
			<tr class="headerGradient" >
				<td colspan=2 align="center">
					<font face="verdana" color="#003E7C"  size="2"> CAREERS | TERMS AND CONDITIONS | KEY POLICIES & COMMITMENTS | PRIVACY SECURITY | SITE MAP</font>
				</td>	
			</tr>			
		</table>	
		<input type="hidden" id="rowcount">
		
  
</div>
<div id="alertDialog" title="" ></div>
<div id="dialog" title="" ></div>
 <div id="chatdialog" title="" ></div>
 <div id="totaldialog" title="" ></div>
	</body>
</html>