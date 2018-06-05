<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>KB Manager</title>
  <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1">
  <!--<link rel="stylesheet" href="resources/bootstrap/css/bootstrap.min.css">
  <!- - <script src="resources/bootstrap/js/jquery.min.js"></script> -->
  <script src="resources/bootstrap/js/jquery.min.js"></script>
  <script src="resources/bootstrap/js/bootstrap.min.js"></script>
   
  <script src="resources/js/KBManager.js"></script>
  <link rel="stylesheet" href="resources/css/zurichstyle.css"> 
</head>
<body>

<body onload="setScreenValues()" bgcolor="#9BA9B5">		
		<div id="dialog" title="My Dialog Title"></div><centre>
		<table width="100%" height="100%" border="0"  cellspacing="0" id="maintable" cellpadding="0" class="bodybackground" bgcolor="#317DC8" >
			<!--  Header view -->
			<tr id="headerRow" class="headerGradient" >
				<td>
				<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		
					<img id="imgLogo">			
					<font face="verdana" color="#003E7C"  size="5">&nbsp;&nbsp;&nbsp;&nbsp;ngGenie </font>
					<font face="verdana" color="#003E7C"  size="3">KB Documents Details </font><p>					
				</td>
				<td align="right">
				 
					<c:if test="${pageContext.request.userPrincipal.name != null}">
					<font face="verdana" color="#003E7C"  size="3">
						Welcome : ${pageContext.request.userPrincipal.name} |</font> <a
						href="<c:url value="j_spring_security_logout" />"  >
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
					<font face="verdana" color="#FFFFFF"  size="2">&nbsp;&nbsp;|&nbsp;&nbsp;View by Application <select id="appSelect"></select> 
					&nbsp;&nbsp;|&nbsp;&nbsp;View by status <select id="statselect"></select> 
					&nbsp;&nbsp;<button type="button" onclick="applyFilter()">Apply Filter</button>
				</td>
			</tr>
			<tr id="tabRow" >
				<td colspan=2 align="centre">
				
				<table border="0" cellspacing="7" width="100%">
					<tr>
						<td id="tabRow1" class="chartCss" BGCOLOR="#FFFFFF" align="justify">
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

</body>
</html>

