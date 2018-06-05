<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<title>Login</title>
		<script src="resources/js/selflearning.js"></script>
		<link rel="stylesheet" href="resources/css/zurichstyle.css">  
	
	 <script src="resources/js/jquery-3.2.1.js"></script>
    <script src="resources/js/jquery-3.2.1.min.js"></script>
	<script type="text/javascript">
	function changeHiddenInput (objDropDown)
	{
	    var objHidden = document.getElementById("userproject");
	    objHidden.value = objDropDown.value; 
	}
	</script>
	</head>
	<body onload="document.loginForm.username.focus(),setScreenValuesforLogin()" bgcolor="#9BA9B5">	
		<form name='loginForm' action="<c:url value='j_spring_security_check' />" method='POST'>
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
							 
									<c:if test="${not empty sessionScope.SPRING_SECURITY_LAST_EXCEPTION}">
										<div style="color: red">
											Reason: ${sessionScope.SPRING_SECURITY_LAST_EXCEPTION.message}
										</div>
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
											<td><font size="3"  face="arial" color="#FFFFFF">Project:</font></td>
											<td><select name='project' id="slectboxid" onchange="changeHiddenInput(this)">
											<option value="Demo">Demo</option>
											<option value="HRSS">HRSS</option>
											<option value="Exon">Exon</option>
											<option value="Eva">Eva</option>
											</select></td>
										</tr>
										<tr>
											<td colspan='2' align="center"><br/><input name="submit" type="submit"   value="Submit"  class="red" /></td>
										</tr>
									  </table>
							 
									  <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
									  <input type="hidden" name="userproject" id="userproject" value="Demo" />
							 
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