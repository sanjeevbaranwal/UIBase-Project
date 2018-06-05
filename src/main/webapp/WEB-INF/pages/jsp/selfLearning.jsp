<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
    <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
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
		
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<title>Demo Genie</title>
		
		<link rel="stylesheet" href="resources/css/zurichstyle.css">  
		
		<!--<link rel="stylesheet" href="http://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css">-->
		<script src="resources/js/jquery-1.9.0.min.js"></script>
  		<script src="resources/js/jquery-ui.js"></script>
		
		
		<script src="resources/js/selflearning.js"></script>
		<!--<script src="resources/bootstrap/js/jquery.min.js"></script>-->
	  <script src="resources/bootstrap/js/bootstrap.min.js"></script>

		<!--<script src="resources/js/treeJquery/jquery.min.js" type="text/javascript"></script>
		
		
        <script src="resources/js/treeJquery/jquery-1.4.3.min.js" type="text/javascript"></script>	
		<script src="resources/js/treeJquery/jquery-1.12.4.js" type="text/javascript"></script>
       
        <!-- <script src="resources/js/OntologyManager.js"></script>	 -->
		<script src="resources/js/treeJquery/jquery-ui.js" type="text/javascript"></script>
		<script src="resources/js/TreeComponent.js" type="text/javascript"></script>
		<link rel="stylesheet" type="text/css" href="resources/css/TreeComponent.css">
		<link rel="stylesheet" type="text/css" href="resources/css/jquery-ui.css">
		<link rel="stylesheet" type="text/css" href="resources/css/Example.css">

	</head>
	<body onload="setScreenValues()" bgcolor="#9BA9B5">		
		<div id="dialog" title="My Dialog Title"></div>
		<div id="myModal" class="modal">
			<!-- Modal content -->
			<div class="modal-content">
				<span class="close" onclick="closeWindow();">&times;</span>
				<div id="div_log" style="display:none"></div>
				<div id="div_tree"></div>
				<div><button type="button" onclick="selectedCategory();">OK</button></div>
			</div>
		</div>
		<table width="98%" height="100%" border="0"  cellspacing="0" cellpadding="0" class="bodybackground" bgcolor="#317DC8" >
			<!--  Header view -->
			<tr id="headerRow" class="headerGradient" >
				<td>
				<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		
					<img id="imgLogo">			
					<font face="verdana" color="#003E7C"  size="5">&nbsp;&nbsp;&nbsp;&nbsp;Genie </font>
					<font face="verdana" color="#003E7C"  size="3">Assisted Learning </font><p>					
				</td>
				<td align="right">
				 
					<c:if test="${pageContext.request.userPrincipal.name != null}">
					<font face="verdana" color="#003E7C"  size="3">
						Welcome : ${pageContext.request.userPrincipal.name} |</font> <a
						href="<c:url value="j_spring_security_logout" />" > 
						<font face="verdana" color="Red"  size="2">Logout</font>
						</a>
					</font> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<!-- -->
			
				</c:if> 
				</td>
			</tr>
			<tr>
				<td id="menuheader" colspan=2 class="headerGradientmenu">
					<font face="verdana" color="#FFFFFF"  size="2">&nbsp;&nbsp;&nbsp;&nbsp; <a  href="#"  onclick="parent.location='admin'" style="color:#FFFFFF "><i>Back to admin</i> </a></font> 
				</td>
			</tr>
			<tr id="tabRow" >
				<td colspan=2>
				<table border="0" cellspacing="7" width="100%">
					<tr>
						<td id="tabRow1" class="chartCss" BGCOLOR="#FFFFFF" >
							<div id="sltbl" style=" overflow-y: scroll;"></div> 	
							 
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
		
	</body>
</html>