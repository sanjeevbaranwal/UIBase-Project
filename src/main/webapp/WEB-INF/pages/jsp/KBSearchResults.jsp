<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
	  <title>Demo Genie</title>
	  <meta charset="utf-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1">
	  <link rel="stylesheet" href="resources/bootstrap/css/bootstrap.min.css">
	  <link rel="stylesheet" href="http://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css">
	  <link rel="stylesheet" href="resources/css/zurichstyle.css"> 
	  <script src="resources/bootstrap/js/jquery.min.js"></script>
	  <script src="resources/bootstrap/js/bootstrap.min.js"></script>
	  <script src="resources/js/KBSearchResults.js"></script>
	  <script src="resources/js/jquery-1.9.0.min.js"></script>
	  <script src="resources/js/jquery-ui.js"></script>
	</head>
	<body onload="pageOnLoad()" bgcolor="#9BA9B5">
		<div id="dialog" title="My Dialog Title"></div>
		  <div id="divLoading" style="margin: 0px; padding: 0px; position: fixed; right: 0px; top: 0px; width: 100%; height: 100%; background-color: rgb(102, 102, 102); z-index: 30001; opacity: 0.8;">
			<p style="position: absolute; color: White; top: 50%; left: 45%; ">
			Loading, please wait...
			<img src="resources/images/ajax-loader.gif">
			</p>
		  </div>
		
		<centre>
		<table width="100%" height="100%" border="0" cellspacing="0"
			id="maintable" cellpadding="0" class="bodybackground"
			bgcolor="#317DC8">
			<!--  Header view -->
			<tr id="headerRow" class="headerGradient">
				<td><br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img
					id="imgLogo"> <font face="verdana" color="#003E7C" size="5">&nbsp;&nbsp;&nbsp;&nbsp;ngGenie
				</font> <font face="verdana" color="#003E7C" size="3">KB Search Results </font>
				<p></td>
				<td align="right"><c:if
						test="${pageContext.request.userPrincipal.name != null}">
						<font face="verdana" color="#003E7C" size="3"> Welcome :
							${pageContext.request.userPrincipal.name} |</font>
						<a href="<c:url value="j_spring_security_logout" />">
							<font face="verdana" color="Red"  size="2">Logout</font></a>
						</font> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<!-- -->
	
					</c:if>
				</td>
			</tr>
			<tr>
				<td id="menuheader" colspan=2 class="headerGradientmenu"><font
					face="verdana" color="#FFFFFF" size="2">&nbsp;&nbsp;&nbsp;&nbsp;
						<a href="#" onclick="parent.location='KBSearch'"
						style="color: #FFFFFF"><i>Back to KB Search</i> </a>
				</font></td>
			</tr>
			<tr id="tabRow" >
				<td colspan=2 align="centre">
				
				<table border="0" cellspacing="7" width="100%">
					<tr>
						<td id="tabRow1" class="chartCss" BGCOLOR="#FFFFFF" align="justify">
							<div id="kbtbl" style=" overflow-y: scroll;"></div> 	
							 
						</td>	
					</tr>
				</table>
				</td>
			</tr>
			
			<!--  footer view -->
			<tr class="headerGradient">
				<td colspan=2 align="center"><font face="verdana"
					color="#003E7C" size="2"> CAREERS | TERMS AND CONDITIONS |
						KEY POLICIES & COMMITMENTS | PRIVACY SECURITY | SITE MAP</font></td>
			</tr>
		</table>
		<input type="hidden" id="rowcount">
	</body>
</html>