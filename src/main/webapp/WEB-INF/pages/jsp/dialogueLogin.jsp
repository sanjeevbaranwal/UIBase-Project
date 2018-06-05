<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
   		<cfheader name="Access-Control-Allow-Origin" value="*">
   		<meta http-equiv="Content-Type" charset="utf-8" content="IE=edge;chrome=1">
  		<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
		<title>Login</title>
		<script src="resources/js/selflearning.js"></script>
		<link rel="stylesheet" href="resources/css/zurichstyle.css">  
	</head>
	<body onload="document.loginForm.username.focus(),setScreenValuesforLogin()" bgcolor="#9BA9B5">		
		<form name='loginForm' action="dialogue" method='GET'>
		<table width="100%" border="0"  cellspacing="0" cellpadding="0" class="bodybackground" bgcolor="#317DC8" >
			<!--  Header view -->
			<tr id="headerRow" class="headerGradient" >
				<td>
				<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<img id="imgLogo">			
					<font face="verdana" color="white"  size="5">&nbsp;&nbsp;&nbsp;&nbsp;ngGenie </font>
					<font face="verdana" color="white"  size="3">Dash board </font><p>					
				</td>
				<td align="right">
					&nbsp;
				</td>
			</tr>
			<tr>
				<td id="menuheader" colspan=2 class="headerGradientmenu">
					<!-- <font face="verdana" color="white"  size="2">&nbsp;&nbsp;&nbsp;&nbsp; <a  href="#"  onclick="parent.location='admin'" style="color:white "><i>Back to admin</i> </a></font> --> 
				</td>
			</tr>
			<tr id="tabRow" >
				<td colspan=2>
				<table border="0" cellspacing="7" width="100%">
					<tr>
						<td id="tabRow1" class="chartCss" BGCOLOR="#FFFFFF" >
						
							<center>
									<div id="login-box"  class="chartCssLogin"  >
										<br/><br/><br/>
										<div style="float: centre;"><font size="3"  face="arial" color="#FFFFFF">SignIn</font>
										</div>
							 
									<c:if test="${not empty error}">
										<div class="error">${error}</div>
									</c:if>
									<c:if test="${not empty msg}">
										<div class="msg">${msg}</div>
									</c:if>
									  <table id="tblLogin"  cellspacing="5" cellpadding="5"  BORDER="0">		  	
										<tr>
											<td><font size="3"  face="arial" color="#FFFFFF">User:</font></td>
											<td><input type='text' name='username'  width="18px"  value='' ></td>
										</tr>
										<tr>
											<td><font size="3"  face="arial" color="#FFFFFF">Password:</font></td>
											<td><input id="pwdinput" type='password' name='password' width="18px" /></td>
										</tr>
										<tr>
											<td colspan='2' align="center"><br/><input name="submit" type="submit"   value="Submit"  class="red" /></td>
										</tr>
									  </table>
							 
									  <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
							 
								</div>
							</center>
							 
						</td>	
		
					</tr>
				</table>
				</td>
			</tr>
			
				<!--  footer view -->
			<tr class="" >
				<td colspan=2 align="center">
					
					<font face="verdana" color="white"  size="1"><font face="verdana" color="white"  size="2"> CAREERS | TERMS AND CONDITIONS | KEY POLICIES & COMMITMENTS | PRIVACY SECURITY | SITE MAP</font>
				</td>	
			</tr>			
		</table>	
		<input type="hidden" id="rowcount">
		</form>
	</body>
</html>