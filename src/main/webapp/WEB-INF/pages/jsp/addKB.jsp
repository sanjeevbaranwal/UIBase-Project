<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>



<!DOCTYPE html>
<html lang="en">
<head>
	<style>
/* The Modal (background) */
.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	
	
}

/* Modal Content */
.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 20%;
	    border-radius: 15px;
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
}
</style>
  <title>Demo Genie</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!--
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
  -->
  <link rel="stylesheet" href="resources/bootstrap/css/bootstrap.min.css">
  <script src="resources/bootstrap/js/jquery.min.js"></script>
  <script src="resources/bootstrap/js/bootstrap.min.js"></script>
  <script src="resources/js/addKB.js"></script>
  		
  <link rel="stylesheet" href="http://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css">
  <script src="resources/js/jquery-1.9.0.min.js"></script>
  <script src="resources/js/jquery-ui.js"></script>
  <!-- Tree Creation -->
  <script src="resources/js/TreeComponent.js" type="text/javascript"></script>
		<link rel="stylesheet" type="text/css" href="resources/css/TreeComponent.css">
		<link rel="stylesheet" type="text/css" href="resources/css/Example.css">
</head>

<body onload="pageOnLoad()">
<!--  <form id="myForm" action="uploadfile" method="post" enctype="multipart/form-data" onsubmit="return validateForm();" >-->

<form id="upload_form" enctype="multipart/form-data" onsubmit="return validateForm();">
  <input type="hidden" id="uploadedFileName">
  <input type="hidden" id="appnames">
  <input type="hidden" id="questionDescription">
  <input type="hidden" id="nouns">
  <input type="hidden" id="verbs">     
  <input type="hidden" id="adjective">
  <input type="hidden" id="isOfApplication"> 
  <input type="hidden" id="hasAnswer"> 
  <input type="hidden" id="hasFollowUpQuestion"> 
  <input type="hidden" id="followUpDescription"> 
  <input type="hidden" id="answerDescription"> 
  <input type="hidden" id="isOfQuestion">
  <input type="hidden" id="questionNodeName">
  <input type="hidden" id="answerNodeName">
  <input type="hidden" id="followUpNodeName">
  
  <div id="dialog" title="My Dialog Title"></div>
  
  <div id="divLoading" style="margin: 0px; padding: 0px; position: fixed; right: 0px; top: 0px; width: 100%; height: 100%; background-color: rgb(102, 102, 102); z-index: 30001; opacity: 0.8;">
	<p style="position: absolute; color: White; top: 50%; left: 45%; ">
	Loading, please wait...
	<img src="resources/images/ajax-loader.gif">
	</p>
  </div>
  
   
  <div style="padding-top:0.2cm">
  <div id="myModal" class="modal">
			<!-- Modal content -->
			<div class="modal-content">
				<span class="close" onclick="closeWindow();">&times;</span>
				<div id="div_log" style="display:none"></div>
				<div id="div_tree"></div>
				<div><button type="button" onclick="selectedCategory();">OK</button></div>
			</div>
		</div>
  <table class="container text-center" cellpadding="0" cellspacing="0" border=0 >
	<tr>
		<td colspan=3>
					<div class="well" align="left" style="padding:5px">
					  <div class="container-fluid" style="color:#FFFFFF ; padding:5px; ">
							<table width="100%" border=0>
								<tr>
									<td style="padding-right :0.2cm; width:15%;"><font color="#003E7C" >Upload  KB article <font></td>
									<td style="padding-right :0.2cm; width:55%;" ><input type="file" size="60" name="file" id="file" onChange="isPDFFile()" class="btn btn-primary"  style="width: 600px; border: 1px solid red;"></td>
									<td style="padding-right :0.2cm; width:10%;"><input type="submit" class="btn btn-primary" value="Upload"></td>
									<!-- <td style="padding-right :0.2cm; width:10%;"><button type="button" class="btn btn-primary"  onclick="processFile()">Process</button></td>	-->
									<td style="padding-right :0.2cm; width:20%;" align="right">
										<c:if test="${pageContext.request.userPrincipal.name != null}">
										<font color="#003E7C" >
											Welcome : ${pageContext.request.userPrincipal.name} |</font> <a
											href="<c:url value="j_spring_security_logout" />" > 
											<font color="Red"  size="2">Logout</font>
											</a>
										</font>
								
									</c:if> 
									</td>								
								</tr>
								<tr>
									<td style="padding-right :0.5cm" colspan=1 height="20px"><a  href="#"  onclick="parent.location='admin'" ><i>Back to admin</i> </a></font></div></td>
									<td style="padding-right :0.5cm" colspan=3 height="20px"><div id="ajax_message" ></div></td>
								</tr>
							</table>
					  </div>
					</div>
		</td>
	</tr>
	<tr>
		<td>
					  <div class="well" align="left" style="padding:10px">
						<table border=0>
							<tr>
								<td>
									Problem Type&nbsp;&nbsp; 
								</td>
								<td width="70%">
									<div style="float: left;">
										<input id="problem_type_id" type="text" readonly="true" placeholder="Problem Type">	
									</div>
									<div>
										<img id="treePopImage" src="resources/images/QuesMark1.png" alt="image"  style="padding-left: 10px; height:20px;" onclick="treePopUp();">
									</div>
								</td>
							</tr>
							
							<!-- <tr>
								<td style="padding-top:0.2cm">
									<button type="button" class="btn  btn-primary btn-xs" id="but_prodesc"  onclick="addProbType(this.id)">Add New</button>
								</td>
								<td width="70%" style="padding-top:0.2cm">
									<input type="text" readonly id="prodesc" >
								</td>
							</tr> -->
						</table>
					   
					   
					  </div>
					  <div class="well" align="left" style="padding:10px">
					   
					  
					  <table border=0 width="100%">
						<tr>
							<td>
								Issue Type&nbsp;&nbsp; 
							</td>
							<td width="70%" style="padding-top:0.2cm" rowspan=2>
								<textarea rows="5" cols="30" id="quedesc" readonly></textarea>
							</td>
							
						</tr>						
						<tr>
							<td style="padding-top:0.2cm">
								<button type="button" class="btn  btn-primary btn-xs" id="but_quedesc"  onclick="editTextArea(this.id)" >Edit</button>
							</td>
							
						</tr>
						</table>
					  
					  </div>
					  <div class="well" align="left" style="padding:10px">
						  <table cellspacing=20>
							  <tr>
								<td>	
									Mandatory words 
								   <br>
								   <textarea rows="3" cols="20" readonly id="manwords"></textarea>
								   <br>
								   <button type="button" class="btn btn-primary btn-xs" id="but_manwords"  onclick="editTextArea(this.id)" >Edit</button>
								</td>
								<td>&nbsp;</td>
								<td>	
									Data Required
								   <br>
								   <textarea rows="3" cols="20" id="datareq" readonly></textarea>
								   <br>
								   <button type="button" class="btn btn-primary btn-xs" id="but_datareq"  onclick="editTextArea(this.id)" >Edit</button>
								</td>

							  </tr>
						  </table>
					   
					  </div>
					 
					  <div class="well" align="left" style="padding:10px">
					  Recommendations
					  <br/>
					  <textarea rows="3" cols="40" id="recowords" readonly></textarea>
					  <br/>
					 <!--  <button type="button" class="btn btn-primary btn-xs"  id="but_recowords"  onclick="editTextArea(this.id)">Edit</button> -->
					  </div>
					  
					
		</td>
		<td>
			<table>
				<tr>
					<td style="padding-left:0.2cm">
							  <div class="well" align="left">
							  Solution
							  <br> 
							  <textarea rows="18" cols="50" id="answer" readonly></textarea>
							  <br/>
							  <button type="button" class="btn btn-primary btn-xs"  id="but_answer"  onclick="editTextArea(this.id)">Edit</button>
							  </div>
					</td>
					<td style="padding-left:0.2cm">
								  <div class="well" align="left">
								  Additional Information 
								  <br/>
								  <textarea rows="18" cols="50" readonly id="addinfo"></textarea>
								  <br/>
								  <button type="button" class="btn btn-primary btn-xs"  id="but_addinfo"  onclick="editTextArea(this.id)">Edit</button>
								  </div>
					</td>
				
				</tr>
				<tr>
					<td style="padding-left:0.2cm" colspan=2>
						<div class="well" align="center">
						<button type="button" class="btn btn-primary" id="but_addart" onClick="addArticle()">Add new article</button>
						</div>
					</td>
				</tr>
			</table>
		</td>
		

	</tr>
	<!--<tr>
		<td colspan=3>
					 <div class="well" align="center">
					<button type="button" class="btn btn-primary">Add new article</button>
					</div>
		</td>
	</tr>-->
	</table>
	
	</div>
<!-- <textarea id="mytextarea" class="jqte-test"><b>My contents are from <u><span style="color:rgb(0, 148, 133);">TEXTAREA</span></u></b></textarea> -->
 </form>
</body>
</html>