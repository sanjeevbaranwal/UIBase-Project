<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
    <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<title>User Profiler Admin</title>
		<script src="resources/js/userProfilerAdmin.js"></script>
		<link rel="stylesheet" href="resources/css/zurichstyle.css">  
		
		<link rel="stylesheet" href="http://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css">
		<script src="resources/js/jquery-1.9.0.min.js"></script>
  		<script src="resources/js/jquery-ui.js"></script>

	</head>
	<body onload="setScreenValues()" bgcolor="#9BA9B5">		
		<div id="dialog" title="My Dialog Title"></div>
		<table width="98%" height="100%" border="0"  cellspacing="0" cellpadding="0" class="bodybackground" bgcolor="#317DC8" >
			<!--  Header view -->
			<tr id="headerRow" class="headerGradient" >
				<td>
				<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		
					<img id="imgLogo">			
					<font face="verdana" color="#003E7C"  size="5">&nbsp;&nbsp;&nbsp;&nbsp;ngGenie </font>
					<font face="verdana" color="#003E7C"  size="3">User Profiler Admin </font><p>					
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